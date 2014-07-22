var principal ={};

principal.start = function () {
	document.addEventListener("click", principal.on_click); // pour êvenement quand on clique sur la souris
	document.addEventListener("keydown", principal.on_keydown); 
	// principal.on_date();

};
principal.on_click = function (ev) {
	var src = ev.target;
	if (src.has_class("post1")) {
		principal.send_post0();
	}else if (src.has_class("post3")) {
		principal.send_post3();
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
principal.send_post0 = function() {
	// Récupération des données dans les balises de la classe associée
    var a = document.cookie;
	//alert("Valeurs : " + a);
    var data = {log_temp: a, act: "deconnect"};
	client.post(data, principal.post0_back);
};
//************************************************************************************************************************/
principal.post0_back = function () {
	if (this.readyState == 4 && this.status == 200) {
		window.location.assign("/acceuil.html");
	}
};
//**************************************************************************************************************************
principal.send_post3 = function() {
    var a = document.cookie;
	alert("----la base de donnée est en cours de mise a jour----");
    var data = {log_temp: a, act: "update"};
	client.post(data, principal.post3_back);
};
//************************************************************************************************************************/
principal.post3_back = function () {
	alert("----la base de donnée est en cours de mise a jour----");
};
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