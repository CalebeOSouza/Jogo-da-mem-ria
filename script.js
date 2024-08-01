$(document).ready(function () {
  var numbers = [];
  var tabela = [];

  var imgcardalt = new Array(32);

  var pares; //Pares = (MAX * MAX) / 2
  var MAX;
  var zoomlevel;

  var imagens = new Array(
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32
  );

  var vitoria;

  var cartaAtual;
  var card;
  var tentativa1;
  var armazenador;
  var tentativa2;
  var primeiroclique = true;
  var posicoes;
  var idcards;
  var idposition;
  var noclick = false;
  var idbox1;
  var idbox2;

  var maxop = 4;
  var parop = 8;
  var zoom = 1;

  //__________________________________________________________//

  $("#easy").click(function () {
    localStorage.setItem("dificuldade", "easy");

    location.reload();
  });

  $("#normal").click(function () {
    localStorage.setItem("dificuldade", "normal");

    location.reload();
  });

  $("#hard").click(function () {
    localStorage.setItem("dificuldade", "hard");

    location.reload();
  });

  //__________________________________________________________//

  function gamedifficulty() {
    var dificuldade = localStorage.getItem("dificuldade");

    switch (dificuldade) {
      case "easy":
        maxop = 4;
        parop = 8;
        zoom = 0.9;

        console.log("MAX: " + maxop);
        console.log("PARES: " + parop);
        console.log("");

        document.body.style.zoom = zoom;

        break;

      case "normal":
        maxop = 6;
        parop = 18;
        zoom = 0.67;

        console.log("MAX: " + maxop);
        console.log("PARES: " + parop);
        console.log("");

        document.body.style.zoom = zoom;

        break;

      case "hard":
        maxop = 8;
        parop = 32;
        zoom = 0.5;

        console.log("MAX: " + maxop);
        console.log("PARES: " + parop);
        console.log("");

        document.body.style.zoom = zoom;

        break;
    }
  }

  function gerarcartas() {
    //Gerando numeros

    for (var i = 1; i <= pares; i++) {
      numbers.push(i, i);
    }
  }

  function embaralharimagens() {
    imagens.sort(function () {
      return 0.5 - Math.random();
    });
    console.log("Vetor imagens embaralhadas:" + imagens);
  }

  function embaralharcartas() {
    //Embaralhando números
    numbers.sort(function () {
      return 0.5 - Math.random();
    });
  }

  function tabuleiro() {
    //MATRIZ DO TABULEIRO

    for (var i = 0; i < MAX; i++) {
      tabela[i] = [];

      for (var j = 0; j < MAX; j++) {
        tabela[i][j] = 0;
      }
    }

    for (i = 0; i < MAX; i++) {
      for (j = 0; j < MAX; j++) {
        tabela[i][j] = numbers[i * MAX + j];
      }
    }

    //Guardando valores da matriz em variaveis

    for (i = 0; i < MAX; i++) {
      for (j = 0; j < MAX; j++) {
        var posicao = "posicao" + (i * MAX + j);
        window[posicao] = tabela[i][j];
      }
    }

    for (p = 0; p < MAX * MAX; p++) {
      console.log("Posição " + p + ": " + window["posicao" + p]);
    }
    console.log("");
  }

  function geracoes() {
    var divcont = 1;

    for (i = 0; i < 1; i++) {
      var divp = document.createElement("div");
      divp.classList.add("divprincipal");

      $("body").append(divp);
    }

    for (i = 1; i <= MAX; i++) {
      var divs = document.createElement("div");
      divs.classList.add("divisao");
      divs.setAttribute("id", "div" + i);

      $(".divprincipal").append(divs);

      for (j = 1; j <= MAX; j++) {
        var imgcards = document.createElement("img");
        imgcards.classList.add("cartas");
        var imgID = (divcont - 1) * MAX + j;
        imgcards.setAttribute("id", "carta" + imgID);
        imgcards.setAttribute("src", "images/" + "costas.png");
        imgcards.setAttribute("width", "200");
        imgcards.setAttribute("height", "200");

        $(".divisao:last-child").append(imgcards);
      }
      divcont++;
    }
  }

  function VorD() {
    if (vitoria == pares) {
      vitoria = 0;

      setTimeout(function () {
        alert("Parabéns! Você encontrou todos os pares.");
        location.reload();
      }, 200);
    }
  }

  function memoria() {
    MAX = maxop;
    pares = parop;
    zoomlevel = zoom;

    gerarcartas();
    embaralharimagens();
    embaralharcartas();
    tabuleiro();
    geracoes();
    vitoria = 0;
  }

  gamedifficulty();
  memoria();

  //__________________________________________________________//

  //Cliques

  tentativa1 = 0;
  armazenador = 0;
  tentativa2 = 0;
  primeiroclique = true;

  //CLIQUE 1

  $(".cartas").click(function () {
    idcards = $(this).attr("id");
    idposition = parseInt($(this).attr("id").replace("carta", "")) - 1; // Subtrair 1
    posicoes = parseInt(window["posicao" + idposition]);

    if ($(this).attr("class") == "cartasremoved") {
      return;
    }

    if (noclick) {
      return;
    }

    if (primeiroclique) {
      tentativa1 = posicoes;
      armazenador = tentativa1;

      switch (posicoes) {
        case 1:
          $(this).attr("src", "images/" + imagens[0] + ".png");

          break;

        case 2:
          $(this).attr("src", "images/" + imagens[1] + ".png");

          break;

        case 3:
          $(this).attr("src", "images/" + imagens[2] + ".png");

          break;

        case 4:
          $(this).attr("src", "images/" + imagens[3] + ".png");

          break;

        case 5:
          $(this).attr("src", "images/" + imagens[4] + ".png");

          break;

        case 6:
          $(this).attr("src", "images/" + imagens[5] + ".png");

          break;

        case 7:
          $(this).attr("src", "images/" + imagens[6] + ".png");

          break;

        case 8:
          $(this).attr("src", "images/" + imagens[7] + ".png");

          break;

        case 9:
          $(this).attr("src", "images/" + imagens[8] + ".png");

          break;

        case 10:
          $(this).attr("src", "images/" + imagens[9] + ".png");

          break;

        case 11:
          $(this).attr("src", "images/" + imagens[10] + ".png");

          break;

        case 12:
          $(this).attr("src", "images/" + imagens[11] + ".png");

          break;

        case 13:
          $(this).attr("src", "images/" + imagens[12] + ".png");

          break;

        case 14:
          $(this).attr("src", "images/" + imagens[13] + ".png");

          break;

        case 15:
          $(this).attr("src", "images/" + imagens[14] + ".png");

          break;

        case 16:
          $(this).attr("src", "images/" + imagens[15] + ".png");

          break;

        case 17:
          $(this).attr("src", "images/" + imagens[16] + ".png");

          break;

        case 18:
          $(this).attr("src", "images/" + imagens[17] + ".png");

          break;

        case 19:
          $(this).attr("src", "images/" + imagens[18] + ".png");

          break;

        case 20:
          $(this).attr("src", "images/" + imagens[19] + ".png");

          break;

        case 21:
          $(this).attr("src", "images/" + imagens[20] + ".png");

          break;

        case 22:
          $(this).attr("src", "images/" + imagens[21] + ".png");

          break;

        case 23:
          $(this).attr("src", "images/" + imagens[22] + ".png");

          break;

        case 24:
          $(this).attr("src", "images/" + imagens[23] + ".png");

          break;

        case 25:
          $(this).attr("src", "images/" + imagens[24] + ".png");

          break;

        case 26:
          $(this).attr("src", "images/" + imagens[25] + ".png");

          break;

        case 27:
          $(this).attr("src", "images/" + imagens[26] + ".png");

          break;

        case 28:
          $(this).attr("src", "images/" + imagens[27] + ".png");

          break;

        case 29:
          $(this).attr("src", "images/" + imagens[28] + ".png");

          break;

        case 30:
          $(this).attr("src", "images/" + imagens[29] + ".png");

          break;

        case 31:
          $(this).attr("src", "images/" + imagens[30] + ".png");

          break;

        case 32:
          $(this).attr("src", "images/" + imagens[31] + ".png");

          break;
      }

      card = $(this).attr("src");
      cartaAtual = $(this);

      idbox1 = idcards;

      //Talvez seja removido
      $("#" + idbox1).attr("class", "cartasviradas");

      //ATIVANDO 2ND CLIQUE
      primeiroclique = false;

      //CLIQUE 2
    } else {
      var idcards = $(this).attr("id");

      //Mesma carta
      if (cartaAtual.attr("id") === idcards) {
        return;
      }

      tentativa2 = posicoes;

      idbox2 = idcards;

      switch (posicoes) {
        case 1:
          $(this).attr("src", "images/" + imagens[0] + ".png");

          break;

        case 2:
          $(this).attr("src", "images/" + imagens[1] + ".png");

          break;

        case 3:
          $(this).attr("src", "images/" + imagens[2] + ".png");

          break;

        case 4:
          $(this).attr("src", "images/" + imagens[3] + ".png");

          break;

        case 5:
          $(this).attr("src", "images/" + imagens[4] + ".png");

          break;

        case 6:
          $(this).attr("src", "images/" + imagens[5] + ".png");

          break;

        case 7:
          $(this).attr("src", "images/" + imagens[6] + ".png");

          break;

        case 8:
          $(this).attr("src", "images/" + imagens[7] + ".png");

          break;

        case 9:
          $(this).attr("src", "images/" + imagens[8] + ".png");

          break;

        case 10:
          $(this).attr("src", "images/" + imagens[9] + ".png");

          break;

        case 11:
          $(this).attr("src", "images/" + imagens[10] + ".png");

          break;

        case 12:
          $(this).attr("src", "images/" + imagens[11] + ".png");

          break;

        case 13:
          $(this).attr("src", "images/" + imagens[12] + ".png");

          break;

        case 14:
          $(this).attr("src", "images/" + imagens[13] + ".png");

          break;

        case 15:
          $(this).attr("src", "images/" + imagens[14] + ".png");

          break;

        case 16:
          $(this).attr("src", "images/" + imagens[15] + ".png");

          break;

        case 17:
          $(this).attr("src", "images/" + imagens[16] + ".png");

          break;

        case 18:
          $(this).attr("src", "images/" + imagens[17] + ".png");

          break;

        case 19:
          $(this).attr("src", "images/" + imagens[18] + ".png");

          break;

        case 20:
          $(this).attr("src", "images/" + imagens[19] + ".png");

          break;

        case 21:
          $(this).attr("src", "images/" + imagens[20] + ".png");

          break;

        case 22:
          $(this).attr("src", "images/" + imagens[21] + ".png");

          break;

        case 23:
          $(this).attr("src", "images/" + imagens[22] + ".png");

          break;

        case 24:
          $(this).attr("src", "images/" + imagens[23] + ".png");

          break;

        case 25:
          $(this).attr("src", "images/" + imagens[24] + ".png");

          break;

        case 26:
          $(this).attr("src", "images/" + imagens[25] + ".png");

          break;

        case 27:
          $(this).attr("src", "images/" + imagens[26] + ".png");

          break;

        case 28:
          $(this).attr("src", "images/" + imagens[27] + ".png");

          break;

        case 29:
          $(this).attr("src", "images/" + imagens[28] + ".png");

          break;

        case 30:
          $(this).attr("src", "images/" + imagens[29] + ".png");

          break;

        case 31:
          $(this).attr("src", "images/" + imagens[30] + ".png");

          break;

        case 32:
          $(this).attr("src", "images/" + imagens[31] + ".png");

          break;
      }

      //Talvez seja removido
      $("#" + idbox2).attr("class", "cartasviradas");

      if (armazenador === tentativa2) {
        $("#" + idbox1).attr("class", "cartasremoved");

        $("#" + idbox2).attr("class", "cartasremoved");

        card = null;
        cartaAtual = null;

        vitoria++;

        console.log("Pares encontrados:" + vitoria);

        VorD();
      } else {
        var $this = $(this);

        setTimeout(function () {
          $("#" + idbox2).attr("class", "cartas");
          $("#" + idbox1).attr("class", "cartas");

          $this.attr("src", "images/" + "costas.png");

          cartaAtual.attr("src", "images/" + "costas.png"); // <---- ALGUM PROBLEMA DESCONHECIDO NESSA LINHA

          cartaAtual = null;
          carta = null;
        }, 1000);
      }

      noclick = true;

      setTimeout(function () {
        noclick = false;
      }, 1000);

      primeiroclique = true;
    }
  });
});
