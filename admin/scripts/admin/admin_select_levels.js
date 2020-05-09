var url_select='';

function change_select(){
  var me = this;
  var select = $(this);
  var elem = $(select).find("option:selected");
  var text = elem.text();
  var value = elem.val();
  level(value,false);
  if(level_datatable_object){
      level_datatable_object.ajax.reload();
  }
  return;
}
function do_select() {
    //code
    
    $.get(
      url_select,
      function(data) {
        //code
        try {
          data = $.parseJSON(data);
        } catch(e) {
            
        }
        var select = $("#levels");
        var html = '';
        var levels = new Array();
        if (data['levels']) {
            levels = data['levels'];
        }
        for (var i in levels) {
            //code    
            html = html + '<option value="'+levels[i]['id']+'" >';
            html = html + 'Nivel '+levels[i]['level'];
            html = html + '</option>';
        }
        $(select).html(html);
        $(select).change(change_select);
      }      
    );
}

$(
    function() {
        //code
        url_select = $("#url_select").attr("data-url");
        do_select();
    }  
);
