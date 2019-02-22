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

function appStart() {
    var notes = [new Note("Test 1", "sdgs gsggdgsdg sdsd ", NoteColor.red, false, Date.now()),
    new Note("Test Drugi", "hhhhhhh ", NoteColor.green, true, Date.now())];

    var newNoteButton = document.querySelector('#newNoteButton');
    newNoteButton.addEventListener('click', function (e) {
        var note = new Note("", "", NoteColor.green, false, Date.now());
        addNote(note);
        notes.push(note);
    });

    notes.forEach( note => {
        console.log(note);
        addNote(note);
    });
    
    var noteTitle = document.querySelector('#noteTitle');
    var noteText = document.querySelector('#noteText');
}

function addNote(note) {
    var notesTable = document.querySelector('#notesTable');
    var notesTableCells = notesTable.querySelectorAll('tr td');
    notesTableCells.forEach(cell => {
        cell.style.backgroundColor = '';
    })
    var row = notesTable.insertRow(0);
    var cell = row.insertCell(0);
    cell.style.backgroundColor = 'red';
    cell.innerHTML = `<b>${note.title}</b><br><p>${note.content}</p>`;
    //cell.addEventListener('click', selectNote);
    
    notesTableCells = notesTable.querySelectorAll('tr td');
    for (i = 0; i < notesTableCells.length - 1; i++) {
        var currentCell = notesTableCells[i];
        var selectNote = function(i, currentCell) {
            return function() {
                notesTableCells.forEach(cell => {
                    cell.style.backgroundColor = '';
                })
                selectedNote = i;
                currentCell.style.backgroundColor = 'red';
            };
        };
        currentCell.onclick = selectNote(i, currentCell);
    }
}

//function selectNote(e) {
//}