const form = document.getElementById('form')
const messageInput = document.getElementById('message')
const messageHistory = document.getElementById('message-history')

form.onsubmit = (event) => {
  event.preventDefault()

  const message = document.getElementById('message').value

  addMessageToHistory(message)
  console.log({message})
}

function addMessageToHistory(message) {
  const element = document.createElement('pre')
  element.innerText = message
  messageHistory.appendChild(element)
}