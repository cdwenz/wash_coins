const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
// const dotenv = require("dotenv");
// dotenv.config();

const mercadopago = require("mercadopago");

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel

console.log("PORT", process.env.PORT)
mercadopago.configure({
  access_token: "TEST-493073200065525-090710-807b33ee4fbe96af51b9294625625d41-52153870",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "./")));
app.use(cors());

app.get("/", (req, res) => {
  // const htmlResponse = `
  // <html>
  //   <head>
  //     <title>
  //       MI TITULO
  //     </title>
  //   </head>
  //   <body>
  //     <h1>MY ACHE1 </h1>

  //   </body>
  // </html>`

  // res.send(htmlResponse)
  path.resolve(__dirname, "index.html");
});

app.post("/create_preference", (req, res) => {
  const { description, price, quantity } = req.body;
  if (Number(price) > 0){
    let preference = {
      items: [
        {
          title: description,
          unit_price: Number(price),
          quantity: Number(quantity),
        },
      ],
      back_urls: {
        success: "http://localhost:3001",
        failure: "http://localhost:3001",
        pending: "",
      },
      auto_return: "approved",
    };
  
    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        res.json({
          id: response.body.id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }else {
    console.log({ error: "El monto ingresado es inválido" });
  }
});

app.get("/feedback", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`The server is now running on Port ${process.env.PORT}`);
});
