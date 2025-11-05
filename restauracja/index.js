const { json } = require('body-parser');
const { error } = require('console');
const express = require('express');

const app = express();
const port = 3000

app.use(express.json());

// Dane w zadaniu były nieprawidłowe
// Wymyśliłem dane z głowy
let restauracje = [
    { "id": 1, "name": "The Gourmet Kitchen", "location": "London, UK", "cuisine": "French", "openNow": true },
    { "id": 2, "name": "Bella Italia", "location": "Rome, Italy", "cuisine": "Italian", "openNow": false },
    { "id": 3, "name": "Sushi World", "location": "Tokyo, Japan", "cuisine": "Japanese", "openNow": true },
    { "id": 4, "name": "Taco Fiesta", "location": "Mexico City, Mexico", "cuisine": "Mexican", "openNow": false },
    { "id": 5, "name": "Curry House", "location": "Mumbai, India", "cuisine": "Indian", "openNow": true },
    { "id": 6, "name": "Burger Haven", "location": "New York, USA", "cuisine": "American", "openNow": true },
    { "id": 7, "name": "Dragon's Delight", "location": "Beijing, China", "cuisine": "Chinese", "openNow": false },
    { "id": 8, "name": "Le Croissant", "location": "Paris, France", "cuisine": "French", "openNow": true },
    { "id": 9, "name": "Outback Grill", "location": "Sydney, Australia", "cuisine": "Australian", "openNow": false },
    { "id": 10, "name": "Tapas Bar", "location": "Barcelona, Spain", "cuisine": "Spanish", "openNow": true }
];

app.get('/restaurants/',(req, res) => {
    if (req.query.cuisine) {
        const cuisineType = req.query.cuisine;
        const filteredRestauracje = restauracje.filter(r => r.cuisine.toLowerCase() === cuisineType.toLowerCase());
        if (!filteredRestauracje) {
            return res.status(404).send({ error: 'Restaurants not found'})
        }
        return res.send(JSON.stringify(filteredRestauracje, null, 2));
    }
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

app.post('/restaurants/', (req, res) => {
    const newRestauracja = req.body;

    validationResult = ValidateRestauracja(newRestauracja);
    if (validationResult) {
        return res.status(400).send({ error: validationResult });
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

    validationResult = ValidateRestauracja(newRestauracja);
    if (validationResult) {
        return res.status(400).send({ error: validationResult });
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

app.patch('/restaurants/:id/open',(req, res) => {
    const id = parseInt(req.params.id);
    const restauracjaIndex = restauracje.findIndex(r => r.id === id);
    if (restauracjaIndex === -1) {
        return res.status(404).send({ error: 'Restaurant not found' });
    }
    restauracje[restauracjaIndex].openNow = !restauracje[restauracjaIndex].openNow;
    res.send({message: "Restauracja " + (restauracje[restauracjaIndex].openNow ? "otwarta" : "zamknięta")})
});



function ValidateRestauracja(restauracja) {
    if (!restauracja.name) {
        return 'Missing name';
    }
    if (!restauracja.location) {
        return 'Missing location';
    }
    if (!restauracja.cuisine) {
        return 'Missing cuisine';
    }
    if (typeof restauracja.openNow !== 'boolean') {
        return 'Missing or invalid openNow (must be true or false)';
    }
    return null;
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});