console.log('js');

$(document).ready(readyNow);

function readyNow() {
    console.log('jQuery');
    $('#calculate').on('click', function(event) { 
        event.preventDefault();
        addInfo();
    });
    $('#clear').on('click', clearInputs)

    $('#plus').on('click', function() {
        symbolInput('+')});
    $('#minus').on('click', function() {
        symbolInput('-')});
    $('#multiply').on('click', function() {
        symbolInput('*')});
    $('#divide').on('click', function() {
        symbolInput('/')});

}

let activeSymbol = '';


function addInfo() {
    let firstNumber = $('#first-number').val();
    let secondNumber = $('#second-number').val();
    let symbol = activeSymbol;
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
    $('#answer').append(`<span>${outputArray[2]}</span>`);
    $('#calculation-history').append(`<li>${outputArray[0]} ${outputArray[3]} ${outputArray[1]} = ${outputArray[2]}</li>`)
}

function clearInputs() {
    $('#first-number').val('');
    $('#second-number').val('');
    symbol = '';
}