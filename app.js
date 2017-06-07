var express = require('express');
var body_parser = require('body-parser');
var promise = require('bluebird');
//set up bluebird as a new library for promise
var pgp = require('pg-promise')({
  promiseLib:promise
});
// conneact to database
var db = pgp({database:'seto'});
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

app.get('/search',function(request, response, next){
  var search = request.query.searchTerm;
  let query = "SELECT * FROM restaurant WHERE \ restaurant.name ILIKE '%$1#%' ";
  let results = [];
  db.any(query,search)
    .then(function(results){
      response.render('search.hbs',{results:results});
    })
    .catch(next);
});

app.get('/restaurant/:id',function(request, response, next){
  let id = request.params.id;
  let query = `SELECT * FROM restaurant WHERE restaurant.id = ${id}`;
  db.one(query,id)
    .then(function(result){
      response.render('restaurant.hbs',{result:result});
    })
    .catch(next);
});





app.listen(8000,function(){
  console.log("Listening on Port 8000");
});
