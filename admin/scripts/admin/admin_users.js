var controller;
var url_datatable;
var url_datatable_fields;
var url_remove;
var url_view;
var datatable;
var datatable_object;

function remove(id) {
	$.get(url_remove + '/' + id, function(data) {
		datatable_object.ajax.reload();
	});
}

function view(id){
	$.get(url_view + '/' + id, function(data) {
		purchase_datatable_object.ajax.reload();
	});
}

$(function() {
	controller = $('#controller').attr('data-url');
	url_datatable = $('#url_datatable_' + controller).attr('data-url');
	url_remove = $('#url_remove').attr('data-url');
	url_view = $('#url_view').attr('data-url');
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
			ajax: url_datatable
		});
		$(datatable).addClass('table table-striped table-bordered');
	});
});


var purchase_controller;
var url_purchase_datatable;
var url_purchase_datatable_fields;
var url_purchase_remove;
var url_purchase_token;
var url_purchase_validate;
var purchase_datatable;
var purchase_datatable_object;

function remove(id) {
	$.get(url_purchase_remove + '/' + id, function(data) {
		purchase_datatable_object.ajax.reload();
	});
}

function token(id) {
	$.get(url_purchase_token + '/' + id, function(data) {
		try{
			data = $.parseJSON(data);
		}catch(ex){}
		var token_image = '';
		if(data['token_image']){
			token_image = data['token_image'];
		}
		var amount = '';
		if(data['money']){
			amount = data['money'];
		}
		var email = '';
		if(data['email']){
			email = data['email'];
		}
		var dir = '';
		if(data['dir']){
			dir = data['dir'];
		}

		var html = '';
		if(token_image == ''){
			html =  '<p>'+
						'<h3>'+
							'No hay imagen subida'
						'</h3>'+
					'</p>';
		}else{
			html = '<p>'+
				'<a href="'+dir+"/"+token_image+'" target="_BLANK">'+
					'<img src="'+dir+"/"+token_image+'" width="100%" >'+							
				'</a>'+
				'</p>'+
				'<h3>' +
				'Amount'+
				'</h3> '+
				'<strong>' +
					amount+
				'</strong> '+
				'<h3>' +
				'Email'+
				'</h3> '+
				'<strong>' +
					email+
				'</strong> ';
		}
		
		Swal.fire(
			{
				  title: '<strong>Imagen de pago:</strong>',
				  type: 'info',
				  html: html,
				  position: 'center',
				  showCloseButton: false,
				  showCancelButton: false,
				  focusConfirm: true,
				  confirmButtonText:
				    '<i class="fa fa-thumbs-up"></i> Ok!',
				  confirmButtonAriaLabel: 'Ok!',
				  cancelButtonText:
				    '<i class="fa fa-thumbs-down"></i>',
				  cancelButtonAriaLabel: 'Cancel',
			}
		);
	});
}

function validate(id){
	Swal.fire(
		{
		  title: 'Are you sure?',
		  text: "This validation for purchase is one time!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, validate it!'
		}
 ).then((result) => {
		  if (result.value) {
				$.get(url_purchase_validate + '/' + id, function(data) {
						try{
							data = $.parseJSON(data);
						}catch(ex){}
						if(data['success']=='true'){
							Swal.fire(
								'Validated!',
								'The purchase will be validated in a time.',
								'success'
							);
							setTimeout(
								function(){
										console.log("updated data");
										if(purchase_datatable_object){
											purchase_datatable_object.ajax.reload();
										}
										if(datatable_object){
											datatable_object.ajax.reload();
										}										
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
	purchase_controller = $('#purchase_controller').attr('data-url');
	url_purchase_datatable = $('#url_datatable_' + purchase_controller).attr('data-url');
	url_purchase_remove = $('#url_purchase_remove').attr('data-url');
	url_purchase_token  = $('#url_purchase_token').attr('data-url');
	url_purchase_validate  = $('#url_purchase_validate').attr('data-url');
	url_purchase_datatable_fields = $('#url_datatable_fields_' + purchase_controller).attr('data-url');
    purchase_datatable = $('#datatable_' + purchase_controller);
    //console.log(purchase_controller);
    //console.log(url_purchase_datatable);
    //console.log(url_purchase_datatable_fields);
    //console.log(purchase_datatable);
	$.get(url_purchase_datatable_fields, function(data) {
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

		$(purchase_datatable).html(html_table);

		purchase_datatable_object = $(purchase_datatable).DataTable({
			ajax: url_purchase_datatable
		});
		$(purchase_datatable).addClass('table table-striped table-bordered');
	});
});
