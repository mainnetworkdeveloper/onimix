var controller;
var url_datatable;
var url_datatable_fields;
var url_remove;
var datatable;
var datatable_object;

function remove(id){
    $.get(
          url_remove+"/"+id,
          function(data){
              datatable_object.ajax.reload();
          }
    );
}

$(
  function(){
    controller = $("#controller").attr("data-url");
    url_datatable = $("#url_datatable_"+controller).attr("data-url");
    url_remove = $("#url_remove").attr("data-url");
    url_datatable_fields = $("#url_datatable_fields_"+controller).attr("data-url");
    datatable = $("#datatable_"+controller);
    $.get(
        url_datatable_fields,
        function(data){
            try{
              data = $.parseJSON(data);
            }catch(ex){}
            var html_fields = "";
            for(var i in data){
                html_fields = html_fields + "<th>";
                html_fields = html_fields + data[i];
                html_fields = html_fields + "</th>";
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

            datatable_object=$(datatable).DataTable(
              {
                'ajax': url_datatable,
                'responsive': true,
                "autoWidth": true,
                "scrollX": true
              }
            );
            $(datatable).addClass('table table-striped table-bordered');
        }
    );

  }
);


var url_wallet = '';
var url_pack = '';
var url_progress = '';
var url_payment = '';

function generate_wallet(){
  $.get(
    url_wallet,
    function(data){
      try{
        data = $.parseJSON(data);
      }catch(ex){}
      var amount = 0;
      if(data['amount']){
        amount = data['amount'];
      }
      $("#wallet").html("$ "+amount);
    }
  );
}

function generate_pack(){
  $.get(
    url_pack,
    function(data){
      try{
        data = $.parseJSON(data);
      }catch(ex){}
      var pack = 0;
      if(data['pack_title']){
        pack = data['pack_title'];
      }
      $("#pack").html(pack);
    }
  );
}

function generate_progress(){
  $.get(
    url_progress,
    function(data){
      try{
        data = $.parseJSON(data);
      }catch(ex){}
      var percent = 0;
      if(data['percent']){
        percent = data['percent'];
      }
      $("#progress").html(percent+" %");
    }
  );
}

function generate_payment(){
  $.get(
    url_payment,
    function(data){
      try{
        data = $.parseJSON(data);
      }catch(ex){}
      var amount = 0;
      if(data['amount']){
        amount = data['amount'];
      }
      $("#payment").html("$ "+amount);
    }
  );
}

$(
  function(){
    url_wallet = $("#url_wallet").attr("data-url");
    url_pack = $("#url_pack").attr("data-url");
    url_progress = $("#url_progress").attr("data-url");
    url_payment = $("#url_payment").attr("data-url");

    generate_wallet();
    generate_pack();
    generate_progress();
    generate_payment();
  }
);


// form for payments

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
          read_data_form();
          $("#amount").val('');
          $("#wallet_btc").val('');
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

                var amount = $("#amount").val();
                var wallet_btc = $("#wallet_btc").val();

                var validated = 'true';

                if(amount.toString().length<=0){
                    on_error_form(new Array());
                    validated = 'false';
                }
                if(wallet_btc.toString().length<=0){
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


var url_id = '';
var url_data = '';


function read_data_form(){
  $.get(
      url_data+"/"+url_id,
      function(data){
          try{
              data = $.parseJSON(data);
          }catch(ex){}
          delete data['id'];
          delete data['updated_at'];
          delete data['created_at'];
          delete data['active'];
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
      read_data_form();
  }
);
