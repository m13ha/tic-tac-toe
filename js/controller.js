import modelApp from './model.js';
import viewApp from './view.js';

let controlApp = {
    col: $("td"),

    playerClick: () => {
        controlApp.col.click(function (e) {
            e.preventDefault();
            let clickedCell = $(this)[0];
            if (clickedCell.localName === "td") {
                modelApp.playerMove(clickedCell);
            }
        });
    },

    callPlayerTextChng: (data) => {
        viewApp.playerTextChanger(data);
    },


    callCompTextChng: (data) => {
        viewApp.computerTextChanger(data);
    },

    callDrawAlert: () => {
        viewApp.drawAlert();
    },

    callPlayerWinAlert: (data, array) => {
        viewApp.playerWinAlert(data, array);
    },

    callCompWinAlert: (data, array) => {
        viewApp.computerWinAlert(data, array)
    },

    callViewReset: (array1) => {
        viewApp.resetBoard(array1);
    },

    resetBtn: () => {
        let resetBtn = $('#reset');
        resetBtn.click((e) => {
            e.preventDefault();
            let array = modelApp.cells;
            modelApp.resetBtn();
            viewApp.resetBtn(array);
        });
    },

    launcher: () => {
        controlApp.playerClick();
        controlApp.resetBtn();
    }

}

controlApp.launcher();

export default controlApp;