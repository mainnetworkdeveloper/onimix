var url_progress = '';

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
      $("#panel_progress .stats-number").html(percent+" %");
      $("#panel_progress .progress-bar").css("width",percent+"%");
      $("#panel_progress .progress-bar").attr("aria-valuenow",percent);
      $("#panel_progress .alert").html("Barra de progreso , tope de comision al "+percent+"% ");
    }
  );
}

$(
  function(){
    url_progress = $("#url_progress").attr("data-url");
    generate_progress();
  }
);
