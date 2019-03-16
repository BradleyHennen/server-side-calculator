console.log('js');

$(document).ready(readyNow);

function readyNow() {
    console.log('jQuery');

    //Sends calculator info to the server via POST in the addInfo function upon
    //the click of the submit button
    $('#calculate').on('click', function(event) { 
        event.preventDefault();
        addInfo();
    });
    $('#clear').on('click', clearInputs)

    //Updates the activeSymbol variable with the corrisponding click of 
    //the various operators
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
}//readyNow END

//Used to store the operator 
let activeSymbol = '';

//Takes the user inputs and POST's the info to the server via an object.
//If successful clears the input fields and runs getAnswer.
//It also checks to make sure the inputs are filled in
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
}//addInfo END

//Requests the historyArray from the server side to be used to 
//render the DOM.
function getAnswer() {
    $.ajax({
        method: 'GET',
        url: '/calc',
    }).then(function(response) {
        console.log('GET calc info: ', response);
        render(response);
    }).catch(function(error) {
        console.log('Something went wrong');
        alert('Something went wrong')
    })
}//getAnswer END

//Runs when an operator button is pressed and stores the 
//value in the activeSymbol variable 
function symbolInput(symbol) {
    activeSymbol = symbol;
}//symbolInput END


//Clears DOM and appends current answer and calculation history list to the DOM
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
}//render END

//Used to clear input fields upon submit
function clearInputs() {
    $('#first-number').val('');
    $('#second-number').val('');
    symbol = '';
}//clearInputs END