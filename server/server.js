const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//set up static files (HTML, JS, CSS, etc.)
app.use(express.static('server/public'));

//Setup body-parser, this gets data from a requests body
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

const PORT = 5000;
app.listen(PORT, () => {
    console.log('Server listening on port', PORT);
})

let inputArray = [];

app.post('/calc', (req, res) => {
    let newCalc = req.body;
    console.log('Calc to add', newCalc);
    inputArray = [];
    inputArray.push(newCalc);
    calculation();
    res.sendStatus(201);
})

app.get('/calc', (req, res) => {
    console.log('GET answer');
    res.send(inputArray);
    
})

function calculation() {
    console.log('InputArray', inputArray);
    
    let firstNumber = Number(inputArray[0].firstNumber);
    let secondNumber = Number(inputArray[0].secondNumber);
    let symbol = inputArray[0].symbol;
    let answer = 0;
    if (symbol === '+') {
        answer = firstNumber + secondNumber;
    } else if (symbol === '-') {
        answer = firstNumber - secondNumber;
    } else if (symbol === '*') {
        answer = firstNumber * secondNumber;
    } else if (symbol === '/') {
        answer = firstNumber / secondNumber;
    }
    console.log('Answer is: ', answer);
    
    inputArray = [];
    inputArray.push(firstNumber, secondNumber, answer, symbol);
    console.log(inputArray);
    
}