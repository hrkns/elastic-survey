"use strict";

var __HOST_SURVEY_APPLICATION = "http://localhost:8081/survey-applying/";
function isoftajax() {
	//implementar before y after tambien con array de funciones
	//implementar los alertifys
    function request(settings, type, semantic) {
        __debug("***************");
        __debug("HTTP " + type.toUpperCase() + " Request:");
        __debug(settings);
        var fsuccess = settings.success;

        settings["success"] = function(data, textStatus, jqXHR) {
            //try {
                var ret = null;

                if (typeof fsuccess != "undefined") {
                    if (typeof fsuccess != "object") {
                        ret = {
                            data: data
                        };
                        fsuccess(ret);
                    } else {
                        ret = Array();

                        for (i in fsuccess) {
                            ret.push({
                                data: data
                            });
                            fsuccess[i]({
                                data: data
                            });
                        }
                    }
                }

                /*
                try{
	                switch(semantic.toUpperCase()){
	                	case "CREATE":
	                		alertify.success("Elemento creado.");
	                	break;
	                	case "READ":
	                		//alertify.success("Elemento creado.");
	                	break;
	                	case "UPDATE":
	                		alertify.success("Elemento actualizado.");
	                	break;
	                	case "DELETE":
	                		alertify.error("Elemento eliminado.");
	                	break;
	                	default:
	                		alertify.success("Operación ejecutada.");
                	}
                }catch(e){
                }
                */

                __debug(ret);
            /*} catch (e) {
                __debug(e);
            }*/

            if(typeof settings.after != "undefined")
            	settings.after({
            		data : data,
            		textStatus : textStatus,
            		jqXHR : jqXHR
            	});

            return ret;
        }

        var ferror = settings.error;

        settings["error"] = function(jqXHR, textStatus, errorThrown) {
            __debug("jqXHR:")
            __debug(jqXHR.status);
            try{
	            if(jqXHR.status == 401 && jqXHR.responseJSON.hasOwnProperty("session"))
	            {
	            	alertify.alert("Su sesión ha expirado", function(){
		            	window.location.reload();
		            	return;
	            	});
	            }else
		        	alertify.error("Ha ocurrido un error durante la transacción.");
		    }catch(e){
		    }
            __debug(jqXHR);
            __debug("textStatus:");
            __debug(textStatus);
            __debug("errorThrown");
            __debug(errorThrown);
            if (ferror)
                ferror();

            if(typeof settings.after != "undefined")
            	settings.after({
            		jqXHR : jqXHR,
            		textStatus : textStatus,
            		errorThrown : errorThrown
            	});
        }

        if (settings.hasOwnProperty("data"))
            settings["data"] = {
                data: settings.data
            };
        else
            settings["data"] = {
                data: {}
            };

        settings["dataType"] = "JSON";

        if(typeof settings.before != "undefined")
        	settings.beforeSend = settings.before;
        else
        	settings.beforeSend = function(){};

        function __receval(obj){
        	var t, val=false;
        	if(obj && typeof obj == "object"){
	        	if(obj.lastModifiedDate){
	        		return true;
	        	}
	        	else{
	        		try{
	        			$.each(obj, function(_k, _v){
	        				if(!val)
	        					val = __receval(_v);
	        			});
	        		}catch(e){
	        		}
	        	}
	        }
        	return val;
        }

        if(__receval(settings.data)){
	        settings["mimeType"] = 'multipart/form-data';
	        settings["processData"] = false;
        }

        return $.ajax(settings);
    }

    this.create = function(settings) {
        settings["type"] = "post";
        return request(settings, "post", "create");
    }

    this.read = function(settings) {
        settings["type"] = "get";
        return request(settings, "get", "read");
    }

    this.update = function(settings, f) {
    	if(f)
	        settings["type"] = "patch";
	    else
	        settings["type"] = "put";
        return request(settings, f?"patch":"put", "update");
    }

    this.delete = function(settings) {
        settings["type"] = "delete";
        return request(settings, "delete", "delete");
    }

    this.get = function(settings) {
        settings["type"] = "get";
        return request(settings, "get", "get");
    }

    this.post = function(settings) {
        settings["type"] = "post";
        return request(settings, "post", "post");
    }
}

var HTTP = new isoftajax();

function __debug(e)
{
	if(__DEBUG)
		console.log(e);
}

var __DEBUG = true;


var __div_lock_screen;
function lock_screen(s)
{
	__div_lock_screen = document.createElement("div");
	__div_lock_screen.style = "cursor:wait;position:absolute;z-index:100000000;height:"+$(window).height()+"px;top:0px;left:0px;width:100%;"+s;;
	__div_lock_screen.style.display="none";
	document.getElementsByTagName("body")[0].appendChild(__div_lock_screen);

	try
	{
		$(__div_lock_screen).fadeIn();
	}
	catch(e)
	{
		jQuery(__div_lock_screen).fadeIn();	
	}
}

function unlock_screen()
{	
	try
	{
		$(__div_lock_screen).fadeOut();
	}
	catch(e)
	{
		jQuery(__div_lock_screen).fadeOut();	
	}

	setTimeout(function()
	{
		try
		{
			__div_lock_screen.parentNode.removeChild(__div_lock_screen);
		}
		catch(e)
		{

		}
	}, 200);
}

/*
var locations = [];
var poslocation=-1;
var seccionActual;

function click_lateral_menu(t)
{
	if(locations.length>0 && locations[locations.length-1].id == t.getAttribute("data-id"))
		return;

	poslocation++;
	locations.push({id:t.getAttribute("data-id"), route:t.getAttribute("data-route")});
	var stateObj = {};
	lock_screen();

	HTTP.read({
		url:WEB_ROOT+"/section/"+t.getAttribute("data-id"),
		success:function(data)
		{
			seccionActual = t.getAttribute("data-id");
			for(c in intervals_for_clear)
				clearInterval(intervals_for_clear[c]);
			intervals_for_clear = [];
			history.pushState(stateObj, "", t.getAttribute("data-route"));
			var tkns = Array();
			$("#content").find("*[data-role='tkn']").each(function(){
				tkns.push($(this).attr("data-val"));
			});
			/*
			HTTP.post({
				url:WEB_ROOT+"/tkns",
				data:{
					tkns:tkns
				},success:function(d){
				},error:function(x,y,z){
				}
			});
			///
			$("#content").fadeOut(400);
			setTimeout(function(){
				$("#content").html(data.data.view).fadeIn(400);
				locations[poslocation]["location"] = document.location;
				unlock_screen();
				try{
					document.getElementById("see_all_items").onclick = function(e){
						SEE_ITEM_NO_MATTER_WHAT_STATUS = this.checked;
					}
				}catch(e){
				}
				SEE_ITEM_NO_MATTER_WHAT_STATUS=false;
			}, 400);
		},
		error:function()
		{
			unlock_screen();
		}
	});
}

window.onpopstate = function()
{
	if(poslocation>0 && locations[poslocation-1].location == document.location)
	{
		poslocation--;
		var stateObj = {};
		lock_screen();

		HTTP.read({
			url:"/isoftdesing/facturacion/section/"+locations[poslocation].id,
			success:function(data)
			{
				$("#content").html(data.data.view);
				unlock_screen();
			},
			error:function()
			{
				unlock_screen();
			}
		});
	}
	else if(poslocation<locations.length-1 && locations[poslocation+1].location == document.location)
	{
		poslocation++;
		var stateObj = {};
		lock_screen();

		HTTP.read({
			url:"/isoftdesing/facturacion/section/"+locations[poslocation].id,
			success:function(data)
			{
				$("#content").html(data.data.view);
				unlock_screen();
			},
			error:function()
			{
				unlock_screen();
			}
		});
	}
}*/

function complete(str, lnt){
	str = String(str);
	while(str.length < lnt){
		str = "0"+str;
	}
	return str;
}

var Notifications;
window.addEventListener("load",function(){
	$(document).keyup(function(e){
		if(e.keyCode == 27){
			$("div[data-role='dialog']").data("dialog").close();
		}
	});
	try{
		Notifications = io.connect('http://localhost:8081', { 'forceNew': true });
	}catch(e){
	}
});

var __tinymce_filesrc;
function tinymce_filebrowser(field_name, url, type, win){
	__tinymce_filesrc = field_name;
	$("#aux_file_browser").trigger("click");
}
$("#aux_file_browser").change(function(){
	var reader = new FileReader();
	reader.onload = function(e)
	{
		$("#"+__tinymce_filesrc).val(e.target.result);
	};
	reader.readAsDataURL(this.files[0]);
});
var months = Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
function formatTime(config){
	switch(config.type){
		case "resting":{
			var start = config.start;
			var total = Number(config.time_amount)
			var now = config.now;
			switch(config.time_amount_type){
				case "seconds":
					total *= 1;
				break;
				case "minutes":
					total *= 60;
				break;
				case "hours":
					total *= 3600;
				break;
				case "days":
					total *= 3600*24;
				break;
				case "weeks":
					total *= 3600*24*7;
				break;
			}
			var restante = total - Math.floor((now -start)/1000);
			var ret = {};
			if(restante >= 3600*24*7){
				ret["weeks"] = Math.floor(restante / (3600*24*7));
				restante = (restante % (3600*24*7));
			}
			if(restante >= 3600*24){
				ret["days"] = Math.floor(restante / (3600*24));
				restante = (restante % (3600*24));
			}
			if(restante >= 3600){
				ret["hours"] = Math.floor(restante / (3600));
				restante = (restante % (3600));
			}
			if(restante >= 60){
				ret["minutes"] = Math.floor(restante / (60));
				restante = (restante % (60));
			}
			if(restante >= 0)
				ret["seconds"] = restante;
			else
				ret = null;
			return ret;
		}break;
		case "resting_with_date":{
			var end = config.end;
			var restante = end - config.now;
			restante /= 1000;
			restante = Math.floor(restante);
			var ret = {
				resting_time : restante,
				end_date : end
			}
			if(restante >= 3600*24*7){
				ret["weeks"] = Math.floor(restante / (3600*24*7));
				restante = (restante % (3600*24*7));
			}
			if(restante >= 3600*24){
				ret["days"] = Math.floor(restante / (3600*24));
				restante = (restante % (3600*24));
			}
			if(restante >= 3600){
				ret["hours"] = Math.floor(restante / (3600));
				restante = (restante % (3600));
			}
			if(restante >= 60){
				ret["minutes"] = Math.floor(restante / (60));
				restante = (restante % (60));
			}
			if(restante >= 0)
				ret["seconds"] = restante;
			else
				ret = null;
			return ret;
		}break;
		case "text_resting_time":{
			var str = "";
			if(config.weeks)
				str += config.weeks + " semanas,";
			if(config.days)
				str += config.days + " dias,";
			if(config.hours)
				str += config.hours + " horas,";
			if(config.minutes)
				str += config.minutes + " minutos,";
			if(config.seconds)
				str += config.seconds + " segundos";
			return str;
		}break;
		case "text_resting_time_only_milisecs":{
			var restante = Math.floor(Number(config.milisecs) / 1000);
			var string = "";

			if(restante >= 3600*24*7){
				string += Math.floor(restante / (3600*24*7)) + " semanas, ";
				restante = (restante % (3600*24*7));
			}
			if(restante >= 3600*24){
				string += Math.floor(restante / (3600*24)) + " dias, ";
				restante = (restante % (3600*24));
			}
			if(restante >= 3600){
				string += Math.floor(restante / (3600)) + " horas, ";
				restante = (restante % (3600));
			}
			if(restante >= 60){
				string += Math.floor(restante / (60)) + " minutos, ";
				restante = Math.floor(restante % (60)); 
			}
			return string + restante + " segundos"; 
		}
	}
}

function conversion(amount, type){
	amount = Number(amount);
	switch(type){
		case "seconds": return amount * 1000;
		case "minutes": return amount * 1000 * 60;
		case "hours": 	return amount * 1000 * 60 * 60;
		case "days": 	return amount * 1000 * 60 * 60 * 24;
		case "weeks": 	return amount * 1000 * 60 * 60 * 24 * 7;
	}
}