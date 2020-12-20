let app = {
  col: $("td"),

  turn: "player",

  cellCount: 9,

  drawChance: 0,

  difficulty: 'normal',

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

  playerTurn: () => {
    app.col.click(function (e) {
      e.preventDefault();
      let clickedCell = $(this)[0];
      if (clickedCell.localName === "td") {
        if (app.turn === "player") {
          app.cells.forEach((item) => {
            //make sure the clicked cell is not taken
            if (clickedCell === item[0] && $(clickedCell).hasClass('available') === true) {
              clickedCell.innerHTML = "x";
              $(clickedCell).addClass('player');
              $(clickedCell).removeClass('available');
              app.tableChecker(clickedCell);
              app.turn = "computer";
              // computer turn
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
    };

    enVictory = function () {
      for (let i = 0; i < 8; i++) {
        let array = app.winMoves[i];
        let cell1 = array[0][0];
        let cell2 = array[1][0];
        let cell3 = array[2][0];
        if ($(cell1).hasClass('computer') === true || $(cell2).hasClass('computer') === true) {
          if ($(cell1).hasClass('computer') === true || $(cell3).hasClass('computer') === true) {
            if ($(cell2).hasClass('computer') === true || $(cell3).hasClass('computer') === true) {
              for (let p = 0; p < 3; p++) {
                if ($(array[p][0]).hasClass('available') === true) {
                  console.log(array[p][0]);
                  movePlayer(array[p][0], 'winning move');
                }
              }
            }
          };
        } else {
          blocking();
        }
      }
    };

    blocking = function () {
      for (let i = 0; i < 8; i++) {
        let array = app.winMoves[i];
        let cell1 = array[0][0];
        let cell2 = array[1][0];
        let cell3 = array[2][0];
        if ($(cell1).hasClass('player') === true || $(cell2).hasClass('player') === true) {
          if ($(cell1).hasClass('player') === true || $(cell3).hasClass('player') === true) {
            if ($(cell2).hasClass('player') === true || $(cell3).hasClass('player') === true) {
              for (let p = 0; p < 3; p++) {
                if ($(array[p][0]).hasClass('available') === true) {
                  console.log(array[p][0]);
                  movePlayer(array[p][0], 'blocking move');
                }
              }
            }
          };
        } else {
          comPlay();
        }
      };
    }

    moveChecker = function (data) {
      if ($(data).hasClass('available') === true && move[3] === true) {
        movePlayer(data, 'checker winning');
      } else if (app.drawChance >= 8 && $(data).hasClass('available') === true) {
        movePlayer(data, 'checker draw');
      }
      else {
        comPlay();
      }
    };

    movePlayer = function (data, where) {
      if (app.turn === "computer") {
        data.innerHTML = "o";
        $(data).removeClass('available');
        $(data).addClass('taken');
        $(data).addClass('computer');
        console.log(data, where);
        app.tableChecker();
        app.turn = "player";
      };
    };

    if (app.difficulty === "easy") {
      comPlay();
    } else if (app.difficulty === "normal") {
      normPlay();
    }
  },

  drawChecker: () => {
    if (app.cellCount === 0) {
      alert('DRAW');
      app.reset();
    }

  },

  winnerCheck: () => {

    app.winMoves.forEach((item) => {
      let cell1 = item[0][0];
      let cell2 = item[1][0];
      let cell3 = item[2][0];
      if ($(cell1).hasClass('player') === true && $(cell2).hasClass('player') === true && $(cell3).hasClass('player') === true) {
        alert('PLAYER WINS');
        app.reset();
      };
      if ($(cell1).hasClass('computer') === true && $(cell2).hasClass('computer') === true && $(cell3).hasClass('computer') === true) {
        alert('COMPUTER WINS');
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
    })
  },

  tableChecker: (data) => {
    app.cellCount--
    app.winnerCheck();
    app.drawChecker();
    app.drawUpdater(data);

  },

};

app.playerTurn();


