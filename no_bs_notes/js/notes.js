Parse.initialize("kL1NFNINEGFag94CWEM6LmL7xRxPzVvAPNhAO6nZ",
	"xlKdh66kYBpTJ33FneuyDkuzlayFQ2HDGfMHgeD1");
var NoteUser = Parse.Object.extend("NoteUser");
var SEARCH_COMMAND = '/?';
var DELETE_COMMAND = '/X';
var EDIT_COMMAND = '/E';

/*
 * If space bar is clicked, we take you to enter the notes.
 */
document.onkeyup = function(e) {
	var keycode = e.keyCode ? e.keyCode : e.charCode;
	if (keycode == 32 && document.activeElement.id != 'enterNotes') {

		document.getElementById('enterNotes').focus();
	}
}

var removeElement = function(id) {
	elem = document.getElementById(id);
	if (!elem)
		return;
	else
		elem.parentNode.removeChild(elem);
}

var NoteObject = Parse.Object.extend("NoteObject");

var loggedInUser = window.location.href.split('?loggedInUser=')[1];


var username = loggedInUser;

var user = loggedInUser;

getUser();
/*


	if (user==='undefined'||!user)
	{
	 window.location = 'http://harshabhat86.github.io/no_bs_notes/html/index.html';
	}
	else
	{
	 var logoutInfo = '<div id="logout" onclick="logout();">Logout</div>'
	 
	}

*/
function logout()
{
	user = '';
	loggedInUser = '';
	window.location = 'http://harshabhat86.github.io/no_bs_notes/html/index.html';
}
var count = 0;

var ulElem = 'stickies';
var containerDiv = 'stickyContainer';
var hashtagRegexp = '/(\S*#\[[^\]]+\])|(\S*#\S+)/gi';

String.prototype.parseHashtag = function() {
	return this.replace(/(\S*#\[[^\]]+\])|(\S*#\S+)/gi, function(t) {
		var tag = t.replace("#", "%23")
		return t.italics();
	});
};

/*
 * while(1){ var el = document.getElementById("enterNotes"); if (el){
 * console.log("text is:"+el.value);
 * el.addEventListener("keydown",keyDownTextField , false); break; } }
 */
var NoteBook = function() {
	this.owner = null;
	this.numNotes = 0;
	this.notes = new Array();
}

NoteBook.prototype.init = function(owner, numNotes, allNotes) {

	this.owner = owner;
	this.numNotes = numNotes;
	this.notes = allNotes;

}

NoteBook.prototype.renderAllNotes = function() {

	removeElement('stickies');
	removeElement('NoNotesDiv');
	ul = document.createElement('ul');
	ul.id = ulElem;
	if (this.numNotes==0){
		myDiv = document.createElement('div');
		myDiv.className = 'form-group has-error';
		myDiv.id = 'NoNotesDiv';
		myDiv.innerHTML = "No Notes for you!"
		
		document.getElementById(containerDiv).appendChild(myDiv);
		resetEditNote();
		return;
		
	}
	for ( var int = 0; int < this.numNotes; int++) {
		var note = new aNote();
		note = this.notes[int];
		ul.insertBefore(note.toHTML(), ul.firstChild);

	}

	document.getElementById(containerDiv).appendChild(ul);

	resetEditNote();
}

/*
 * Get the notes from the server .
 */
NoteBook.prototype.getNotesForUser = function() {
	this.getFromServer();
}

/*
 * Get the notes from the Parse server and render all of them on the client if
 * successful.
 * 
 */
NoteBook.prototype.getFromServer = function() {

	var retNoteQuery = new Parse.Query(NoteObject);
	retNoteQuery.equalTo("owner", this.owner);
	retNoteQuery.ascending("updatedAt");
	retNoteQuery.find(
					{
						/* We become free of Parse after this method. */
						success : function(results) {
							
							window.noteBook.notes = window.noteBook
									.parseToMyNote(results);
							window.noteBook.numNotes = results.length;
							window.noteBook.renderAllNotes();

						}
					},
					{
						error : function() {
							alert("Oops!! There was some error we faced. May be you should try again in some time.");
						}
					});

}

NoteBook.prototype.parseToMyNote = function(parseArray) {

	var noteArray = new Array();

	for ( var i = 0; i < parseArray.length; i++) {
		pa = parseArray[i].attributes;
		tnote = new aNote();
		tnote.init(parseArray[i].id, pa.text, pa.title, pa.owner, pa.tags);
		noteArray.push(tnote);
	}
	return noteArray;
}

NoteBook.prototype.getNote = function(noteId) {
	for ( var i = 0; i < this.numNotes; i++) {
		if (this.notes[i].id == noteId)
			return this.notes[i];
	}
	return '';
}


NoteBook.prototype.searchHashTag = function(searchString){
	
	for (var i =0;i<this.notes.length;i++){
		tagString = this.notes[i].getHashTag().join(',');
		if (tagString.indexOf(searchString)==-1)
			{
				
				this.hideNote(this.notes[i].id);
			}
	}
	
	
	
}



NoteBook.prototype.hideAllNotes = function(){
	for (var i =0;i<this.notes.length;i++){
		
		document.getElementById(this.notes[i].id+"_li").style.display = 'none';
		
	}
}

NoteBook.prototype.showAllNotes = function(){
	for (var i =0;i<this.notes.length;i++){
		
		document.getElementById(this.notes[i].id+"_li").style.display = '';
		
	}
}

NoteBook.prototype.showNote = function(noteId){
		if (document.getElementById(noteId+"_li"))
		document.getElementById(noteId+"_li").style.display = '';
	
}

NoteBook.prototype.hideNote = function(noteId){
	if (document.getElementById(noteId+"_li"))
	document.getElementById(noteId+"_li").style.display = 'none';

}
/** ************************************************** */

var aNote = function() {
	this.id = '';
	this.text = '';
	this.title = '';
	this.owner = '';
	this.archived = false;
	this.tags = new Array();

}
aNote.prototype = {};

aNote.prototype.init = function(id, text, title, owner, tags) {
	this.id = id;
	this.text = text;
	this.title = title;
	this.owner = owner;
	this.tags = tags;

}

aNote.prototype.toHTML = function() {

	li = document.createElement('li');
	
	hashTagLink = highlightHashTag(this.text);
	hashTagLink = hashTagLink.replace(/\r\n|\r|\n/g,"<br />")
	var str = "<a id='"
			+ this.id
			+ "' class='stickyNote' >"
			+ "<img id='"
			+ this.id
			+ "_edit' class='icon edit' src='../images/pencil.png' onclick='editNote(\""
			+ this.id
			+ "\")'  />"
			+ "<img id='"
			+ this.id
			+ "_delete' class='icon delete' src='../images/cross.png' onclick='deleteNote(\""
			+ this.id + "\")'/>" + "<p>" + hashTagLink + "</p> " + "</a>";
	li.innerHTML = str;
	li.id = this.id + "_li";

	return li;

}

aNote.prototype.update = function() {

	var parseObj = new NoteObject();
	var nQuery = new Parse.Query(NoteObject);
	nQuery.get(	this.id,
					{
						success : function(parseObj) {
							var note = window.noteBook.getNote(parseObj.id);
							
							parseObj.set("text", note.text);
							parseObj.set("title", note.title);
							parseObj.set("owner", note.owner);
							parseObj.set("tags", note.tags);
							parseObj.save(null, {
								success : function() {
									
									window.noteBook.getFromServer();
								}
							});

						},
						error : function(parseObj, error) {
							alert('Sorry, Could not retrieve the note. Please try again later.');
						}
					});

}

aNote.prototype.destroy = function() {

	if (this.id == '')
		return;
	var parseObj = new NoteObject();
	var nQuery = new Parse.Query(NoteObject);
	nQuery
			.get(
					this.id,
					{
						success : function(parseObj) {
							parseObj
									.destroy({
										success : function() {
											window.noteBook.getFromServer();
										},
										error : function() {
											alert('Sorry, there was some error deleting the object');
										}
									});

						},
						error : function(parseObj, error) {
							alert('Sorry, Could not retrieve the note. Please try again later.');
						}
					});

}

aNote.prototype.saveToServer = function() {

	var noteObject = new NoteObject();

	noteObject
			.save(
					{

						text : this.text,
						title : this.title,
						owner : this.owner,
						archived : this.archived,
						tags : this.tags
					},
					{
						success : function(noteObject) {

							console.log("Note Saved with ID " + noteObject.id);
							window.noteBook.getFromServer();
						},
						error : function(noteObject, error) {
							alert('The record could not be saved unfortunately. Please try again in sometime.'
									+ error);
						}

					});

}

aNote.prototype.getParseObject = function() {

	var noteObject = new NoteObject();
	var nQuery = new Parse.Query(NoteObject);
	nQuery
			.get(
					this.id,
					{
						success : function(noteObject) {

						},
						error : function(object, error) {
							alert('Sorry, Could not retrieve the note. Please try again later.');
						}
					});

	return noteObject;
}

aNote.prototype.getHashTag = function(){
	
	if (this.tags)
		{
			return this.tags;
		}
	return new Array();
}

/*
 * Temporary code. To be made solid...... or may be, we can retain this. Will
 * think later.
 * 
 */

//var noteBook = new NoteBook();
//noteBook.init(user, 0, []);
//noteBook.getFromServer();

function editNote(id) {
	var note = new aNote();
	note = noteBook.getNote(id);
	if (note == '')
		return;

	elem = document.getElementById('enterNotes');
	elem.value = note.text;
	elem.setAttribute('data-noteid', note.id);
	elem.setAttribute('data-noteediting', 'true');
	elem.focus();
}

function resetEditNote() {
	elem = document.getElementById('enterNotes');
	elem.value = '';
	elem.setAttribute('data-noteid', '');
	elem.setAttribute('data-noteediting', 'false');
	elem.focus();
}

function deleteNote(id) {
	var note = new aNote();
	note = noteBook.getNote(id);
	if (note == '')
		return;
	note.destroy();

}
function highlightHashTag(str) {

	allTags = getHashTags(str);
	if (allTags != null)
		for ( var int = 0; int < allTags.length; int++) {

			tag = allTags[int];
			spanTag = '<span class="hashtag" onClick="searchForTag(\''+tag+'\')" >' + tag + '</span>';
			str = str.replace(tag, spanTag);
		}

	return str;

}

function searchForTag(searchString){
	
	window.noteBook.searchHashTag(searchString);
	
}


function getHashTags(str) {

	if (str != null)
		return str.match(/(\S*#\[[^\]]+\])|(\S*#\S+)/gi);

}

/*
 * 
 * Get user information from PArse DB to check if the user exists in the system.
 */
function getUser(){
	
	var noteUser = new Parse.Query(NoteUser);
	noteUser.equalTo("noteUserId", window.username);
	
	noteUser.find(
			{
				/* We become free of Parse after this method. */
				success : function(results) {
					
					if (results.length ==0){
						alert("We dont see this user in the system. Please sign up and then come here.");
						 window.location = 'http://harshabhat86.github.io/no_bs_notes/html/index.html';
					}
					else
						{
						var noteBook = new NoteBook();
						noteBook.init(window.user, 0, []);
						noteBook.getFromServer();
						}

				}
			},
			{
				error : function() {
					alert("Oops!! There was some error we faced. May be you should try again in some time.");
				}
			});
	
}


function keyDownTextField(e) {
	
	var elem = document.getElementById('enterNotes');
	var tempNoteId = elem.getAttribute('data-noteid');
	var tempNoteEditing = elem.getAttribute('data-noteediting');
	
	if(elem.value=='')
		{
			document.getElementById('helpText').innerHTML = '';
		}
	else
		{
			document.getElementById('helpText').innerHTML = 'Press Ctrl+Enter (Ctrl+Return) to save a note!';
		}
	var keycode = e.keyCode ? e.keyCode : e.charCode;
	
	if (e.ctrlKey==true && keycode == 13) {
		
		
			
		var text = elem.value;
		
		var title = elem.value.substr(0, 4) + '...';
		var allTags = getHashTags(text);
		var owner = user;

		if (tempNoteId == '' && tempNoteEditing == 'false') {

			var note = new aNote();
			note.init('', text, title, owner, allTags);
			note.saveToServer();
			
		} else {
			var note = new aNote();
			note = window.noteBook.getNote(tempNoteId);
			note.init(tempNoteId, text, title, owner, allTags);
			if (note == '')
				return;
			note.update();

		}
		
		resetEditNote();
	}

}




