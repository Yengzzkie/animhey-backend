import connectDB from "../../config/db.js";
import Click from "../../models/click.js";

// Connect to the database
connectDB();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const clickData = await Click.findOne({});
      if (clickData) {
        res.status(200).json({ clicks: clickData.clicks });
      } else {
        const newClick = new Click();
        await newClick.save();
        res.status(200).json({ clicks: newClick.clicks });
      }
    } catch (error) {
      console.error('Error fetching click data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const clickData = await Click.findOne({});
      if (clickData) {
        clickData.clicks += 1;
        await clickData.save();
        res.status(200).json({ clicks: clickData.clicks });
      } else {
        const newClick = new Click({ clicks: 1 });
        await newClick.save();
        res.status(200).json({ clicks: newClick.clicks });
      }
    } catch (error) {
      console.error('Error incrementing click count:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
