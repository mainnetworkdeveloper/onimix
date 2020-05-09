$(
  function () {
    var menu_active = $("#url_menu").attr("data-url");
    var menus = $("#main_menu").children();
    $.each(
      $(menus),
      function (index, value) {
        $(this).removeClass("active");
        //$(this).removeClass("active");
        $(this).removeClass("opened");
        //$(this).removeClass("root-level");
        //$($(this).find("ul")).removeClass("visible");
      }
    );
    var active = $("#" + menu_active);
    active.addClass("active");
    active.addClass("opened");
    //$(active.find("ul")).addClass("visible");
  }
);
