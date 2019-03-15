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

