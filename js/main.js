window.onload = inicio();
var etiquetas = [];

function inicio()
{

	if (localStorage.length<1)
		{
		document.getElementById("tags").innerHTML = "No se han <br>encontrado datos.<br>Pulsa sobre <br>Simplenote.";
		}
	else
		{
		inicia_app();
		}
}

function inicia_app()
{
	var tags_html = "";
	etiquetas = [];
	for (var i = 1; i < localStorage.length+1; i++) 
	{
		var como_json= JSON.parse(localStorage.getItem(i));
		//console.log("Item "+i+":"+localStorage.getItem(i));
		var total_etiquetas = como_json.tags.length;
		for (var a=0;a<total_etiquetas;a++)
		{
			var etiqueta_actual = como_json.tags[a];
			if (etiquetas.indexOf(etiqueta_actual)<0)
			{
			etiquetas.push(etiqueta_actual);
			tags_html = tags_html+ "<li onclick=\"muestra_items('"+etiqueta_actual+"');\">"+etiqueta_actual+"</li> ";
			}
		}
	}
	tags_html = tags_html+ "<li onclick=\"muestra_items('Sin etiqueta');\">Sin etiqueta</li> ";
    document.getElementById("tags").innerHTML = tags_html;
}

function muestra_items(etiqueta)
{
	var texto_salida_html="";
	for (var i = 1; i < localStorage.length-1; i++) 
	{	 
		var como_json= JSON.parse(localStorage.getItem(i));
		if ((como_json.tags.indexOf(etiqueta)>-1) || ((etiqueta==="Sin etiqueta") && (como_json.tags.length ===0)))
		{
		var lineas = como_json.content.split("\n");   
		var firstline = lineas.shift();   
		var rest = lineas.join("\n");
		texto_salida_html = texto_salida_html+ "<li onclick=\"muestra_texto('"+firstline+"');\">"+firstline+"</li>";
		}
	}
	document.getElementById("items").innerHTML = texto_salida_html+"</ul>";
	tau.changePage('#p_items');
}

function muestra_texto(item)
{
	var texto_salida_html="";
	for (var i = 1; i < localStorage.length-1; i++) 
	{	 
		var como_json= JSON.parse(localStorage.getItem(i));
		var lineas = como_json.content.split("\n");   
		var firstline = lineas.shift();   
		var rest = lineas.join("\n");
		if (firstline===item)
		   {
		   texto_salida_html ="<div style=\"font-size:25px;margin: 0px 10px 0px 10px;\">"+rest.split("\n").join("<br />")+"</div>";
		   document.getElementById("h_texto").innerHTML = firstline;

		   }
	}
	document.getElementById("texto").innerHTML = texto_salida_html;

    tau.changePage('#p_texto');
}

