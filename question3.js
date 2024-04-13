//Wait for DOM to load before executing
window.onload=function(){
    const winner = document.getElementById("winner");
    const buttons = [];
    for(i=0; i<=8; i++) {
        buttons.push(document.getElementById("cell"+i));
    }

    const winCondition = [
        [buttons[0], buttons[1], buttons[2]],
        [buttons[3], buttons[4], buttons[5]],
        [buttons[6], buttons[7], buttons[8]],
        [buttons[0], buttons[3], buttons[6]],
        [buttons[1], buttons[4], buttons[7]],
        [buttons[2], buttons[5], buttons[8]],
        [buttons[0], buttons[4], buttons[8]],
        [buttons[2], buttons[4], buttons[6]]
    ];

    let turn = "✕";
    //Check if either X or O match any of the win conditions.
    const checkWinner = () => {
        ["✕", "◯"].forEach(sign => {
            winCondition.forEach(slot => {
                if(slot[0].innerText == sign && slot[1].innerText == sign && slot[2].innerText == sign) {
                    slot.forEach(button => {
                        button.style.backgroundColor = "#00ff0052"; //Highlight the boxes to show winning condition.
                    });

                    let winnerPlayer = "";

                    if (sign == "✕") {
                        winnerPlayer = "Player 1"
                    } else if (sign == "◯") {
                        winnerPlayer = "Player 2"
                    }

                    winner.innerText = winnerPlayer + " wins!"; //Define winner.
                    winner.style.visibility = "visible"; //Display winner alert.
                }
            });
        });
    };

    //Change turn everytime function is called.
    const switchTurn = () => {
        if(turn == "✕") {
            turn = "◯";
        }
        else{
            turn = "✕";
        }
        checkWinner();
    };

    //Connect a click function to each button in the buttons array.
    buttons.forEach(button => {
        button.addEventListener('click', ()=>{
            if(winner.style.visibility == "visible") return; //Check if someone has won by whether the winner div is visible or not.
            if(button.innerText != "") return; //Check if the button is not filled.
            button.innerText = turn; //Change button text to whose ever turn it is.
            switchTurn();
        });   
    });

    document.getElementById("reset").addEventListener('click', () => { //Upon clicking reset
        buttons.forEach(button => { //Loop through the buttons array
            button.innerText = ""; //Remove any X/Os from the text.
            turn = "✕"; //Set turn back to X
            button.style.backgroundColor = "rgba(255, 255, 255, 0)"; //Set background colour to defaults.
            winner.style.visibility = "hidden"; //Hide winner alert.
        });
    });
}