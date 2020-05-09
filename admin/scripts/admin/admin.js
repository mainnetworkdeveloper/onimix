$(
  function(){
    var menu_active = $("#url_menu").attr("data-url");
    var menus = $("#main_menu").children();
    $.each(
      $(menus),
      function( index, value ) {
        $(this).removeClass("active");
        $(this).removeClass("active");
        $(this).removeClass("opened");
        $(this).removeClass("root-level");
        $($(this).find("ul")).removeClass("visible");
      }
    );
    var active = $("#"+menu_active);
    active.addClass("active");
    active.addClass("opened");
    $(active.find("ul")).addClass("visible");
  }
);

/*
$(
  function(){
    var icon_base = $("#icon_menu_base");
    var icon_mobile = $("#icon_menu_mobile");
    icon_mobile.css("display","none");
    $(icon_base).data("close","true");
    $(icon_base).click(
      function(event){
        var close = $(icon_base).data("close");
        if(close == 'true'){
          $("#image_logo").css("display","none");
          $("#text_logo").css("display","none");
          $("#letter_logo").css("display","");
          $(icon_base).data("close","false");
        }else{
          $("#image_logo").css("display","");
          $("#text_logo").css("display","");
          $("#letter_logo").css("display","none");
          $(icon_base).data("close","true");
        }
        try{
          event.preventDefault();
        }catch(ex){}
      }
    );

    $(icon_mobile).data("close","true");
    $(icon_mobile).click(
      function(event){
        var close = $(icon_mobile).data("close");
        if(close == 'true'){
          $("#image_logo").css("display","none");
          $("#text_logo").css("display","none");
          $("#letter_logo").css("display","");
          $(icon_mobile).data("close","false");
        }else{
          $("#image_logo").css("display","");
          $("#text_logo").css("display","");
          $("#letter_logo").css("display","none");
          $(icon_mobile).data("close","true");
        }
        try{
          event.preventDefault();
        }catch(ex){}
      }
    );
  }
);
*/
var width;
function evaluate_width(){
  width = $(window).width();
  if(width<800){
    $("#main_menu").toggle();
    $("#icon_menu_mobile").css("display","none");
    $("#page_container").addClass("sidebar-collapsed");
    $("#link_collapse").click(
      function(){
        $("#main_menu").css("overflow","visible");
        $("#main_menu").toggle();
      }
    );
  }else{
    $("#page_container").removeClass("sidebar-collapsed");
  }
}
$(
  function(){
    var icon_base = $("#icon_menu_base");
    $("#icon_menu_mobile").css("display","none");

    evaluate_width();
    $( window ).resize(function() {
      evaluate_width();
      //$('[data-toggle="popover"]').popover('update');
    });


  }
);


$(
  function(){
    var tooltip_interval = setInterval(
      function(){
        if($.fn.tooltip) {
          clearInterval(tooltip_interval);
          $('[data-toggle="tooltip"]').tooltip();
        }
      },1000
    );
    /*
    var popover_interval = setInterval(
      function(){
        if($.fn.popover) {
          clearInterval(popover_interval);
          $('[data-toggle="popover"]').popover(
            {
              html : true,
              selector: true,
              content: function() {
                  var content = $(this).attr("data-content");
                  return content;
              },
              title: function() {
                  var title = $(this).attr("title");
                  title = '<i class="fas fa-info-circle fa-2x text-info"></i>  - '+title;
                  return title;
              },
              template: function(){
                var template = '<div class="popover" role="tooltip">'+
                                    '<div class="arrow"></div>'+
                                    '<h3 class="popover-header">'+
                                    '<i class="fas fa-info-circle text-info"></i>'+
                                    '</h3>'+
                                    '<div class="popover-body"></div>'+
                                '</div>';
                return template;
              }
            }
          );
        }
      },1000
    );
    */

  }
);
