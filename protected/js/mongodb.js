var util = require('util');
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

MongoClient.connect('mongodb://romain:romain@kahana.mongohq.com:10004/ciib_stage', function(err, db) {
	if(err) throw err;
    var collection = db.collection('commentaires');
    collection.insert({a:2}, function(err, docs) {
    collection.count(function(err, count) {
        console.log(format("count = %s", count));
		// collection.find({Categorie : "Société à responsabilité limitée", CapitalSocial : { $gt: 200 }}).toArray(function(err, results) {
		collection.find({Categorie : "Société à responsabilité limitée"}).toArray(function(err, results) {
        console.log(results);
        db.close();
      });
      });
	 });
});
//-------------------------------------------------------------------------------------------------------------

