var url_packs = '';
var url_user_id = '';
var url_purchase = '';


function get_packs(){
  $.get(
    url_packs,
    function(data){
      try{
        data = $.parseJSON(data);
      }catch(ex){}
      var panel = null;
      if(data['success']=='true'){
        //console.log(data['packs']);
        if(data['packs']){
          for(var index in data['packs']){
            var pack = data['packs'][index];
            //console.log(pack['id']);
            if(pack['id']){
              panel = $("#panel_"+pack['id']);
              $(panel).css("display","");
              $($(panel).find(".pack_title")).html(pack['pack'].toUpperCase()+" ");
              //$($(panel).find(".pack_title")).html(pack['pack']+" $ ");
              $($(panel).find(".pack_button")).attr("data-id",pack['id']);

              if(pack['money']){
                $($(panel).find(".pack_amount")).val(parseFloat(pack['money']));
              }

              $($(panel).find(".pack_button")).click(
                function(event){
                  var pack_id = $(this).attr("data-id");
                  var panel = $("#panel_"+pack_id);
                  var input = $($(panel).find(".pack_amount"));
                  var amount = 0;
                  try{
                    amount = parseFloat($(input).val());
                  }catch(ex){}

                  if(!amount){
                    Swal.fire(
                      'Bad!',
                      'Error review the amount!',
                      'error'
                    );
                    return;
                  }
                  if(amount>0){
                    purchase_pack(url_user_id , pack_id, amount);
                    $(input).val('');
                  }else{
                    Swal.fire(
                      'Bad!',
                      'Error review the amount!',
                      'error'
                    );
                    return;
                  }
                  try{
                    event.preventDefault();
                  }catch(ex){}
                }
              );
            }
          }
        }
      }
    }
  );
}

function purchase_pack(user_id,pack_id,amount){
  $.get(
    url_purchase+"/"+user_id+"/"+pack_id+"/"+amount,
    function(data){
      try{
        data = $.parseJSON(data);
      }catch(ex){}
      if(data['success']=='true'){
        Swal.fire(
          'Good!',
          'Data registered with success!',
          'success'
        );
      }else{
        Swal.fire(
          'Bad!',
          'There was an error in process!',
          'error'
        );
      }
    }
  );
}
$(
  function(){
    url_packs = $("#url_packs").attr("data-url");
    url_user_id = $("#url_user_id").attr("data-url");
    url_purchase = $("#url_purchase").attr("data-url");

    get_packs();

  }
);

