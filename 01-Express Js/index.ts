import express from "express";
import type {Request, Response} from "express";

// Initialize the Express application
const app = express();

// Handle GET requests to the root URL (/)
app.get('/', (req: Request, res: Response) => {
    res.end('Homepage')
});

app.get('/contact-us', (req, res) => {
    res.end('You can Cantact me at my email address')
});

// GET route to fetch tweets
app.get('/tweets', (req, res) => {
    res.status(200).end("Here are your tweets")
});

// POST route to create a new tweet
app.post('/tweets', (req, res) => {
    res.status(201).end("Tweet created")
});

app.listen(8000, () => console.log(`Server is running on PORT 8000`))



