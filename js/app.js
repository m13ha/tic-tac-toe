let app = {
  col: $("td"),

  turn: "player",

  cellCount: 9,

  drawChance: 0,

  playerScore: 0,

  computerScore: 0,

  delay: false,

  cells: [
    $("#c1"), $("#c2"), $("#c3"), $("#c4"), $("#c5"), $("#c6"), $("#c7"), $("#c8"), $("#c9")
  ],

  winMoves: [
    [$("#c1"), $("#c2"), $("#c3"), true],
    [$("#c4"), $("#c5"), $("#c6"), true],
    [$("#c7"), $("#c8"), $("#c9"), true],
    [$("#c1"), $("#c4"), $("#c7"), true],
    [$("#c2"), $("#c5"), $("#c8"), true],
    [$("#c3"), $("#c6"), $("#c9"), true],
    [$("#c1"), $("#c5"), $("#c9"), true],
    [$("#c7"), $("#c5"), $("#c3"), true]
  ],

  res: {
    v1: [$("#c1"), $("#c2"), $("#c3")],
    v2: [$("#c4"), $("#c5"), $("#c6")],
    v3: [$("#c7"), $("#c8"), $("#c9")],
    h1: [$("#c1"), $("#c4"), $("#c7")],
    h2: [$("#c2"), $("#c5"), $("#c8")],
    h3: [$("#c3"), $("#c6"), $("#c9")],
    d1: [$("#c1"), $("#c5"), $("#c9")],
    d2: [$("#c7"), $("#c5"), $("#c3")]
  },



  playerTurn: () => {
    app.col.click(function (e) {
      e.preventDefault();
      let clickedCell = $(this)[0];
      if (clickedCell.localName === "td") {
        if (app.turn === "player") {
          app.cells.forEach((item) => {
            //make sure the clicked cell is available
            if (clickedCell === item[0] && $(clickedCell).hasClass('available') === true && app.delay === false) {
              clickedCell.innerHTML = "x";
              $(clickedCell).addClass('player');
              $(clickedCell).removeClass('available');
              app.tableChecker(clickedCell);
              app.turn = "computer";
              app.computerTurn();
            }
          });
        }
      }
    });
  },

  computerTurn: () => {
    let m, c, move, pick, comPlay, moveChecker, movePlayer, normPlay, enVictory, blocking;

    comPlay = function () {
      m = Math.floor(Math.random() * 8);
      c = Math.floor(Math.random() * 3);
      // any array from win moves
      move = app.winMoves[m];
      // any cell from win moves
      pick = move[c][0];
      moveChecker(pick);
    };

    normPlay = function () {
      enVictory();
      blocking();
      comPlay();

    };

    enVictory = function () {
      for (let property in app.res) {
        let array = app.res[property];
        let cell1 = $(array[0][0]).hasClass('computer');
        let cell2 = $(array[1][0]).hasClass('computer');
        let cell3 = $(array[2][0]).hasClass('computer');
        if (cell1 || cell2 === true) {
          if (cell2 || cell3 === true) {
            if (cell1 || cell3 === true) {
              array.forEach((index) => {
                let cell = index[0];
                if ($(cell).hasClass('available') === true) {
                  movePlayer(cell)
                }
              })
            }
          }
        }
      }
    };

    blocking = function () {
      for (let property in app.res) {
        let array = app.res[property];
        let cell1 = $(array[0][0]).hasClass('player');
        let cell2 = $(array[1][0]).hasClass('player');
        let cell3 = $(array[2][0]).hasClass('player');
        if (cell1 || cell2 === true) {
          if (cell2 || cell3 === true) {
            if (cell1 || cell3 === true) {
              array.forEach((index) => {
                let cell = index[0];
                if ($(cell).hasClass('available') === true) {
                  movePlayer(cell)
                }
              })
            }
          }
        }
      }
    }

    moveChecker = function (data) {
      if ($(data).hasClass('available') === true && move[3] === true) {
        movePlayer(data);
      } else if (app.drawChance >= 8 && $(data).hasClass('available') === true) {
        movePlayer(data);
      } else {
        comPlay();
      }
    };

    movePlayer = function (data) {
      if (app.turn === "computer" && app.delay === false) {
        data.innerHTML = "o";
        $(data).removeClass('available');
        $(data).addClass('taken');
        $(data).addClass('computer');
        app.tableChecker();
        app.turn = "player";
      };
    };

    normPlay();
  },

  drawChecker: () => {
    if (app.cellCount === 0) {
      let alert = $("#alert");
      alert[0].innerHTML = 'DRAW!!!';
      app.reset();
    }

  },

  winnerCheck: () => {

    app.winMoves.forEach((item) => {
      let cell1 = item[0][0];
      let cell2 = item[1][0];
      let cell3 = item[2][0];
      let playerscore = $('#score-p');
      let compscore = $('#score-c');
      let alert = $("#alert");

      if ($(cell1).hasClass('player') === true && $(cell2).hasClass('player') === true && $(cell3).hasClass('player') === true) {
        alert[0].innerHTML = 'player wins!!!';
        app.playerScore += 1;
        playerscore[0].innerHTML = app.playerScore;
        app.reset();
      };
      if ($(cell1).hasClass('computer') === true && $(cell2).hasClass('computer') === true && $(cell3).hasClass('computer') === true) {
        alert[0].innerHTML = 'computer wins!!!';
        app.computerScore += 1;
        compscore[0].innerHTML = app.computerScore;
        app.reset();
      };
    });
  },

  drawUpdater: (data) => {
    app.winMoves.forEach((array) => {
      if (data === array[0][0] || data === array[1][0] || data === array[2][0] && array[3] === true && app.turn === "player") {
        array[3] = false;
        app.drawChance++
      }
    })
  },

  reset: () => {
    app.delay = true;
    let alert = $("#alert");
    setTimeout(() => {
      app.cells.forEach((item) => {
        item[0].innerHTML = " ";
        app.cellCount = 9;
        app.drawChance = 0;
        $(item[0]).removeClass('taken');
        $(item[0]).removeClass('player');
        $(item[0]).removeClass('computer');
        $(item[0]).addClass('available');
      });

      app.winMoves.forEach((array) => {
        array[3] = true;
      });
      app.delay = false;
      if(app.turn === 'computer'){
        app.computerTurn();
      };
      alert[0].innerHTML = '';
    }, 2500)
  },

  tableChecker: (data) => {
    app.cellCount--
    app.winnerCheck();
    app.drawChecker();
    app.drawUpdater(data);

  },

  resetBtn: () => {
     let resetBtn = $('#reset');
     let playerscore = $('#score-p');
     let compscore = $('#score-c');
     resetBtn.click((e) => {
       e.preventDefault();
      app.cells.forEach((item) => {
        item[0].innerHTML = " ";
        app.cellCount = 9;
        app.drawChance = 0;
        $(item[0]).removeClass('taken');
        $(item[0]).removeClass('player');
        $(item[0]).removeClass('computer');
        $(item[0]).addClass('available');
      });

      app.winMoves.forEach((array) => {
        array[3] = true;
      });
      app.delay = false;
      app.playerScore = 0;
      app.computerScore = 0;
      app.turn = 'player';
      compscore[0].innerHTML = app.computerScore;
      playerscore[0].innerHTML = app.playerScore;
     })
  },

  launcher : () => {
    app.playerTurn();
    app.resetBtn();
  }

};

app.launcher();
