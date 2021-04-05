import controlApp from './controller.js'

let modelApp = {
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

    playerMove: (data) => {
        let clickedCell = data;
        if (modelApp.turn === "player") {
            modelApp.cells.forEach((item) => {
                //make sure the clicked cell is available
                if (clickedCell === item[0] && $(clickedCell).hasClass('available') === true && modelApp.delay === false) {
                    controlApp.callPlayerTextChng(data);
                    modelApp.tableChecker(clickedCell);
                    modelApp.turn = "computer";
                    modelApp.computerTurn();
                }
            });
        }

    },

    computerTurn: () => {
        let m, c, move, pick, comPlay, moveChecker, movePlayer, normPlay, enVictory, blocking;

        comPlay = function () {
            m = Math.floor(Math.random() * 8);
            c = Math.floor(Math.random() * 3);
            // any array from win moves
            move = modelApp.winMoves[m];
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
            for (let property in modelApp.res) {
                let array = modelApp.res[property];
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
            for (let property in modelApp.res) {
                let array = modelApp.res[property];
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
            } else if (modelApp.drawChance >= 8 && $(data).hasClass('available') === true) {
                movePlayer(data);
            } else {
                comPlay();
            }
        };

        movePlayer = function (data) {
            let cell = data;
            if (modelApp.turn === "computer" && modelApp.delay === false) {
                controlApp.callCompTextChng(cell);
                modelApp.tableChecker();
                modelApp.turn = "player";
            };
        };

        normPlay();
    },

    drawChecker: () => {
        if (modelApp.cellCount === 0) {
            controlApp.callDrawAlert();
            modelApp.reset();
        }
    },

    drawUpdater: (data) => {
        modelApp.winMoves.forEach((array) => {
            if (data === array[0][0] || data === array[1][0] || data === array[2][0] && array[3] === true && modelApp.turn === "player") {
                array[3] = false;
                modelApp.drawChance++
            }
        })
    },

    winnerCheck: () => {

        modelApp.winMoves.forEach((item) => {
            let cell1 = item[0][0];
            let cell2 = item[1][0];
            let cell3 = item[2][0];

            if ($(cell1).hasClass('player') === true && $(cell2).hasClass('player') === true && $(cell3).hasClass('player') === true) {
                let array = [cell1, cell2, cell3];
                modelApp.playerScore += 1;
                controlApp.callPlayerWinAlert(modelApp.playerScore, array);
                modelApp.reset();
            };
            if ($(cell1).hasClass('computer') === true && $(cell2).hasClass('computer') === true && $(cell3).hasClass('computer') === true) {
                let array = [cell1, cell2, cell3];
                modelApp.computerScore += 1;
                controlApp.callCompWinAlert(modelApp.computerScore, array);
                modelApp.reset();
            };
        });
    },

    reset: () => {
        modelApp.delay = true;
        controlApp.callViewReset(modelApp.cells);
        setTimeout(() => {
            modelApp.cellCount = 9;
            modelApp.drawChance = 0;
            modelApp.winMoves.forEach((array) => {
                array[3] = true;
            });
            modelApp.delay = false;
            if (modelApp.turn === 'computer') {
                modelApp.computerTurn();
            };
        }, 2000)
    },

    tableChecker: (data) => {
        modelApp.cellCount--
        modelApp.winnerCheck();
        modelApp.drawChecker();
        modelApp.drawUpdater(data);

    },

    resetBtn: () => {
        modelApp.cellCount = 9;
        modelApp.drawChance = 0;
        modelApp.winMoves.forEach((array) => {
            array[3] = true;
        });
        modelApp.delay = false;
        modelApp.playerScore = 0;
        modelApp.computerScore = 0;
        modelApp.turn = 'player';
    },



}


export default modelApp;