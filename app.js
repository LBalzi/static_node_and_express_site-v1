const express = require('express');
const path = require('path');
const fs = require('fs');

// Create an Express app
const app = express();
const PORT = 3000;

// Load data from data.json
const dataFilePath = path.join(__dirname, 'data.json');
let projectData;
try {
    const rawData = fs.readFileSync(dataFilePath, 'utf8');
    projectData = JSON.parse(rawData);
} catch (error) {
    console.error('Error reading or parsing data.json:', error);
    projectData = { projects: [] };
}

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use('/static', express.static(path.join(__dirname, 'public')));

// Routes

// "Index" route - Home page
app.get('/', (req, res) => {
    res.render('index', { projects: projectData.projects });
});

// "About" route
app.get('/about', (req, res) => {
    res.render('about');
});

// Dynamic "Project" routes
app.get('/project/:id', (req, res) => {
    const projectId = parseInt(req.params.id, 10);
    const project = projectData.projects.find(p => p.id === projectId);

    if (project) {
        res.render('project', { project });
    } else {
        res.status(404).send('Project not found');
    }
});

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
