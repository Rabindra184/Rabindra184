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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      line-height: 1.6;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      background: #0d1117;
      color: #c9d1d9;
    }
    a { color: #58a6ff; }
    img { max-width: 100%; height: auto; }
    h1, h2, h3, h4 { color: #f0f6fc; margin-top: 24px; }
    hr { border: 0; border-top: 1px solid #30363d; margin: 24px 0; }
    code {
      background: #161b22;
      padding: 2px 6px;
      border-radius: 6px;
      font-family: 'SFMono-Regular', Consolas, monospace;
    }
    pre {
      background: #161b22;
      padding: 16px;
      border-radius: 6px;
      overflow-x: auto;
    }
    pre code { padding: 0; background: transparent; }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      border: 1px solid #30363d;
      padding: 12px;
      text-align: left;
    }
    details {
      margin: 10px 0;
      padding: 10px;
      background: #161b22;
      border-radius: 6px;
    }
    summary {
      cursor: pointer;
      font-weight: bold;
    }
  </style>
</head>
<body>
  ${html}
</body>
</html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running at http://0.0.0.0:' + PORT);
});
