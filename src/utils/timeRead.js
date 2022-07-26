export const timeRead = (array) => {
  return Math.ceil(array.reduce((sum, elem) => {
    return sum + elem.text.length
  }, 0) /500 )
}