const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// In-memory storage for comments
let comments = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Endpoint to post comment
app.post('/comment', (req, res) => {
    const { comment } = req.body;
    comments.push(comment); // <-- Vulnerable to XSS if unsanitized
    res.redirect('/');
});

// Serve homepage with comments
app.get('/', (req, res) => {
    let html = `
        <h1>XSS Demo</h1>
        <form method="POST" action="/comment">
            <input name="comment" placeholder="Type a comment" />
            <button type="submit">Post Comment</button>
        </form>
        <h2>Comments:</h2>
        <ul>
    `;
    comments.forEach(c => {
        html += `<li>${c}</li>`; // <-- XSS happens here if comment has <script>
    });
    html += `</ul>`;
    res.send(html);
});

app.listen(PORT, () => console.log(`XSS demo running on http://localhost:${PORT}`));