const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

const express = require('express');

const app = express();

// Middleware to parse HTML form submissions
app.use(express.urlencoded({ extended: true }));

// Display the HTML form
app.get('/form', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Contact Form</title>
      </head>
      <body>
        <h1>Contact Form</h1>

        <form action="/submit" method="POST">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required>
          <br><br>

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
          <br><br>

          <label for="comments">Comments:</label>
          <textarea id="comments" name="comments"></textarea>
          <br><br>

          <label for="newsletter">
            <input type="checkbox" id="newsletter" name="newsletter" value="yes">
            Subscribe to newsletter
          </label>
          <br><br>

          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
});

// Process the submitted form
app.post('/submit', (req, res) => {
  const { username, email, comments, newsletter } = req.body;

  const subscribed = newsletter === 'yes' ? 'Yes' : 'No';

  // Escape user-provided text before inserting it into HTML
  const escapeHtml = (value) =>
    String(value ?? '').replace(
      /[&<>"']/g,
      (char) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[char],
    );

  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Form Submission</title>
      </head>
      <body>
        <h1>Form Submitted Successfully!</h1>

        <p><strong>Username:</strong> ${escapeHtml(username)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Comments:</strong> ${escapeHtml(comments)}</p>
        <p><strong>Newsletter Subscription:</strong> ${subscribed}</p>

        <a href="/form">Return to Form</a>
      </body>
    </html>
  `);
});

// Handle unmatched routes
app.use((req, res) => {
  res.status(404).send('<h1>404 - page not found</h1>');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
