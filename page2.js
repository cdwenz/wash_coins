const productDescription = document.getElementById("product-description");
const priceText = document.getElementById("price");

const modal = document.getElementById("modal");
const confirmar = document.getElementById("confirm");
const cancel = document.getElementById("cancel");

const coin1Button = document.getElementById("donate-1");
const coin2Button = document.getElementById("donate-2");
const coin3Button = document.getElementById("donate-3");
const coin4Button = document.getElementById("donate-4");

const amountInput = document.getElementById("amount-input");
const totalAmount = document.getElementById("total-amount");

var reference;

confirmar.addEventListener("click", async () => {
  const { coins, machine_id, id_valor } = JSON.parse(
    localStorage.getItem("operation")
  );
  try {
    const response = await axios.get(`/get_order?reference=${reference}`);
    console.log("response GET: ", response.data);

    if (response.data.elements[0].order_status === "paid") {
      const insert_to = await axios.post(`/api/sales`, {
        coins,
        machine_id,
        id_valor,
      });
      console.log("INSERT TO: ", insert_to);
      modal.style.display = "none";
      localStorage.setItem(
        "operation",
        JSON.stringify({
          value_coin: 0,
          id_valor: 0,
          machine_id: 0,
          coins: 0,
          total: 0,
          payment: "",
          status: "",
          MO: "",
        })
      );
      window.location.href = "/index.html";
    }
  } catch (error) {
    alert(error);
  }
});

cancel.addEventListener("click", () => {
  modal.style.display = "none";
});

let coinCount = 0;
let value_coin = 0;

let objetoRecuperado = JSON.parse(localStorage.getItem("operation"));
value_coin = objetoRecuperado.value_coin;
price.innerText = value_coin;

coin1Button.addEventListener("click", () => {
  amountInput.value = 1;
  coinCount = 1;
  updateTotalAmount();
  let objetoRecuperado = JSON.parse(localStorage.getItem("operation"));
  objetoRecuperado.coins = 1;
  localStorage.setItem("operation", JSON.stringify(objetoRecuperado));
});

coin2Button.addEventListener("click", () => {
  amountInput.value = 2;
  coinCount = 2;
  updateTotalAmount();
  let objetoRecuperado = JSON.parse(localStorage.getItem("operation"));
  objetoRecuperado.coins = 2;
  localStorage.setItem("operation", JSON.stringify(objetoRecuperado));
});

coin3Button.addEventListener("click", () => {
  amountInput.value = 3;
  coinCount = 3;
  updateTotalAmount();
  let objetoRecuperado = JSON.parse(localStorage.getItem("operation"));
  objetoRecuperado.coins = 3;
  localStorage.setItem("operation", JSON.stringify(objetoRecuperado));
});
coin4Button.addEventListener("click", () => {
  amountInput.value = 4;
  coinCount = 4;
  updateTotalAmount();
  let objetoRecuperado = JSON.parse(localStorage.getItem("operation"));
  objetoRecuperado.coins = 4;
  localStorage.setItem("operation", JSON.stringify(objetoRecuperado));
});

amountInput.addEventListener("input", () => {
  coinCount = amountInput.value;
  updateTotalAmount();
});

const updateTotalAmount = () => {
  const updatedAmount = coinCount * value_coin;
  totalAmount.innerText = updatedAmount;
  let objetoRecuperado = JSON.parse(localStorage.getItem("operation"));
  objetoRecuperado.total = updatedAmount;
  localStorage.setItem("operation", JSON.stringify(objetoRecuperado));
};

document
  .getElementById("checkout-btn")
  .addEventListener("click", async function () {
    if (Number(totalAmount.innerText) > 0) {
      reference = Date.now();
      console.log("GENERATE REF: ", reference);

      let objetoRecuperado = JSON.parse(localStorage.getItem("operation"));
      objetoRecuperado.reference = reference;
      localStorage.setItem("operation", JSON.stringify(objetoRecuperado));

      const orderData = {
        description: "Compra de créditos Lanin Carwash.",
        // expiration_date: "2024-06-30T16:34:56.559-03:00",
        external_reference: `${reference}`,
        items: [
          {
            sku_number: `${reference}`,
            category: "Coins",
            title: "Créditos Lavadero",
            // description: "La compra de créditos ",
            unit_price: value_coin,
            quantity: coinCount,
            unit_measure: "unit",
            total_amount: objetoRecuperado.total,
          },
        ],
        notification_url: `https://mpnotifications-production.up.railway.app/notification`,
        title: "Product order",
        total_amount: objetoRecuperado.total,
      };

      try {
        const response = await axios.post("/create_order", orderData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("response Front: ", response);
        modal.style.display = "block";
        generateQRCode(response.data);
      } catch (error) {
        alert(error);
      }
    }
  });

function generateQRCode(data) {
  // var text = document.getElementById("text").value;
  var qrcodeContainer = document.getElementById("qrcode");
  qrcodeContainer.innerHTML = ""; // Limpiar el contenido anterior
  new QRCode(qrcodeContainer, data);
}
