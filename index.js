const box1Button = document.getElementById("box1");
const box2Button = document.getElementById("box2");
const box3Button = document.getElementById("box3");
const box4Button = document.getElementById("box4");

const asp1Button = document.getElementById("asp1");
const asp2Button = document.getElementById("asp2");
const asp3Button = document.getElementById("asp3");
const asp4Button = document.getElementById("asp4");

localStorage.setItem("operation", JSON.stringify({value_coin: 0, id_valor: 0, machine_id: 0, coins: 0, total: 0, payment:"", status:"", MO:""}))

box1Button.addEventListener("click", () => {
  let objetoRecuperado = JSON.parse(localStorage.getItem('operation'));
  objetoRecuperado.machine_id = 5
  localStorage.setItem('operation', JSON.stringify(objetoRecuperado));
  window.location.href = '/page2.html'
});
box2Button.addEventListener("click", () => {
  let objetoRecuperado = JSON.parse(localStorage.getItem('operation'));
  objetoRecuperado.machine_id = 6
  localStorage.setItem('operation', JSON.stringify(objetoRecuperado));
  window.location.href = '/page2.html'
});
box3Button.addEventListener("click", () => {
  let objetoRecuperado = JSON.parse(localStorage.getItem('operation'));
  objetoRecuperado.machine_id = 7
  localStorage.setItem('operation', JSON.stringify(objetoRecuperado));
  window.location.href = '/page2.html'
});
box4Button.addEventListener("click", () => {
  let objetoRecuperado = JSON.parse(localStorage.getItem('operation'));
  objetoRecuperado.machine_id = 8
  localStorage.setItem('operation', JSON.stringify(objetoRecuperado));
  window.location.href = '/page2.html'
});
asp1Button.addEventListener("click", () => {
  let objetoRecuperado = JSON.parse(localStorage.getItem('operation'));
  objetoRecuperado.machine_id = 1
  localStorage.setItem('operation', JSON.stringify(objetoRecuperado));
  window.location.href = '/page2.html'
});
asp2Button.addEventListener("click", () => {
  let objetoRecuperado = JSON.parse(localStorage.getItem('operation'));
  objetoRecuperado.machine_id = 2
  localStorage.setItem('operation', JSON.stringify(objetoRecuperado));
  window.location.href = '/page2.html'
});
asp3Button.addEventListener("click", () => {
  let objetoRecuperado = JSON.parse(localStorage.getItem('operation'));
  objetoRecuperado.machine_id = 3
  localStorage.setItem('operation', JSON.stringify(objetoRecuperado));
  window.location.href = '/page2.html'
});
asp4Button.addEventListener("click", () => {
  let objetoRecuperado = JSON.parse(localStorage.getItem('operation'));
  objetoRecuperado.machine_id = 4
  localStorage.setItem('operation', JSON.stringify(objetoRecuperado));
  window.location.href = '/page2.html'
});


const value_coin = async () => {
  const res =  await axios("/api/creditos");
  console.log("first", res.data)
  const value = res.data

  let objetoRecuperado = JSON.parse(localStorage.getItem('operation'));
  objetoRecuperado.value_coin = value.valor_credito;
  objetoRecuperado.id_valor = value.id_valor;
  localStorage.setItem('operation', JSON.stringify(objetoRecuperado));
  return value
};

value_coin();
