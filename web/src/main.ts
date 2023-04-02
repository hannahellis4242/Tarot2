import axios from "axios";
import express, { json } from "express";
import path from "path";

const app = express();
app.use(json());
app.use(express.static(path.join(__dirname, "static")));

const deckHost = process.env.DECK_HOST || "localhost";
const deckPort = process.env.DECK_PORT || 5000;
app.get("/deck", async (req, res) => {
  const seed = Date.now().toString();
  try {
    const { data } = await axios.get(
      `http:\\${deckHost}:${deckPort}\deck?seed=${seed}`
    );
    res.json(data);
  } catch (e: any) {
    res.sendStatus(500);
  }
});

const port = 8080;
const host = "0.0.0.0";
app.listen(port, host, () => console.log(`listening on ${host}:${port}`));
