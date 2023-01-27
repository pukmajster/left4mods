/* eslint-disable no-undef */

const SUBSCRIBE_BTN_SELECTOR = 'SubscribeItemBtn'

function getParameterByName(name) {
  // Escape special RegExp characters
  name = name.replace(/[[^$.|?*+(){}\\]/g, '\\$&')
  // Create Regular expression
  var regex = new RegExp('(?:[?&]|^)' + name + '=([^&#]*)')
  // Attempt to get a match
  var results = regex.exec(location.href)
  return decodeURIComponent(results[1].replace(/\+/g, ' ')) || ''
}

async function main() {
  const shouldUnsubscribe = getParameterByName('l4m_unsubscribe') === 'true'
  if (!shouldUnsubscribe) return

  const subscribeBtn = document.getElementById(SUBSCRIBE_BTN_SELECTOR)
  if (!subscribeBtn) return

  const btnIsSubbed = subscribeBtn.classList.contains('toggled')

  if (btnIsSubbed) {
    subscribeBtn.click()
    alert('Unsubscribed!')
  }
}

main()
