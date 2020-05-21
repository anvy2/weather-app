console.log('Js Loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#p1')
const message2 = document.querySelector('#p2')

// message1.textContent = 'Something'

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    // console.log(location)
    message1.textContent = 'Loading..'
    message2.textContent = ''
    fetch('http://localhost:3000/weather?location=' + location).then((response) => {
        response.json().then((data) => {
            // console.log(data)
            if(data.error) {
                message1.textContent = data.error
            }
            else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})