const express = require("express");
const formidableMiddleware = require("express-formidable");
const axios = require("axios");
const router = express.Router();
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(formidableMiddleware());
app.use(cors());

// Mes données APIKey :
const public_Key = process.env.MARVEL_PUBLIC_KEY;
const private_Key = process.env.MARVEL_SECRET_KEY;

// Générer un Hash :
const md5 = require("md5");
const uid2 = require("uid2");
const ts = uid2(8);
const hash = md5(ts + private_Key + public_Key);

// accès à la base Marvel
router.get("/characters", async (req, res) => {
  const offset = req.query.offset;
  try {
    const response = await axios.get(
      "http://gateway.marvel.com/v1/public/characters",
      {
        params: {
          apikey: public_Key,
          ts: ts,
          hash: hash,
          offset: offset,
          limit: 20,
        },
        Headers: {
          Accept: "*/*",
        },
      }
    );
    console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// accès à la base Comics
router.get("/comics", async (req, res) => {
  const offset = req.query.offset;

  try {
    const response = await axios.get(
      "http://gateway.marvel.com/v1/public/comics",
      {
        params: {
          apikey: public_Key,
          ts: ts,
          hash: hash,
          offset: offset,
        },
        Headers: {
          Accept: "*/*",
        },
      }
    );
    console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    let ts = uid2(8);
    let hash = md5(ts + secret_key + public_key);
    let characterId = req.params.characterId;
    let offset = req.query.offset;

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters/${characterId}/comics?offset=${offset}&ts=${ts}&apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${hash}`
    );
    res.json(response.data);
  } catch (error) {
    console.log("characterId/comics", error.message);
  }
});
// Ma route pour intercepter les routes qui n'existent pas :
// app.all("*", function (req, res) {
//  res.json({ message: "Page not found" });
// });

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
