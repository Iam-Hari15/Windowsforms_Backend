import express from 'express';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(express.json());

// GET endpoint to retrieve submissions
app.get('/read', (req, res) => {
    let db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
    res.json(db.submissions);
});

// POST endpoint to submit data
app.post('/submit', (req, res) => {
    const submission = req.body;
    let db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
    db.submissions.push(submission);
    fs.writeFileSync('db.json', JSON.stringify(db));
    res.send('Submission successful');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
