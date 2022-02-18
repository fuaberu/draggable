const sentenceContainer = document.getElementById("sentence-container");
const optionsContainer = document.getElementById("options");
const check = document.getElementById("check");
const optionsElements = document.getElementsByClassName("option-element");

const options = ["certa", "errada", "talvez"];

//referência para botão apertado
let isDown = false;
//referência para mover
let currentDiv;
//referência para posição inicial das opções
let left = 50;
//referência para resposta no lugar
let answerTry = false;

//criar o div answer
const answerWidth = 90;
const divAnswer = document.createElement("div");
divAnswer.id = "answer";
divAnswer.style.width = `${answerWidth}px`;
sentenceContainer.appendChild(divAnswer);

//popular a pagina com as opçôes
options.forEach((option) => {
  const div = document.createElement("div");
  div.className = "option-element";
  div.style.padding = "5px 15px";
  div.style.left = `${left}px`;
  div.style.top = `100px`;
  div.innerText = option;

  optionsContainer.appendChild(div);

  const initial = [left, 100];

  div.setAttribute("text", JSON.stringify(option));
  div.setAttribute("initial", JSON.stringify(initial));

  left += 100;

  div.addEventListener(
    "mousedown",
    (e) => {
      //Identifica que o clicou o mouse
      isDown = true;
      const offset = [div.offsetLeft - e.clientX, div.offsetTop - e.clientY];

      //salvar o offset no div
      div.setAttribute("offset", JSON.stringify(offset));

      currentDiv = div;
    },
    true
  );
});

//Identifica que soltou o mouse
document.addEventListener(
  "mouseup",
  () => {
    isDown = false;
    if (!answerTry) {
      currentDivPosition = currentDiv.getBoundingClientRect();
      const initial = JSON.parse(currentDiv.getAttribute("initial"));
      currentDiv.style.left = `${initial[0]}px`;
      currentDiv.style.top = `${initial[1]}px`;
    }
  },
  true
);

//Identifica quando o mouse move
document.addEventListener(
  "mousemove",
  (e) => {
    if (!isDown || !currentDiv) return; //checar se o mouse esta segurando um div
    const offset = JSON.parse(currentDiv.getAttribute("offset"));
    const text = JSON.parse(currentDiv.getAttribute("text"));
    currentDiv.style.left = `${e.clientX + offset[0]}px`;
    currentDiv.style.top = `${e.clientY + offset[1]}px`;

    currentDivPosition = currentDiv.getBoundingClientRect();
    answerPosition = document.getElementById("answer").getBoundingClientRect();

    if (
      answerPosition.left <= currentDivPosition.right &&
      answerPosition.right >= currentDivPosition.left &&
      answerPosition.top <= currentDivPosition.bottom &&
      answerPosition.bottom >= currentDivPosition.top
    ) {
      answerTry = true;
      currentDiv.style.top = `${
        (answerPosition.height - currentDivPosition.height) / 2 +
        answerPosition.top
      }px`;
      currentDiv.style.left = `${
        answerPosition.left +
        (answerPosition.width - currentDivPosition.width) / 2
      }px`;
      checarResposta(text);
    } else {
      answerTry = false;
      check.innerText = "";
    }
  },
  true
);

//função para checar
const checarResposta = (e) => {
  if (e === "certa") {
    check.innerText = " Correta";
  } else {
    check.innerText = " Errada";
  }
};
