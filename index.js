const productDescription = document.getElementById("product-description");

const priceText = document.getElementById("price");

const coin1Button = document.getElementById("donate-1");
const coin2Button = document.getElementById("donate-2");
const coin3Button = document.getElementById("donate-3");
const coin4Button = document.getElementById("donate-4");

const amountInput = document.getElementById("amount-input");
const totalAmount = document.getElementById("total-amount");

let coinCount = 0;

price.innerText = "$10"

coin1Button.addEventListener("click", () => {
  amountInput.value = 1;
  coinCount = 1;
  updateTotalAmount();
});

coin2Button.addEventListener("click", () => {
  amountInput.value = 2;
  coinCount = 2;
  updateTotalAmount();
});

coin3Button.addEventListener("click", () => {
  amountInput.value = 3;
  coinCount = 3;
  updateTotalAmount();
});
coin4Button.addEventListener("click", () => {
  amountInput.value = 4;
  coinCount = 4;
  updateTotalAmount();
});

amountInput.addEventListener("input", () => {
  coinCount = amountInput.value;
  updateTotalAmount();
});

const updateTotalAmount = () => {
  const updatedAmount = coinCount * 10;
  totalAmount.innerText = updatedAmount;
};

//MP
const mercadopago = new MercadoPago(
  "APP_USR-601b5dc3-a6fb-418c-b803-d70eb462affa",
  // "TEST-72c67afe-b227-4782-9945-46a1aedfe2ea",
  {
    locale: "es-AR", // The most common are: 'pt-BR', 'es-AR' and 'en-US'
  }
);

document.getElementById("checkout-btn").addEventListener("click", function () {
  if (Number(totalAmount.innerText) > 0) {
    const orderData = {
      quantity: 1,
      description: productDescription.innerText,
      price: totalAmount.innerText,
    };

    // fetch("http://localhost:3001/create_preference", {
    fetch("https://wash-coins.vercel.app/create_preference", {
    // fetch("https://washcoins-production.up.railway.app/create_preference", {
    // fetch("https://coins-5viw.onrender.com/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (preference) {
        createCheckoutButton(preference.id);
      })
      .then(function (response) {
        console.log("RES: ", response)
      })
      .catch(function (error) {
        alert("Unexpected error: ", error);
      });
  } else {
    console.log(totalAmount.innerText);
    return alert("Monto inválido");
  }
});

function createCheckoutButton(preferenceId) {
  // Initialize the checkout
  const bricksBuilder = mercadopago.bricks();

  const renderComponent = async (bricksBuilder) => {
    if (window.checkoutButton) window.checkoutButton.unmount();

    await bricksBuilder.create(
      "wallet",
      "button-checkout", // class/id where the payment button will be displayed
      {
        initialization: {
          preferenceId: preferenceId,
        },
        callbacks: {
          onError: (error) => console.error(error),
          onReady: () => {},
          onPayment: (payment) => {
            // Este callback se ejecuta una vez finalizado el pago
            console.log(payment);

            // Aquí puedes manejar la respuesta del pago
            if (payment.status === 'approved') {
              // Pago aprobado
              console.log('Pago aprobado:', payment);
            } else {
              // Pago no aprobado
              console.log('Pago no aprobado:', payment);
            }
          },
        },
      }
    );
  };
  window.checkoutButton = renderComponent(bricksBuilder);
}
