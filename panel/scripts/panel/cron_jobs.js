var url_base;
var url_crons;
var list_indexes = new Array();
function generate_url_crons(){
  var crons = new Array();
  url_crons = url_crons.split('\\/').join("/");
  url_crons = url_crons.split("[").join("");
  url_crons = url_crons.split("]").join("");
  url_crons = url_crons.split("'").join("");
  try{
    crons = url_crons.split(",");
  }catch(ex){}
  var url_cron = '';
  //console.log(url_crons);
  for(var i in crons){
    url_cron = url_base+crons[i];
    if(list_indexes[i]){
        $("#url_crons").data(list_indexes[i],url_cron);
    }
  }
  $("#url_crons").data('index',0);
  return;
}

function cron_job(){
  var index = $("#url_crons").data('index');
  var name = '';
  var url_cron = '';
  if(index<list_indexes.length){
    if(list_indexes[index]){
      name = list_indexes[index];
      url_cron = $("#url_crons").data(name);
      if(!url_cron){url_cron='';}
      if(url_cron.length>0){
        //console.log(url_cron);
        //console.log(index);
        $.get(url_cron,function(data){
        });
      }
    }
    index++;
  }else{
    index = index%list_indexes.length;
  }

  $("#url_crons").data('index',index);
}

function call_cron_job(){
  setInterval(
    function(){
      cron_job();
    },1000
  );
}
$(
  function(){
    url_base = $("#url_base").attr("data-url");
    url_crons = $("#url_crons").attr("data-url");

    list_indexes.push("one");
    list_indexes.push("two");
    list_indexes.push("three");
    list_indexes.push("four");
    list_indexes.push("five");
    list_indexes.push("six");
    list_indexes.push("seven");
    list_indexes.push("eight");
    list_indexes.push("nine");
    list_indexes.push("ten");
    list_indexes.push("eleven");
    list_indexes.push("twelve");
    list_indexes.push("thirdteen");
    list_indexes.push("fourthteen");
    list_indexes.push("fifthteen");
    list_indexes.push("sixteen");
    list_indexes.push("seventeen");
    list_indexes.push("eightteen");
    list_indexes.push("nineteen");
    list_indexes.push("twenty");

    generate_url_crons();

    call_cron_job();
  }
);
