import axios from "axios";
import express, { json } from "express";
import morgan from "morgan";
import path from "path";

const app = express();
app.use(morgan("combined"));
app.use(json());
app.use("/", express.static(path.join(__dirname, "..", "static")));

const deckHost = process.env.DECK_HOST || "192.168.1.21";
const deckPort = process.env.DECK_PORT || 5000;
app.get("/deck", async (_, res) => {
  const seed = Date.now().toString();
  try {
    const result = await axios.get(`http://${deckHost}:${deckPort}/deck`, {
      params: { seed },
    });
    res.json(result.data);
  } catch (e: any) {
    res.status(500).json(e);
  }
});

const port = 8080;
const host = "0.0.0.0";
app.listen(port, host, () => console.log(`listening on ${host}:${port}`));
