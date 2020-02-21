/**
 *  get the title and url transformed into Markdown format
 *
 */
export const getTabLink = (tab, options = {}) => {
  const {
    hasUrl = true,
    hasTitle = true
  } = options

  const {
    title,
    url
  } = tab

  if (hasUrl && hasTitle) {
    return `* [${title}](${url}) \n`
  }

  if (hasUrl) {
    return `${url} \n`
  }

  return `${title} \n`
}
