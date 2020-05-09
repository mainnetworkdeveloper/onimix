var url_form_data;
var url_action_form_data;
var url_redirect = '';

function on_success_form(data){
    var url_redirect = '';
    if (data['url_redirect']) {
        //code
        url_redirect = data['url_redirect'];
    }
    Swal.fire(
      'Bien!',
      'Datos enviados exitosamente, debes esperar a que tu compra sea validada para poder ingresar a tu panel de usuario!',
      'success'
    ).then((result) => {
        window.location = url_redirect;
    });
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
        'Error en formulario, recargue la pagina por favor!',
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

                var validated   = 'true';

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
                            //console.log(res);
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


