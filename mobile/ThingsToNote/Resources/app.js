// Creates a tab group with Titanium.UI API.  
var tabGroup = Titanium.UI.createTabGroup();  
  
// Create the window "mainWin"  
var mainWin = Titanium.UI.createWindow ({  
    title: "Notes", // Set the title  
    backgroundColor: "#fff", // Set the background color to white  
    url: "notes.js" // Link to file which will handle the code for the window  
});  

// Create the window "prefs"  
var prefsWin = Titanium.UI.createWindow ({  
    title: "Preferences", // Set the title  
    backgroundColor: "#fff", // Set the background color to white  
    url: "prefs.js" // Link to file which will handle the code for the window  
});
  
// Create the tab "mainTab"  
var noteTab = Titanium.UI.createTab ({  
    title: "Notes", // Title of the tab: "Twitter"  
    window: mainWin // We will create the window "mainWin"  
});  

// Create the tab "mainTab"  
var prefsTab = Titanium.UI.createTab ({  
    title: "Prefs", // Title of the tab: "Twitter"  
    window: prefsWin // We will create the window "mainWin"  
});
  
//Add the tab to our tab group  
 tabGroup.addTab(noteTab);  
 tabGroup.addTab(prefsTab);  
 
 tabGroup.open();   




