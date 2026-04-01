# Reflected Cross-Site Scripting (Reflected XSS)

## 📌 What is Reflected XSS?

Reflected Cross-Site Scripting (Reflected XSS), also known as  **Non-Persistent XSS** , is a web security vulnerability where  **malicious input is immediately reflected by the server in the response and executed in the user’s browser** .

Unlike Stored XSS, the payload is  **not saved on the server** . Instead, it is delivered through a request (usually a URL) and executed instantly.

---

## ⚙️ How Reflected XSS Works

Reflected XSS typically follows this flow:

1. **Attacker crafts a malicious request**
   * Usually a URL containing a script

```
https://example.com/search?q=<img src=x onerror=alert('XSS')>
```

---

2. **Victim clicks the malicious link**

* The request is sent to the server

---

3. **Server reflects input in response**

```javascript
res.send(`<p>You searched for: ${req.query.q}</p>`); // ❌ unsafe
```

---

4. **Browser renders the response**

```html
<p>You searched for: <img src=x onerror=alert('XSS')></p>
```

👉 The browser executes the injected script

---

## 🔥 Example Attack Scenario

A search feature displays user queries:

### User visits:

```
https://example.com/search?q=<img src=x onerror=alert('XSS')>
```

### Server response:

```html
<h1>Results for: <img src=x onerror=alert('XSS')></h1>
```

👉 Script executes immediately in the victim’s browser

---

## ⚠️ Key Characteristics

* ❌ Payload is **not stored on the server**
* ✅ Triggered by **user interaction (clicking a link)**
* ✅ Delivered via **URL or form input**
* ⚠️ Requires **social engineering** (tricking users)
* 🔥 Still a high-impact vulnerability

---

## 📍 Common Attack Vectors

* Search bars
* Error messages
* Login pages
* URL query parameters
* Form submissions

---

## 🚨 Impact of Reflected XSS

Reflected XSS can lead to:

* Session hijacking
* Phishing attacks (fake login forms)
* Unauthorized actions
* Data theft
* Redirection to malicious websites

---

## 🧠 Why Reflected XSS is Dangerous

> Even though the payload is not stored, attackers can trick users into executing it via specially crafted links.

This makes it effective in  **phishing and social engineering attacks** .

---

## ❌ Vulnerable Code Example

### Backend (Node.js):

```javascript
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.send(`<h1>Search: ${query}</h1>`); // ❌ unsafe
});
```

---

## 🛡️ Prevention Techniques

### 1. Escape Output (Output Encoding)

```javascript
function escapeHTML(str) {
  return str
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">");
}
```

```javascript
res.send(`<h1>Search: ${escapeHTML(query)}</h1>`);
```

---

### 2. Validate Input

* Allow only expected characters
* Reject suspicious input

---

### 3. Use Safe Rendering Methods

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

---

### 5. Implement Content Security Policy (CSP)

```http
Content-Security-Policy: script-src 'self'
```

---

## 🔍 Reflected XSS vs Other XSS Types

| Type          | Server Involved | Stored Data | Trigger Method |
| ------------- | --------------- | ----------- | -------------- |
| Stored XSS    | Yes             | Yes         | Page load      |
| Reflected XSS | Yes             | No          | Link click     |
| DOM XSS       | No              | No          | Client-side JS |

---

## 🧠 Key Takeaway

> Reflected XSS occurs when user input is immediately returned by the server without proper sanitization, allowing malicious scripts to execute in the browser.

---

## ✅ Conclusion

Reflected XSS is a common vulnerability in web applications that improperly handle user input. Although it is not persistent like Stored XSS, it can still cause serious damage through phishing and user manipulation.

Proper input validation, output encoding, and secure coding practices are essential to prevent this vulnerability.

---
