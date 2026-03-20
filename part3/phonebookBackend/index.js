const express = require('express')
const app = express()



let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

// MIDDLEWARE
app.use(express.json()); // JSON Parser

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method);
    console.log('Path: ', request.path);
    console.log('Body: ', request.body);
};
app.use(requestLogger);



// ROUTES

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, respone) => {
    const data = {
        info: `Phonebook has info for ${persons.length}`,
        timeStamp: `${new Date()}` 
    };

    respone.json(data);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const targetPerson = persons.find(n => n.id === id);

    if (!targetPerson) response.json({message : `Person with id ${id} not found`});

    response.json(targetPerson);
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const targetPerson = persons.find(n => n.id === id);

    if (!targetPerson) response.json({message : `Person with id ${id} not found`});

    persons = persons.filter(n => n.id != id);

    response.json({message: `Person with id ${id} successfully deleted`, ...persons});
});

app.post('/api/persons/', (request, response) => {
    const newPerson = { ...request.body, id: Math.floor(Math.random() * 10000) }
    const newName = newPerson.name;
    const newNumber = newPerson.number;

    if (!newName) return response.status(400).json({error: "name field is missing"});
    if (!newNumber) return response.status(400).json({error: "number field is missing"});

    const isDuplicate = persons.some(n => n.name.toLowerCase() === newName.toLowerCase());

    if (isDuplicate) return response.status(400).json({error: "Duplicate name entered"})


    persons = persons.concat(newPerson);

    return response.status(201).json(newPerson);
});

// RUN SERVER

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});