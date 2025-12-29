const express = require('express');
const { marked } = require('marked');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  const readmePath = path.join(__dirname, 'README.md');
  const markdown = fs.readFileSync(readmePath, 'utf8');
  const html = marked(markdown);
  
  res.set('Cache-Control', 'no-cache');
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rabindra Biswal - Profile</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      background: #0d1117;
      color: #c9d1d9;
    }
    .container {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    a { color: #58a6ff; text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.2s; }
    a:hover { border-bottom-color: #58a6ff; }
    img { max-width: 100%; height: auto; border-radius: 8px; }
    h1, h2, h3, h4 { color: #f0f6fc; margin-top: 32px; border-bottom: 1px solid #30363d; padding-bottom: 8px; }
    hr { border: 0; border-top: 1px solid #30363d; margin: 32px 0; }
    p { margin: 16px 0; }
    .center { text-align: center; }
    .flex { display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; margin: 20px 0; }
    code {
      background: #21262d;
      padding: 3px 6px;
      border-radius: 4px;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 0.9em;
    }
    pre {
      background: #0d1117;
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      border: 1px solid #30363d;
    }
    pre code { padding: 0; background: transparent; }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 20px 0;
    }
    th, td {
      border: 1px solid #30363d;
      padding: 16px;
      text-align: left;
    }
    th { background: #161b22; }
    details {
      margin: 16px 0;
      padding: 16px;
      background: #0d1117;
      border: 1px solid #30363d;
      border-radius: 8px;
    }
    summary {
      cursor: pointer;
      font-weight: 600;
      color: #58a6ff;
    }
    .badge-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 10px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    ${html}
  </div>
</body>
</html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running at http://0.0.0.0:' + PORT);
});
