var url_email;
var url_user_image;
var url_user_children;
var url_user_info;
var url_level;
var url_network_unilevel;

function get_object_id_children(object_id){
  var answer = new Array();
  var children = '';
  try{
    children = $("#"+object_id).attr("data-children");
  }catch(ex){}
  answer = children.split(",");
  for(var i in answer){
    answer[i] = 'header_level_'+answer[i];
  }
  return answer;
}

function get_id(object_id){
  var answer = '';
  try{
    answer = $("#"+object_id).attr("data-id");
  }catch(ex){}
  return answer;
}

function set_id(object_id,data){
  try{
    $("#"+object_id).attr("data-id",data);
  }catch(ex){}
}

function get_email(object_id){
  var answer = '';
  try{
    answer = $("#"+object_id).attr("data-email");
  }catch(ex){}
  return answer;
}

function set_email(object_id,data){
  try{
    $("#"+object_id).attr("data-email",data);
  }catch(ex){}
}

function generate_email_view(object_id,email){
  $("#"+object_id+" .alert").html(email);
}

function launch_modal(title, html, image){
  Swal.fire(
    {
      title:  title,
      type:   'info',
      html:   html,
      imageUrl: image,
      showCloseButton:        true,
      showCancelButton:       true,
      focusConfirm:           false,
      confirmButtonText:      '<i class="fa fa-thumbs-up"></i> Ok!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:       '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel:  'Thumbs down'
    }
  );
}

function launch_alert(id){
  if(id){
    //console.log(url_user_info);
    $.get(
      url_user_info+id,
      function(data){
        try{
          data = $.parseJSON(data);
        }catch(ex){}
        var title = '';
        var email = '';
        var name = '';
        var lastname = '';
        var active = 'Inactive';
        if(data['email']){
          email = data['email'];
        }
        if(data['name']){
          name = data['name'];
        }
        if(data['lastname']){
          lastname = data['lastname'];
        }
        if(data['active']){
          active = data['active']=='true'?'Active':'Inactive';
        }
        title = "User: "+email;
        var html = '';
        html = html + '<p><strong>Email: '+email+'</strong></p>';
        if(name.length>0){
            html = html + '<p><strong>Name: '+name+', &nbsp; '+lastname+'</strong></p>';
        }
        if(active.length>0){
            html = html + '<p><strong>Status: '+active+'</strong></p>';
        }
        var image = '';
        if(data['image']['image']){
          image = data['image']['image'];
        }
        launch_modal(title,html,image);
      }
    );
  }
}

function generate_alert_event(object_id,id){
  $("#"+object_id+" .info").data("id",id);
  $("#"+object_id+" .info").click(
    function(){
      var id = $(this).data('id');
      launch_alert(id);
    }
  );
}

function generate_view(object_id){
  var id = get_id(object_id);
  var email = get_email(object_id);
  if(!email){
    email = '--';
  }
  if(email==''){
    email = '--';
  }
  generate_email_view(object_id,email);
  generate_alert_event(object_id,id);
}

function generate_level(object_id){
  var id = get_id(object_id);
  var email = get_email(object_id);
  generate_view(object_id);
  //console.log("email: "+email);
  $.get(
    url_user_children+email+"/"+url_level,
    function(data){
      try{
        data = $.parseJSON(data);
      }catch(ex){}
      var emails = new Array();
      var children = new Array();
      if(data['success']){
        if(data['success']=='true'){
          var objects_id = get_object_id_children(object_id);
          var emails = new Array();
          var children = new Array();
          if(data['emails']){
            emails = data['emails'];
          }
          if(data['children']){
            children = data['children'];
          }
          for(var i in objects_id){
            if(children[i]){
                set_id(objects_id[i],children[i]);
            }
            if(emails[i]){
                set_email(objects_id[i],emails[i]);
            }
            generate_view(objects_id[i]);
          }
        }
      }
    }
  );
}

function generate_change_level(id){
  $("#"+id).change(
    function(){
      var value = $(this).find(":selected").val();
      window.location = url_network_unilevel+value;
      return;
    }
  );
}

$(
  function(){
    url_email = $("#url_email").attr("data-url");
    url_user_image = $("#url_user_image").attr("data-url");
    url_user_children = $("#url_user_children").attr("data-url");
    url_user_info = $("#url_user_info").attr("data-url");
    url_level = $("#url_level").attr("data-url");
    url_network_unilevel = $("#url_network_unilevel").attr("data-url");

    generate_level("header_level_1");
    generate_change_level("select_level");
  }
);
