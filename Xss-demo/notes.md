## **1. What is XSS?**

**XSS** stands for  **Cross-Site Scripting** .

It is a **web security vulnerability** where  **an attacker injects malicious scripts (usually JavaScript) into a web page viewed by other users** .

* These scripts run in the **victim’s browser** with the same privileges as the website.
* XSS can lead to  **stealing cookies, session tokens, or sensitive information** , or performing actions on behalf of the victim.

---

## **2. Types of XSS**

1. **Stored XSS (Persistent XSS)**
   * Malicious script is **stored on the server** (database, comments, messages).
   * Every time a user loads that page, the script runs.
   * **Example:** A comment box on a blog that doesn’t sanitize input.
2. **Reflected XSS (Non-Persistent)**
   * Malicious script is **sent via a URL or form input** and reflected in the response.
   * Usually triggered when a user clicks a  **malicious link** .
3. **DOM-based XSS**
   * The attack happens entirely in the **browser** by manipulating the DOM.
   * The server might not even see the attack.

---

## **3. Why XSS is dangerous**

* **Stealing Cookies:** attacker can steal session cookies and impersonate users.
* **Phishing:** attacker can show fake login forms.
* **Defacing websites:** attacker can modify webpage content.
* **Malware distribution:** attacker can redirect users to malicious sites.

---

## **4. How XSS works (Example)**

### **Stored XSS Example**

Suppose a blog allows users to comment  **without sanitization** :

```html
<!-- User posts this comment -->
<script>alert('Hacked!');</script>
```

* When another user visits the blog, their browser executes:

```javascript
<script>alert('Hacked!');</script>
```

* This pops up an alert or can execute more harmful code.

### **Reflected XSS Example**

* Attacker sends this URL to a victim:

```
http://example.com/search?q=<script>alert('XSS')</script>
```

* If the site reflects the search query without sanitization, the victim’s browser executes the script.

---

## **5. How to Prevent XSS**

1. **Sanitize Input:** Escape HTML characters like `<`, `>`, `"` in user input.
2. **Validate Input:** Only allow expected characters.
3. **Use HTTPOnly Cookies:** Makes cookies inaccessible to JavaScript.
4. **Content Security Policy (CSP):** Restrict which scripts can run on your site.
5. **Use Frameworks Carefully:** Modern frameworks like React automatically escape outputs in most cases.

---

✅ **Summary:**

| Aspect               | Explanation                                                |
| -------------------- | ---------------------------------------------------------- |
| **XSS**        | Cross-Site Scripting                                       |
| **Goal**       | Execute malicious scripts in victim’s browser             |
| **Types**      | Stored, Reflected, DOM-based                               |
| **Impact**     | Steal data, hijack sessions, phishing, malware             |
| **Prevention** | Input sanitization, HTTPOnly cookies, CSP, safe frameworks |
