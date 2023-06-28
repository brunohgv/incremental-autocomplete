const form = document.getElementById('form')
const messageInput = document.getElementById('message')
const messageHistory = document.getElementById('message-history')


form.onsubmit = (event) => {
  event.preventDefault()
  
  const message = document.getElementById('message').value
  
  updateTraining(message)
  addMessageToHistory(message)

  console.log({message})
}

function addMessageToHistory(message) {
  const element = document.createElement('pre')
  element.innerText = message
  messageHistory.appendChild(element)
}

function updateTraining(message) {
  const memory = readAutocompleteMemory()
  const words = separateWords(message)
  const newMemory = updateAutocompleteMemory(memory, words)
  saveAutocompleteMemory(newMemory)
}

function separateWords(string) {
  return string.split(' ').map(el => el.toLowerCase())
}

function updateAutocompleteMemory(memory, words) {
  let newMemory = memory
  words.forEach((word, index) => {
    if(index === 0) {
      return
    }
    const previousWord = words[index-1]
    newMemory = incrementPreviousOccurrencyCount(newMemory, previousWord, word)
  })
  return newMemory
}

function incrementPreviousOccurrencyCount(memory, previousWord, word) {
  if (!memory[previousWord]) {
    memory[previousWord] = {}
  }
  if (memory[previousWord][word]) {
    memory[previousWord][word] += 1
  } else {
    memory[previousWord][word] = 1
  }
  return memory
}

function readAutocompleteMemory() {
  const fileData = window.localStorage.getItem('autocompleteMemory') || '{}'
  const jsonData = JSON.parse(fileData)
  return jsonData
}

function saveAutocompleteMemory(data) {
  const stringData = JSON.stringify(data, null, 2)
  window.localStorage.setItem('autocompleteMemory', stringData)
}