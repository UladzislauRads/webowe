const { json } = require('body-parser');
const express = require('express');

const app = express();
const port = 3000

app.use(express.json());

let koncerty = [
    { "id": 1, "artist": "Coldplay", "location": "London, UK", "date": "2025-06-12", "ticketsAvailable": 1500 },
    { "id": 2, "artist": "Beyoncé", "location": "Paris, France", "date": "2025-07-05", "ticketsAvailable": 2000 },
    { "id": 3, "artist": "Ed Sheeran", "location": "New York, USA", "date": "2025-08-20", "ticketsAvailable": 1200 },
    { "id": 4, "artist": "Taylor Swift", "location": "Los Angeles, USA", "date": "2025-09-15", "ticketsAvailable": 1800 },
    { "id": 5, "artist": "Imagine Dragons", "location": "Berlin, Germany", "date": "2025-06-25", "ticketsAvailable": 1000 },
    { "id": 6, "artist": "Adele", "location": "London, UK", "date": "2025-10-01", "ticketsAvailable": 2500 },
    { "id": 7, "artist": "Bruno Mars", "location": "Rome, Italy", "date": "2025-07-30", "ticketsAvailable": 1300 },
    { "id": 8, "artist": "The Weeknd", "location": "Toronto, Canada", "date": "2025-08-10", "ticketsAvailable": 1100 },
    { "id": 9, "artist": "Billie Eilish", "location": "Amsterdam, Netherlands", "date": "2025-09-05", "ticketsAvailable": 1400 },
    { "id": 10, "artist": "Shawn Mendes", "location": "Sydney, Australia", "date": "2025-12-12", "ticketsAvailable": 1600 }
];
    

app.get('/restaurants/',(req, res) => {
    res.send(JSON.stringify(restauracje, null, 2));
});

app.get('/restaurants/:id',(req, res) => {
    const id = parseInt(req.params.id);
    const restauracja = restauracje.find(r => r.id === id);
    if (restauracja) {
        res.send(JSON.stringify(restauracja, null, 2));
    } else {
        res.status(404).send({ error: 'Restaurant not found' });
    }
});

app.post('/restaurants/',(req, res) => {
    const newRestauracja = req.body;
    if (!newRestauracja.artist) {
        return res.status(400).send({ error: 'Missing artist' });
    } 
    if (!newRestauracja.location) {
        return res.status(400).send({ error: 'Missing location' });
    }
    if (!newRestauracja.date) {
        return res.status(400).send({ error: 'Missing date' });
    }
    const parsedDate = new Date(newRestauracja.date);
    if (isNaN(parsedDate.getTime())) {
        return res.status(400).send({ error: 'Invalid date' });
    }
    if (!newRestauracja.ticketsAvailable) {
        return res.status(400).send({ error: 'Missing Tickets Available' });
    }
    const tickets = parseInt(newRestauracja.ticketsAvailable);
    if (isNaN(tickets) || tickets < 0) {
        return res.status(400).send({ error: 'Invalid Tickets Available' });
    }
    newRestauracja.id = restauracje.length ? restauracje[restauracje.length - 1].id + 1 : 1;
    restauracje.push(newRestauracja);
    res.status(201).send(newRestauracja);
});

app.post('/restaurants/', (req, res) => {
    const newRestauracja = req.body;

    // Validate required fields
    if (!newRestauracja.name) {
        return res.status(400).send({ error: 'Missing name' });
    }
    if (!newRestauracja.location) {
        return res.status(400).send({ error: 'Missing location' });
    }
    if (!newRestauracja.cuisine) {
        return res.status(400).send({ error: 'Missing cuisine' });
    }
    if (typeof newRestauracja.openNow !== 'boolean') {
        return res.status(400).send({ error: 'Missing or invalid openNow (must be true or false)' });
    }

    newRestauracja.id = restauracje.length ? restauracje[restauracje.length - 1].id + 1 : 1;
    restauracje.push(newRestauracja);
    res.status(201).send(newRestauracja);
});

app.put('/restaurants/:id',(req, res) => {
    const id = parseInt(req.params.id);
    const restauracjaIndex = restauracje.findIndex(r => r.id === id);
    if (restauracjaIndex === -1) {
        return res.status(404).send({ error: 'Restaurant not found' });
    }
    const updatedRestauracja = req.body;
    if (!updatedRestauracja.artist) {
        return res.status(400).send({ error: 'Missing artist' });
    } 
    if (!updatedRestauracja.location) {
        return res.status(400).send({ error: 'Missing location' });
    }
    if (!updatedRestauracja.date) {
        return res.status(400).send({ error: 'Missing date' });
    }
    const parsedDate = new Date(updatedRestauracja.date);
    if (isNaN(parsedDate.getTime())) {
        return res.status(400).send({ error: 'Invalid date' });
    }
    if (!updatedRestauracja.ticketsAvailable) {
        return res.status(400).send({ error: 'Missing Tickets Available' });
    }
    const tickets = parseInt(updatedRestauracja.ticketsAvailable);
    if (isNaN(tickets) || tickets < 0) {
        return res.status(400).send({ error: 'Invalid Tickets Available' });
    }
    updatedRestauracja.id = id;
    restauracje[restauracjaIndex] = updatedRestauracja;
    res.send(updatedRestauracja);
});

app.delete('/restaurants/:id',(req, res) => {
    const id = parseInt(req.params.id);
    const restauracjaIndex = restauracje.findIndex(r => r.id === id);
    if (restauracjaIndex === -1) {
        return res.status(404).send({ error: 'Restaurant not found' });
    }
    restauracje.splice(restauracjaIndex, 1);
    res.status(204).send();
}); 

