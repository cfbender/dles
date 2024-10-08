export const getDate = () =>
  new Date().toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)
