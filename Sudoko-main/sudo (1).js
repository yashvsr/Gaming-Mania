const easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
  ];
  const medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
  ];
  const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
  ];

let timer;
let timeremaning;
let lives;
let selectedNum;
let selectedTile;
let disableSelect;


window.onload =function(){
    id("start-btn").addEventListener("click",startGame); 

    for(let i=0;i<id("number-container").children.length;++i){
        id("number-container").children[i].addEventListener("click",function(){
            if(!disableSelect){
                if(this.classList.contains("selected")){
                    this.classList.remove("selected");
                selectedNum=null;}
                else{
                    for(let j=0;j<id("number-container").children.length;++j){
                        id("number-container").children[j].classList.remove("selected");
                    }
                    this.classList.add("selected");
                    selectedNum=this;
                    updateMove();
                }

            }

        });
    }
}

function startGame(){
    //console.log('start');
    let board;
    if(id("diff-1").checked) board=easy[0];
    else if(id("diff-2").checked) board=medium[0];
    else board =hard[0];

    lives=3;
    disableSelect=false;
    id("lives").textContent ="Lives Remaning: 3";

    generateBoard(board);

    startTimer();

    if(id("theme-1").checked){
        qs("body").classList.remove("dark");
    }else{
        qs("body").classList.add("dark");
    }
    id("number-container").classList.remove("hidden");

}

function startTimer(){

    if(id("time-1").checked) timeremaning=180;
    else if(id("time-2").checked) timeremaning=300;
    else timeremaning=600;

    id("timer").textContent =timeconversion(timeremaning);

    timer= setInterval(function() {
        timeremaning--;
        if(timeremaning === 0) endGame();
        id("timer").textContent=timeconversion(timeremaning);
    },1000)
}

function timeconversion(time){
    let minu=Math.floor(time/60);
    if(minu<10) minu="0"+minu;
    let seco=time%60;
    if(seco<10) seco="0"+seco;
    return minu+ ":" +seco;
}

function generateBoard(board){
    clearPrevious();

    let idcount=0;

    for(let i=0;i<81;++i){
        let tile =document.createElement("p");
        if(board.charAt(i) != "-"){
            tile.textContent=board.charAt(i);
        }else{
            tile.addEventListener("click",function(){
                if(!disableSelect){
                if(tile.classList.contains("selected")){
                    tile.classList.remove("selected");
                    selectedTile=null;
                }else{

                    for(let i=0;i<81;++i){
                        qsa(".tile")[i].classList.remove("selected");
                    }
                    tile.classList.add("selected");
                    selectedTile=tile;
                    updateMove();
                }

                }
            });

        }
        tile.id = idcount;
        idcount++;
        tile.classList.add("tile");
        if((tile.id>17 && tile.id<27) || (tile.id>44 && tile.id<54)){
            tile.classList.add("bottomBorder");
        }
        if(((tile.id+1)%9==3) || ((tile.id+1)%9==6)){
            tile.classList.add("rightBorder");
        }

        id("board").appendChild(tile);
    }
}
function updateMove(){
    if(selectedTile && selectedNum){
        selectedTile.textContent = selectedNum.textContent;
        if(checkcorrect(selectedTile)){
            selectedTile.classList.remove("selected");
            selectedNum.classList.remove("selcted");

            selectedNum=null;
            selectedTile=null;

            if(checkdone()){
                endGame();
            }

        }else{
            disableSelect=true;
            selectedTile.classList.add("incorrect");
            setTimeout(function(){
                lives--;
                if(lives==0)
                endGame();
                else{
                    id("lives").textContent= "Lives Remaning: " + lives;
                    selectedTile.classList.remove("incorrect");
                    selectedNum.classList.remove("selected");
                    selectedTile.classList.remove("selected");
                    selectedTile.textContent="";
                    disableSelect=false;
                    selectedTile=null;
                    selectedNum=null;

                }
            },500)
        }
        }
    }

function checkcorrect(){
    let tiles=qsa(".tiles");
    for(let i=0;i<tiles.length;++i){
        if(tiles[i].textContent === "") return false;
    }
    return true;
}

function endGame(){
    disableSelect=true;
    clearTimeout(timer);
    if(lives===0 || timeremaning===0){
        id("lives").textContent="You Lost!";
    }else{
        id("lives").textContent= "You Win!";
    }

}
function checkcorrect(tile){
    let solution;
    if(id("diff-1").checked) solution =easy[1];
    else if(id("diff-2").checked) solution=medium[1];
    else solution =hard[1];
    if(solution.charAt(tile.id) === tile.textContent) return true;
    else return false;
}

function clearPrevious(){
    let tiles= qsa(".tile");

    for(let i=0;i<tiles.length;++i){
        tiles[i].remove();
    }

    if(timer) clearTimeout(timer);

    for(let i=0;i<id("number-container").children.length;++i){
        id("number-container").children[i].classList.remove("selected");
    }

    selectedTile=null;
    selectedNum=null;
}

function id(id){
    return document.getElementById(id);//querySelector(`#${id}`);
}

function qs(selector){
    return document.querySelector(selector);
}

function qsa(selector){
    return document.querySelectorAll(selector);
}
