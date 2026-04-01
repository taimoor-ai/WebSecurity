
---

## **1. Setup a Simple Server**

1. Create a folder called `xss-demo`
2. Initialize Node.js project:

```bash
npm init -y
npm install express body-parser
```

3. Create `server.js`:

```javascript
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
```

4. Create `public` folder (optional, for CSS or static files)
5. Run the server:

```bash
node server.js
```

---

## **2. Test Stored XSS**

1. Open `http://localhost:5000` in your browser
2. In the comment box, type:

```html
<script>alert('XSS executed!');</script>
```

3. Submit → you should **see an alert popup**

✅ This is **stored XSS** because the script is saved in the server’s memory and runs every time the page loads.

---

## **3. Make it Safe (Prevent XSS)**

We can **sanitize user input** using a simple replace function:

```javascript
function escapeHtml(str) {
    return str.replace(/&/g, "&")
              .replace(/</g, "<")
              .replace(/>/g, ">")
              .replace(/"/g, """)
              .replace(/'/g, "'");
}

// Use it when rendering comments:
comments.forEach(c => {
    html += `<li>${escapeHtml(c)}</li>`; // now <script> tags are escaped
});
```

* Now, typing `<script>alert('XSS')</script>` will  **just display the text** , not execute it.

---

### ✅ **Key Takeaways from Practical XSS Demo**

1. **Without sanitization:** scripts in user input execute → XSS vulnerability
2. **With sanitization:** scripts are treated as text → safe
3. XSS can affect **cookies, session, DOM, and users’ actions**
4. This demo is **fully local and safe**

---
