console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://puzzle.mead.io/puzzle').then((response) => {
        debugger;
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.puzzle
                messageTwo.textContent = data.puzzle
            }
        })
    })
})