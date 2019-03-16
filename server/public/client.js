console.log('js');

$(document).ready(readyNow);

function readyNow() {
    console.log('jQuery');
    $('#calculate').on('click', function(event) { 
        event.preventDefault();
        addInfo();
    });
    $('#clear').on('click', clearInputs)

    $('#plus').on('click', function(event) {
        event.preventDefault();
        symbolInput('+')});
    $('#minus').on('click', function(event) {
        event.preventDefault();
        symbolInput('-')});
    $('#multiply').on('click', function(event) {
        event.preventDefault();
        symbolInput('*')});
    $('#divide').on('click', function(event) {
        event.preventDefault();
        symbolInput('/')});
    getAnswer();
}

let activeSymbol = '';

function addInfo() {
    let firstNumber = $('#first-number').val();
    let secondNumber = $('#second-number').val();
    let symbol = activeSymbol;

    if (firstNumber === '' || secondNumber === '') {
        return alert('Please fill in all fields')
    }

    $.ajax({
        method: 'POST',
        url: '/calc',
        data: {
            firstNumber: firstNumber,
            secondNumber: secondNumber,
            symbol: symbol,
        }
    }).then(function(response) {
        $('#first-number').val('');
        $('#second-number').val('');
        getAnswer();
    }).catch(function(error) {
        console.log('Something went wrong');
        alert('Something went wrong');
    })
}

function getAnswer() {
    $.ajax({
        method: 'GET',
        url: '/calc',
    }).then(function(response) {
        console.log('Answer is: ', response);
        render(response);
    }).catch(function(error) {
        console.log('Something went wrong');
        alert('Something went wrong')
    })
}

function symbolInput(symbol) {
    console.log('button functioning');
    activeSymbol = symbol;
}   

function render(outputArray) {
    $('#answer').empty();
    $('#calculation-history').empty();
    console.log('history array', outputArray);
    
    let length = outputArray.length - 1;
    
    if (outputArray.length > 0) {
         $('#answer').append(`<span>${outputArray[length].answer}</span>`);
    }

    for (let i = 0; i < outputArray.length; i++) {
        $('#calculation-history').append(`
        <li>${outputArray[i].firstNumber} 
        ${outputArray[i].symbol} 
        ${outputArray[i].secondNumber} = 
        ${outputArray[i].answer}
        </li>`)
        
    }
}

function clearInputs() {
    $('#first-number').val('');
    $('#second-number').val('');
    symbol = '';
}