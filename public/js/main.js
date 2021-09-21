console.log('hello there this is console from main.js file')

var form = document.querySelector('form')
var search = document.querySelector('input')
var para = document.querySelector('#para1')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    para.innerHTML = search.value
    console.log('form submitttedd'+ search.value)
});