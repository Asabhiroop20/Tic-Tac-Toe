const cells= document.querySelectorAll(".cell");
const statustext = document.querySelector(" #statustext");
const restart =document.querySelector("#restartbtn");
const wincondition=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let freecell= ["","","","","","","","",""];
const el1="X";
const el2="O";
function getRandomElement(el1, el2) {

    const random = Math.random();
    return random < 0.5 ? el1 : el2;
  }
let currentPlayer=getRandomElement(el1,el2);
let gameplay= false;
Startgame();
function Startgame(){
    cells.forEach(cell => cell.addEventListener("click",clickcell));
    restart.addEventListener("click",Restartgame);
    statustext.textContent= `${currentPlayer}'s turn`;
    gameplay= true ;

}
function clickcell(){
    const cellIndex = this.getAttribute("cellIndex");
    if (freecell[cellIndex]!= "" || gameplay== false){
        return;
    }
    else{
        updatecell(this,cellIndex);
        checkwinner();
    }

}
function updatecell(cell,index){
    freecell[index]=currentPlayer;
    cell.textContent=currentPlayer;
}
function changeplayer(){
    currentPlayer=(currentPlayer=="X")? "O":"X";
    statustext.textContent=`${currentPlayer}'s turn`;
}
function checkwinner(){
    let roundwon = false;
    for(  let i= 0 ; i<wincondition.length;i++){
        const condition=wincondition[i];
        const cellA=freecell[condition[0]];
        const cellB=freecell[condition[1]];
        const cellC=freecell[condition[2]];
        if (cellA==""||cellB==""||cellC==""){
            continue;
        }
        if(cellA==cellB && cellB==cellC){
            roundwon=true;
            break;
        }


    }
    if(roundwon==true){
        statustext.textContent=`${currentPlayer} Wins`;
        gameplay=false;

    }
    else if(!freecell.includes("")){
        statustext.textContent=" Its a Draw";

    }
    else{
        changeplayer();
    }


}
function Restartgame(){
    currentplayer = "X";
    freecell = ["", "", "", "", "", "", "", "", ""];
    statustext.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    gameplay= true;
}
