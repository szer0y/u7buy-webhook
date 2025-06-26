const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

app.post("/webhook/u7buy", async (req, res) => {
  const payload = req.body;
  const message = {
    content: `📦 Nowe zamówienie z U7Buy:\n\`\`\`json\n${JSON.stringify(payload, null, 2)}\n\`\`\``
  };
  try {
    await axios.post(DISCORD_WEBHOOK_URL, message);
    res.status(200).send("OK");
  } catch (error) {
    console.error("Błąd Discord:", error.message);
    res.status(500).send("Błąd");
  }
});

app.get("/", (req, res) => {
  res.send("Webhook działa!");
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
