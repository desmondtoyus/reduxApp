"use strict"
let express =require('express');
let app = express();
let path = require('path');
const port = process.env.PORT || 3000;
//MIDDLEWARE TO DEFINE FOLSER FOR STATIC FILES

app.use(express.static('public'));

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port, function () {
    console.log(`listening on port ${port}`);
    
})