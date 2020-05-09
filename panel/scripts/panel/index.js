var url_user_image;
var url_image_change;
var url_uploads;
var source_image;
var token_day = '';
var token_updated = '';

function load_source_image(){
  $("#nav_user_image").attr("src",source_image);
  $("#sidebar_user_image").attr("src",source_image);
  return;
}

function get_source_image(){
  $.get(
    url_user_image,
    function(data){
      try{
        data = $.parseJSON(data);
      }catch(ex){}
      source_image = '';
      if(data['file_image']){
        source_image = url_uploads + data['file_image'];
        load_source_image();
      }
    }
  );
}

function get_change(){
    token_day = $("#nav_user_image").data("token_day");
    console.log("token day: "+token_day);
    $.get(
      url_image_change+token_day,
      function(data){
        try{
          data = $.parseJSON(data);
        }catch(ex){}
        if(data['token_updated']){
          token_updated = data['token_updated'];
        }
        if(data['change']){
          if(data['change']=='true'){
            console.log(data);
            console.log("token update: "+token_updated);
            $("#nav_user_image").data("token_day",token_updated);
            get_source_image();
          }
        }
      }
    );
}

$(
  function (){
    url_user_image = $("#url_user_image").attr("data-url");
    url_image_change = $("#url_image_change").attr("data-url");
    url_uploads = $("#url_uploads").attr("data-url");

    $("#nav_user_image").data("token_day","");
    get_change();
    setInterval(
      function(){
        get_change();
      },
      3000
    );

  }
);
