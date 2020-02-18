/**
 *  get the title and url transformed into Markdown format
 *
 */
export const getMarkdownLink = (tab, options = {}) => {
  const {
    hasUrl = true,
    hasTitle = true
  } = options

  const { title, url } = tab
  const mdLinkText = `[${hasTitle ? title : ''}](${hasUrl ? url : ''}) `

  return mdLinkText
}
