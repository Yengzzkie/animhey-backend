import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import Click from "./models/click.js";

// Connect to the database
connectDB();

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Get clicks count
app.get('/visit', async (req, res) => {
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
app.post('/visit', async (req, res) => {
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
