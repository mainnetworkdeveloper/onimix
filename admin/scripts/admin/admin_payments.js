var controller;
var url_datatable;
var url_datatable_fields;
var url_remove;
var url_view;
var datatable;
var datatable_object;
var url_wallet;

function remove(id) {
	$.get(url_remove + '/' + id, function(data) {
		datatable_object.ajax.reload();
	});
}

function wallet(id){
  $.get(url_wallet + '/' + id, function(data) {
		try{
      data = $.parseJSON(data);
    }catch(ex){}
    var html = '<h3>El usuario: ';
    var email = '';
    var amount = 0;
    if(data['user']['email']){
      email = data['user']['email'];
    }
    if(data['amount']){
      amount = data['amount'];
    }
    html += email + ' tiene en su wallet $'+amount+'<h3>';
    $("#wallet").html(html);
	});
}

function view(id){
	$.get(url_view + '/' + id, function(data) {
		payment_datatable_object.ajax.reload();
	});
  wallet(id);
}

$(function() {
	controller = $('#controller').attr('data-url');
	url_datatable = $('#url_datatable_' + controller).attr('data-url');
	url_remove = $('#url_remove').attr('data-url');
	url_view = $('#url_view').attr('data-url');
  url_wallet = $('#url_wallet').attr('data-url');
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


var payment_controller;
var url_payment_datatable;
var url_payment_datatable_fields;
var url_payment_remove;
var url_payment_token;
var url_payment_validate;
var payment_datatable;
var payment_datatable_object;

function remove_payment(id) {
	$.get(url_payment_remove + '/' + id, function(data) {
		payment_datatable_object.ajax.reload();
	});
}

function validate_payment(id){
	Swal.fire(
		{
		  title: 'Are you sure?',
		  text: "This validation for payment is one time!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, validate it!'
		}
 ).then((result) => {
		  if (result.value) {
				$.get(url_payment_validate + '/' + id, function(data) {
						try{
							data = $.parseJSON(data);
						}catch(ex){}
						if(data['success']=='true'){
							Swal.fire(
								'Validated!',
								'The payment will be validated in a time.',
								'success'
							);
							setTimeout(
								function(){
										console.log("updated data");
										payment_datatable_object.ajax.reload();
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
	payment_controller = $('#payment_controller').attr('data-url');
	url_payment_datatable = $('#url_datatable_' + payment_controller).attr('data-url');
	url_payment_remove = $('#url_payment_remove').attr('data-url');
	url_payment_token  = $('#url_payment_token').attr('data-url');
	url_payment_validate  = $('#url_payment_validate').attr('data-url');
	url_payment_datatable_fields = $('#url_datatable_fields_' + payment_controller).attr('data-url');
    payment_datatable = $('#datatable_' + payment_controller);
    //console.log(payment_controller);
    //console.log(url_payment_datatable);
    //console.log(url_payment_datatable_fields);
    //console.log(payment_datatable);
	$.get(url_payment_datatable_fields, function(data) {
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

		$(payment_datatable).html(html_table);

		payment_datatable_object = $(payment_datatable).DataTable({
			ajax: url_payment_datatable
		});
		$(payment_datatable).addClass('table table-striped table-bordered');
	});
});
