var db = require("./mongoose.js");
var fs = require('fs');
var i =0;
var Phaxio = require('phaxio'),
phaxio = new Phaxio('9413c9ed299b19c4f8005ce4f40c3da2b5109ef3', '2a0e9798a40025f96109a3dce901fa0f0357b588'),
callback = function(err,data){console.log(data);};


var envoyer = function(that, fonc, data, faxx){
var d = {};
d.to = data;
d.filenames = './CIIB.pdf';
console.log("********envoie************");
// db.update(faxx); 
// phaxio.sendFax(d, function(err,res) {
  // console.log(res);
// });
}

exports.sendFax = function(that, fonc, data){
	rep ={};
	rep.reponse = "ko";
	rep.tps = data.length * (1000);
	that[fonc](rep);
	var i = 0;
	var tempo = setInterval(function (){
		if(data[i]){
			d = data[i].toString();
			d = d.substr(1);
			d = "33"+d;
			d = d.replace(" ", "");
			d = d.replace(" ", "");
			d = d.replace(" ", "");
			d = d.replace(" ", "");
			i++;
			console.log(d);
			envoyer(that, fonc, d, data[i]);
		}else{
			clearInterval(tempo);
			console.log("finnnnn");
		}
	},1000);
}






/*
phaxio.sendFax({
  to: '33148241089',
  string_data: 'Coucou !!!!!!!Faxing from Node.js',
  string_data_type: 'text'
},callback);
*/
/*
phaxio.sendFax({
    to: '33148241089', 
    filenames: 'fax.pdf'
  }, function(err,res) {
  console.log(err);
  console.log(res);
});
*/
/*
phaxio.sendFax({
  to: ['33148241089', '33148241089'], 
   string_data: 'Coucou !!!!!!!Faxing from Node.js',
   string_data_type: 'text'
},function(err,res) {
  console.log(res);
});
*/
/*
phaxio.sendFax({
    to: ['33148241089', '33148241089'], 
    filenames: 'fax.pdf'
  }, function(err,res) {
  console.log(err);
  console.log(res);
});
*/
/*
var data = {};
data.to = '33148241089';
data.filenames = 'fax.pdf';
var envoyer = function(data){
phaxio.sendFax(data, function(err,res) {
  // console.log(err);
  console.log(res);
});
}
envoyer(data); */



// var data = new Array();
// data.push("01 34 56 78 23");
// data.push("04 34 56 78 23");
// data.push("05 34 56 78 23");
// exports.sendFax(null, null, data);

/*
phaxio.faxStatus('3981072', function(err, res) {
  console.log(res.data);
});
*/
