const colors = [ "A", "B", "C", "D", "E", "F", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const color = document.querySelector('.color');
const btn = document.getElementById('btn2');


btn.addEventListener('click',function(){
    let hexcolor='#';

    for(let i=0; i<6; i++)
    {
        hexcolor+=colors[getRandomNumber()];

    }
    document.body.style.backgroundColor=hexcolor;
    color.textContent = hexcolor;

}
);

function getRandomNumber(){
    return Math.floor(Math.random()*colors.length);
}