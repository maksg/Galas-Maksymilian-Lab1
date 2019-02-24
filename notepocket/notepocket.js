document.addEventListener('DOMContentLoaded', appStart);

var selectedNote = 0;
var notes = [];

const NoteColor = {
    red: '#b71c1c',
    green: '#1b5e20',
    blue: '#0d47a1'
}

function Note(title, content, color, pinned, createdDate) {
    this.title = title;
    this.content = content;
    this.color = color;
    this.pinned = pinned;
    this.createdDate = createdDate;

    // Get note created date string
    this.getCreatedDate = function () {
        var date = createdDate.getDate();
        var month = createdDate.getMonth();
        var year = createdDate.getFullYear();
        var hours = createdDate.getHours();
        var minutes = createdDate.getMinutes();

        return `${date}.${month}.${year} ${hours}:${minutes}`
    }
}

function appStart() {
    loadNotes();

    // Add click action to new note button
    var newNoteButton = document.querySelector('#newNoteButton');
    newNoteButton.addEventListener('click', function (e) {
        var note = new Note('', '', NoteColor.red, false, new Date());
        addNote(note);
        notes.push(note);
        sortNotes();
        saveNotes();
    });

    // Add text change listener to note title
    var noteTitle = document.querySelector('#noteTitle');
    noteTitle.addEventListener('input', function (e) {
        notes[selectedNote].title = e.target.value;
        updateNoteCells();
    });

    // Add text change listener to note content
    var noteContent = document.querySelector('#noteContent');
    noteContent.addEventListener('input', function (e) {
        notes[selectedNote].content = e.target.value;
        updateNoteCells();
    });

    // Add click action to pin button
    var pinButton = document.querySelector('#pinButton');
    pinButton.innerHTML = notes[selectedNote].pinned ? 'Odepnij' : 'Przypnij';
    pinButton.addEventListener('click', function (e) {
        notes[selectedNote].pinned = !notes[selectedNote].pinned;
        sortNotes();
        updateNoteCells();
    });

    // Add click action to color buttons
    var colorButtons = document.querySelectorAll('.colorButton');
    colorButtons.forEach(button => {
        var colorValue = button.value;
        if (colorValue == 'red') {
            button.style.backgroundColor = NoteColor.red;
        } else if (colorValue == 'green') {
            button.style.backgroundColor = NoteColor.green;
        } else if (colorValue == 'blue') {
            button.style.backgroundColor = NoteColor.blue;
        }

        button.addEventListener('click', function (e) {
            var color = NoteColor.red;
            var colorValue = e.target.value;

            if (colorValue == 'red') {
                color = NoteColor.red;
            } else if (colorValue == 'green') {
                color = NoteColor.green;
            } else if (colorValue == 'blue') {
                color = NoteColor.blue;
            }
            
            notes[selectedNote].color = color;
            noteContent.style.backgroundColor = color;
            saveNotes();
        });
    });
}

// Create new note
function addNote(note) {
    var notesTable = document.querySelector('#notesTable');
    var notesTableCells = notesTable.querySelectorAll('tr td');
    notesTableCells.forEach(cell => {
        cell.style.backgroundColor = '';
    })

    var row = notesTable.insertRow(0);
    var cell = row.insertCell(0);
    cell.note = note;
    cell.style.backgroundColor = '#4e342e';
    cell.pinned = false;
    cell.innerHTML = `<b>${note.title}</b><br><p>${note.content}</p><br><p>${note.getCreatedDate()}</p>`;

    noteTitle.value = note.title;
    noteContent.value = note.content;
    
    notesTableCells = notesTable.querySelectorAll('tr td');
    for (var i = 0; i < notesTableCells.length - 1; i++) {
        notesTableCells[i].onclick = selectNote(i, notesTableCells);
    }

    selectedNote = notesTableCells.length - 2;
}

// Update note cells in table
function updateNoteCells() {
    var notesTable = document.querySelector('#notesTable');
    var notesTableCells = notesTable.querySelectorAll('tr td');

    for (var i = 0; i < notesTableCells.length - 1; i++) {
        var cell = notesTableCells[i];
        var index = notesTableCells.length - 2 - i;
        var note = notes[index];
        cell.innerHTML = `<b>${note.title}</b><br><p>${note.content}</p><br><p>${note.getCreatedDate()}</p>`;
        if (index == selectedNote) {
            cell.style.backgroundColor = '#4e342e';
        } else if (note.pinned) {
            cell.style.backgroundColor = 'gray';
        } else {
            cell.style.backgroundColor = '';
        }
    }

    saveNotes();
}

// Load notes from local storage
function loadNotes() {
    var loadedNotes = JSON.parse(localStorage.getItem('notes'));

    if (loadedNotes == null) {
        notes = [new Note('', '', NoteColor.red, false, new Date())];
    } else {
        notes = [];
        loadedNotes.forEach(note => {
            notes.push(new Note(note.title, note.content, note.color, note.pinned, new Date(note.createdDate)));
        });
    }

    sortNotes();

    var notesTableCells = notesTable.querySelectorAll('tr td');
    selectNote(0, notesTableCells)();
}

// Save notes to local storage
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Sort notes
function sortNotes() {
    let currentNote = notes[selectedNote];

    notes.sort(function (a, b) {
        if (a.pinned) {
            if (b.pinned) {
                return a.createdDate - b.createdDate
            } else {
                return 1;
            }
        } else {
            if (b.pinned) {
                return -1;
            } else {
                return a.createdDate - b.createdDate
            }
        }
    });

    // Clear table
    var notesTable = document.querySelector('#notesTable');
    var notesTableCells = notesTable.querySelectorAll('tr');
    for (var i = 0; i < notesTableCells.length - 1; i++) {
        notesTableCells[i].remove();
    }

    // Add notes
    notes.forEach(note => {
        addNote(note);
    });

    // Reselect note
    notesTableCells = notesTable.querySelectorAll('tr td');
    var index = notes.findIndex(note => note == currentNote);
    index = notesTableCells.length - 2 - index;
    selectNote(index, notesTableCells)();
}

// Select clicked note
var selectNote = function (i, notesTableCells) {
    return function () {
        selectedNote = notesTableCells.length - 2 - i;

        var note = notes[selectedNote];
        noteTitle.value = note.title;
        noteContent.value = note.content;
        noteContent.style.backgroundColor = note.color;
        pinButton.innerHTML = note.pinned ? 'Odepnij' : 'Przypnij';

        updateNoteCells();
    }
}