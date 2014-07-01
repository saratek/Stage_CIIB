var util = require('util');
var https = require('https');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var evenement = new EventEmitter();
var i = 0;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var get_info = function(d){
console.log(d);
	var url="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.societe.com%2Fsociete%2Ftiti-"+d+".html%22&format=json&diagnostics=true&callback=";
	// var url="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.societe.com%2Fsociete%2Ftiti-"+552100554+".html%22&diagnostics=true";
		https.get(url, function (r) {
		if(r.statusCode==200){
			var b = "";
			r.on("data", function (d) { // evenement qui se declanche lors de l'arrivée de donnée 
				b += d; // recuperation des données par 
			});
			r.on("end", function() { // fin de la recuperation 
			b = JSON.parse(b); // formatage du buffer en json 
			evenement.emit("html", b, d); // declanche ment d'un evenement qui va servir au stockage des données utiles			
			});
		}
		})
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
evenement.on("html", function(b, d){
var obj = {};
obj.siren = d;
	if(b.query.results){ 
		if(b.query.results.body.div.div.div[1].div[6].table.tr){
			if(b.query.results.body.div.div.div[1].div[6].table.tr[3]){
				obj.siret = b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[0].td[1].table.tr[0].td[1].p;
			}
		}
		if(b.query.results.body.div.div.div[1].div[6].table.tr[3]){
			if(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[1].td){
				if(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[1].td[0]){
					if(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[1].td[0].table.tr){
						if(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[1].td[0].table.tr.td){
							if(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[1].td[0].table.tr.td){
								// console.log(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[1].td[0].table.tr.td[1].p.content);
								obj.dirigeant = b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[1].td[0].table.tr.td[1].p.content;
							}
						}
					}
				}
			}
		}
		if(b.query.results.body.div.div.div[1].div[6].table.tr){
			if(b.query.results.body.div.div.div[1].div[6].table.tr[3]){
				if(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[1].td){
					if(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[1].td[0]){
						if(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[1].td[0].table){
							if(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[1].td[0].table[0]){
								if(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[1].td[0].table[0].tr.td){
									if(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[1].td[0].table[0].tr.td[1].a){
									// console.log(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[1].td[0].table[0].tr.td[1].a.content);
									obj.dirigeant = b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[1].td[0].table[0].tr.td[1].a.content;
									}
								}
							}
						}
					}
				}
			}
		}
		if(b.query.results.body.div.div.div[1].div[6].table.tr){
			if(b.query.results.body.div.div.div[1].div[6].table.tr[3]){
				if(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[0].td[0].table){
					if(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[0].td[0].table[0]){
						if(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[0].td[0].table[0].tr[3].td[1].p){
							obj.type = obj.adresse = b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[0].td[0].table[0].tr[3].td[1].p;
						}
					}
				}
			}
		}
		
		if(b.query.results.body.div.div.div[1].div[6].table.tr){
			if(b.query.results.body.div.div.div[1].div[6].table.tr[3]){
				if(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[0].td[0].table){
				if(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[0].td[0].table[0].tr[3].td[1].a){
					obj.adresse = obj.adresse = b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[0].td[0].table[0].tr[3].td[1].a.content;
				}
				}
			}
		}
		if(b.query.results.body.div.div.div[1].div[6].table.tr){
			if(b.query.results.body.div.div.div[1].div[6].table.tr[3]){
				if(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[0].td[0].table[0].tr[2].td[1].a){
				obj.adresse = b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[0].td[0].table[0].tr[2].td[1].a.content;
				}
			}
		}
		if(b.query.results.body.div.div.div[1].div[6].table.tr){
			if(b.query.results.body.div.div.div[1].div[6].table.tr[3]){
				if(b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[0].td[0].table[0].tr[2].td[1].p){
					obj.type = b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[1].tr[1].td.table.tr[0].td[0].table[0].tr[2].td[1].p;
				}
			}
		}
		if(b.query.results.body.div.div.div[1].div[6].table.tr){
			if(b.query.results.body.div.div.div[1].div[6].table.tr[3]){
				obj.name = b.query.results.body.div.div.div[1].div[6].table.tr[3].td.table.tr.td.table.tr[0].td[0].table[0].tr[2].td.div[0].div[0].h1;
			}
		}
		
		console.log("----------------------------------------------------------------------------------");	
	evenement.emit("bilan",obj);
	}else{
		evenement.emit("debut");
	}	
});	
evenement.on("bilan", function(obj){
 console.log("--------------------------------------BILAN---------------------------------");
var url= "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.societe.com%2Fbilan%2Ftoto%2F"+obj.siren+"201212311.html%22&format=json&diagnostics=true&callback=";
	https.get(url, function (r) {
		if(r.statusCode==200){
			var b = "";
			r.on("data", function (d) { // evenement qui se declanche lors de l'arrivée de donnée 
				b += d; // recuperation des données par 
			});
			r.on("end", function() { // fin de la recuperation 
			b = JSON.parse(b); // formatage du buffer en json */
			evenement.emit("html2", b, obj); // declanche ment d'un evenement qui va servir au stockage des données utiles
			});
		}else{
		evenement.emit("debut");
		}
	}) 
})
//----------------------------------------------------------------------------------------------------------------------------
evenement.on("html2", function(b, obj){
	if(b.query.results)
		{  
			if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table){
				if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td){
					if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table){
				// console.log(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[2].td[4].p);
				obj.chiffreAffaireNmoins1 = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[2].td[1].p;
				obj.chiffreAffaireNmoins2 = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[2].td[2].p;
				obj.evolution_chiffre_affaire = obj.chiffreAffaireNmoins1 = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[2].td[4].p;
					}
				}
			}
			if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table){
				if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td){
					if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table){
						if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[27]){
						// console.log(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[27].td[4].p);
						obj.resultatNetNmoins1 = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[27].td[1].p;
						obj.resultatNetNmoins2 = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[27].td[2].p;
						obj.evolutionResultat = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[27].td[4].p;
						}
					}
				}
			}
			if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table){
				if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td){
					if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table){
						if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[31]){
						// console.log(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[31]);
						obj.effectifNmoins1 = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[31].td[1].p;
						obj.effectifNetNmoins2 = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[31].td[2].p;
						obj.evolutionEffectif = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[31].td[4].p;
						}
					}
				}
			}
			if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table){
				if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td){
					if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table){
						if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[15]){
						// console.log(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[15]);
						obj.EBENmoins1 = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[15].td[1].p;
						obj.EBENmoins2 = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[15].td[2].p;
						obj.evolutionEBE = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[15].td[4].p;
						}
					}
				}
			}
			if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table){
				if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td){
					if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table){
						if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[23]){
						// console.log(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[23]);
						obj.RCAINmoins1 = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[23].td[1].p;
						obj.RCAINmoins2 = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[23].td[2].p;
						obj.EvolutionRCAIN = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[23].td[4].p;
						}
					}
				}
			}
			if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table){
				if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td){
					if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table){
						if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[19]){
						// console.log(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[19]);
						obj.ResulatExpoitationNmoins1 = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[19].td[1].p;
						obj.ResulatExpoitationNmoins2 = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[19].td[2].p;
						obj.EvolutionResulatExpoitation = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[19].td[4].p;
						}
					}
				}
			}
			if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table){
				if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td){
					if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table){
						if(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[11]){
						// console.log(b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[11]);
						obj.ValeureAjouteNmoins1 = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[11].td[1].p;
						obj.ValeureAjouteNmoins2 = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[11].td[2].p;
						obj.EvolutionResulatValeureAjoute = b.query.results.body.div.div.div[1].div[6].table.tr[2].td.table.tr.td.table.tr.td[0].table[1].tr[8].td.table.tr.td.table.tr[11].td[4].p;
						}
					}
				}
			}
			// console.log(obj); 
			evenement.emit("FAX", obj);
			// evenement.emit("debut");		
		}else{
		evenement.emit("debut");
		} 
		
})
//-----------------------------------------------------------------------------------------------------------------------------
evenement.on("FAX", function(obj){
// console.log("--------------------------------------FAX---------------------------------");
var url= "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.annuaire.com%2Ftoto%2Fltiti-"+obj.siret+"%2F%22&format=json&diagnostics=true&callback=";
	https.get(url, function (r) {
		if(r.statusCode==200){
			var b = "";
			r.on("data", function (d) {  
				b += d; 
			});
			r.on("end", function() {  
			b = JSON.parse(b);		
			evenement.emit("html3", b, obj);
			});
		}else{
			evenement.emit("debut");
		}
}) 
}) 

evenement.on("html3", function(b, obj){
	if(b.query.results)
		{ console.log("-----------------------------------FAX---------------------------------"); 
			if(b.query.results.body.div[1].div){
				if(b.query.results.body.div[1].div[1].div[1].div[0].div[0].div[1].div.div[0].p[2]){
					if(b.query.results.body.div[1].div[1].div[1].div[0].div[0].div[1].div.div[0]){
						if(b.query.results.body.div[1].div[1].div[1].div[0].div[0].div[1].div.div[0].p[2].span){
							if(b.query.results.body.div[1].div[1].div[1].div[0].div[0].div[1].div.div[0].p[2].span[0]){
								// console.log(b.query.results.body.div[1].div[1].div[1].div[0].div[0].div[1].div.div[0].p[2].span.span[0].id);
								obj.tel = b.query.results.body.div[1].div[1].div[1].div[0].div[0].div[1].div.div[0].p[2].span[0].id;
							}
						}
					}
				}
			}
			
			 if(b.query.results.body.div[1].div){
			 if(b.query.results.body.div[1].div[1].div[1].div[0].div[0].div[1].div){
					 if(b.query.results.body.div[1].div[1].div[1].div[0].div[0].div[1].div.div[0].p[3]){
						 if(b.query.results.body.div[1].div[1].div[1].div[0].div[0].div[1].div.div[0].p[3].span){
							console.log(b.query.results.body.div[1].div[1].div[1].div[0].div[0].div[1].div.div[0].p[3].span.content);
							obj.fax = b.query.results.body.div[1].div[1].div[1].div[0].div[0].div[1].div.div[0].p[3].span.content;
							//--------------------------------------------------------------------
							fax.push(obj.fax);
							fs.writeFile("fax.txt", JSON.stringify(fax), 'utf8', 'a+', function(err){ //TODO
							if(err) throw err;
							console.log('on a enregister le buffer dans un fichier');
							}); 
							 //-----------------------------------------------------------------------
						 }
					 }
				 }
			 } 
			console.log(obj);
			evenement.emit("debut");		
		}else{
		evenement.emit("debut");
		}
});

get_info(500001102);