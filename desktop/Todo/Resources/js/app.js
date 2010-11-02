$(function(){
  $("form#task_form").submit(function(e){
     e.preventDefault();
     var textfield = $("#task");
     var tasks_list = $("#tasks");
     var task = $('<input type="checkbox">');
     task.click(function(e){
       if($(this).attr('checked')){
         $(this).parent().addClass("disabled");
       }else{
         $(this).parent().removeClass("disabled");
       }
     });
     var label = $("<label>" + textfield.val() +"</label>");
     label.prepend(task);
     var item = $("<li>").append(label);
     tasks_list.append(item);
     textfield.val("");
   });
});