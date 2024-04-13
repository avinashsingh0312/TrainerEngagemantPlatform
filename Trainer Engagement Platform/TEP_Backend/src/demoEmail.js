const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const start = async () => {
    try {
        app.listen(3000, () => console.log('Server started on port 3000'));
    }
    catch (error) {
    }
};

app.get('/sendmail' , async (req , res)=>{
    res.send("I am sending mail");
});
start();