console.log('Client side javascript file is loaded!')

// fetch api

fetch('http://puzzle.mead.io/puzzle').then( (response) => {
    response.json().then( (data) => {
        console.log(data)
    })
})

const loc = '?'



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    const paragraph2 = document.querySelector('#weather-error')
    const paragraph1 = document.querySelector('#weather-result')
    paragraph1.textContent = "Loading..."
    paragraph2.textContent =  ""
    fetch('http://localhost:3000/weather?address='+location).then( (response) => {
    response.json().then( (data) => {
        
        if(data.error){
            console.log("Errooooor: " + data.error)
            paragraph2.textContent = data.error
            paragraph1.textContent =  ""
        }else{
            console.log(data.location)
            console.log(data.forecast)
            paragraph1.textContent = data.location
            paragraph2.textContent = data.forecast
        }
    })
})
})

