var url_form_data;
var url_action_form_data;



function form_load_data(data){
    var info = '';
    for(var i in data ){
      if(data[i]){
        info = data[i];
        $($("#"+url_form_data).find("#"+i)).val(info);
      }
    }
}


function on_success_form(data){
  Swal.fire(
    'Bien!',
    'Datos enviados exitosamente!',
    'success'
  );
  $("#cancel").trigger("click");
  $("#id").val('');
  reload_table();
  return;
}

function on_error_form(data){
  Swal.fire(
    'Mal!',
    'Revise los datos ingresados!',
    'error'
  );
}

function on_other_case_form(data){
    Swal.fire(
        'Mal!',
        'Error en formulario, recargue la pagina',
        'error'
      );
}


$(
  function(){
    url_form_data = $("#url_form_data").attr("data-url");
    url_action_form_data = $("#url_action_form_data").attr("data-url");

    

    $("#"+url_form_data).on(
        "submit",
        function(e){
                var f = $(this);
                var formData = new FormData(document.getElementById(url_form_data));

                var validated = 'true';

                if(validated=='true'){
                    $.ajax({
                        url: url_action_form_data,
                        type: "post",
                        dataType: "html",
                        data: formData,
                        cache: false,
                        contentType: false,
                          processData: false
                    }).done(
                      function(res){
                            console.log(res);
                            var data = new Array();
                            try{
                              data = $.parseJSON(res);
                            }catch(ex){}
                            if(data['success']=='false'){ // error en cambio de password
                              on_error_form(data);
                            }else{
                              if(data['success']=='true'){ // cambio de password exitoso
                                on_success_form(data);
                              }else{
                                on_other_case_form(data);
                              }
                            }
                      }
                    );
                }

                try{
                  e.preventDefault();
                }catch(ex){}

            }
      );

  }
);

var url_select = '';
var url_remove = '';

function on_remove(data){
  Swal.fire(
    'Correcto!',
    'Los datos fueron eliminados!',
    'success'
  );
}

function error_remove(data){
  Swal.fire(
    'Error!',
    'Hubo un error!',
    'error'
  );
}

function remove(id) {
    //code
    $.get(
      url_remove+"/"+id,
      function(data) {
        //code
        try   {
          data = $.parseJSON(data);
        } catch(e) {}
        var success = "false";
        if (data['success']) {
            //code
            success = data['success'];
        }
        if (success=='true') {
            //code
            on_remove(data);
            reload_table();
        }else{
            error_remove(data);
        }
      }
    );
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
        var select = $("#pack_id");
        var html = '';
        var packs = new Array();
        if (data['packs']) {
            packs = data['packs'];
        }
        for (var i in packs) {
            //code    
            html = html + '<option value="'+packs[i]['id']+'" >';
            html = html + 'Paquete '+packs[i]['pack'];
            html = html + '</option>';
        }
        $(select).html(html);
      }      
    );
}

$(
    function() {
        //code
        url_select = $("#url_select").attr("data-url");
        url_remove = $("#url_remove").attr("data-url");
        
        do_select();
    }  
);