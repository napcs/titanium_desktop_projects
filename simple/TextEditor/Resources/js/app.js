$(function(){
  
  // disable save by default.
  disableSave();
  
  // disable save if there's nothing in the 
  // editor to save. Excuse to show that
  // jquery's keypres events work too
  $("#code_editor").keypress(function(){
    if($(this).val() == ""){
      disableSave();
    }else{
      enableSave();
    }
  });  
  

  // Event for clicking the load button
  // Opens the load file button and loads the file
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
  
  // Event for clicking the save button - triggers the dialog and 
  // saves file to the given location.
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

// Disables the save button
disableSave = function(){
  $("#save").attr("disabled", "disabled");
  $("#save").addClass("disabled");
}

// Enables the save button
enableSave = function(){
  $("#save").removeAttr("disabled");
  $("#save").removeClass("disabled");
}
