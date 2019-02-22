document.addEventListener('DOMContentLoaded', appStart);

var selectedNote = 0;

const NoteColor = {
    green: "green",
    red: "red"
};

function Note(title, content, color, pinned, createdDate) {
    this.title = title;
    this.content = content;
    this.color = color;
    this.pinned = pinned;
    this.createdDate = createdDate;
}

var notes = [new Note("Test 1", "sdgs gsggdgsdg sdsd ", NoteColor.red, false, Date.now()),
            new Note("Test Drugi", "hhhhhhh ", NoteColor.green, true, Date.now())];

function appStart() {
    var newNoteButton = document.querySelector('#newNoteButton');
    newNoteButton.addEventListener('click', function (e) {
        var note = new Note("", "", NoteColor.green, false, Date.now());
        addNote(note);
        notes.push(note);
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
    cell.innerHTML = `<b>${note.title}</b><br><p>${note.content}</p>`;

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
        cell.innerHTML = `<b>${note.title}</b><br><p>${note.content}</p>`;
    }
}

function colorNotes() {

}

var selectNote = function (i, notesTableCells) {
    return function () {
        var currentCell = notesTableCells[i];
        notesTableCells.forEach(cell => {
            cell.style.backgroundColor = '';
            if (cell.pinned) {
                cell.style.borderWidth = "4px";
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