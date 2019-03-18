const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//set up static files (HTML, JS, CSS, etc.)
app.use(express.static('server/public'));

//Setup body-parser, this gets data from a requests body
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
    console.log('Server listening on port', PORT);
})

//Array used to store the calculation info from the client side
let inputArray = [];
//Array to store the calculation history from the user
let historyArray = [];

//Takes in the calc info from the client side. Clears the input array of older calc info
//and pushes the the new calc info in the array. Then runs the calculation function.
app.post('/calc', (req, res) => {
    let newCalc = req.body;
    console.log('Calc to add', newCalc);
    inputArray = [];
    inputArray.push(newCalc);
    calculation();
    res.sendStatus(201);
})//post END

//Takes the historyArray that has been updated via the calculation function
//and sends it to the client side.
app.get('/calc', (req, res) => {
    console.log('GET answer');
    res.send(historyArray);
})//get END

//Uses the info from the inputArray and calculates the answer. Enters the answer 
//as well as the other calc info into a object and then pushes the object 
//into the history array to store past equations. 
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
    
    console.log('input array', inputArray);
    
    let newHistory = {
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        symbol: symbol,
        answer: answer,
    }

    historyArray.push(newHistory);
}//calculation END