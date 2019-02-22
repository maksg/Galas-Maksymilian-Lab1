document.addEventListener('DOMContentLoaded', appStart);

var selectedNote = 0;

const NoteColor = {
    green: 'green',
    red: 'red'
};

function Note(title, content, color, pinned, createdDate) {
    this.title = title;
    this.content = content;
    this.color = color;
    this.pinned = pinned;
    this.createdDate = createdDate;

    this.getCreatedDate = function () {
        var date = createdDate.getDate();
        var month = createdDate.getMonth();
        var year = createdDate.getFullYear();
        var hours = createdDate.getHours();
        var minutes = createdDate.getMinutes();

        return `${date}.${month}.${year} ${hours}:${minutes}`
    }
}

var notes = [];

function appStart() {
    loadNotes();

    var newNoteButton = document.querySelector('#newNoteButton');
    newNoteButton.addEventListener('click', function (e) {
        var note = new Note('', '', NoteColor.green, false, new Date());
        addNote(note);
        notes.push(note);

        saveNotes();
    });

    notes.forEach( note => {
        addNote(note);
    });

    var noteTitle = document.querySelector('#noteTitle');
    noteTitle.addEventListener('input', function (e) {
        notes[selectedNote].title = e.target.value;
        updateNoteCells();
    });

    var noteContent = document.querySelector('#noteContent');
    noteContent.addEventListener('input', function (e) {
        notes[selectedNote].content = e.target.value;
        updateNoteCells();
    });
}

function addNote(note) {
    var notesTable = document.querySelector('#notesTable');
    var notesTableCells = notesTable.querySelectorAll('tr td');
    notesTableCells.forEach(cell => {
        cell.style.backgroundColor = '';
    })

    var row = notesTable.insertRow(0);
    var cell = row.insertCell(0);
    cell.note = note;
    cell.style.backgroundColor = 'red';
    cell.innerHTML = `<b>${note.title}</b><br><p>${note.content}</p><br><p>${note.getCreatedDate()}</p>`;

    noteTitle.value = note.title;
    noteContent.value = note.content;
    
    notesTableCells = notesTable.querySelectorAll('tr td');
    for (var i = 0; i < notesTableCells.length - 1; i++) {
        notesTableCells[i].onclick = selectNote(i, notesTableCells);
    }

    selectedNote = notesTableCells.length - 2;
}

function updateNoteCells() {
    var notesTable = document.querySelector('#notesTable');
    var notesTableCells = notesTable.querySelectorAll('tr td');

    for (var i = 0; i < notesTableCells.length - 1; i++) {
        var cell = notesTableCells[i];
        var index = notesTableCells.length - 2 - i;
        var note = notes[index];
        cell.innerHTML = `<b>${note.title}</b><br><p>${note.content}</p><br><p>${note.getCreatedDate()}</p>`;
    }

    saveNotes();
}

function colorNotes() {

}

function loadNotes() {
    var loadedNotes = JSON.parse(localStorage.getItem('notes'));

    if (loadedNotes == null) {
        notes = [new Note('dżem', 'gffg', NoteColor.green, false, new Date())];
    } else {
        notes = [];
        loadedNotes.forEach(note => {
            notes.push(new Note(note.title, note.content, note.color, note.pinned, new Date(note.createdDate)));
        });
    }
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

var selectNote = function (i, notesTableCells) {
    return function () {
        var currentCell = notesTableCells[i];
        notesTableCells.forEach(cell => {
            cell.style.backgroundColor = '';
            cell.style.borderColor = 'black';
            if (cell.pinned) {
                cell.style.borderWidth = "20px";
            } else {
                cell.style.borderWidth = "1px";
            }
        })
        currentCell.style.backgroundColor = 'red';

        selectedNote = notesTableCells.length - 2 - i;

        var note = notes[selectedNote];
        noteTitle.value = note.title;
        noteContent.value = note.content;
    }
}