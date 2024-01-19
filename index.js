const productDescription = document.getElementById("product-description");

const priceText = document.getElementById("price");

const coin1Button = document.getElementById("donate-1");
const coin2Button = document.getElementById("donate-2");
const coin3Button = document.getElementById("donate-3");
const coin4Button = document.getElementById("donate-4");

const amountInput = document.getElementById("amount-input");
const totalAmount = document.getElementById("total-amount");

let coinCount = 0;

price.innerText = "$400"

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
  const updatedAmount = coinCount * 400;
  totalAmount.innerText = updatedAmount;
};

//MP
const mercadopago = new MercadoPago(
  "TEST-72c67afe-b227-4782-9945-46a1aedfe2ea",
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
    fetch("/create_preference", {
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
        },
      }
    );
  };
  window.checkoutButton = renderComponent(bricksBuilder);
}
