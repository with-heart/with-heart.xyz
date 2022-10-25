// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'xstate.after(250)#editable-img.debounce': {
      type: 'xstate.after(250)#editable-img.debounce'
    }
    'xstate.init': {type: 'xstate.init'}
  }
  invokeSrcNameMap: {}
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    setDescription: 'description.changed'
    setSearchParams:
      | 'description.changed'
      | 'title.changed'
      | 'xstate.after(250)#editable-img.debounce'
      | 'xstate.init'
    setSrc: 'xstate.after(250)#editable-img.debounce' | 'xstate.init'
    setTitle: 'title.changed'
  }
  eventsCausingServices: {}
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: 'debounce' | 'idle' | 'loading'
  tags: never
}
