console.log('js');

$(document).ready(readyNow);

function readyNow() {
    console.log('jQuery');
    $('#plus').on('click', plus);
    $('#minus').on('click', minus);
    $('#multiply').on('click', multiply);
    $('#divide').on('click', divide);

}

let calcArray = [];

function addInfo() {
    let firstNumber = $('#first-number').val();
    let secondNumber = $('#second-number').val();
    let symbol = 
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
    }).catch(function(error) {
        console.log('Something went wrong');
        alert('Something went wrong');
    })
}

function plus() {
    calcArray.push('+');
}
function minus() {
    calcArray.push('-');
}
function multiply() {
    calcArray.push('*');
}
function divide() {
    calcArray.push('/');
}