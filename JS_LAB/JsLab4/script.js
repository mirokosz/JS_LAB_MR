document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('noteForm');
    const notesContainer = document.getElementById('notesContainer');
    const searchBar = document.getElementById('searchBar');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    noteForm.addEventListener('submit', event => {
        event.preventDefault();

        const title = document.getElementById('noteTitle').value;
        const content = document.getElementById('noteContent').value;
        const color = document.getElementById('noteColor').value;
        const tags = document.getElementById('noteTags').value.split(',').map(tag => tag.trim());
        const pin = document.getElementById('notePin').checked;
        const date = new Date().toLocaleString();

        const note = { title, content, color, tags, pin, date };
        notes.push(note);
        saveNotes();
        renderNotes();
        noteForm.reset();
    });

    searchBar.addEventListener('input', () => {
        renderNotes();
    });

    function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function renderNotes() {
        notesContainer.innerHTML = '';
        const query = searchBar.value.toLowerCase();
        notes.sort((a, b) => b.pin - a.pin).forEach((note, index) => {
            if (
                note.title.toLowerCase().includes(query) ||
                note.content.toLowerCase().includes(query) ||
                note.tags.some(tag => tag.toLowerCase().includes(query))
            ) {
                const noteElement = document.createElement('div');
                noteElement.className = 'note';
                noteElement.style.backgroundColor = note.color;
                noteElement.innerHTML = `
                    <h2>${note.title}</h2>
                    <p>${note.content}</p>
                    <div class="tags">${note.tags.join(', ')}</div>
                    <div class="date">${note.date}</div>
                    <button onclick="deleteNote(${index})">&times;</button>
                `;
                notesContainer.appendChild(noteElement);
            }
        });
    }

    window.deleteNote = function (index) {
        notes.splice(index, 1);
        saveNotes();
        renderNotes();
    };

    renderNotes();
});