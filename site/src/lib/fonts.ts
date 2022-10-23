export const fonts = async () => {
  const title = await fetch(
    new URL('../../assets/SF-Pro-Display-Black.otf', import.meta.url),
  ).then((res) => res.arrayBuffer())
  const body = await fetch(
    new URL('../../assets/SF-Pro-Display-Regular.otf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  return [
    {
      name: 'SF',
      data: title,
      style: 'normal',
      weight: 900,
    } as const,
    {
      name: 'SF',
      data: body,
      style: 'normal',
      weight: 400,
    } as const,
  ]
}
