let viewApp = {

    playerTextChanger: (data) => {
        let clickedCell = data;
        clickedCell.innerHTML = "x";
        $(clickedCell).addClass('player');
        $(clickedCell).removeClass('available');
    },

    computerTextChanger: (data) => {
        let cell = data;
        cell.innerHTML = "o";
        $(data).removeClass('available');
        $(data).addClass('taken');
        $(data).addClass('computer');
    },

    drawAlert: () => {
        let alert = $("#alert");
        alert[0].innerHTML = 'Draw!';
    },

    playerWinAlert: (data, array) => {
        let playerscore = $('#score-p');
        let alert = $("#alert");
        alert[0].innerHTML = 'you win!';
        playerscore[0].innerHTML = data;
        array.forEach((item) => {
            $(item).css('color', 'white');
        })
        setTimeout(() => {
            array.forEach((item) => {
                $(item).css('color', 'black');
            })
        }, 1800)
    },

    computerWinAlert: (data, array) => {
        let compscore = $('#score-c');
        let alert = $("#alert");
        alert[0].innerHTML = 'com wins!';
        compscore[0].innerHTML = data;
        array.forEach((item) => {
            $(item).css('color', 'white');
        })
        setTimeout(() => {
            array.forEach((item) => {
                $(item).css('color', 'black');
            })
        }, 1800)
    },

    resetBoard: (array) => {
        let alert = $("#alert");
        setTimeout(() => {
            array.forEach((item) => {
                item[0].innerHTML = " ";
                $(item[0]).removeClass('taken');
                $(item[0]).removeClass('player');
                $(item[0]).removeClass('computer');
                $(item[0]).addClass('available');
            });

            alert[0].innerHTML = '';

        }, 2000)
    },

    resetBtn: (array) => {
        let playerscore = $('#score-p');
        let compscore = $('#score-c');
        array.forEach((item) => {
            item[0].innerHTML = " ";
            $(item[0]).removeClass('taken');
            $(item[0]).removeClass('player');
            $(item[0]).removeClass('computer');
            $(item[0]).addClass('available');
        });
        compscore[0].innerHTML = 0;
        playerscore[0].innerHTML = 0;
    }
}

export default viewApp;