$(function(){
  $("form#simpleform").submit(function(e){
    e.preventDefault();
    alert( "Hello " + $("#first_name").val() + " " + $("#last_name").val() + "."  );
  });
  
  
  
});