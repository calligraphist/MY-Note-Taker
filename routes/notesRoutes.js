const router = require('express').Router();
const { response } = require('express');
const { readFile, writeFile } = require('fs/promises')
const getNotes = () => {
  return readFile('db/db.json', 'utf-8').then(notes => [].concat(JSON.parse(notes)))
}
// notes are available at notes in JSON 
router.get('/notes', (req, res) => {
  getNotes().then(notes => res.json(notes))
});
//post notes is available
router.post('/notes', (req, res) => {
  getNotes().then(oldNotes => {
    const newNotes = [...oldNotes, { title: req.body.title, text: req.body.text, id: Math.floor(Math.random() * 1000).toString() }]
    writeFile('db/db.json', JSON.stringify(newNotes)).then(() => res.json({ msg: 'ok' }))
  })
})
//notes can be deleted
router.delete('/notes/:id', (req, res) => {
  getNotes().then(oldNotes => {
    const updatedNotes = oldNotes.filter(note => note.id !== req.params.id)
    writeFile('db/db.json', JSON.stringify(updatedNotes)).then(() => res.json({ msg: 'ok' }))
  })
})

module.exports = router;