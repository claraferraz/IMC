const peso = document.querySelector("#peso");
const altura = document.querySelector("#altura");
const form = document.querySelector("#form");
const resultado = document.querySelector(".resultado");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //O peso e altura value foram colocados aqui porque serão os valores dos parâmetros das funções
  const pesoValue = parseFloat(peso.value.replace(",", ".")); //o programa lê . o invés de , então essa troca precisa ser feita obrigatoriamente, mas o usuário geralmente usa ,
  const alturaValue = parseFloat(altura.value.replace(",", "."));
  const mensagemDeErro = validateInputs(pesoValue, alturaValue); //ver obs na função
  //  não precisa colocar === true
  if (mensagemDeErro) {
    setError(mensagemDeErro);
  } else {
    calculoIMC(pesoValue, alturaValue);
  }
});

const setError = (message) => {
  resultado.classList.add("error");
  resultado.classList.remove("success");
  const errorDisplay = document.querySelector(".resultado.error"); //tem propriedades específicas no css

  errorDisplay.innerText = message;
};

const setSuccess = (message) => {
  resultado.classList.remove("error");
  resultado.classList.add("success");
  const successDisplay = document.querySelector(".resultado.success");

  successDisplay.innerText = message;
};

const validateInputs = (peso, altura) => {
  const pesoNaN = Number.isNaN(peso); //vai transformar num número e vai checar se é NaN
  const alturaNaN = Number.isNaN(altura);
  //a avaliação foi para se os valores derem NaN, colocar a mensagem de erro

  if (pesoNaN && alturaNaN) {
    return "Peso e altura inválidos";
  } else if (pesoNaN) {
    return "Peso inválido";
  } else if (alturaNaN) {
    return "Altura inválida";
  }
  //aqui foi utilizado o return para substituir o valor da const mensagem de erro por alguma dessas frases

  return null; //se a função não for true, o return null não vai exibir nenhuma mensagem de erro e null é um falsy, então na const mensagemDeErro o valor dela vai ser false
};
//                  aqui tanto faz o nome porque é só um parâmetro, o valor ta declarado lá em cima
const calculoIMC = (peso, altura) => {
  const IMC = peso / altura ** 2;

  if (IMC < 18.5) {
    setSuccess(`Seu IMC é ${IMC.toFixed(1)} (Abaixo do peso)`);
    //é preferível o valor inteiro porque existe infinitos números entre 24.9 e 25
  } else if (IMC >= 18.5 && IMC < 25) {
    setSuccess(`Seu IMC é ${IMC.toFixed(1)} (Peso normal)`);
  } else if (IMC >= 25 && IMC < 30) {
    setSuccess(`Seu IMC é ${IMC.toFixed(1)} (Acima do peso)`);
  } else if (IMC >= 30 && IMC < 35) {
    setSuccess(`Seu IMC é ${IMC.toFixed(1)} (Obesidade grau 1)`);
  } else if (IMC >= 35 && IMC < 40) {
    setSuccess(`Seu IMC é ${IMC.toFixed(1)} (Obesidade grau 2)`);
  } else if (IMC >= 40) {
    setSuccess(`Seu IMC é ${IMC.toFixed(1)} (Obesidade grau 3)`);
  }
};
