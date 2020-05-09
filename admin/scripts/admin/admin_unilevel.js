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
		sub_datatable_object.ajax.reload();
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


var sub_controller;
var url_sub_datatable;
var url_sub_datatable_fields;
var url_sub_remove;
var url_sub_token;
var url_sub_validate;
var sub_datatable;
var sub_datatable_object;
var url_sub_add_money;

function sub_remove(id) {
	$.get(url_sub_remove + '/' + id, function(data) {
		sub_datatable_object.ajax.reload();
	});
}

function sub_add_money(id) {

	Swal.fire({
	  title: 'Ingrese monto de dinero',
	  input: 'text',
	  inputAttributes: {
	    autocapitalize: 'off'
	  },
	  showCancelButton: true,
	  confirmButtonText: 'Agregar',
	  allowOutsideClick: () => !Swal.isLoading()
	}).then((result) => {
		var monto = 0;
	  if (result.value) {
	    monto = result.value;
			if(monto.length>0){
				$.get(url_sub_add_money + '/' + id+'/'+monto, function(data) {
					try{
						data = $.parseJSON(data);
					}catch(ex){}
					console.log(data);

				});
			}
	  }
	});

}


$(function() {
	sub_controller = $('#sub_controller').attr('data-url');
	url_sub_datatable = $('#url_sub_datatable_' + sub_controller).attr('data-url');
	url_sub_remove = $('#url_sub_remove').attr('data-url');
	url_sub_token  = $('#url_sub_token').attr('data-url');
	url_sub_validate  = $('#url_sub_validate').attr('data-url');
	url_sub_datatable_fields = $('#url_sub_datatable_fields_' + sub_controller).attr('data-url');
	sub_datatable = $('#sub_datatable_' + sub_controller);
	
	url_sub_add_money = $("#url_sub_add_money").attr("data-url");

	$.get(url_sub_datatable_fields, function(data) {
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

		$(sub_datatable).html(html_table);

		sub_datatable_object = $(sub_datatable).DataTable({
			ajax: url_sub_datatable
		});
		$(sub_datatable).addClass('table table-striped table-bordered');
	});
});
