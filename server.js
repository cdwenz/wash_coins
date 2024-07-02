const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const enableChunk = process.env.NODE_ENV_NAME;

const connection = mysql.createConnection({
  host: process.env.NODE_ENV_DB_HOST,
  user: process.env.NODE_ENV_DB_USER,
  password: process.env.NODE_ENV_DB_PASSWORD,
  database: process.env.NODE_ENV_DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "./")));
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  path.resolve(__dirname, "index.html");
});

app.get("/api/creditos", async (req, res) => {
  const query = "SELECT * FROM tbl_creditos";
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
      return;
    }

    const value_coin = results[results.length - 1]
    
    res.json(value_coin);
  });
});

app.get("/get_order", async (req, res) => {
  const { reference } = req.query;
  try {
    // const response = await axios(
    //   `http://localhost:3000/get_order?external_reference=${reference}`
    // );
    const response = await axios(`${process.env.NODE_ENV_URL}/get_order?external_reference=${reference}`);
    res.json(response.data);
  } catch (error) {
    console.log("ERROR: ", error);
  }
});

app.post("/create_order", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.NODE_ENV_URL}/create_order`,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating order");
  }
});

app.post("/api/sales", async (req, res) => {
  const { coins, machine_id, id_valor } = req.body;
  const query =
    "INSERT INTO `prueba` (`usu_id`, `id_cliente`, `id_tipo_pago`, `estado_venta`, `creditos`, `id_maquina`, `estado_maquina`, `creditosusados`, `id_valor`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [99, 1, 6, 'ACTIVA', coins, machine_id, 'OFF', 0, id_valor],
    (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data");
        return;
      }
      console.log("RESULT: ", results)
      res.json(results);
    }
  );
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`The server is now running on Port ${process.env.PORT || 3001}`);
});
