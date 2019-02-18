document.addEventListener('DOMContentLoaded', appStart);

var selectedNote = 0;

function appStart() {
    var newNoteButton = document.querySelector('#newNoteButton');
    newNoteButton.addEventListener('click', createNewNote);
    
    var noteTitle = document.querySelector('#noteTitle');
    var noteText = document.querySelector('#noteText');
}

function createNewNote(e) {
    var notesTable = document.querySelector('#notesTable');
    var notesTableCells = notesTable.querySelectorAll('tr td');
    notesTableCells.forEach(cell => {
        cell.style.backgroundColor = '';
    })
    var row = notesTable.insertRow(0);
    var cell = row.insertCell(0);
    cell.style.backgroundColor = 'red';
    cell.innerHTML = '<b>Tytuł notatki</b><br><p>Treść notatki</p>';
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