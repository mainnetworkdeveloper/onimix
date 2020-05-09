var url_user_id = '';
var url_pack = '';
var url_voucher = '';

function message_valid() {
    //code
    Swal.fire(
          'Bien!',
          'Datos registrados con exito, a continuacion debes enviar el voucher!',
          'success'
    );
}

function message_error() {
    //code
    Swal.fire(
          'Mal!',
          'Datos no registrados con exito, intenta de nuevo!',
          'error'
    );
}

function block_packs() {
    //code
    $("#button_pack_1").css("display","none");
    $("#button_pack_1").attr("disabled","true");
    $("#button_pack_2").css("display","none");
    $("#button_pack_2").attr("disabled","true");
    $("#button_pack_3").css("display","none");
    $("#button_pack_3").attr("disabled","true");
    $("#card_pack_1").css("display","none");
    $("#card_pack_2").css("display","none");
    $("#card_pack_3").css("display","none");
    $("#button_payment").attr("enabled","true");
    $("#button_payment").prop("disabled",false);
    return;
}

function purchase_id(id){
    $("#"+url_form_data).find("#id").val(id);
}

function pack(id, amount) {
    //funcion de seleccioanr pack
    $.get(
            url_pack+"/"+url_user_id+"/"+id+"/"+amount,
            function(data) {
                //code
                try {
                    data = $.parseJSON(data);
                } catch(e) {
                    var success = 'false';
                    if (data['success']) {
                        success = data['success'];
                    }
                    var id = '';
                    if (data['id']) {
                        id = data['id'];
                    }
                    if (success == 'true') {
                        //code
                        message_valid();
                        block_packs();
                        purchase_id(id);
                    }else{
                        message_error();
                    }
                }
            }
        );
    
}

function voucher() {
    //lanza modal de voucher
    $("#modal_token").modal("show");
}

$(
    function() {
        //code
        url_user_id = $("#url_user_id").attr("data-url");
        url_pack = $("#url_pack").attr("data-url");
        url_voucher = $("#url_voucher").attr("data-url");
    }  
);