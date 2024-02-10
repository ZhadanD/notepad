function getNotesFromJSON(notesJSON) {
    return JSON.parse(notesJSON)['notes']
}

function showNotes() {
    let content = ''
    let notesJSON = localStorage.getItem('notes')

    if(notesJSON) {
        let notes = getNotesFromJSON(notesJSON)

        notes.forEach((note, index) => {
            content += `
            <section class="col">
                <div class="card" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">${note['title']}</h5>
                <p class="card-text">${note['text']}</p>
                <p>Дата последнего изменения: ${note['date']}</p>
                <button type="button" class="btn btn-warning">Редактировать</button>
                <button type="button" class="btn btn-danger" onclick="deleteNote(${index})">Удалить</button>
              </div>
            </div>
            </section>
        `
        })

        document.getElementById('notes').innerHTML = content
    }
}

function deleteNote(indexNote) {
    let notes = getNotesFromJSON(localStorage.getItem('notes'))
    let currentNoteTitle = notes[indexNote]['title']

    let decision = confirm(`Вы точно хотите удалить заметку "${currentNoteTitle}"?`)

    if(decision) {
        notes.splice(indexNote, 1)

        localStorage.setItem('notes', JSON.stringify({
            notes
        }))

        showNotes()
    }
}

function validate(titleNote, textNote) {
    if(titleNote === '' || textNote === '') return false
    return true
}

function currentDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

function createNote() {
    let titleNote = document.getElementById('title_note').value
    let textNote = document.getElementById('text_note').value

    if(validate(titleNote, textNote)) {
        let notesInJSON = localStorage.getItem('notes')

        if(notesInJSON) {
            let notesInObj = JSON.parse(notesInJSON)

            notesInObj['notes'].push({
                title: titleNote,
                text: textNote,
                date: currentDate(),
            })

            localStorage.setItem('notes', JSON.stringify(notesInObj))
        } else {
            localStorage.setItem('notes', JSON.stringify({
                notes: [{
                    title: titleNote,
                    text: textNote,
                    date: currentDate(),
                }]
            }))
        }

        document.getElementById('notification').innerHTML = `
            <p class="fs-3 text-center text-success">Заметка создана!</p>
        `

        setTimeout(() => {
            document.getElementById('notification').innerHTML = ``
        }, 2000)

        document.getElementById('title_note').value = ''
        document.getElementById('text_note').value = ''

        showNotes()
    }
}

showNotes()
