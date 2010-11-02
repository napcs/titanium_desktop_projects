var btnClearDatabase = Titanium.UI.createButton({
  title:'Delete Database',
	width:200,
	height:32,
	top: 10
});

btnClearDatabase.addEventListener('click', function()
{

    var db = Titanium.Database.open('notes_db');
    db.execute("delete from notes");
    db.close();
    
});

Titanium.UI.currentWindow.add(btnClearDatabase);


