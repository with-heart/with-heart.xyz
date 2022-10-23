export const fonts = async () => {
  const title = await fetch(
    new URL('../../assets/Inter-Black.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())
  const body = await fetch(
    new URL('../../assets/Inter-Medium.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  return [
    {
      name: 'Inter',
      data: title,
      style: 'normal',
      weight: 900,
    } as const,
    {
      name: 'Inter',
      data: body,
      style: 'normal',
      weight: 400,
    } as const,
  ]
}
