$(function(){
  
  disableSave();
  
  $("#code_editor").keypress(function(){
    if($(this).val() == ""){
      disableSave();
    }else{
      enableSave();
    }
  });  
  

  
  
  $("#load").click(function(){
    var options = {  
       multiple: false,  
       title: "Select file to open...",  
       types: ['rb', "js", "css", "sass", "haml", 'txt'],  
       typesDescription: "Useful source code files",  
       path: Titanium.Filesystem.getUserDirectory()  
    }  
    Titanium.UI.openFileChooserDialog(openFile, options);
    
  });
  
  $("#save").click(function(){
    var options = {  
       title: "Save file as...",  
       typesDescription: "All files",  
       path: Titanium.Filesystem.getUserDirectory()  
    }  
      
    Titanium.UI.openSaveAsDialog(saveFile, options);
  })
  
  
});

// Opens the file at the given location and 
// populates the text area with the file's contents
// Invoked by  Titanium.UI.openFileChooserDialog
openFile = function(filenames){
  var fileSelected = filenames[0];  
  $("#code_editor").val(read_file(fileSelected));
};

// Saves the contents of the textarea to the
// file at the specified location.
// Invoked by  Titanium.UI.openSaveAsDialog
saveFile = function(filenames){
  var fileSelected = filenames[0];  
  contents = $$("#code_editor").val();
  write_file(fileSelected, contents);
};

disableSave = function(){
  $("#save").attr("disabled", "disabled");
  $("#save").addClass("disabled");
  
}

enableSave = function(){
  $("#save").removeAttr("disabled");
  $("#save").removeClass("disabled");
}
