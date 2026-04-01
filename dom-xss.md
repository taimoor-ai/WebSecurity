# DOM-Based Cross-Site Scripting (DOM XSS)

## 📌 What is DOM-Based XSS?

DOM-Based Cross-Site Scripting (DOM XSS) is a type of XSS vulnerability where the attack is executed entirely in the **browser (client-side)** rather than on the server.

In this vulnerability,  **JavaScript reads untrusted data (e.g., from the URL, localStorage, or user input) and writes it directly into the DOM in an unsafe way** , causing malicious scripts to execute.

---

## ⚙️ How DOM XSS Works

DOM XSS occurs when the following flow exists:

1. **Untrusted input source**
   * URL parameters (`window.location.search`)
   * URL hash (`window.location.hash`)
   * `document.referrer`
   * `localStorage`
2. **Client-side JavaScript reads the input**

```javascript
const params = new URLSearchParams(window.location.search);
const name = params.get("name");
```

3. **Unsafe DOM manipulation**

```javascript
document.getElementById("output").innerHTML = name;
```

4. **Browser executes injected code**

If the input contains malicious HTML/JS:

```html
<img src="x" onerror="alert('XSS')" />
```

The browser interprets it as real HTML and executes the JavaScript.

---

## 🔥 Example Attack

A malicious URL may look like:

```
https://example.com/?name=<img src=x onerror=alert('XSS')>
```

When a victim opens this link:

* The browser loads the page
* JavaScript reads the `name` parameter
* The value is inserted into the DOM using `innerHTML`
* The malicious code executes in the victim’s browser

---

## ⚠️ Key Characteristics

* ❌ No server involvement required
* ❌ No database storage needed
* ✅ Entirely client-side execution
* ✅ Triggered by user-controlled input
* ✅ Often delivered via crafted URLs

---

## 📍 Common Vulnerable Sources

* `window.location.search`
* `window.location.hash`
* `document.referrer`
* `localStorage`
* `sessionStorage`

---

## 🚨 Dangerous DOM Sinks

These APIs can lead to DOM XSS if used with untrusted input:

* `innerHTML`
* `outerHTML`
* `document.write()`
* `insertAdjacentHTML()`

---

## 🛡️ Prevention Techniques

### 1. Avoid Unsafe DOM Manipulation

❌ Vulnerable:

```javascript
element.innerHTML = userInput;
```

✅ Safe:

```javascript
element.textContent = userInput;
```

---

### 2. Sanitize User Input

```javascript
function escapeHTML(str) {
  return str
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">");
}
```

---

### 3. Use Safe DOM APIs

* `textContent`
* `createElement`
* `appendChild`

---

### 4. Implement Content Security Policy (CSP)

```http
Content-Security-Policy: script-src 'self'
```

---

## 🔍 DOM XSS vs Other XSS Types

| Type          | Server Involved | Stored Data | Execution Location |
| ------------- | --------------- | ----------- | ------------------ |
| Stored XSS    | Yes             | Yes         | Browser            |
| Reflected XSS | Yes             | No          | Browser            |
| DOM XSS       | No              | No          | Browser (DOM only) |

---

## 🧠 Key Takeaway

> DOM XSS occurs when client-side JavaScript trusts and directly injects untrusted input into the DOM without proper sanitization.

---

## ✅ Conclusion

DOM-Based XSS is a critical vulnerability that originates from  **unsafe client-side code** , not the server. Developers must ensure that all untrusted data is properly handled before inserting it into the DOM.

Avoid using dangerous APIs like `innerHTML` with user input, and always prefer safe alternatives such as `textContent`.

---
