export const formatStringToCapitalize = (string: string) => {
  const formatedString = string.charAt(0).toUpperCase() + string.slice(1)
  return formatedString;
}
