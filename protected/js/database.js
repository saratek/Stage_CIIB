var util = require("util");
var event = require('events');
var ev = new event.EventEmitter();
var mongoose = require('mongoose');
//--------------------------simulation de l'objet
// On se connecte à la base de données ne pas oubliez de lancer ~/mongo/bin/mongod dans un terminal !

mongoose.createConnection('mongodb://localhost/identification', function(err) {
  if (err) { throw err; }
});
 // create = function () {
	// db.run("CREATE TABLE database (mail TEXT, id TEXT, mdp TEXT, log_temp TEXT, date TEXT)");
    // db.close();
// };
// Création du schéma pour les db
var structure = new mongoose.Schema({
	id : String,
	mail : String,
	mdp : String,
	log_temp : String,
	date : String,
});
insert = function(obj, fonction){
	var text = mongoose.model('db', structure);
	var monText = new text({ id : obj.id });
	monText.id = obj.id;
	monText.mail = obj.mail;
	monText.mdp = obj.mdp;
	monText.log_temp = obj.log_temp;
	monText.date = obj.date;
	console.log("une instance est creer");
	monText.save(function (err) {
	  if (err) { throw err; }
	  console.log('Enregistrement dans la base de donnée !');
	  obj[fonction]("Votre compte est créé");
	});
	
	  // On se déconnecte de MongoDB maintenant
	  // mongoose.connection.close();
}
// exports.verifMail = function (obj, fonction) {
	// var stmt = "SELECT mail FROM database WHERE mail = \'" + obj.mail + "\'";
	// db.get(stmt, function (e, r) {
		// if(e) {
			// util.log("ERROR - " + e);
		// } else if(r) {
			// console.log("Adresse mail deja enregistree");
			// obj[fonction]("Cette adresse est déjà enregistrée");
		// } else {
			// console.log("Adresse mail disponible");
			// ev.emit("GO_1", obj, fonction);
		// }
	// });
// };

exports.verifMail = function(obj, fonction){
	var text = mongoose.model('db', structure);
	var query = text.find(null);
	query.select("mail").where('mail').equals(obj.mail);;
	query.exec(function (err, data) {
	if (err) return handleError(err);
	console.log(data); // Space Ghost is a talk show host.
	if(data[0]){
		console.log(data);
		console.log("Adresse mail deja enregistree");
		obj[fonction]("Cette adresse est déjà enregistrée");
	}else{
		console.log("Adresse mail disponible");
		ev.emit("GO_1", obj, fonction);
	}
})
}
// verifId = function (obj, fonction) {
	// var stmt = "SELECT id FROM database WHERE id = \'" + obj.id + "\'";
	// db.get(stmt, function (e, r) {
		// if(e) {
			// util.log("ERROR - " + e);
		// } else if(r) {
			// console.log("Identifiant deja utilise");
			// obj[fonction]("Cette identifiant est déjà utilisé");
		// } else {
			// console.log("Identifiant disponible");
			// ev.emit("GO_2", obj, fonction);
		// }
	// });
// };
verifId  = function(obj, fonction){
console.log(obj.id);
	var text = mongoose.model('db', structure);
	var query = text.find(null);
	query.select("id").where('id').equals(obj.id);
	query.exec(function (err, data) {
	if (err) return handleError(err);
	console.log(data); // Space Ghost is a talk show host.
	if(data[0]){
		console.log("Identifiant deja utilise");
		obj[fonction]("Cette identifiant est déjà utilisé");
	}else{
		console.log("Identifiant disponible");
		ev.emit("GO_2", obj, fonction);
	}
})
}
exports.verifLogin = function (obj, fonction) {
console.log(util.inspect(obj.id)+"1111");
console.log(util.inspect(obj.mdp)+"1111");
	var new_log_temp = Math.floor(Math.random()*1000000000);
	var new_date = new Date();
	var text = mongoose.model('db', structure);
	var query = text.find(null);
	query.select("id mdp").where('id').equals(obj.id).where('mdp').equals(obj.mdp); //.update({$set: {log_temp: new_log_temp}}).update({$set: {date: new_date.valueOf()}});
	query.exec(function (err, data) {
	if (err) return (err);
	if(data[0]){
	console.log(util.inspect(data)+"------------------DATA-------------------"); 
	obj[fonction]("Login ok", new_log_temp);
	}else {
			console.log("-----------Identifiant ou mot de passe invalide--------------------");
			obj[fonction]("Ce compte n'existe pas");
		}
	});
	
	// var stmt = "SELECT id FROM database WHERE id=\'" + obj.id + "\' AND mdp=\'" + obj.mdp + "\'";
	// db.get(stmt, function (e, r) {
		// if(e) {
			// util.log("ERROR - " + e);
		// } else if(r){
			// console.log("Connexion etablie");
			// var stmt2 = db.prepare("UPDATE database SET log_temp = \'"+new_log_temp+"\', date = "+new_date.valueOf()+" WHERE id = \'" + obj.id + "\'");
			// stmt2.run();
			// stmt2.finalize();
			// obj[fonction]("Login ok", new_log_temp);
		// } else {
			// console.log("Identifiant ou mot de passe invalide");
			// obj[fonction]("Ce compte n'existe pas");
		// }
	// });	
};

exports.checkDatabase = function (obj, function1, function2) {
	var log_temp = obj.req.headers.cookie;
	// util.log("Identifiant temporaire : " + log_temp);	
	var text = mongoose.model('db', structure);
	var query = text.find(null);
	query.select("id date log_temp").where('log_temp').equals(log_temp);
	query.exec(function (err, data) {
	// db.serialize(function () {
		var new_date = new Date();
		// var stmt = "SELECT id,date FROM database WHERE log_temp = " + log_temp;
		// db.get(stmt, function (e, r) {
			// util.log("-----------------------" + util.inspect(r));
			// if (e) {
				// util.log("ERROR - " + e);
			// } else if (r) {
				// if (((new_date.valueOf() - r.date)/(1000)) < 10*60) {
				if (((new_date.valueOf() - data.date)/(1000)) < 10*60) {
					// util.log("Actualisation de la date du login temporaire");
					// var stmt2 = db.prepare("UPDATE database SET date = "+new_date.valueOf()+" WHERE log_temp = " + log_temp);
					// stmt2.run();
					// stmt2.finalize();
					// obj[function1](r.id);
					var text = mongoose.model('db', structure);
					var query = text.find(null);
					query.select("id date log_temp").where('log_temp').equals(log_temp).update({$set: {log_temp: new_log_temp}});
					query.exec(function (err, data) {
					// } else {
					// util.log("La date de l'identifiant temporaire n'est plus valide");
					// obj[function2]();
				// }
				})
			} else {
				// util.log("Identifiant temporaire inconnu");
				obj[function2]();
			}
		});
};

exports.erase_log = function (obj, fonction) {
	var new_log = "NonConnecté";
	// console.log("Effacement loggin temporaire dans la base de donnée");
	var stmt = db.prepare("UPDATE database SET log_temp = \'"+new_log+"\' WHERE log_temp = \'" +obj.log_temp+ "\'")
	stmt.run();
	stmt.finalize();
	obj[fonction]("Deconnexion");
};

read = function () {
    var stmt = "SELECT * FROM database";
    db.each(stmt, function (e, r) {
        util.log(util.inspect(r));
    });
    db.close();
};


var selecAll = function(item){
	var text = mongoose.model('db', structure);
	var query = text.find(null);
	query.select('id mail');
query.exec(function (err, data) {
  if (err) return handleError(err);
  console.log(data); // Space Ghost is a talk show host.
})
}
// selecAll();
/* Ecouteurs */
ev.on("GO_1", verifId);
ev.on("GO_2", insert);
 // insert(obj, null);
// exports.verifMail(obj, null);
// verifId(obj, null);
// exports.verifLogin(obj, null);
 // exports.checkDatabase(obj, null, null);
//create();
//read();
