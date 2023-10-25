const express = require('express'); 
const app = express();
// const path = require('path');
// app.use(express.static(path.join(__dirname, 'views')));

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
//   });

app.use('/', express.static('public', { redirect: false }));

app.listen(4200, ()=>{console.log('port 4200')});
