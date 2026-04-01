# Stored Cross-Site Scripting (Stored XSS)

## 📌 What is Stored XSS?

Stored Cross-Site Scripting (Stored XSS), also known as  **Persistent XSS** , is a web security vulnerability where **malicious scripts are permanently stored on a server (e.g., database, comments, messages)** and later executed in the browsers of users who view the affected content.

Unlike other XSS types, the payload is  **saved and served to multiple users** , making it highly dangerous.

---

## ⚙️ How Stored XSS Works

Stored XSS follows this flow:

1. **Attacker submits malicious input**
   * Through forms (comments, posts, profiles, messages)

```html
<script>alert('XSS')</script>
```

---

2. **Server stores the input**
   * Saved in database without sanitization

```js
comments.push(userInput); // ❌ unsafe
```

---

3. **Application renders stored data**

```javascript
res.send(`<p>${comment}</p>`); // ❌ unsafe rendering
```

---

4. **Victim loads the page**

* The browser receives the stored content
* The script is executed automatically

---

## 🔥 Example Attack Scenario

A comment system allows users to post messages.

### Attacker submits:

```html
<img src="x" onerror="alert('XSS')" />
```

### Stored in database:

```
<img src="x" onerror="alert('XSS')" />
```

### When a user visits the page:

```html
<p><img src="x" onerror="alert('XSS')" /></p>
```

👉 The browser executes the script → XSS triggered

---

## ⚠️ Key Characteristics

* ✅ Payload is **stored on the server**
* ✅ Affects **multiple users**
* ❌ Does not require user interaction after page load
* ❌ Harder to detect and remove
* 🔥 High impact vulnerability

---

## 📍 Common Attack Vectors

* Comment sections
* Chat applications
* User profiles
* Forums and blogs
* Feedback forms

---

## 🚨 Impact of Stored XSS

Stored XSS can lead to:

* Session hijacking
* Unauthorized actions on behalf of users
* Data theft
* Phishing attacks
* Website defacement

---

## 🧠 Why Stored XSS is Dangerous

> The attacker injects the payload once, but it executes every time users access the infected content.

This makes it  **scalable and persistent** , potentially affecting thousands of users.

---

## ❌ Vulnerable Code Example

### Backend (Node.js):

```javascript
app.post('/comment', (req, res) => {
  comments.push(req.body.comment); // ❌ no sanitization
});
```

### Frontend:

```javascript
div.innerHTML += `<p>${comment}</p>`; // ❌ unsafe
```

---

## 🛡️ Prevention Techniques

### 1. Sanitize User Input (Server-Side)

```javascript
const sanitizeHtml = require('sanitize-html');

const clean = sanitizeHtml(userInput);
```

---

### 2. Escape Output (Output Encoding)

```javascript
function escapeHTML(str) {
  return str
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">");
}
```

---

### 3. Avoid Dangerous DOM APIs

❌

```javascript
element.innerHTML = userInput;
```

✅

```javascript
element.textContent = userInput;
```

---

### 4. Use HttpOnly Cookies

```http
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Strict
```

✔ Prevents JavaScript from accessing cookies

---

### 5. Implement Content Security Policy (CSP)

```http
Content-Security-Policy: script-src 'self'
```

---

## 🔍 Stored XSS vs Other XSS Types

| Type          | Server Involved | Stored Data | Trigger Method |
| ------------- | --------------- | ----------- | -------------- |
| Stored XSS    | Yes             | Yes         | Page load      |
| Reflected XSS | Yes             | No          | Link click     |
| DOM XSS       | No              | No          | Client-side JS |

---

## 🧠 Key Takeaway

> Stored XSS occurs when untrusted user input is saved on the server and later rendered without proper sanitization, causing malicious scripts to execute in users’ browsers.

---

## ✅ Conclusion

Stored XSS is one of the most dangerous web vulnerabilities due to its  **persistent nature and wide impact** . Developers must enforce strict input validation, output encoding, and secure coding practices to prevent such attacks.

---
