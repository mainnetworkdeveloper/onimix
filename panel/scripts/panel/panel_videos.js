var controller;
var url_datatable;
var url_datatable_fields;
var url_remove;
var url_view;
var datatable;
var datatable_object;


function reload_table() {    
	datatable_object.ajax.reload();	
}


function view(id){
	$.get(url_view + '/' + id, function(data) {
		try{
			data = $.parseJSON(data);
		}catch(ex){}
		var video = new Array();
		if(data['video']){
			video = data['video'];
		}
		if(video['url']){
            // vista de video 
            $("#video_player").attr("src",video['url']);            
        }
        if(video['title']){
            $("#video_title").html(video['title']);
        }
        return;
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
            ajax: url_datatable,
            'responsive': true,
            "autoWidth": true,
            "scrollY":        "400px",
            "scrollCollapse": true,
            "paging":         false,
            searching: false,
            ordering:  false,
            select: true,
            "columnDefs": [
                {
                    "targets": [ 1 ],
                    "visible": false,
                    "searchable": false
                }
            ]
		});
		$(datatable).addClass('table table-striped table-bordered');
	});
});