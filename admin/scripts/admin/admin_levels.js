var controller;
var url_datatable;
var url_datatable_fields;
var url_remove;
var url_view;
var datatable;
var datatable_object;
var url_levels;

function remove(id) {
	$.get(url_remove + '/' + id, function(data) {
		datatable_object.ajax.reload();
	});
}

function level(level = 1,change=true){	
	var id = $("#user_id").val();
	$.get(url_level + '/' + id+"/"+level, function(data) {
			try{
				data = $.parseJSON(data);
			}catch(ex){}
			var html = '<h3>El usuario: ';
			var email = '';
			var users = 0;
			var unilevel = new Array();
			if(data['level']){
				unilevel = data['level'];
			} 
			var bonus = new Array();
			if(data['bonus']){
				bonus = data['bonus'];
			} 
			var bonus_level = 0;
			if(bonus['bonus']){
				bonus_level = bonus['bonus'];
			}
			if(unilevel['email']){
				email = unilevel['email'];
			}
			if(unilevel['users']){
				users = unilevel['users'];
			}
			html += email + ' tiene en su nivel '+level+ " : " +users+' usuarios.<h3>';
			var html_bonus = '<h3>El usuario '+email;
			if(bonus_level==0){
				html_bonus = html_bonus + " no tiene bono";
			}else{
				html_bonus = html_bonus + " recibio el bono de monto: "+bonus_level;
			}
			html_bonus = html_bonus+'</h3>';
			$("#level").html(html);		
			$("#bonus").html(html_bonus);
			
			if(change==true){
				$("#levels").val(level);
				$( "#levels" ).trigger( "change" );
			}		
		});
}

function view(id){
	$("#user_id").val(id);
	$.get(url_view + '/' + id, function(data) {
		level_datatable_object.ajax.reload();
		level(1);
		return;
	});  	
}

$(function() {
	controller      = $('#controller').attr('data-url');
	url_datatable   = $('#url_datatable_' + controller).attr('data-url');
	url_remove      = $('#url_remove').attr('data-url');
	url_view        = $('#url_view').attr('data-url');
    url_level       = $('#url_level').attr('data-url');
	url_datatable_fields = $('#url_datatable_fields_' + controller).attr('data-url');
	datatable = $('#datatable_' + controller);
	$.get(url_datatable_fields, function(data) {
		try {
			data = $.parseJSON(data);
		} catch (ex) {}
		var html_fields = '';
		for (var i in data) {
			html_fields = html_fields + '<th>';
			html_fields = html_fields + data[i];
			html_fields = html_fields + '</th>';
		}
		var html_table = '<thead><tr>';
		html_table = html_table + html_fields;
		html_table = html_table + '</tr></thead>';
		html_table = html_table + '<tfoot><tr>';
		html_table = html_table + html_fields;
		html_table = html_table + '</tr></tfoot>';
		html_table = html_table + '<tbody>';
		html_table = html_table + '</tbody>';

		$(datatable).html(html_table);

		datatable_object = $(datatable).DataTable({
			ajax: url_datatable,
			'responsive': true,
			"autoWidth": true,
			"scrollX": true
		});
		$(datatable).addClass('table table-striped table-bordered');
	});
});


var level_controller;
var url_level_datatable;
var url_level_datatable_fields;
var url_level_remove;
var url_level_token;
var url_level_validate;
var level_datatable;
var level_datatable_object;

function remove_level(id) {
	$.get(url_level_remove + '/' + id, function(data) {
		level_datatable_object.ajax.reload();
	});
}



function bonus(user_id){
	var level = 1;
	var select = $(this);
	var elem = $(select).find("option:selected");
	level = elem.val();
	if(level==null){
		level = 1;
	}
	if(level.length>0){
		level = 1;
	}
    Swal.fire({
        title: 'Ingrese monto de Bono',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
            if (result.value) {
				save_bonus(user_id, level, result.value);
            }
        }
      );
}

function validate_level(id){
	Swal.fire(
		{
		  title: 'Are you sure?',
		  text: "This validation for level is one time!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, validate it!'
		}
    ).then((result) => {
		  if (result.value) {
				$.get(url_level_validate + '/' + id, function(data) {
						try{
							data = $.parseJSON(data);
						}catch(ex){}
						if(data['success']=='true'){
							Swal.fire(
								'Validated!',
								'The level will be validated in a time.',
								'success'
							);
							setTimeout(
								function(){
										console.log("updated data");
										level_datatable_object.ajax.reload();
								},1000
							);
							return;
						}
					}
				);
				return;
		  }
		}
	);
}

$(function() {
	level_controller = $('#level_controller').attr('data-url');
	url_level_datatable = $('#url_datatable_' + level_controller).attr('data-url');
	url_level_remove = $('#url_level_remove').attr('data-url');
	url_level_token  = $('#url_level_token').attr('data-url');
	url_level_validate  = $('#url_level_validate').attr('data-url');
	url_level_datatable_fields = $('#url_datatable_fields_' + level_controller).attr('data-url');
    level_datatable = $('#datatable_' + level_controller);
    //console.log(level_controller);
    //console.log(url_level_datatable);
    //console.log(url_level_datatable_fields);
    //console.log(level_datatable);
	$.get(url_level_datatable_fields, function(data) {
		try {
			data = $.parseJSON(data);
		} catch (ex) {}
		var html_fields = '';
		for (var i in data) {
			html_fields = html_fields + '<th>';
			html_fields = html_fields + data[i];
			html_fields = html_fields + '</th>';
		}
		var html_table = '<thead><tr>';
		html_table = html_table + html_fields;
		html_table = html_table + '</tr></thead>';
		html_table = html_table + '<tfoot><tr>';
		html_table = html_table + html_fields;
		html_table = html_table + '</tr></tfoot>';
		html_table = html_table + '<tbody>';
		html_table = html_table + '</tbody>';

		$(level_datatable).html(html_table);

		level_datatable_object = $(level_datatable).DataTable({
            ajax: url_level_datatable,
            'responsive': true,
			"autoWidth": true,
			"scrollX": true
		});
		$(level_datatable).addClass('table table-striped table-bordered');
	});
});

var url_bonus = '';

function save_bonus(user_id, level, bonus){
	// level = rank_id 
	// bonus monto de bono de nivel
	$.get(
		url_bonus+"/"+user_id+"/"+level+"/"+bonus,
		function(data){
			try{
				data = $.parseJSON(data);
			}catch(ex){}
			var success = 'false';
			if(data['success']){
				success = data['success'];
			}
			if(success == 'true'){
				Swal.fire(
					'Validated!',
					'Bonus saved',
					'success'
				);
			}else{
				Swal.fire(
					'Error',
					'Error in process',
					'error'
				);
			}
		}
	);
}

$(
	function(){
		url_bonus = $("#url_bonus").attr("data-url");
	}
);
