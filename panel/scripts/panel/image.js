$(window).on('load', function () {
    $("#loading").delay(1000).fadeOut(800);
});

var url_form_data;
var url_action_form_data;


function on_success_form(data){
  Swal.fire(
    'Bien!',
    'Datos enviados exitosamente!',
    'success'
  );
  $("#cancel").trigger("click");
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
  alert("form in error");
}


$(
  function(){
    url_form_data = $("#url_form_data").attr("data-url");
    url_action_form_data = $("#url_action_form_data").attr("data-url");

    $("#"+url_form_data).on(
        "reset",
        function(e){
          $("#file_image").val('');
          read_data_form();
          try{
            e.preventDefault();
          }catch(ex){}
        }
    );

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

var url_id = '';
var url_data = '';
var url_uploads = '';

function read_data_form(){
  $.get(
      url_data+"/"+url_id,
      function(data){
          try{
              data = $.parseJSON(data);
          }catch(ex){}

          console.log(data);

          $('#photo').attr("src",url_uploads+data['file_image']);

          for(var i in data){
              try{
                  $("#"+i).val(data[i]);
              }catch(ex){}
          }

      }
  );
}

$(
  function(){
      url_id = $("#url_id").attr("data-url");
      url_data = $("#url_data").attr("data-url");
      url_uploads = $("#url_uploads").attr("data-url");
      read_data_form();
  }
);
