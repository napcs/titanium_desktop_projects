// Create the window for the notes form  
var noteWin = Titanium.UI.createWindow ({  
    title: "Edit Note", // Set the title  
    backgroundColor: "#fff", // Set the background color to white  
});

noteWin.open();
noteWin.hide();

var lblTitle = Titanium.UI.createLabel({
	text:'Title.',
	font:{fontSize:14},
	left:10,
	top:10,
	width:300,
	height:20
});
noteWin.add(lblTitle);


var txtTitle = Titanium.UI.createTextField({
	value:'',
	height:35,
	top:30,
	left:10,
	width:300,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

noteWin.add(txtTitle);

var lblBody = Titanium.UI.createLabel({
	text:'Body.',
	font:{fontSize:14},
	left:10,
	top:80,
	width:300,
	height:20
});
noteWin.add(lblBody);


var txtBody = Titanium.UI.createTextArea({
	value:'',
	height:180,
	width:300,
	top:100,
	font:{fontSize:20,fontFamily:'Marker Felt', fontWeight:'bold'},
	color:'#888',
	textAlign:'left',
	appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,	
	//keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
	returnKeyType:Titanium.UI.RETURNKEY_EMERGENCY_CALL,
	suppressReturn:false

});
noteWin.add(txtBody);

var btnSave = Titanium.UI.createButton({
	title:'Save',
	height:40,
	width:90,
	top:280,
	left: 10
});
noteWin.add(btnSave);

btnSave.addEventListener('click', function()
{
  saveNote();
});

var btnClose = Titanium.UI.createButton({
	title:'Close',
	height:40,
	width:90,
	top:280,
	left: 110
});

noteWin.add(btnClose);

btnClose.addEventListener('click', function()
{
	noteWin.hide();
});


var btnDelete = Titanium.UI.createButton({
	title:'Delete',
	height:40,
	width:90,
	top:280,
	left: 210
});

noteWin.add(btnDelete);

btnDelete.addEventListener('click', function()
{
   deleteNote(btnSave.noteId);
 	 noteWin.hide();
 	 fetchNotes();
});






// table view
var tableview = Titanium.UI.createTableView({
  top: 50
});


// create table view event listener
tableview.addEventListener('click', function(e)
{
	// event data
	var index = e.index;
	var section = e.section;
	var row = e.row;
	var rowdata = e.rowData;
  //Titanium.UI.createAlertDialog({title:'Table View',message:'row ' + row + ' index ' + index + ' section ' + section  + ' title ' + rowdata.title + 'id: ' + rowdata.noteId}).show();

  loadRecord(rowdata.noteId);


});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);


var btnNew = Titanium.UI.createButton({
	title:'New',
	height:40,
	width:300,
	top: 10
});
Titanium.UI.currentWindow.add(btnNew);

btnNew.addEventListener('click', function()
{
  initForm();
});

var db_name = 'notes_db';

var makeDB = function(){
  // Database Creation

  var db = Titanium.Database.open(db_name);
  db.execute('CREATE TABLE IF NOT EXISTS notes  (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT)');
  db.close();
}

// Load record from the database and display the form page
var loadRecord = function(id){
  
  var db = Titanium.Database.open(db_name);
  var row = db.execute('SELECT * FROM notes WHERE id = ?', id);
	if(row.getRowCount() == 1)
   {
     id = row.fieldByName('id');
     title = row.fieldByName('title');
     body = row.fieldByName('body');
     showForm(id, title, body);
   }else{
     messageBox("No record was found");
   }
   row.close();
   db.close();
  
};

// shows a blank form, ready for a new record
var initForm = function(){
	txtTitle.value ="";
	txtBody.value ="";
	btnSave.noteId = null;
	noteWin.show();
	btnDelete.hide();
}

// Show the actual form
// Populate it with data.
var showForm = function(id, title, body){
  txtBody.value = body;
  txtTitle.value = title;
  btnSave.noteId = id;
  noteWin.show();
  if(btnSave.noteId){
    btnDelete.show();
  }else{
    btnDelete.hide();
  }
};


// add a note to the database
var insertNote = function(title, body){
  var db = Titanium.Database.open(db_name);
  
  db.execute('INSERT INTO notes(title, body) VALUES(?, ?)', title, body);
  var id = db.lastInsertRowId;
  addToNotesList(id, title, body);
  db.close();
 // messageBox("Added record with id: " + id);
  return(id);
};

// Updates an existing record;
var updateNote = function(id, title, body){
  var db = Titanium.Database.open(db_name);
  db.execute("UPDATE notes SET title = ?, body = ? where id = ?", title, body, id )
  changed = db.rowsAffected;
 // messageBox(changed + " rows affected");
  db.close();
}

// Updates an existing record;
var deleteNote = function(id){
  var db = Titanium.Database.open(db_name);
  db.execute("DELETE from notes WHERE id = ?",id )
  changed = db.rowsAffected;
 // messageBox(changed + " rows affected");
  db.close();
}



var messageBox = function(msg){
  Titanium.UI.createAlertDialog({title:'Message', message: msg}).show();  
}

var saveNote = function(){
  id = btnSave.noteId;
  title = txtTitle.value;
  body = txtBody.value;
  
  // messageBox("id: " + id);    
    
  if(id){
    updateNote(id, title, body);
  }else{
    insertNote(title, body);    
  }
  fetchNotes();
  noteWin.hide();
}

// Create a table row for the note
var addToNotesList = function(id, title){
  tableview.appendRow({hasChild:true,title: title, className: "note_row", noteId: id});
}

// Get all the notes from the database. Iterate, create table row.
// Inits the tableview to remove current contents.
var fetchNotes = function(){
  var db = Titanium.Database.open(db_name);
  var rows = db.execute('SELECT id, title FROM notes');
  tableview.data = [];
  while (rows.isValidRow())
  {
    id = rows.fieldByName('id');
    title = rows.fieldByName('title');    
    addToNotesList(id, title);
    
  	rows.next();
  }
  rows.close();
  db.close();
  
};

// Create the database!
makeDB();

// Populate the page with notes
fetchNotes();