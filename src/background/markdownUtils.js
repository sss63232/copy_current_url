/**
 *  get the title and url transformed into Markdown format
 *
 */
export const getMarkdownLink = (tab, options = {}) => {
  const {
    hasTitle = true
  } = options

  const { title, url } = tab
  const mdLinkText = `[${hasTitle ? title : ''}](${url})`

  return mdLinkText
}
