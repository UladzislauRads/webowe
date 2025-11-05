const express = require('express');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

let filmy = [
{ "id": 1, "title": "Inception", "director": "Christopher Nolan", "year": 2010, "genre": "Sci-Fi" },
{ "id": 2, "title": "The Godfather", "director": "Francis Ford Coppola", "year": 1972, "genre": "Crime" },
{ "id": 3, "title": "Pulp Fiction", "director": "Quentin Tarantino", "year": 1994, "genre": "Crime" },
{ "id": 4, "title": "The Shawshank Redemption", "director": "Frank Darabont", "year": 1994, "genre": "Drama" },
{ "id": 5, "title": "The Dark Knight", "director": "Christopher Nolan", "year": 2008, "genre": "Action" },
{ "id": 6, "title": "Forrest Gump", "director": "Robert Zemeckis", "year": 1994, "genre": "Drama" },
{ "id": 7, "title": "Fight Club", "director": "David Fincher", "year": 1999, "genre": "Drama" },
{ "id": 8, "title": "Interstellar", "director": "Christopher Nolan", "year": 2014, "genre": "Sci-Fi" },
{ "id": 9, "title": "Gladiator", "director": "Ridley Scott", "year": 2000, "genre": "Action" },
{ "id": 10, "title": "The Matrix", "director": "The Wachowskis", "year": 1999, "genre": "Sci-Fi" }
];

//let film = filmy[9];

// Basic route
app.get('/movies/', (req, res) => {
    res.send(JSON.stringify(filmy, null, 2));
});

app.get('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const film = filmy.find(f => f.id === id);
    if (film) {
        res.send(JSON.stringify(film, null, 2));
    } else {
        res.status(404).send({ error: 'Movie not found' });
    }
});

app.post('/movies/', (req, res) => {
    const newFilm = req.body;
    if (!newFilm.title) {
        return res.status(400).send({ error: 'Missing title' });
    } 
    if (!newFilm.director) {
        return res.status(400).send({ error: 'Missing director' });
    }
    if (!newFilm.year) {
        return res.status(400).send({ error: 'Missing year' });
    }
    if (!newFilm.genre) {
        return res.status(400).send({ error: 'Missing genre' });
    }
    newFilm.id = filmy.length ? filmy[filmy.length - 1].id + 1 : 1;
    filmy.push(newFilm);
    res.status(201).send(newFilm);
});

app.put('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const filmIndex = filmy.findIndex(f => f.id === id);
    if (filmIndex === -1) {
        return res.status(404).send({ error: 'Movie not found' });
    }
    const updatedFilm = req.body;
    if (!updatedFilm.title) {
        return res.status(400).send({ error: 'Missing title' });
    } 
    if (!updatedFilm.director) {
        return res.status(400).send({ error: 'Missing director' });
    }
    if (!updatedFilm.year) {
        return res.status(400).send({ error: 'Missing year' });
    }
    if (!updatedFilm.genre) {
        return res.status(400).send({ error: 'Missing genre' });
    }
    updatedFilm.id = id;
    filmy[filmIndex] = updatedFilm;
    res.send(updatedFilm);
});

app.delete('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const filmIndex = filmy.findIndex(f => f.id === id);
    if (filmIndex === -1) {
        return res.status(404).send({ error: 'Movie not found' });
    }
    filmy.splice(filmIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});