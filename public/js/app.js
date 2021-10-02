//console.log('Client side javascript file is loaded');

fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});

//http://localhost:3000/weather?address=Boston
fetch('http://localhost:3000/weather?address=Boston').then((response) => {
    response.json().then((err, data) => {
        if(err){
            return console.log(err);
        }
        console.log(data);
    });
});

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const workingMessage = document.querySelector('#working-message');
const errorMessage = document.querySelector('#error-message');

workingMessage.textContent = '';
errorMessage.textContent = '';

weatherForm.addEventListener(('submit'), (e) => {
    e.preventDefault();

    const location = search.value;
    
    console.log(location);

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        /*if(err){
            console.log('this should show err message - '+err);
            errorMessage.textContent = err.textContent;
            return;
        }
        console.log('this should show functional message - '+data);
        workingMessage.textContent = data.location;*/
        console.log('data = ' + data);
        console.log('data.address = ' + data.address);
        console.log('data.forecast = ' + data.forecast);
        console.log('data.location = ' + data.location);

        workingMessage.textContent = data.forecast;
    });
});
});