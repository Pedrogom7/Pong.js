let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let vxBolinha = 5;
let vyBolinha = 5;
let raio = diametro / 2;

let xRaquete = 5;
let yRaquete = 150;
let raqueteLargura = 10;
let raqueteAltura = 80;

let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let vYOponente;

let meusPontos = 0;
let pontosOponente = 0;

let velocidadeBase = 5;
let aumentoVelocidade = 0.5;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  stroke(255);
  drawCenterLine();
  mostrarBolinha();
  movimentarBolinha();
  verificarColisaoBorda();
  mostrarRaquete(xRaquete, yRaquete);
  movimentarRaquete();
  verificarColisaoRaquete(xRaquete, yRaquete);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentarRaqueteOponente();
  verificarColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluirPlacar();
}

function drawCenterLine() {
  for (let i = 0; i < height; i += 20) {
    rect(width / 2 - 5, i, 5, 10);
  }
}

function mostrarBolinha() {
  fill(255);
  circle(xBolinha, yBolinha, diametro);
}

function movimentarBolinha() {
  xBolinha += vxBolinha;
  yBolinha += vyBolinha;
}

function verificarColisaoBorda() {
  if (xBolinha + raio > width) {
    meusPontos += 1;
    resetBolinha();
  } else if (xBolinha - raio < 0) {
    pontosOponente += 1;
    resetBolinha();
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    vyBolinha *= -1;
  }
}

function mostrarRaquete(x, y) {
  fill(255);
  rect(x, y, raqueteLargura, raqueteAltura);
}

function movimentarRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
    yRaquete = constrain(yRaquete, 0, height - raqueteAltura);
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
    yRaquete = constrain(yRaquete, 0, height - raqueteAltura);
  }
}

function verificarColisaoRaquete(x, y) {
  if (
    xBolinha - raio < x + raqueteLargura &&
    xBolinha + raio > x &&
    yBolinha > y &&
    yBolinha < y + raqueteAltura
  ) {
    vxBolinha *= -1;
  }
}

function movimentarRaqueteOponente() {
  vYOponente = yBolinha - yRaqueteOponente - raqueteAltura / 2;
  yRaqueteOponente += vYOponente * 0.1;
  yRaqueteOponente = constrain(yRaqueteOponente, 0, height - raqueteAltura);
}

function incluirPlacar() {
  textSize(32);
  fill(255);
  textAlign(CENTER);
  text(meusPontos, width / 4, 50);
  text(pontosOponente, 3 * width / 4, 50);
}

function resetBolinha() {
  xBolinha = width / 2;
  yBolinha = height / 2;
  vxBolinha = (Math.random() > 0.5 ? 1 : -1) * velocidadeBase;
  vyBolinha = (Math.random() * 2 - 1) * velocidadeBase;
  velocidadeBase += aumentoVelocidade;
}