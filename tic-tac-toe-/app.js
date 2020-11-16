// players => symbols and score define
const player1 = 'O';
const player2 = 'X';
let score = {
    pl1: 0,
    pl2: 0,
};

let round = 1;
let reset=false;

// game board
const board = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
];

// winning combinations
const combinations = [
    [0, 1, 2, 3],[4, 5, 6, 7],[8, 9, 10, 11],
    [12, 13, 14, 15],[0, 4, 8, 12],[1, 5, 9, 13],
    [2, 6, 10, 14],[3, 7, 11, 15],[0, 5, 10, 15],
    [3, 6, 9, 12]
];

//select all boxes with class box
const boxes =[...document.querySelectorAll('.box')];
boxes.forEach(box => box.addEventListener('click', pick));

// define array with new round types
const newround = new Array(15);
    newround[0] = document.getElementById('1'); 
    newround[1]= document.getElementById('2');
    newround[2] = document.getElementById('3');
    newround[3] = document.getElementById('4');
    newround[4] = document.getElementById('5');
    newround[5] = document.getElementById('6');
    newround[6] = document.getElementById('7');
    newround[7] = document.getElementById('8');
    newround[8] = document.getElementById('9');
    newround[9] = document.getElementById('10');
    newround[10] = document.getElementById('11');
    newround[11] = document.getElementById('12');
    newround[12] = document.getElementById('13');
    newround[13] = document.getElementById('14');
    newround[14] = document.getElementById('15');
    newround[15] = document.getElementById('16');




//function pick take event because there is a click event 
function pick(event)
{
    // sets in div element like data-row taking by .dataset metod
    const {row, column} = event.target.dataset;


    // ? player 2 : player 1 shorter if else
    // : <- else player 1
    const turn = round % 2 === 0  ? player2 : player1;

    if(!reset)
    {
        if (board[row][column] !== '') return;
        event.target.textContent=turn;
        board[row][column] = turn;
        round++;
        check();
    }
    else
    {
        
        for(let i=0; i<16;i++){
            newround[i].textContent='';
        }
       reset = false;
        
    }
    
}

// Check for the winner
function check()
{
    const result = board.reduce((total, row) => total.concat(row));
    
    let winner = null;
    let moves = {
        'X': [],
        'O': [],
    };
    result.forEach((field, index) => moves[field] ? moves[field].push(index) : null);
    combinations.forEach(combinations =>{
        if(combinations.every(index => moves[player1].indexOf(index) > -1)){
            score.pl1++;
            winner = document.querySelector('#sp1').textContent='Score: '+score.pl1;
            clear();
            
        }
        if(combinations.every(index => moves[player2].indexOf(index) > -1)){
            score.pl2++;
            winner = document.querySelector('#sp2').textContent='Score: '+score.pl2;
            clear();
        }
        return winner;
    });
}


// border array content clear function 
function clear()
{
    
    for(let i = 0; i<4; i++)
    {
        for(let j=0; j<4; j++)
        {   
            board[j][i] = '';

        }
    }
    
    reset = true;
    
    
}