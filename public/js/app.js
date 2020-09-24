console.log('Testing file')

const webForm = document.querySelector('form')
const textSearch = document.querySelector('input')
const divContent = document.querySelector('#content_weather')


webForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    const address = textSearch.value

    fetch('http://localhost:3000/weather?address='+ address )
.then((response) =>{
    response.json().then((data) =>{
        if(data.error){
            console.log(error)
        }else{
            divContent.children[0].innerText = data.weather
            divContent.children[1].innerText = data.temperature
            divContent.children[2].innerText = data.location
            divContent.children[3].src = data.weather_icons
        }
    })
})
})