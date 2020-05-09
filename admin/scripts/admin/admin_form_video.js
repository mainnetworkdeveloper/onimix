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

                var url = $("#url").val();
                var title = $("#title").val();

                var validated = 'true';

                if(url.toString().length<=0){
                    on_error_form(new Array());
                    validated = 'false';
                }
                if(title.toString().length<=0){
                    on_error_form(new Array());
                    validated = 'false';
                }

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
        var select = $("#course_id");
        var html = '';
        var courses = new Array();
        if (data['courses']) {
            courses = data['courses'];
        }
        for (var i in courses) {
            //code    
            html = html + '<option value="'+courses[i]['id']+'" >';
            html = html + ''+courses[i]['title'];
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
       
        do_select();
    }  
);