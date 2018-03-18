var descargado = 0;
var total_contado = 0;
var tamano;
var token="";

function recupera(item)
	{
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://api.simperium.com/1/chalk-bump-f49/note/i/"+item, true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.setRequestHeader("X-Simperium-Token", token);
	xhttp.onreadystatechange = function () 
		{ 
		if (xhttp.readyState === 4 && xhttp.status === 200) 
			{
			total_contado++;
			localStorage.setItem(total_contado, xhttp.responseText);
			//console.log("Descargado "+total_contado+" de "+tamano);
			
			document.getElementById("msgdescarga").innerHTML = "Descargado notas<br>"+total_contado+" de "+tamano;
			if (total_contado === tamano)
				{
			     navigator.vibrate([300, 100, 200, 100, 400]);
			     console.log("Descargado!");
			 	 tau.changePage('#p_tags');
			     inicia_app();
			     }
			}
		};
	xhttp.send();
    }    


function guarda_datos() 
{
	descargado = 0;
	total_contado = 0;
	document.getElementById("msgdescarga").innerHTML = "Descargando índices...";
	tau.changePage('#cargando');
	console.log("Descargando datos...");

	localStorage.clear();
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.simperium.com/1/chalk-bump-f49/note/index", true);	
    xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.setRequestHeader("X-Simperium-Token", token);
	xhttp.onreadystatechange = function () 
	{ 
	    if (xhttp.readyState === 4 && xhttp.status === 200) 
	    	{
	        var respuesta = JSON.parse(xhttp.responseText);
			tamano = respuesta.index.length;
			for (var i=0;i<tamano;i++)
				{
				recupera(respuesta.index[i].id);	
				}
	    	}
	};
    xhttp.send();
 }       
