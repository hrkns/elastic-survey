"use strict";

setInterval(function(){
	$("#survey_field_types tr").each(function(){
		//*$(this).find("td[data-name='code']").html($(this).find("td[data-name='code']").html().replace("&nbsp;", ""));
		//*$(this).find("td[data-name='name']").html($(this).find("td[data-name='name']").html().replace("&nbsp;", ""));
		//*$(this).find("td[data-name='description']").html($(this).find("td[data-name='description']").html().replace("&nbsp;", ""));

		//$(this).find("td[data-name='code']").html($(this).find("td[data-name='code']").html().replace("&amp;nbsp;", ""));
		//$(this).find("td[data-name='name']").html($(this).find("td[data-name='name']").html().replace("&amp;nbsp;", ""));
		//$(this).find("td[data-name='description']").html($(this).find("td[data-name='description']").html().replace("&amp;nbsp;", ""));

		if(	(($(this).find("td[data-name='code']").attr("data-val").trim() != $(this).find("td[data-name='code']").html().trim()) || 
			($(this).find("td[data-name='name']").attr("data-val").trim() != $(this).find("td[data-name='name']").html().trim()) || 
			$(this).find("td[data-name='description']").attr("data-val").trim() != $(this).find("td[data-name='description']").html().trim()) &&
			$(this).find("td[data-name='code']").html().trim().length > 0 &&
			$(this).find("td[data-name='name']").html().trim().length > 0) {

			$(this).find("button[data-type='save']").show();
		}else{
			$(this).find("button[data-type='save']").hide();
		}
	});
}, 500);

function save_item(t){
	var id=$(t).attr("data-id");
	var button = t;
	var fila = $(t).parent().parent();
	var code = $(fila).find("td[data-name='code']").html().trim();
	var name = $(fila).find("td[data-name='name']").html().trim();
	var description = $(fila).find("td[data-name='description']").html().trim();

	if(id != "new"){
		HTTP.update({
			url: "master-survey-type-field/"+id,
			data:{
				name : name,
				code :  code,
				description : description
			},before : function(){
				$(button).attr("disabled", true);
			},success : function(d, e, f){
				$(button).hide();
				$(fila).find("td[data-name='code']").attr("data-val", code);
				$(fila).find("td[data-name='name']").attr("data-val", name);
				$(fila).find("td[data-name='description']").attr("data-val", description);
			},error : function(x, y, z){
			},after : function(v){
				$(button).attr("disabled", false);
			}
		});
	}else{
		HTTP.create({
			url : "master-survey-type-field",
			data : {
				name : name,
				description : description,
				code : code
			},before : function(){
				$(button).attr("disabled", true);
			},success : function(d, e, f){
				$(button).hide();
				$(fila).find("td[data-name='code']").attr("data-val", code);
				$(fila).find("td[data-name='name']").attr("data-val", name);
				$(fila).find("td[data-name='description']").attr("data-val", description);
				$(button).attr("data-id", d.data.item.id);
			},error : function(x, y, z){
			},after : function(v){
				$(button).attr("disabled", false);
			}
		});
	}
}

$("button[data-type='save']").click(function(){
	save_item(this);
});

$("#add_new_survey_type_field").click(function(){
	var tr = document.createElement("tr");

	var td1 = document.createElement("td");
	td1.contentEditable = true;
	td1.setAttribute("data-val", "");
	td1.setAttribute("data-name", "code");

	var td2 = document.createElement("td");
	td2.contentEditable = true;
	td2.setAttribute("data-val", "");
	td2.setAttribute("data-name", "name");

	var td3 = document.createElement("td");
	td3.contentEditable = true;
	td3.setAttribute("data-val", "");
	td3.setAttribute("data-name", "description");

	var td4 = document.createElement("td");
	td4.align = "center";

	var btnsave = document.createElement("button");
	btnsave.className = "button primary";
	btnsave.setAttribute("data-id", "new");
	btnsave.setAttribute("data-type", "save");
	btnsave.style.display = "none";
	btnsave.innerHTML = "Guardar";
	btnsave.onclick = function(){
		save_item(btnsave);
	}

	td4.appendChild(btnsave);

	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);

	$("#survey_field_types").append(tr);
});