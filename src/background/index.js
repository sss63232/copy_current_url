/* const defaultUninstallURL = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://wwww.github.com/kryptokinght'
    : '';
}; */

// listen to messages from popup
browser.runtime.onMessage.addListener(message => {
  console.log('TCL: --------------------')
  console.log('TCL: message', message)
  console.log('TCL: --------------------')
})
