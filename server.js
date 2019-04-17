const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('client'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.listen(process.env.PORT || 8080, () => console.log('Server is running!'));
