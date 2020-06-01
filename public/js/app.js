



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1');

//messageOne.textContent = 'From javaScript'

const messageTwo = document.querySelector('#message-2');
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  messageOne.textContent ='Loading...';
  messageTwo.textContent =''

  fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) =>{
      if (data.error){
        messageOne.textContent= data.error
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }

    })
  })

})

//api.openweathermap.org/data/2.5/weather?lat=23.6693&lon=86.1511&appid=8a66d6b02a8fe2ef78e7113d66be974e
