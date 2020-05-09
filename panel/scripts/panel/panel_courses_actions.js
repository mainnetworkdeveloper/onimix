function view(id) {
    //code
    window.location = url_view + '/' + id;
    return;
}
var url_view = '';
$(
  function(){
    url_view = $("#url_view").attr("data-url");
  }
);