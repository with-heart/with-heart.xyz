import {useMachine} from '@xstate/react'
import {assign, createMachine} from 'xstate'
import {ResponsiveImage} from './responsive-image'

export const editableImgMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5SQJYBcCGAjANmAtCgLZQB0OA9hhCgHZQDEl1kA2gAwC6ioADhbHQoKtHiAAeiAIwAWAGztSAVjlSATHIDsAZilTNADjkBOADQgAnojXG1y9ts3t2mmzuNLtAXy-nUmXAJiMggwLAoAV1oAYzAGcVhMNDBSDAAzZIAnAAo1JXYASgZ-bDxCElJQ8KjYjm4kEH5BNGFRBskETSklZU0ZNW0ZJRlnJU1NcysEbQ1SIzURvQMlTxm5Hz8aALLghlDYaMyUXhaRUmiACwx6Ni4xJqERMQ7+ycRBnvZVKQMXMfZ+jINuAtqUgiQGC00HhzlcbhA6vcBI82qAXmo3gg1OpSNo5EMlMZfnIDAZtHifL4QLQKPsxCVAuUyMwaPQkc1Ws9pOxjHJlHJtMY9F0tL8JpZrJoelISdplo4TJoSesqQydhUUBA8OyUVyED8ZFJlPljDIzaSTeKpuSjXjtOwxnI5DYZLygarQYzgpUwpEYmAdadURJ3kojY6DN0jLJtMNMWoDHYZXL7S48ewDB5gWrwVBA5z2oh8HJMfgesYK5Wq5XXJSvEA */
  createMachine(
    {
      id: 'editable-img',
      schema: {
        context: {} as {
          title: string
          description: string
          searchParams: URLSearchParams
          src: string
        },
        events: {} as
          | {type: 'loaded'}
          | {type: 'description.changed'; description: string}
          | {type: 'title.changed'; title: string},
      },
      tsTypes: {} as import('./editable-img.typegen').Typegen0,
      preserveActionOrder: true,
      predictableActionArguments: true,
      entry: ['setSearchParams', 'setSrc'],
      description:
        'Manages the editable `@vercel/og` img experience found at <https://with-heart.xyz/vercel-og>',
      context: {
        title: 'Hello World',
        description: 'Greetings Earth!',
        searchParams: new URLSearchParams({}),
        src: '',
      },
      initial: 'loading',
      states: {
        loading: {
          entry: ['setSearchParams', 'setSrc'],
          description:
            'An image is loading.\n\nA load can be abandoned (returning to `debounce`) if a user changes the input.',
          on: {
            loaded: {
              target: 'idle',
              description: 'An image was loaded.',
            },
          },
        },
        idle: {
          description: 'Waiting for user input!',
        },
        debounce: {
          entry: 'setSearchParams',
          description:
            "Generating a new image on every single keystroke would be such a waste! We debounce so that the image's `src` isn't updated until 250ms have passed without user input.",
          after: {
            '250': {
              target: 'loading',
              description:
                "If the timer completes without user input, we'll start loading the image.",
              internal: false,
            },
          },
        },
      },
      on: {
        'description.changed': {
          target: '.debounce',
          actions: 'setDescription',
          description: 'The user edited the `description` field',
        },
        'title.changed': {
          target: '.debounce',
          actions: 'setTitle',
          description: 'The user edited the `title` field',
        },
      },
    },
    {
      actions: {
        setDescription: assign({
          description: (_context, event) => event.description,
        }),
        setSearchParams: assign({
          searchParams: (context) => {
            const searchParams = new URLSearchParams({
              ...(context.title.length > 0 && {title: context.title}),
              ...(context.description.length > 0 && {
                description: context.description,
              }),
            })
            return searchParams
          },
        }),
        setSrc: assign({
          src: (context) => {
            const searchString = context.searchParams.toString()
            return `/api/img/bordered${
              searchString.length > 0 ? `?${searchString}` : ''
            }`
          },
        }),
        setTitle: assign({
          title: (_context, event) => event.title,
        }),
      },
    },
  )

const useEditableImgMachine = ({
  defaultTitle,
  defaultDescription,
}: {
  defaultTitle?: string
  defaultDescription?: string
}) => {
  const context = {
    title: defaultTitle ?? editableImgMachine.context.title,
    description: defaultDescription ?? editableImgMachine.context.description,
  }
  return useMachine(editableImgMachine, {context})
}

export const EditableImg = ({
  defaultTitle,
  defaultDescription,
  priority,
}: {
  defaultTitle?: string
  defaultDescription?: string
  priority?: boolean
}) => {
  const [state, send] = useEditableImgMachine({
    defaultTitle,
    defaultDescription,
  })
  const {description, title, searchParams, src} = state.context

  const searchString = searchParams.toString()

  return (
    <>
      <ResponsiveImage
        alt={`${title}\n${description}`}
        key={searchString}
        width={1200}
        height={675}
        src={src}
        priority={priority}
        onLoadingComplete={() => send({type: 'loaded'})}
        quality={100}
      />

      <h4 className="mb-1">Search Params</h4>
      <pre className="content width-full p-sm mb-2">
        <code className="break-all">
          {searchString.length > 0 ? searchString : ''}
        </code>
      </pre>

      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => send({type: 'title.changed', title: e.target.value})}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) =>
            send({type: 'description.changed', description: e.target.value})
          }
          rows={3}
        />
      </div>
    </>
  )
}
