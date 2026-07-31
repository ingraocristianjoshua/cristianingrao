const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Initialize SQLite Database
const db = new sqlite3.Database(':memory:'); // Using in-memory for simplicity, or we can use a file

db.serialize(() => {
    // Create Messages table
    db.run(`CREATE TABLE messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Create Projects table
    db.run(`CREATE TABLE projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        icon TEXT NOT NULL
    )`);

    // Insert mock projects
    const stmt = db.prepare("INSERT INTO projects (title, url, icon) VALUES (?, ?, ?)");
    stmt.run("🎓 Tesi di Laurea", "#tesi", "doc");
    stmt.run("💻 App Gestionale", "#app", "code");
    stmt.run("🌐 Questo Portfolio!", "#portfolio", "web");
    stmt.finalize();
});

// --- API Endpoints ---

// GET /api/projects - Returns list of projects
app.get('/api/projects', (req, res) => {
    db.all("SELECT * FROM projects", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ projects: rows });
    });
});

// POST /api/contact - Saves a contact message
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Tutti i campi sono obbligatori." });
    }

    db.run(`INSERT INTO messages (name, email, message) VALUES (?, ?, ?)`, 
        [name, email, message], 
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            console.log(`Nuovo messaggio ricevuto da ${name} (${email})!`);
            res.status(201).json({ success: true, messageId: this.lastID });
        }
    );
});

// Fallback to index.html for SPA-like behavior (though this is static)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server in esecuzione su http://localhost:${PORT}`);
});
