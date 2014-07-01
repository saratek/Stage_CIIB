var principal ={};

principal.start = function () {
	document.addEventListener("click", principal.on_click); // pour êvenement quand on clique sur la souris
	document.addEventListener("keydown", principal.on_keydown); 
	// principal.on_date();

};
principal.on_click = function (ev) {

	var src = ev.target;
	if (src.id == "btn-tester")
		{
			principal.post1();
		}
	else if (src.id == "btn-fax")
		{
			principal.post2();
		}
};

principal.on_keydown = function (ev){
	if (ev.which == 13 ){

		ev.preventDefault();
		principal.post1();
		// principal.post2();

	}
};

//************************************************************************************************************************/
/*
	fonction qui récupére les données du formulaire. puis on envoie ces données dans d'autre fonctions de vérif
*/
principal.post1 = function (){
	var a = document.cookie;
	/* RECUPERATION CRITERES  */
	var formeJuridique = document.getElementById("forme-juridique").value;
	var capitalSocial = document.getElementById("capital-social").value;
	var nombreEmployes = document.getElementById("nombre-employes").value;
	var resultatNet = document.getElementById("resultat-net").value;
	var chiffreAffaire = document.getElementById("chiffre-affaire").value;
	var evolutionResultatNet = document.getElementById("evolution-resultat-net").value;
	var evolutionChiffreAffaire = document.getElementById("evolution-chiffre-affaire").value;
	var departement = document.getElementById("departement").value;
	var data = {"log_temp": a, "act": "get_criteres", "formeJuridique" : formeJuridique, "capitalSocial" : capitalSocial, "nombreEmployes" : nombreEmployes, "resultatNet" : resultatNet, "chiffreAffaire" : chiffreAffaire, "evolutionResultatNet": evolutionResultatNet, "evolutionChiffreAffaire" : evolutionChiffreAffaire, "departement" : departement};
	client.post(data, principal.post1_back);
};

//**********************************************************************************************************************
principal.post1_back = function () {
var tab_fax = new Array();
console.log("************************calback***************************");
	// Reponse serveur affichée côté client lorsque les données sont complètement accessibles (readyState == 4)
    if (this.readyState == 4 && this.status == 200) {
        var r = JSON.parse(this.responseText); // .responseText est une variable qui contient la réponse du serveur
		// console.log(r);
		if (r.resp == "en recherche") {
			window.location.assign("/principale.html");
		} else {
			// alert(document.getElementById('articles').innerHTML);
			var resultat = JSON.parse(this.responseText);
			console.log(resultat);
			var rez = "<form name=testb>"
			rez += rez += '<!--div id="article" class="col-md-8" style="padding-left:10px;"-->' +
								'<!--div class="hidden"></div-->'+
									'<!--div class="row accordion-toggle" data-toggle="collapse" data-target="#demo" style="margin:0px;"></div-->'+
									'<hr/ style="margin:20px;">' +
									'<div class="row">'+
										'<p style="font-size:20px;" align="center"><big><input name=mycb type=checkbox value=0> Envoyez un Fax a toutes les societés </big></p>'+
								'<!--/div-->'+
							'</div>'+
						'<!--/div-->';
			if(resultat.resp.length){
				for(i in resultat.resp){
					rez += '<!--div id="article'+i+'" class="col-md-8" style="padding-left:10px;"-->' +
								'<!--div class="hidden'+i+'"></div-->'+
									'<!--div class="row accordion-toggle'+i+'" data-toggle="collapse" data-target="#demo" style="margin:0px;"></div-->'+
									'<hr/ style="margin:20px;">' +
									'<div class="row'+i+'">'+
										'<p style="font-size:20px;" align="center"><big>'+'Nom de la société : '+resultat.resp[i].data.name+'<br/><input name=mycb type=checkbox value='+(i+1)+'>  <span class = "glyphicon glyphicon-envelope"></span>'+'  Adresse : '+resultat.resp[i].data.adresse+'</big></p>'+
								'<!--/div-->'+
							'</div>'+
						'<!--/div-->';
					tab_fax.push(resultat.resp[i].data.fax);	
				}
				rez += "</form>"
			}else{
			rez += '<!--div id="article" class="col-md-8" style="padding-left:10px;"-->' +
								'<!--div class="hidden"></div-->'+
									'<!--div class="row accordion-toggle" data-toggle="collapse" data-target="#demo" style="margin:0px;"></div-->'+
									'<hr/ style="margin:20px;">' +
									'<div class="row">'+
										'<p style="font-size:20px;" align="center"><big><br/><span class = "glyphicon glyphicon-exclamation-sign"></span>'+'  Aucun resulat dans la base de donnée !'+'</p>'+
								'<!--/div-->'+
							'</div>'+
						'<!--/div-->';
			}
		document.getElementById('articles').innerHTML = rez;
		principal.fax = tab_fax;		
		}
    }
};

principal.post2 = function (){
	var a = document.cookie;
	var fax = new Array();
	if(document.testb.mycb[0].checked){
		console.log("fax");
		var data = {"log_temp": a, "act": "send_fax", "tab_fax" : principal.fax};
		client.post(data, principal.post2_back);
		
	}else{
		for(i=0; i<principal.fax.length; i++){
			if(document.testb.mycb[i+1].checked){
				fax.push(principal.fax[i]);
				var data = {"log_temp": a, "act": "send_fax", "tab_fax" : fax};
			}
		}
		console.log(fax);
		client.post(data, principal.post2_back, principal.post2_back2);
	}
	
};
//************************************************************************************************************************/
principal.post2_back = function () {
console.log("callback");
if (this.readyState == 4 && this.status == 200) {
        var r = JSON.parse(this.responseText); // .responseText est une variable qui contient la réponse du serveur
		if (r.resp == "en recherche") {
			window.location.assign("/principale.html");
		} else {
			 if(r.resp.reponse == "ko"){
			var resultat = JSON.parse(this.responseText);
			var rez = "<form name=testb>"
					rez += '<!--div id="article" class="col-md-8" style="padding-left:10px;"-->' +
								'<!--div class="hidden"></div-->'+
									'<!--div class="row accordion-toggle" data-toggle="collapse" data-target="#demo" style="margin:0px;"></div-->'+
									'<hr/ style="margin:20px;">' +
									'<div class="row">'+
										'<p style="font-size:20px;" align="center"><big> Le(s) Fax sont en cours d envoie ... </big></p>'+
								'<!--/div-->'+
							'</div>'+
						'<!--/div-->';
				rez += "</form>"
			document.getElementById('articles').innerHTML = rez;
			 }
			 var tempo = setTimeout(function (){
			 var rez = "<form name=testb>"
					rez += '<!--div id="article" class="col-md-8" style="padding-left:10px;"-->' +
								'<!--div class="hidden"></div-->'+
									'<!--div class="row accordion-toggle" data-toggle="collapse" data-target="#demo" style="margin:0px;"></div-->'+
									'<hr/ style="margin:20px;">' +
									'<div class="row">'+
										'<p style="font-size:20px;" align="center"><big> Le(s) Fax ont été envoyé avec succès ! </big></p>'+
								'<!--/div-->'+
							'</div>'+
						'<!--/div-->';
				rez += "</form>"
			document.getElementById('articles').innerHTML = rez;
			},r.resp.tps);
		}
}
}
/*
	les fonctions de vérifification de formulaire retourne :
	0 : une erreur dans le formulaire : vide, faute d'orthographe ou autre ----> la notation ne se fera pas
	2 : critère destructif ou non : par exemple - de 3 ans ou - de 5 salariés
	3 : tout est OK
*/
//************************************************************************************************************************/
window.onload = function () {
	principal.start();
	$('input[type=text][name=secondname]').tooltip({
	placement: "bottom",
	trigger: "focus"
	});
};
//------------------------------------------------------CLIENT---------------------------------------------------------
//***********************************************************************************************************************
var client = {};

/* Envoi requête client type POST au serveur */

client.post = function (data, callback) {
	alert("Creation objet XMLHttpRequest")
	/*
	* L'objet XMLHttpRequest permet de générer des requêtes server et de récupérer des données avec les fonctions ou
	* propriétés suivantes
	*/
    var xhr = new XMLHttpRequest(); 
    xhr.open("POST", "/"); // Initialise une requête -> open(method, url[, asynchrone[, user[, password]]])
    xhr.onreadystatechange = callback; // Appel fonction callback lorsque la propriété readyState varie
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Spécifie l'en-tête à envoyer avec requête
    xhr.send(JSON.stringify(data)); // Envoi requête HTTP au server accompagné des données (data) en format JSON
	console.log("envoie de la requette au server !!!!!!!!!!!!!!!!!!!!!!!");
};

HTMLElement.prototype.has_class = function (c) {
	/* 
	* .indexOf() -> Retourne la position de l'argument (à partir de quel caractère il se trouve dans la chaîne) 
	* Retourne -1 si l'argument n'est pas dans la chaîne testée
	*/
    return (this.className.indexOf(c) >= 0);
};

/* Scripts pour animations Jquerry */
//-------------------------------------------------------------------------------------------------------------------------
//*************************************************************************************************************************