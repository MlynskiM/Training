const colors = [ "red", "green", "black", "grey", "lightblue"];
const color = document.querySelector('.color');
const btn = document.getElementById('btn1');


btn.addEventListener('click',function(){

    let pick = getRandomNumber();
    document.body.style.backgroundColor=colors[pick];
    color.textContent = colors[pick];

}
);

function getRandomNumber(){
    return Math.floor(Math.random()*colors.length);
}