import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import Users from "./models/users.js";
import Click from "./models/click.js";

connectDB(); //connect to database
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// CRUD routes
app.post('/user', async (req, res) => {
  const newUser = new Users(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/user', async (req, res) => {
  try {
    const user = await Users.find();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/user/:id', async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/user/:id', async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/user/:id', async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get clicks count
app.get('/', async (req, res) => {
  try {
    const clickData = await Click.findOne({});
    if (clickData) {
      res.json({ clicks: clickData.clicks });
    } else {
      const newClick = new Click();
      await newClick.save();
      res.json({ clicks: newClick.clicks });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Increment clicks count
app.post('/', async (req, res) => {
  try {
    const clickData = await Click.findOne({});
    if (clickData) {
      clickData.clicks += 1;
      await clickData.save();
      res.json({ clicks: clickData.clicks });
    } else {
      const newClick = new Click({ clicks: 1 });
      await newClick.save();
      res.json({ clicks: newClick.clicks });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
