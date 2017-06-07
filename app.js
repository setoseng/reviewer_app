var express = require('express');
var body_parser = require('body-parser');
var promise = require('bluebird');
//set up express app
var app = express();
//handlebar view engine
app.set('view engine','hbs');
//set up body-parser middleware
app.use(body_parser.urlencoded({ extended:false }));
//set up static folder
app.use('/static',express.static('public'));

app.get('/',function(request,response){
  response.render('homepage.hbs',{});
});









app.listen(8000,function(){
  console.log("Listening on Port 8000");
});
