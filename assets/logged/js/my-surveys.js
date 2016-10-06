"use strict";
/***********************************/
var __id_edit_survey;
var __id_delete_survey;
var __id_description_field_editing;
var __id_survey_to_active;
var __id_survey_to_stop;
var __aux_idractualgroup;
var __idgroup_fixing_schema;
/***********************************/
$("#clicktab1").click(function(){
	$("#tab2, #tab3").hide(500);
	$("#tab1").show(500);
});
$("#clicktab2").click(function(){
	$("#tab1, #tab3").hide(500);
	$("#tab2").show(500);
});
$("#clicktab3").click(function(){
	$("#tab1, #tab2").hide(500);
	$("#tab3").show(500);
});
/***********************************/
function add_data_group(iddiv, data){
	var idr = String(Math.random()).substr(2);
	var table = document.createElement("table");
	table.className = "table striped hovered border bordered";

	var thead = document.createElement("thead");

	var ch1 = document.createElement("td");



	var divcontrols = document.createElement("div");
	divcontrols.className = "toolbar";
	var divcontrolssection = document.createElement("div");
	divcontrolssection.className = "toolbar-section";

	var btndelete = document.createElement("button");
	btndelete.className = "toolbar-button";
	btndelete.innerHTML = "<span class = 'mif-cross'></span>";
	btndelete.onclick = function(e){
		e.preventDefault();
		$(group).remove();
	}

	var btnup = document.createElement("button");
	btnup.className = "toolbar-button";
	btnup.innerHTML = "<span class = 'mif-arrow-up'></span>";
	btnup.onclick = function(e){
		e.preventDefault();
		$(group.previousSibling).before($(group));
	}

	var btndown = document.createElement("button");
	btndown.className = "toolbar-button";
	btndown.innerHTML = "<span class = 'mif-arrow-down'></span>";
	btndown.onclick = function(e){
		e.preventDefault();
		$(group.nextSibling).after($(group));
	}

	divcontrolssection.appendChild(btndelete);
	divcontrolssection.appendChild(btnup);
	divcontrolssection.appendChild(btndown);
	divcontrols.appendChild(divcontrolssection);
	ch1.appendChild(divcontrols);





	var ch2 = document.createElement("td");
	var ch2p = document.createElement("p");
	ch2p.innerHTML = "<strong>Nombre</strong>";
	ch2.appendChild(ch2p);

	var ch3 = document.createElement("td");
	var ch3p = document.createElement("p");
	ch3p.innerHTML = "<strong>Descripcion</strong>";
	ch3.appendChild(ch3p);

	var ch4 = document.createElement("td");
	ch4.className = "time_limit_cell_"+idr;
	var ch4p = document.createElement("p");
	ch4p.innerHTML = "<strong>Time-limit</strong>";
	ch4.appendChild(ch4p);

	var ch5 = document.createElement("td");
	var ch5p = document.createElement("p");
	ch5p.innerHTML = "<strong>Tipo</strong>";
	ch5.appendChild(ch5p);

	var ch6 = document.createElement("td");
	var ch6p = document.createElement("p");
	ch6p.innerHTML = "<strong>Configuraciones</strong>";
	var ashowpatroncorrecion = document.createElement("a");
	ashowpatroncorrecion.href = "javascript:;";
	ashowpatroncorrecion.innerHTML = "Editar patron de correcion";
	ashowpatroncorrecion.onclick = function(){
		__idgroup_fixing_schema = idr;
		$("#dialog_fixing_schema").data("dialog").open();
	}
	ch6.appendChild(ch6p);
	ch6.appendChild(ashowpatroncorrecion);

	thead.appendChild(ch1);
	thead.appendChild(ch2);
	thead.appendChild(ch3);
	thead.appendChild(ch4);
	thead.appendChild(ch5);
	thead.appendChild(ch6);

	var tbody = document.createElement("tbody");
	tbody.id = "new_survey_data_group_fields_"+idr;


	table.appendChild(thead);
	table.appendChild(tbody);

	var divinputname = document.createElement("div");	
	divinputname.className = "input-control text";
	var inputname = document.createElement("input");
	inputname.type = "text";
	inputname.placeholder = "Nombre del grupo";
	inputname.name = "name_group";
	if(data)
		inputname.value = data.name;
	divinputname.appendChild(inputname);

	var divdescr = document.createElement("div");	
	divdescr.className = "input-control textarea";
	var description = document.createElement("textarea");
	description.placeholder = "Descripcion del grupo";
	description.name = "description_group";
	description.id = "description_group_"+idr;
	if(data)
		description.innerHTML = data.description;
	divdescr.appendChild(description);

	var btnaddfield = document.createElement("button");
	btnaddfield.className = "button large-button primary";
	btnaddfield.style.width = "100%";
	btnaddfield.innerHTML = "Add Field";
	btnaddfield.onclick = function(e){
		e.preventDefault();
		__aux_idractualgroup = idr;
		add_field_on_survey_context(tbody.id);
	}

	var divconfigs = document.createElement("div");
	divconfigs.style.padding = "2.5%";
	divconfigs.className = "grid";






	var row1 = document.createElement("div");
	row1.className = "row";
	var row2 = document.createElement("div");
	row2.className = "row";





	var cell_time_limit = document.createElement("div");
	cell_time_limit.className = "cell colspan5";
	var checkboxtimelimit = document.createElement("input");
	checkboxtimelimit.type = "checkbox";
	checkboxtimelimit.id = "checkboxtimelimit_"+idr;
	checkboxtimelimit.checked = data && data["time_limit"] && data["time_limit"]["val"]?true:false;
	checkboxtimelimit.onchange = function(){
		//$(".time_limit_cell_"+idr).css("display", this.checked?"none":"");
		if(this.checked){
			$(divtimelimit).show(200);
			//$(radiopause_no).trigger("click");
		}
		else{
			$(divtimelimit).hide(200);
			//$(radiopause_yes).trigger("click");
		}
	}
	var spantxttimelimit = document.createElement("span");
	spantxttimelimit.innerHTML = "&nbsp;Establecer tiempo limite para desarrollar grupo de preguntas.";
	var divtimelimit = document.createElement("div");
	divtimelimit.style.display = checkboxtimelimit.checked?"":"none";
	//divtimelimit.style.display = data && data["time_limit"]?"":"none";
	var divinputext = document.createElement("div");
	divinputext.className = "input-control text";
	var valtimelimit = document.createElement("input");
	valtimelimit.type = "text";
	valtimelimit.value = data && data["time_limit"] && data["time_limit"]["val"]? data["time_limit"]["val"] : "";
	valtimelimit.setAttribute("data-name", "time-limit-group-val");
	//valtimelimit.name = "time-limit-val";
	//if(data && data["time_limit"] && data["time_limit"].val)
	//	valtimelimit.value = data["time_limit"].val;
	divinputext.appendChild(valtimelimit);
	var divselect = document.createElement("div");
	divselect.className = "input-control select";
	var typetimelimit = document.createElement("select");
	typetimelimit.innerHTML = $("#new_survey_time_type_6").html();
	typetimelimit.setAttribute("data-name", "time-limit-group-type");
	typetimelimit.value = data && data["time_limit"] && data["time_limit"]["val"]? data["time_limit"]["type"] : "";
	//typetimelimit.name = "time-limit-type";
	//if(data && data["time_limit"] && data["time_limit"].type)
	//	typetimelimit.value = data["time_limit"].type;
	divselect.appendChild(typetimelimit);
	divtimelimit.appendChild(divinputext);
	divtimelimit.appendChild(divselect);
	cell_time_limit.appendChild(checkboxtimelimit);
	cell_time_limit.appendChild(spantxttimelimit);
	cell_time_limit.appendChild(divtimelimit);







	var cell_pausing_options = document.createElement("div");
	cell_pausing_options.className = "cell colspan5 pausing_class";
	cell_pausing_options.style.display = $("input[name='new_survey_groups_development']:checked").val()=="choosen_by_user"?"":"none";
	var ppausingtext = document.createElement("p");
	ppausingtext.innerHTML = "Opciones de \"pausado\"";
	ppausingtext.style.marginTop = "0px";
	var radiopause_yes = document.createElement("input");
	radiopause_yes.type = "radio";
	radiopause_yes.name = "pause_data_group_"+idr;
	radiopause_yes.value = "yes";
	radiopause_yes.onclick = function(){
		//$(checkboxtimelimit).prop("checked", false);
		//$(divtimelimit).hide(200);
	}
	var txtradiopause_yes = document.createElement("span");
	txtradiopause_yes.innerHTML = "&nbsp;Permitir navegacion en otros grupos luego de haber ingresado en este<br>";
	if(data){
		radiopause_yes.checked = data.pausing == "yes";
	}else
		radiopause_yes.checked = true;
	var radiopause_no = document.createElement("input");
	radiopause_no.type = "radio";
	radiopause_no.name = "pause_data_group_"+idr;
	radiopause_no.value = "no";
	radiopause_no.checked = data && data.pausing == "no";
	radiopause_no.onclick = function(){
		//$(checkboxtimelimit).prop("checked", true);
		//$(divtimelimit).show(200);
	}
	var txtradiopause_no = document.createElement("span");
	txtradiopause_no.innerHTML = "&nbsp;No permitir navegacion en otros grupos luego de haber ingresado en este";
	cell_pausing_options.appendChild(ppausingtext);
	cell_pausing_options.appendChild(radiopause_yes);
	cell_pausing_options.appendChild(txtradiopause_yes);
	cell_pausing_options.appendChild(radiopause_no);
	cell_pausing_options.appendChild(txtradiopause_no);






	row1.appendChild(cell_time_limit);
	row1.appendChild(cell_pausing_options);







	var div_dev_fields = document.createElement("div");
	div_dev_fields.className = "cell colspan5";
	var pdev_fields = document.createElement("p");
	pdev_fields.innerHTML = "Dinamica de desarrollo de preguntas";
	var inputradiochoosenbyuser = document.createElement("input");
	inputradiochoosenbyuser.type = "radio";
	inputradiochoosenbyuser.name = "fields_development_"+idr;
	inputradiochoosenbyuser.value = "choosen_by_user";
	inputradiochoosenbyuser.checked = typeof data == "undefined" || data.development == "choosen_by_user";
	inputradiochoosenbyuser.onclick = function(){
		$(divoptionsprogrammed).hide(200);
	}
	var txtinputradiochoosenbyuser = document.createElement("span");
	txtinputradiochoosenbyuser.innerHTML = "&nbsp;Permitir el desarrollo de las preguntas en orden libre<br>";
	var inputradioprogrammed = document.createElement("input");
	inputradioprogrammed.type = "radio";
	inputradioprogrammed.name = "fields_development_"+idr;
	inputradioprogrammed.value = "programmed";
	inputradioprogrammed.checked = data && data.development == "programmed";
	inputradioprogrammed.onclick = function(){
		$(divoptionsprogrammed).show(200);
	}
	var txtinputradioprogrammed = document.createElement("span");
	txtinputradioprogrammed.innerHTML = "&nbsp;Desarrollar de manera secuencial";
	var divoptionsprogrammed = document.createElement("div");
	divoptionsprogrammed.style.display = inputradioprogrammed.checked?"":"none";
	var inputradiostrict = document.createElement("input");
	inputradiostrict.type = "radio";
	inputradiostrict.name = "fields_development_choosen_by_user_option_"+idr;
	inputradiostrict.value = "strict";
	inputradiostrict.checked = typeof data == "undefined" || data.development_type == "strict" || data.development == "choosen_by_user";
	var txtinputradiostrict = document.createElement("span");
	txtinputradiostrict.innerHTML = "&nbsp;Estricto (tal como se carga)<br>";
	var inputradiorandom = document.createElement("input");
	inputradiorandom.type = "radio";
	inputradiorandom.name = "fields_development_choosen_by_user_option_"+idr;
	inputradiorandom.value = "random";
	inputradiorandom.checked = data && data.development_type == "random";
	var txtinputradiorandom = document.createElement("span");
	txtinputradiorandom.innerHTML = "&nbsp;Aleatorio";
	divoptionsprogrammed.appendChild(inputradiostrict);
	divoptionsprogrammed.appendChild(txtinputradiostrict);
	divoptionsprogrammed.appendChild(inputradiorandom);
	divoptionsprogrammed.appendChild(txtinputradiorandom);
	divoptionsprogrammed.style.padding = "3%";
	div_dev_fields.appendChild(inputradiochoosenbyuser);
	div_dev_fields.appendChild(txtinputradiochoosenbyuser);
	div_dev_fields.appendChild(inputradioprogrammed);
	div_dev_fields.appendChild(txtinputradioprogrammed);
	div_dev_fields.appendChild(divoptionsprogrammed);


	var divsubset = document.createElement("div");
	divsubset.className = "cell colspan5";
	//divsubset.style.display = $("input[name='new_survey_groups_development']:checked").val()=="choosen_by_user"?"":"none";
	var psubset = document.createElement("p");
	psubset.innerHTML = "Opciones para subconjunto de preguntas";
	psubset.style.marginTop = "0px";
	var radiosubset_no = document.createElement("input");
	radiosubset_no.type = "radio";
	radiosubset_no.name = "subset_data_group_"+idr;
	radiosubset_no.value = "no";
	radiosubset_no.checked = typeof data == "undefined" || data.subset_fields == "no";
	radiosubset_no.onclick = function(){
		$(valsubset).hide();
	}
	var txtradiosubset_no = document.createElement("span");
	txtradiosubset_no.innerHTML = "&nbsp;Desplegar todas las preguntas cargadas<br>";
	var radiosubset_yes = document.createElement("input");
	radiosubset_yes.type = "radio";
	radiosubset_yes.name = "subset_data_group_"+idr;
	radiosubset_yes.value = "yes";
	radiosubset_yes.checked = data && data.subset_fields == "yes";
	radiosubset_yes.onclick = function(){
		$(valsubset).show();
	}
	var txtradiosubset_yes = document.createElement("span");
	txtradiosubset_yes.innerHTML = "&nbsp;Desplegar solo un subconjunto";
	var valsubset = document.createElement("input");
	valsubset.type = "text";
	valsubset.placeholder = "Cantidad de elementos del subconjunto (por logica debe ser inferior a la cantidad de elementos, y si es igual entonces xq coño no eliges la opcion anterior)";
	valsubset.style.display = data && data.subset_fields == "yes"?"":"none";
	valsubset.style.marginLeft = "5%";
	valsubset.id = "subset_data_group_amount_"+idr;
	valsubset.value = data && data.subset_fields == "yes"? data.subset_fields_amount : "";

	divsubset.appendChild(psubset);
	divsubset.appendChild(radiosubset_no);
	divsubset.appendChild(txtradiosubset_no);
	divsubset.appendChild(radiosubset_yes);
	divsubset.appendChild(txtradiosubset_yes);
	divsubset.appendChild(valsubset);






	row2.appendChild(div_dev_fields);
	row2.appendChild(divsubset);


	divconfigs.appendChild(row1);
	divconfigs.appendChild(row2);


	var group = document.createElement("div");
	var fd = document.createElement("div");
	fd.style.padding = "2.5%";
	fd.appendChild(divinputname);
	fd.appendChild(document.createElement("br"));
	fd.appendChild(divdescr);
	group.appendChild(fd);
	group.appendChild(divconfigs);
	group.appendChild(table);
	group.appendChild(btnaddfield);
	group.style.margin = "3.5%";
	group.style.border = "solid 0.3px";
	group.setAttribute("data-id", idr);

	$("#"+iddiv).append(group);

	if(data && data.fields){
		$.each(data.fields, function(k, v){
			add_field_on_survey_context(tbody.id, v);
		});
	}

	tinymce.init({
		selector : "#description_group_"+idr,
		plugins : ['advlist autolink lists link image charmap print preview anchor',
			'searchreplace visualblocks code fullscreen',
			'insertdatetime media table contextmenu paste code'],
		file_browser_callback : tinymce_filebrowser
	});
}
/***********************************/
function add_field_on_survey_context(table, data){
	var idrrow = String(Math.random()).substr(2);
	var row = document.createElement("tr");
	row.setAttribute("data-id", idrrow);
	var col_controls = document.createElement("td");

	var divcontrols = document.createElement("div");
	divcontrols.className = "toolbar";
	var divcontrolssection = document.createElement("div");
	divcontrolssection.className = "toolbar-section";

	var btndelete = document.createElement("button");
	btndelete.className = "toolbar-button";
	btndelete.innerHTML = "<span class = 'mif-cross'></span>";
	btndelete.onclick = function(e){
		e.preventDefault();
		$(row).remove();
	}

	var btnup = document.createElement("button");
	btnup.className = "toolbar-button";
	btnup.innerHTML = "<span class = 'mif-arrow-up'></span>";
	btnup.onclick = function(e){
		e.preventDefault();
		$(row.previousSibling).before($(row));
	}

	var btndown = document.createElement("button");
	btndown.className = "toolbar-button";
	btndown.innerHTML = "<span class = 'mif-arrow-down'></span>";
	btndown.onclick = function(e){
		e.preventDefault();
		$(row.nextSibling).after($(row));
	}

	divcontrolssection.appendChild(btndelete);
	divcontrolssection.appendChild(btnup);
	divcontrolssection.appendChild(btndown);

	divcontrols.appendChild(divcontrolssection);
	col_controls.appendChild(divcontrols);

	var col_name = document.createElement("td");
	col_name.contentEditable = true;
	col_name.setAttribute("data-name", "name");
	if(data)
		col_name.innerHTML = data.name;
	var col_description = document.createElement("td");
	col_description.align = "center";
	var div_description = document.createElement("div");
	div_description.setAttribute("data-name", "description");
	div_description.id = "description_field_"+String(Math.random());
	div_description.style.maxHeight = "100px";
	div_description.style.maxWidth = "100px";
	div_description.style.overflow = "hidden";
	div_description.style.width = "100%";
	if(data)
		div_description.innerHTML = data.description;
	col_description.appendChild(div_description);
	var aeditdescription = document.createElement("a");
	aeditdescription.href = "javascript:;";
	aeditdescription.innerHTML = "Editar";
	aeditdescription.onclick = function(){
		tinyMCE.get("description_field_survey").setContent(div_description.innerHTML)
		__id_description_field_editing = div_description.id;
		$("#edit_description_field_survey").data("dialog").open();
	}
	col_description.appendChild(aeditdescription);


	var col_time_limit = document.createElement("td");
	col_time_limit.align = "center";
	col_time_limit.className = "time_limit_cell_"+__aux_idractualgroup;
	//col_time_limit.style.display = $("#checkboxtimelimit_"+__aux_idractualgroup).prop("checked")?"none":"";
	var chktimelimit = document.createElement("input");
	chktimelimit.type = "checkbox";
	chktimelimit.name = "time-limit-check";
	chktimelimit.checked = data && data["time_limit"]?true:false;
	chktimelimit.onchange = function(){
		if(this.checked)
			$(divtimelimit).show(200);
		else
			$(divtimelimit).hide(200);
	}
	var divtimelimit = document.createElement("div");
	divtimelimit.style.display = data && data["time_limit"]?"":"none";

	var divinputext = document.createElement("div");
	divinputext.className = "input-control text";
	var valtimelimit = document.createElement("input");
	valtimelimit.type = "text";
	valtimelimit.name = "time-limit-val";
	if(data && data["time_limit"] && data["time_limit"].val)
		valtimelimit.value = data["time_limit"].val;
	divinputext.appendChild(valtimelimit);
	var divselect = document.createElement("div");
	divselect.className = "input-control select";
	var typetimelimit = document.createElement("select");
	typetimelimit.innerHTML = $("#new_survey_time_type_6").html();
	typetimelimit.name = "time-limit-type";
	if(data && data["time_limit"] && data["time_limit"].type)
		typetimelimit.value = data["time_limit"].type;
	divselect.appendChild(typetimelimit);

	divtimelimit.appendChild(divinputext);
	divtimelimit.appendChild(divselect);

	col_time_limit.appendChild(chktimelimit);
	col_time_limit.appendChild(divtimelimit);


	var col_type = document.createElement("td");
	var select_type = document.createElement("select");
	//select_type.multiple = "multiple";
	select_type.innerHTML = $("#__data_field_types").html();
	select_type.name = "select_field_type";
	if(data)
		select_type.value = data.type;
	select_type.onchange = function(){
	}
	col_type.appendChild(select_type);
	var col_config = document.createElement("td");

	var divcorreciones = document.createElement("div");
	var inputradiofix = document.createElement("input");
	inputradiofix.type = "radio";
	inputradiofix.name = "fix"+idrrow;
	inputradiofix.value = "fix";
	inputradiofix.checked = typeof data == "undefined" || data.do_fix == "yes";
	inputradiofix.onclick = function(){
		$(divfix).show(200);
	}
	var txtinputradiofix = document.createElement("span");
	txtinputradiofix.innerHTML = "&nbsp;Permitir correcion<br>";
	var divfix = document.createElement("div");
	divfix.style.paddingLeft = "2.5%";
	var inputradiofixinfinite = document.createElement("input");
	inputradiofixinfinite.type = "radio";
	inputradiofixinfinite.name = "fix_option"+idrrow;
	inputradiofixinfinite.value = "infinite";
	inputradiofixinfinite.checked = typeof data == "undefined" || data.do_fix_times == "infinite";
	inputradiofixinfinite.onclick = function(){
		$(divvaluefixlimited).hide(200);
	}
	var txtinputradiofixinfinite = document.createElement("span");
	txtinputradiofixinfinite.innerHTML = "&nbsp;Sin limite de veces<br>";
	var inputradiofixlimited = document.createElement("input");
	inputradiofixlimited.type = "radio";
	inputradiofixlimited.name = "fix_option"+idrrow;
	inputradiofixlimited.value = "limited";
	inputradiofixlimited.checked = data && data.do_fix == "yes" && data.do_fix_times != "infinite";
	inputradiofixlimited.onclick = function(){
		$(divvaluefixlimited).show(200);
	}
	var txtinputradiofixlimited = document.createElement("span");
	txtinputradiofixlimited.innerHTML = "&nbsp;Con limite de veces";

	var divvaluefixlimited = document.createElement("div");
	divvaluefixlimited.style.display = typeof data != "undefined" && (data.do_fix == "yes" && data.do_fix_times != "infinite")?"":"none";
	var divvaluefixlimitedval = document.createElement("div");
	divvaluefixlimitedval.className = "input-control text";
	var valuefixlimitedval = document.createElement("input");
	valuefixlimitedval.type = "text";
	valuefixlimitedval.style.textAlign = "right";
	valuefixlimitedval.name = "fix-limited-time-val";
	valuefixlimitedval.value = typeof data != "undefined" && data.do_fix == "yes" && data.do_fix_times != "infinite"?data.do_fix_times:"";
	divvaluefixlimitedval.appendChild(valuefixlimitedval);
	var spantxtcantveces = document.createElement("span");
	spantxtcantveces.innerHTML = " veces";
	divvaluefixlimited.appendChild(divvaluefixlimitedval);
	divvaluefixlimited.appendChild(spantxtcantveces);

	divfix.appendChild(inputradiofixinfinite);
	divfix.appendChild(txtinputradiofixinfinite);
	divfix.appendChild(inputradiofixlimited);
	divfix.appendChild(txtinputradiofixlimited);
	divfix.appendChild(divvaluefixlimited);



	var inputradionofix = document.createElement("input");
	inputradionofix.type = "radio";
	inputradionofix.name = "fix"+idrrow;
	inputradionofix.value = "nofix";
	inputradionofix.checked = data && data.do_fix == "no";
	inputradionofix.onclick = function(){
		$(divfix).hide(200);
	}
	var txtinputradionofix = document.createElement("span");
	txtinputradionofix.innerHTML = "&nbsp;No permitir correcion";
	divcorreciones.appendChild(inputradiofix);
	divcorreciones.appendChild(txtinputradiofix);
	divcorreciones.appendChild(divfix);
	divcorreciones.appendChild(inputradionofix);
	divcorreciones.appendChild(txtinputradionofix);
	col_config.appendChild(divcorreciones);
	col_config.appendChild(document.createElement("hr"));



	row.appendChild(col_controls);
	row.appendChild(col_name);
	row.appendChild(col_description);
	row.appendChild(col_time_limit);
	row.appendChild(col_type);
	row.appendChild(col_config);
	$("#"+table).append(row);
	$(select_type).select2();
	$(".select2").css("width", "100%");
}
/***********************************/
tinymce.init({
	selector : ".rich_textarea",
	plugins : ['advlist autolink lists link image charmap print preview anchor',
		'searchreplace visualblocks code fullscreen',
		'insertdatetime media table contextmenu paste code'],
	file_browser_callback : tinymce_filebrowser
});
$("#set_description_field").click(function(){
	document.getElementById(__id_description_field_editing).innerHTML = tinyMCE.activeEditor.getContent();
	$("#edit_description_field_survey").data("dialog").close();
});
$("#cancel_editing_description_field").click(function(){
	$("#edit_description_field_survey").data("dialog").close();
});
/***********************************/
window.addEventListener("load",function(){
	/***********************************/
	$("#modales").show();
	$("#clicktab1").trigger("click");
	var fecha_actual = new Date();
	$("#list_my_surveys div[data-type-application='start_null_end_null']").each(function(){
		if($(this).attr("data-status") == "not-started"){
			$("#span_waiting_for_manual_starting_"+$(this).attr("data-id")).show();
			$(this).find("button[data-type-button='start']").show();
		}
		$("#span_resting_time_"+$(this).attr("data-id")).hide();
	});
	$("#list_my_surveys div[data-type-application='start_null_end_time']").each(function(){
		if($(this).attr("data-status") == "not-started"){
			$("#span_waiting_for_manual_starting_"+$(this).attr("data-id")).show();
			$(this).find("button[data-type-button='start']").show();
		}else if($(this).attr("data-status") == "ongoing"){
			$("#span_resting_time_"+$(this).attr("data-id")).show();
		}
	});
	$("#list_my_surveys div[data-type-application='start_null_end_date']").each(function(){
		if($(this).attr("data-status") == "not-started"){
			$("#span_waiting_for_manual_starting_"+$(this).attr("data-id")).show();
			$(this).find("button[data-type-button='start']").show();
		}else if($(this).attr("data-status") == "ongoing"){
			$("#span_resting_time_"+$(this).attr("data-id")).show();
		}
	});
	/***********************************/
	monitoring_surveys();
	/***********************************/
	//attach notification to initials surveys:
	$("#list_my_surveys").children().each(function(){
		attachStartSurveyNotification({
			_id : $(this).attr("data-id")
		});
		attachFinishSurveyNotification({
			_id : $(this).attr("data-id")
		});
	});
});
function changeVisualStarted(ids){
	var par = $("#div_survey_"+ids);
	par.find('div[data-role="panel"]').removeClass("success").addClass("warning");
	par.attr("data-status", "ongoing");
	par.attr("data-started-at", new Date());
	$("#span_waiting_for_manual_starting_"+ids).hide();
	par.find("button").hide();
	par.find("button[data-type-button='navigate']").show();
	if(par.attr("data-type-application") == "start_null_end_null" || par.attr("data-type-application") == "start_date_end_null")
		par.find("button[data-type-button='stop']").show();
	if(ids == __id_edit_survey){
		$("#tab_edit_survey").hide();
		$("#clicktab1").trigger("click");
	}
}
function changeVisualFinished(ids){
	var par = $("#div_survey_"+ids);
	par.find('div[data-role="panel"]').removeClass("warning").addClass("alert");
	par.attr("data-status", "finished");
	par.attr("data-finished-at", new Date());
	$("#span_resting_time_"+ids).hide();
	par.find("button").hide();
	par.find("button[data-type-button='navigate'],button[data-type-button='delete']").show();
}
function attachStartSurveyNotification(data){
	Notifications.on('notification_survey_'+data._id+'_activated', function(d){
		var ids = data._id;
		changeVisualStarted(ids);
	});
}
function attachFinishSurveyNotification(data){
	Notifications.on('notification_survey_'+data._id+'_finished', function(d){
		var ids = data._id;
		changeVisualFinished(ids);
	});
}
setInterval(function(){
	var txt = $("#txt_search_my_surveys").val().trim();
	txt = txt.toLowerCase();
	if(txt.length > 0){
		$("#list_my_surveys").children().each(function(){
			if((	$(this).attr("data-tags").toLowerCase().indexOf(txt) != -1 ||
					$(this).find("span[data-name='title']").html().toLowerCase().indexOf(txt) != -1 ||
					$(this).find("div[data-name='description']").html().toLowerCase().indexOf(txt) != -1) &&
					(	($("#see_all_not_started").prop("checked") && $(this).attr("data-status") == "not-started")||
						($("#see_all_ongoing").prop("checked") && $(this).attr("data-status") == "ongoing")||
						($("#see_all_finished").prop("checked") && $(this).attr("data-status") == "finished"))
				){
				$(this).show(500);
			}else{
				$(this).hide(500);
			}
		});
	}else{
		$("#list_my_surveys").children().each(function(){
			if(	($("#see_all_not_started").prop("checked") && $(this).attr("data-status") == "not-started")||
						($("#see_all_ongoing").prop("checked") && $(this).attr("data-status") == "ongoing")||
						($("#see_all_finished").prop("checked") && $(this).attr("data-status") == "finished"))
				$(this).show(500);
			else
				$(this).hide(500);
		});
	}
	var count = 0;
	$("#list_my_surveys div[data-type-application]").each(function(){
		if($(this).css("display") != "none")
			count++;
	});
	if(count == 0)
		$("#no_surveys").show(500);
	else
		$("#no_surveys").hide(500);
}, 100);
function btn_edit_survey(__id_edit_survey){
	HTTP.read({
		url : "survey/"+__id_edit_survey,
		before : function(){
			lock_screen();
		},success : function(d, e, f){
			$("#edit_survey_title, #edit_survey_survey_start_2, #edit_survey_survey_end_2, #edit_survey_survey_end_4, #edit_survey_survey_start_5, #edit_survey_survey_start_6").val("");
			$("#edit_survey_time_amount_6, #edit_survey_time_amount_3").val("");
			$("#edit_survey_time_type_6, #edit_survey_time_type_3").val("seconds");
			$("#edit_survey_data_group").empty();
			tinyMCE.get("edit_survey_description").setContent(d.data.item.description);
			$("#edit_survey_application_interval_1").trigger("click");
			last_div_app_edit = "";
			$("#edit_survey_tags").importTags("");
			/****************************************************/
			var item = d.data.item;
			$("#edit_survey_title").val(item.title);
			$("#edit_survey_description").val(item.description);
			$("#form_edit_survey").find("input[name='application_interval']").each(function(){
				if(($(this).val()) == (item.type_time_apply)){
					$(this).trigger("click");
				}
			});
			switch((item.type_time_apply)){
				case "start_date_end_date":
					item.start = new Date(item.start);
					var date = 	complete(item.start.getFullYear(),4)+"-"+
								complete(item.start.getMonth()+1,2)+"-"+
								complete(item.start.getDate(),2)+" "+
								complete(item.start.getHours(), 2)+":"+
								complete(item.start.getMinutes(),2);
					$("#edit_survey_survey_start_2").val(date);
					item.end = new Date(item.end);
					date = 	complete(item.end.getFullYear(),4)+"-"+
							complete(item.end.getMonth(),2)+"-"+
							complete(item.end.getDate(),2)+" "+
							complete(item.end.getHours(), 2)+":"+
							complete(item.end.getMinutes(),2);
					$("#edit_survey_survey_end_2").val(date);
				break;
				case "start_null_end_time":
					$("#edit_survey_time_amount_3").val(item["time_amount"]);
					$("#edit_survey_time_type_3").val(item["time_type"]);
				break;
				case "start_null_end_date":
					item.end = new Date(item.end);
					var date = 	complete(item.end.getFullYear(),4)+"-"+
								complete(item.end.getMonth(),2)+"-"+
								complete(item.end.getDate(),2)+" "+
								complete(item.end.getHours(), 2)+":"+
								complete(item.end.getMinutes(),2);
					$("#edit_survey_survey_end_4").val(date);
				break;
				case "start_date_end_null":
					item.start = new Date(item.start);
					var date = 	complete(item.start.getFullYear(),4)+"-"+
								complete(item.start.getMonth(),2)+"-"+
								complete(item.start.getDate(),2)+" "+
								complete(item.start.getHours(), 2)+":"+
								complete(item.start.getMinutes(),2);
					$("#edit_survey_survey_start_5").val(date);
				break;
				case "start_date_end_time":
					item.start = new Date(item.start);
					var date = 	complete(item.start.getFullYear(),4)+"-"+
								complete(item.start.getMonth(),2)+"-"+
								complete(item.start.getDate(),2)+" "+
								complete(item.start.getHours(), 2)+":"+
								complete(item.start.getMinutes(),2);
					$("#edit_survey_survey_start_6").val(date);
					$("#edit_survey_time_amount_6").val(item["time_amount"]);
					$("#edit_survey_time_type_6").val(item["time_type"]);
				break;
			}
			/*****/
			if(!item["sections"])
				item["sections"] = Array();
			var nt = item["sections"].length;
			for(var v = 0; v < nt; v++){
				var group = item["sections"][v];
				add_data_group("edit_survey_data_group", group);
			}
			/*****/
			/*AQUI, el select2 no funciona bien, cuando me traigo un cuestionario con privacy 4
			y usuarios seleccionados los carga seleccionados en el select2, pero cuando me traigo nuevamente
			ese survey, ya no carga nada en el select2*/
			$("#edit_survey_specific_contacts").select2("destroy");
			$("#edit_survey_specific_contacts").children().attr("selected", false);
			$("#edit_survey_access_tokens").importTags("");
			$("#edit_survey_privacy_access_tokens").prop("checked", false);
			$("#edit_survey_div_access_tokens").hide();
			switch(item.privacy.type){
				case "all":{
					$("#edit_survey_privacy_all").trigger("click");
					if(item.privacy.tokens.length){
						$("#edit_survey_access_tokens").importTags(item.privacy.tokens.join(","));
						$("#edit_survey_privacy_access_tokens").prop("checked", true);
						$("#edit_survey_div_access_tokens").show();
					}
				}break;
				case "only_registered":{
					$("#edit_survey_privacy_only_registered").trigger("click");
				}break;
				case "only_contacts":{
					$("#edit_survey_privacy_only_contacts").trigger("click");
				}break;
				case "specific":{
					$("#edit_survey_specific_contacts").show();
					$("#edit_survey_specific_contacts").children().each(function(){
						$(this).attr("selected", item.privacy.users.indexOf($(this).val()) != -1);
					});
					$("#edit_survey_privacy_specific").trigger("click");
				}break;
			}
			$("#edit_survey_specific_contacts").select2();
			$(".select2").css("width", "100%");
			$("#edit_survey_tags").importTags(item.tags.join(","));
			/******************************************************************/
			$("input[name='edit_survey_groups_subset']").each(function(){
				if($(this).val() == item.subset_sections){
					$(this).trigger("click");
				}
			});
			if(item.subset_sections == "yes"){
				$("#edit_survey_groups_subset_amount").val(item.subset_sections_amount).parent().show();
			}else{
				$("#edit_survey_groups_subset_amount").val("").parent().hide();
			}
			$("#edit_survey_let_comments").prop("checked", item.comments=="yes");
			$("#edit_survey_let_score").prop("checked", item.score=="yes");
			$("input[name='edit_survey_groups_development']").each(function(){
				if($(this).val() == item.development)
					$(this).trigger("click")
			});
			if(item.development == "programmed"){
				$("#edit_survey_groups_development_programmed_options").show();
				$("input[name='edit_survey_groups_development_programmed_options_ordering']").each(function(){
					if($(this).val() == item.development_type)
						$(this).prop("checked", true);
				});
			}
			/******************************************************************/
			$("#tab_edit_survey").show();
			$("#clicktab3").trigger("click");
		},error : function(x, y, z){
		},after : function(v){
			unlock_screen();
		}
	});
}
$("button[data-type='edit-survey'").click(function(){
	__id_edit_survey = $(this).attr("data-id");
	btn_edit_survey(__id_edit_survey);
});
$("button[data-type-button='start']").click(function(){
	__id_survey_to_active = $(this).parent().find("button[data-type='delete-survey']").attr("data-id");
	$("#activate_survey").data("dialog").open();
});
/*******************************************************/
$("button[data-type-button='start']").click(function(){
	__id_survey_to_active = $(this).parent().find("button[data-type='delete-survey']").attr("data-id");
	$("#activate_survey").data("dialog").open();
});
function start_survey(flag){
	var ids = __id_survey_to_active;
	var par = $("#div_survey_"+ids);
	HTTP.post({
		url : "survey/"+ids+"/activation",
		before : function(){
			par.find("button").attr("disabled", true);
			if(!flag)
				$("#activate_survey").data("dialog").close();
			changeVisualStarted(ids);
		}, success : function(d, e, f){
			if(!flag)
				alert("activado");
		}, error : function(x, y, z){
			alert("error activando...");
		}, after : function(v){
			$("#div_survey_"+ids).find("button").attr("disabled", false);
		}
	});
}
$("#activate_survey_ok").click(function(){
	start_survey();
});
$("#activate_survey_cancel").click(function(){
	$("#activate_survey").data("dialog").close();
});
/*******************************************************/
$("button[data-type-button='stop']").click(function(){
	__id_survey_to_stop = $(this).parent().find("button[data-type='delete-survey']").attr("data-id");
	$("#stop_survey").data("dialog").open();
});
function stop_survey(flag){
	var ids = __id_survey_to_stop;
	var par = $("#div_survey_"+ids);
	HTTP.post({
		url : "survey/"+ids+"/closing",
		before : function(){
			par.find("button").attr("disabled", true);
			if(!flag)
				$("#stop_survey").data("dialog").close();
			changeVisualFinished(ids);
		}, success : function(d, e, f){
			if(!flag)
				alert("detenido");
		}, error : function(x, y, z){
			alert("error deteniendo...");
		}, after : function(v){
			$("#div_survey_"+ids).find("button").attr("disabled", false);
		}
	});
}
$("#stop_survey_ok").click(function(){
	stop_survey();
});
$("#stop_survey_cancel").click(function(){
	$("#stop_survey").data("dialog").close();
});
/*******************************************************/
$("button[data-type='delete-survey']").click(function(){
	__id_delete_survey = $(this).attr("data-id");
	$("#dialog_delete_survey").data("dialog").open();
});
$("#delete_survey").click(function(){
	HTTP.delete({
		url : "survey/"+__id_delete_survey,
		before : function(){
			lock_screen();
		},success : function(d, e, f){
			$("#div_survey_"+__id_delete_survey).remove();
			$("#dialog_delete_survey").data("dialog").close();
			if(__id_edit_survey == __id_delete_survey){
				$("#tab_edit_survey").hide();
				$("#clicktab1").trigger("click");
			}
		},error : function(x, y, z){
		},after : function(){
			unlock_screen();
		}
	});
});
$("#cancel_delete_survey").click(function(){
	$("#dialog_delete_survey").data("dialog").close();
});
/******************************************************************/
$("#start_selected_surveys").click(function(){
	$("#dialog_start_selected_surveys").data("dialog").open();
});
$("#start_selected_surveys_ok").click(function(){
	var ids = [];
	$("#list_my_surveys div[data-type-application]").each(function(){
		if(		$(this).attr("data-status") == "not-started" &&
				$(this).css("display") != "none" &&
				$(this).find("input[name='select_my_survey']").prop("checked") &&
				(
					$(this).attr("data-type-application") == "start_null_end_null" ||
					$(this).attr("data-type-application") == "start_null_end_time" ||
					$(this).attr("data-type-application") == "start_null_end_date"
				)){
			__id_survey_to_active = $(this).attr("data-id");
			start_survey(true);
		}
	});
	$("#dialog_start_selected_surveys").data("dialog").close();
});
$("#start_selected_surveys_cancel").click(function(){
	$("#dialog_start_selected_surveys").data("dialog").close();
});
/******************************************************************/
$("#stop_selected_surveys").click(function(){
	$("#dialog_stop_selected_surveys").data("dialog").open();
});
$("#stop_selected_surveys_ok").click(function(){
	var ids = [];
	$("#list_my_surveys div[data-type-application]").each(function(){
		if(		$(this).attr("data-status") == "ongoing" &&
				$(this).css("display") != "none" &&
				$(this).find("input[name='select_my_survey']").prop("checked") &&
				(
					$(this).attr("data-type-application") == "start_null_end_null" ||
					$(this).attr("data-type-application") == "start_date_end_null"
				)){
			__id_survey_to_stop = $(this).attr("data-id");
			stop_survey(true);
		}
	});
	$("#dialog_stop_selected_surveys").data("dialog").close();
});
$("#stop_selected_surveys_cancel").click(function(){
	$("#dialog_stop_selected_surveys").data("dialog").close();
});
/******************************************************************/
$("#delete_selected_surveys").click(function(){
	$("#dialog_delete_selected_surveys").data("dialog").open();
});
$("#delete_selected_surveys_ok").click(function(){
	var ids = [];
	$("#list_my_surveys div[data-type-application]").each(function(){
		if((	$(this).attr("data-status") == "not-started" || 
				$(this).attr("data-status") == "finished") &&
				$(this).css("display") != "none" &&
				$(this).find("input[name='select_my_survey']").prop("checked")){
			ids.push({
				_id : $(this).attr("data-id")
			});
		}
	});
	if(ids.length > 0)
		HTTP.delete({
			url : "surveys",
			data: ids,
			before : function(){
				lock_screen();
			},success : function(d, e, f){
				for(var c in ids){
					$("#div_survey_"+ids[c]._id).remove();
				}
			},error : function(x, y, z){
				alert("hubo un error");
			},after : function(v){
				unlock_screen();
			}
		});
	$("#dialog_delete_selected_surveys").data("dialog").close();
});
$("#delete_selected_surveys_cancel").click(function(){
	$("#dialog_delete_selected_surveys").data("dialog").close();
});
/******************************************************************/
$("input[name='new_survey_privacy']").click(function(){
	switch($(this).val()){
		case "all":{
			$("#div_new_survey_privacy_all").show(200);
			$("#new_survey_div_specific_contacts").hide(200);
		}
		break;
		case "only_registered":{
			$("#div_new_survey_privacy_all").hide(200);
			$("#new_survey_div_specific_contacts").hide(200);
		}
		break;
		case "only_contacts":{
			$("#div_new_survey_privacy_all").hide(200);
			$("#new_survey_div_specific_contacts").hide(200);
		}
		break;
		case "specific":{
			$("#div_new_survey_privacy_all").hide(200);
			$("#new_survey_div_specific_contacts").show(200);
		}
		break;
	}
});
/******************************************************************/
$("input[name='edit_survey_privacy']").click(function(){
	switch($(this).val()){
		case "all":{
			$("#div_edit_survey_privacy_all").show(200);
			$("#edit_survey_div_specific_contacts").hide(200);
		}
		break;
		case "only_registered":{
			$("#div_edit_survey_privacy_all").hide(200);
			$("#edit_survey_div_specific_contacts").hide(200);
		}
		break;
		case "only_contacts":{
			$("#div_edit_survey_privacy_all").hide(200);
			$("#edit_survey_div_specific_contacts").hide(200);
		}
		break;
		case "specific":{
			$("#div_edit_survey_privacy_all").hide(200);
			$("#edit_survey_div_specific_contacts").show(200);
		}
		break;
	}
});
/******************************************************************/
$("input[name='new_survey_groups_development']").click(function(){
	switch($(this).val()){
		case  "choosen_by_user":
			$("#new_survey_groups_development_programmed_options").hide(200);
			$(".pausing_class").show(200);
		break;
		case  "programmed":
			$("#new_survey_groups_development_programmed_options").show(200);
			$(".pausing_class").hide(200);
		break;
	}
});
$("input[name='edit_survey_groups_development']").click(function(){
	switch($(this).val()){
		case  "choosen_by_user":
			$("#edit_survey_groups_development_programmed_options").hide(200);
			$(".pausing_class").show(200);
		break;
		case  "programmed":
			$("#edit_survey_groups_development_programmed_options").show(200);
			$(".pausing_class").hide(200);
		break;
	}
});
/******************************************************************/
$("#fixing_schema_ok").click(function(){
	var typefix = $("input[name='fix_option']:checked").val();
	if(typefix == "fix"){
		var val = $("input[name='do_fix_type']:checked").val();

		if(val == "infinite"){
			$("#new_survey_data_group_fields_"+__idgroup_fixing_schema).children().each(function(){
				$(this).find("input[name='fix"+$(this).attr("data-id")+"']").each(function(){
					if($(this).val() == "fix"){
						$(this).trigger("click");
					}
				});
				$(this).find("input[name='fix_option"+$(this).attr("data-id")+"']").each(function(){
					if($(this).val() == "infinite"){
						$(this).trigger("click");
					}
				});
			});
		}else{
			$("#new_survey_data_group_fields_"+__idgroup_fixing_schema).children().each(function(){
				$(this).find("input[name='fix"+$(this).attr("data-id")+"']").each(function(){
					if($(this).val() == "fix"){
						$(this).trigger("click");
					}
				});
				$(this).find("input[name='fix_option"+$(this).attr("data-id")+"']").each(function(){
					if($(this).val() == "limited"){
						$(this).trigger("click");
					}
				});
				$(this).find("input[name='fix-limited-time-val']").val($("#fix_limited_cant_times").val());
			});
		}
	}else{
		$("#new_survey_data_group_fields_"+__idgroup_fixing_schema).children().each(function(){
			$(this).find("input[name='fix"+$(this).attr("data-id")+"']").each(function(){
				if($(this).val() == "nofix"){
					$(this).trigger("click");
				}
			});
		});
	}
	$("#dialog_fixing_schema").data("dialog").close();
});
$("#fixing_schema_cancel").click(function(){
	$("#dialog_fixing_schema").data("dialog").close();
});
/******************************************************************/
$("input[name='new_survey_groups_subset']").click(function(){
	if($(this).val() == "yes"){
		$("#new_survey_groups_subset_amount").parent().show();
	}else{
		$("#new_survey_groups_subset_amount").parent().hide();
	}
});
$("input[name='edit_survey_groups_subset']").click(function(){
	if($(this).val() == "yes"){
		$("#edit_survey_groups_subset_amount").parent().show();
	}else{
		$("#edit_survey_groups_subset_amount").parent().hide();
	}
});
/******************************************************************/
function add_preview_survey_to_dom(data){
	var maindiv = document.createElement("div");
	maindiv.id = "div_survey_"+data._id;
	maindiv.setAttribute("data-tags", JSON.stringify(data.tags));
	maindiv.setAttribute("data-type-application", data["type_time_apply"]);
	maindiv.setAttribute("data-start",(data.start));
	maindiv.setAttribute("data-end", (data.end));
	maindiv.setAttribute("data-time-amount", data["time_amount"]);
	maindiv.setAttribute("data-time-type", data["time_type"]);
	maindiv.setAttribute("data-id", data._id);
	maindiv.setAttribute("data-status", "not-started");
	maindiv.style.width = "100%";

	var divpanel = document.createElement("div");
	divpanel.setAttribute("data-role", "panel");
	divpanel.className = "panel "+(data.status=="not-started"?"success":(data.status=="ongoing"?"warning":"danger"))+" collapsed collapsible";

	var divheading = document.createElement("div");
	divheading.className = "heading";

	var spanblank = document.createElement("span");
	spanblank.innerHTML = "&nbsp;";

	var inputselect = document.createElement("input");
	inputselect.type = "checkbox";
	inputselect.name = "select_my_survey";
	inputselect.value = data._id;

	var spanhead = document.createElement("span");
	spanhead.setAttribute("data-name", "title");
	spanhead.className = "title";
	spanhead.innerHTML = data.title;

	var tmp = (data.type_time_apply);
	var spanawaiting = document.createElement("span");
	spanawaiting.style.fontSize = "14px";
	spanawaiting.style.display = (tmp=="start_null_end_null" || tmp=="start_null_end_time" || tmp=="start_null_end_date")?"":"none";
	spanawaiting.id = "span_waiting_for_manual_starting_"+data._id;
	spanawaiting.innerHTML = "&nbsp;(Esperando por activación manual)"

	var spanresting = document.createElement("span");
	spanresting.id = "span_resting_time_"+data._id;
	spanresting.style.display = "none";
	spanresting.style.fontSize = "14px";

	var divcontent = document.createElement("div");
	divcontent.style = "padding:0% 1% 0% 1%;background-color:white;border:solid 0.5px;border-color:#DDD;";
	divcontent.className = "content";

	var link_do = document.createElement("a");
	link_do.href = __HOST_SURVEY_APPLICATION+data.hash;
	link_do.target = "_blank";
	link_do.innerHTML = "Realizar";

	var span_link_do = document.createElement("span");
	span_link_do.className = "do_survey";
	span_link_do.appendChild(document.createElement("br"));
	span_link_do.appendChild(link_do);
	span_link_do.appendChild(document.createElement("br"));

	divcontent.appendChild(span_link_do);

	var pdescription = document.createElement("p");
	pdescription.innerHTML = data.description;
	pdescription.style.backgroundColor = "white";
	pdescription.setAttribute("data-name", "description");
	pdescription.innerHTML = data.description;

	divcontent.appendChild(pdescription);

	var btnedit = document.createElement("button");
	btnedit.className = "button primary";
	btnedit.innerHTML = "Editar";
	btnedit.setAttribute("data-type-button", "edit");
	btnedit.onclick = function(){
		__id_edit_survey = data._id;
		btn_edit_survey(data._id);
	}

	var btnnavigate = document.createElement("button");
	btnnavigate.className = "button info";
	btnnavigate.innerHTML = "Navegar";
	btnnavigate.setAttribute("data-type-button", "navigate");

	var btndelete = document.createElement("button");
	btndelete.className = "button danger";
	btndelete.innerHTML = "Eliminar";
	btndelete.onclick = function(){
		__id_delete_survey = data._id;
		$("#dialog_delete_survey").data("dialog").open();
	}
	btndelete.setAttribute("data-id", data._id);
	btndelete.setAttribute("data-type-button", "delete");

	var btnstart = document.createElement("button");
	btnstart.innerHTML = "Activar";
	btnstart.className = "button success";
	btnstart.onclick = function(){
		__id_survey_to_active = data._id;
		$("#activate_survey").data("dialog").open();
	}
	btnstart.setAttribute("data-type-button", "start");

	var btnstop = document.createElement("button");
	btnstop.innerHTML = "Detener";
	btnstop.className = "button danger";
	btnstop.onclick = function(){
		__id_survey_to_stop = data._id;
		$("#stop_survey").data("dialog").open();
	}
	btnstop.setAttribute("data-type-button", "stop");

	divcontent.appendChild(btnnavigate);
	divcontent.appendChild(btnstart);
	divcontent.appendChild(btnstop);
	divcontent.appendChild(btnedit);
	divcontent.appendChild(btndelete);

	divheading.appendChild(spanblank);
	divheading.appendChild(inputselect);
	divheading.appendChild(spanhead);
	divheading.appendChild(spanawaiting);
	divheading.appendChild(spanresting);

	divpanel.appendChild(divheading);
	divpanel.appendChild(divcontent);

	maindiv.appendChild(divpanel);
	maindiv.appendChild(document.createElement("br"));

	$("#list_my_surveys").append(maindiv);
	attachStartSurveyNotification({
		_id : data._id
	});
	attachFinishSurveyNotification({
		_id : data._id
	});
}
/******************************************************************************/
function processSurveyForm(type){
	var data ={};
	data["title"] = $("#"+type+"_survey_title").val().trim();
	data["description"] = tinyMCE.get(""+type+"_survey_description").getContent();
	data["sections"] = Array();
	$("#"+type+"_survey_data_group").children().each(function(){
		var fields = Array();
		var idr = $(this).attr("data-id");
		$(this).find("tbody").children().each(function(){
			var field = {};
			field["name"] = $(this).find("td[data-name='name']").html().trim();
			field["description"] = $(this).find("div[data-name='description']").html().trim();
			field["type"] = $(this).find("select[name='select_field_type']").val().trim();
			if($(this).find("input[name='time-limit-check']").prop("checked")){
				field["time_limit"] = {
					val : $(this).find("input[name='time-limit-val']").val().trim(),
					type : $(this).find("select[name='time-limit-type']").val().trim()
				}
			}else{
				field["time_limit"] = null;
			}

			var val = $(this).find("input[name='fix"+$(this).attr("data-id")+"']:checked").val();
			if(val=="fix"){
				field["do_fix"] = "yes";
				val = $(this).find("input[name='fix_option"+$(this).attr("data-id")+"']:checked").val();
				if(val == "infinite"){
					field["do_fix_times"] = "infinite";
				}else{
					field["do_fix_times"] = $(this).find("input[name='fix-limited-time-val']").val().trim();
				}
			}else{
				field["do_fix"] = "no";
			}

			fields.push(field);
		});
		var d = {
			name : $(this).find("input[name='name_group']").val().trim(),
			description : tinyMCE.get("description_group_"+idr).getContent(),
			fields : fields,
			pausing : $(this).find("input[name='pause_data_group_"+$(this).attr("data-id")+"']:checked").val(),
			development : $(this).find("input[name='fields_development_"+$(this).attr("data-id")+"']:checked").val()
		};
		if($("#checkboxtimelimit_"+idr).prop("checked")){
			d["time_limit"] = {
				val : $(this).find("input[data-name='time-limit-group-val']").val(),
				type : $(this).find("select[data-name='time-limit-group-type']").val()
			}
		}else{
			d["time_limit"] = null;
		}

		if(d.development == "programmed"){
			d["development_type"] = $(this).find("input[name='fields_development_choosen_by_user_option_"+idr+"']:checked").val();
		}

		d["subset_fields"] = $(this).find("input[name='subset_data_group_"+$(this).attr("data-id")+"']:checked").val();
		if(d.subset_fields == "yes"){
			d.subset_fields_amount = $("#subset_data_group_amount_"+$(this).attr("data-id")).val();
		}

		data["sections"].push(d);
	});
	switch(($("#form_"+type+"_survey input[name='application_interval']:checked").val())){
		case "start_null_end_null":
			data["start"] = data["end"] = null;
			data["status"] = "not-started";
		break;
		case "start_null_end_time":
			data["start"] = data["end"] = null;
			data["status"] = "not-started";
			data["time_amount"] = Number($("#"+type+"_survey_time_amount_3").val());
			data["time_type"] = $("#"+type+"_survey_time_type_3").val();
		break;
		case "start_null_end_date":
			data["start"] = null;
			var val = $("#"+type+"_survey_survey_end_4").val().trim();
			data["end"] = new Date(Number(val.substr(0, 4)), Number(val.substr(5, 2))-1, Number(val.substr(8, 2)), Number(val.substr(11, 2)), Number(val.substr(14, 2)), 0, 0);
			data["status"] = "not-started";
		break;
		case "start_date_end_null":
			var val = $("#"+type+"_survey_survey_start_5").val().trim();
			data["start"] = new Date(Number(val.substr(0, 4)), Number(val.substr(5, 2))-1, Number(val.substr(8, 2)), Number(val.substr(11, 2)), Number(val.substr(14, 2)), 0, 0);
			data["end"] = null;
			data["status"] = "not-started";
		break;
		case "start_date_end_time":
			var val = $("#"+type+"_survey_survey_start_6").val().trim();
			data["start"] = new Date(Number(val.substr(0, 4)), Number(val.substr(5, 2))-1, Number(val.substr(8, 2)), Number(val.substr(11, 2)), Number(val.substr(14, 2)), 0, 0);
			data["end"] = null;
			data["time_amount"] = Number($("#"+type+"_survey_time_amount_6").val());
			data["time_type"] = $("#"+type+"_survey_time_type_6").val();
			data["status"] = "not-started";
		break;
		case "start_date_end_date":
			var val = $("#"+type+"_survey_survey_start_2").val().trim();
			data["start"] = new Date(Number(val.substr(0, 4)), Number(val.substr(5, 2))-1, Number(val.substr(8, 2)), Number(val.substr(11, 2)), Number(val.substr(14, 2)), 0, 0);
			val = $("#"+type+"_survey_survey_end_2").val().trim();
			data["end"] = new Date(Number(val.substr(0, 4)), Number(val.substr(5, 2))-1, Number(val.substr(8, 2)), Number(val.substr(11, 2)), Number(val.substr(14, 2)), 0, 0);
			data["status"] = "not-started";
		break;
	}
	switch(($("input[name='"+type+"_survey_privacy']:checked").val())){
		case "all":{
			data["privacy"] = {
				type : "all",
				tokens : $("#"+type+"_survey_access_tokens").val().split(",")
			}
		}break;
		case "only_registered":{
			data["privacy"] = {
				type : "only_registered"
			}
		}break;
		case "only_contacts":{
			data["privacy"] = {
				type : "only_contacts"
			}
		}break;
		case "specific":{
			data["privacy"] = {
				type : "specific",
				users : $("#"+type+"_survey_specific_contacts").val()
			}
		}break;
	}
	data["subset_sections"] = $("input[name='"+type+"_survey_groups_subset']:checked").val();
	if(data.subset_sections == "yes"){
		data["subset_sections_amount"] = $("#"+type+"_survey_groups_subset_amount").val().trim();
	}
	data["type_time_apply"] = ($("#form_"+type+"_survey input[name='application_interval']:checked").val());
	data["tags"] = $("#"+type+"_survey_tags").val().split(",");
	data["comments"] = $("#"+type+"_survey_let_comments").prop("checked")?"yes":"no";
	data["score"] = $("#"+type+"_survey_let_score").prop("checked")?"yes":"no";
	data["development"] = $("input[name='"+type+"_survey_groups_development']:checked").val();
	if(data.development == "programmed"){
		data["development_type"] = $("input[name='"+type+"_survey_groups_development_programmed_options_ordering']:checked").val();
	}
	return data;
}