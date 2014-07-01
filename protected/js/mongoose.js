var util = require('util');
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
var mongoose = require('mongoose');

//--------------------------simulation de l'objet
// mongoose.connection.close();
// On se connecte à la base de données ne pas oubliez de lancer ~/mongo/bin/mongod dans un terminal !
 // mongoose.createConnection('mongodb://romain:romain@kahana.mongohq.com:10004/ciib_stage', function(err) {
 mongoose.connect('mongodb://romain:romain@kahana.mongohq.com:10004/ciib_stage', function(err) {
   if (err) { throw err; }
});
 
// Création du schéma pour les commentaires
var structure = new mongoose.Schema({
	siren : String,
	siret : String,
	name : String,
	dirigeant : String,
	type : String,
	Categorie : String,
	adresse : String,
	CapitalSocial : String, 
	chiffreAffaire : Object,
	resultatNet : Object,
	effectif :  Object,
	EBEN :  Object,
	RCAIN :  Object,
	ResulatExpoitation :  Object,
	ValeureAjoute :  Object,
	CapitauxPropres :  Object,
	Dettes :  Object,
	TotalPassif :  Object,
	ActifImmobilise : Object,
	ActifCirculant :  Object,
	TotalActif :  Object,
	tel : String,
	fax : String,
	prospection : String,
  
});
// On crée une instance du Model
exports.enregistrement = function(obj){
	// Création du Model pour les commentaires
	var text = mongoose.model('commentaires', structure);
	var monText = new text({ siren : obj.siren });
	monText.siret = obj.siret;
	monText.name = obj.name;
	monText.dirigeant = obj.dirigeant;
	monText.type = obj.type;
	monText.Categorie = obj.Categorie;
	monText.adresse = obj.adresse;
	monText.CapitalSocial = obj.CapitalSocial; 
	monText.chiffreAffaire = obj.chiffreAffaire;
	monText.resultatNet = obj.resultatNet;
	monText.effectif =  obj.effectif;
	monText.EBEN =  obj.EBEN;
	monText.RCAIN =  obj.RCAIN;
	monText.ResulatExpoitation =  obj.ResulatExpoitation;
	monText.ValeureAjoute =  obj.ValeureAjoute; 
	monText.CapitauxPropres =  obj.CapitauxPropres;
	monText.Dettes =  obj.Dettes;
	monText.TotalPassif =  obj.TotalPassif;
	monText.ActifImmobilise = obj.ActifImmobilise;
	monText.ActifCirculant =  obj.ActifCirculant;
	monText.TotalActif =  obj.TotalActif;
	monText.tel = obj.tel;
	monText.fax = obj.fax;
	monText.prospection = obj.prospection;
	console.log("une instance est creer");
	// on recupere la db 
	var query = text.find(null);
	query.where('siret', obj.siret).limit(1); // call back data ! a lire dans query.exec
	query.exec(function (err, data) {
	if (err) { throw err; }
	if(data.length == 0){
	//-----------------------------------------------------------
	monText.save(function (err) {
	  if (err) { throw err; }
	  console.log('Enregistrement dans la base de donnée !');
	  // On se déconnecte de MongoDB maintenant
	  // mongoose.connection.close();
	});
	//-----------------------------------------------------------
	}else{
		//-----------------------------------------------------------
		console.log("l'enregistrement existe deja !!");
		//------------------------------------------------------------
		// On va parcourir le résultat et on les afficher 
		var comm;
		for (var i = 0, l = data.length; i < l; i++) {
			comm = data[i];
			console.log('------------------------------');
			console.log('siren : ' + comm.siren);
			console.log('name : ' + comm.name);
		}
	}  
});
}

var selecAll = function(item){
	var text = mongoose.model('commentaires', structure);
	var query = text.find(null);
	query.select('Categorie');
query.exec(function (err, data) {
  if (err) return handleError(err);
  console.log(data); // Space Ghost is a talk show host.
})
}
// selecAll("name");
// exports.enregistrement({"siren" : 0});

//-------------------------------------------------------------supression All------------------------------------- 
// var suppressionAll = function(){
// var text = mongoose.model('commentaires', structure);
// text.remove('*', function (err) {
  // if (err) { throw err; }
  // console.log('enregistrement supprimé');
// }); 
// }
// -------------------------------------------------------------supression siren------------------------------------- 
// var suppression = function(siren){
// var text = mongoose.model('commentaires', structure);
// text.remove({ siret : ''+siren }, function (err) {
  // if (err) { throw err; }
  // console.log('enregistrement supprimé');
// }); 
// }

//-----------------------------------------------------------------------------------------------------------------------
exports.prospection = function(that, fonc, paquets){
	var j = 0;
	var prospect = new Array();
	var tabSiren = new Array();
	var text = mongoose.model('commentaires', structure);
	var query = text.find(null);
	query.select("siren Categorie").where('Categorie').equals(paquets.formeJuridique);
	query.exec(function (err, data) {
	console.log(data);
	if (err) return Error(err);
	for(tmp=0; tmp<data.length; tmp++){
		 tabSiren.push(data[tmp].siren); 
	 }
	filtre(that, fonc, prospect,tabSiren, paquets, j);
})
}
var filtre = function(that, fonc, prospect, tabSiren, paquets, j){
console.log(util.inspect(tabSiren[j++])+"------------------------------------");
	var text = mongoose.model('commentaires', structure);
	var query = text.find(null);
		query.select("siren CapitalSocial effectif chiffreAffaire resultatNet prospection fax name adresse").where('siren').equals(tabSiren[j]);
		query.exec(function (err, data) {
		// console.log(data);
			if (err) return handleError(err); 
					if((data[0])&& (data[0].CapitalSocial) &&(data[0].effectif)&&(data[0].effectif.n1 >= paquets.nombreEmployes)){ 
					// console.log(data);
							if((data[0].resultatNet)&&(data[0].resultatNet.n1)&&((data[0].resultatNet.n1) >= paquets.resultatNet)){
							// console.log(data);
								if((data[0].chiffreAffaire)&&(data[0].chiffreAffaire.n1)&&((data[0].chiffreAffaire.n1) >= paquets.chiffreAffaire)){
								// console.log(data);
									var capitalSc = data[0].CapitalSocial;
									var capitalSc = capitalSc.split(" ");
									capitalSc = capitalSc[0].replace(".", "");
									capitalSc = capitalSc.replace(",", ".");
									if(((+capitalSc) >= paquets.capitalSocial)){
									// console.log(data[0].CapitalSocial);
									if((paquets.evolution_chiffre_Affaire == "+")&&(data[0].chiffreAffaire.evolution[0])&&((data[0].chiffreAffaire.evolution[0]) == "+")){
										if((paquets.evolution_resultat_Net == "+")&&(data[0].resultatNet.evolution[0])&&((data[0].resultatNet.evolution[0]) == "+")){
											if(data[0].adresse){
												var code_postal = data[0].adresse;
												var indice_paris = code_postal.lastIndexOf("PARIS");
												if(indice_paris != -1){
													var code_postal = code_postal.slice(0, indice_paris);
													// console.log(code_postal);
												}
												var d = {};
												d.data = data[0];
												code_postal = code_postal.match(/\d/g);
												code_postal = code_postal.join("");
												code_postal = code_postal.slice(-5);
												code_postal = code_postal.slice(0, 2);
												d.code = code_postal;
												if((data[0].prospection = "false") && (code_postal == paquets.departement)){
												// console.log("****************************************");
												// console.log(data);
													prospect.push(d);
												}else{
													console.log("la societé a déja été prospecté");
												}
											}
										}else if((paquets.evolution_resultat_Net != "+")){
											if(data[0].adresse){
												var code_postal = data[0].adresse;
												var indice_paris = code_postal.lastIndexOf(data[0].adresse);
												console.log(code_postal);
												if(indice_paris != -1){
													var code_postal = code_postal.slice(indice_paris, code_postal.length);
													console.log(code_postal);
												}
												var d = {};
												d.data = data[0];
												code_postal = code_postal.match(/\d/g);
												code_postal = code_postal.join("");
												code_postal = code_postal.slice(-5);
												code_postal = code_postal.slice(0, 2);
												d.code = code_postal;
												console.log(code_postal);
												if((data[0].prospection = "false") && (code_postal == paquets.departement)){
													prospect.push(d);
												}else{
													console.log("la societé a déja été prospecté");
												}
											}
										}
									}else if((paquets.evolution_chiffre_Affaire != "+")){
											if((paquets.evolution_resultat_Net == "+")&&(data[0].resultatNet.evolution[0])&&((data[0].resultatNet.evolution[0]) == "+")){
												if(data[0].adresse){
												var code_postal = data[0].adresse;
												var indice_paris = code_postal.lastIndexOf(data[0].adresse);
												console.log(code_postal);
												if(indice_paris != -1){
													var code_postal = code_postal.slice(indice_paris, code_postal.length);
													console.log(code_postal);
												}
												var d = {};
												d.data = data[0];
												code_postal = code_postal.match(/\d/g);
												code_postal = code_postal.join("");
												code_postal = code_postal.slice(-5);
												code_postal = code_postal.slice(0, 2);
												d.code = code_postal;
													if((data[0].prospection = "false") && (code_postal == paquets.departement)){
														prospect.push(d);
													}else{
														console.log("la societé a déja été prospecté");
													}
												}
										}else if((paquets.evolution_resultat_Net != "+")){
											if(data[0].adresse){
											var code_postal = data[0].adresse;
												var indice_paris = code_postal.lastIndexOf(data[0].adresse);
												if(indice_paris != -1){
													var code_postal = code_postal.slice(indice_paris, code_postal.length);
												}
												var d = {};
												d.data = data[0];
												code_postal = code_postal.match(/\d/g);
												code_postal = code_postal.join("");
												code_postal = code_postal.slice(-5);
												code_postal = code_postal.slice(0, 2);
												d.code = code_postal;
												console.log(code_postal);
												if((data[0].prospection = "false") && (code_postal == paquets.departement)){
													prospect.push(d);
												}else{
													console.log("la societé a déja été prospecté");
												}
											}
										}
									}
								}
								}
							
							}
						}
	if(tabSiren[j++]){		
		j=j++;
		filtre(that, fonc, prospect, tabSiren, paquets, j);
	}else{
			console.log(prospect);
			console.log("c'est fini ");
			that[fonc](prospect);
			// mongoose.connection.close();
	}
	});
			
}
// prospection();
	exports.update = function(faxx){
	var text = mongoose.model('commentaires', structure);
	text.update({fax: faxx }, { $set: {prospection: 'false' }}, function(){
	var query = text.find(null);
	query.select("fax prospection name").where('fax').equals(faxx);
	query.exec(function (err, data) {
	if (err) return Error(err);
	console.log(data[0]);
	})
	});
}
exports.updatee = function(faxx){
	var text = mongoose.model('commentaires', structure);
	text.update({fax: faxx }, { $set: {prospection: 'false' }}, function(){
	var query = text.find(null);
	query.select("fax prospection name").where('fax').equals(faxx);
	query.exec(function (err, data) {
	if (err) return Error(err);
	console.log(data[0]);
	})
	});
}
// var faxx = "04 72 31 14 41";
// exports.update(faxx);