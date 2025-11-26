const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  { email: "admin@gmail.com", password: bcrypt.hashSync("admin123", 8) }
];

const SECRET = "YOUR_SECRET_KEY";

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.json({ error: "User not found" });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.json({ error: "Wrong password" });

  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });

  res.json({ token });
});

app.listen(5000, () => console.log("Backend running on 5000"));
