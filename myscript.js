

//Game Setup
//Game Setup
//Game Setup
//Game Setup

//Transition from title screen to select # player screen
playBtn.addEventListener('click', function (e){
    document.getElementById('floatScreenTitleId').classList.add('hidden')
    document.getElementById('floatScreenTitleId').classList.remove('float-screen-title')
    document.getElementById('floatScreenPlayersId').classList.add('float-screen-players')
    document.getElementById('floatScreenPlayersId').classList.remove('hidden')
})

//set player total
//Transition from # player screen to select piece screen
playerTotalButtons.forEach(item =>{
    let playerButton = item.button
    let playerTotal = item.value
    playerButton.addEventListener('click', function (e){
        document.getElementById('floatScreenPlayersId').classList.remove('float-screen-players')
        document.getElementById('floatScreenPlayersId').classList.add('hidden')
        document.getElementById('floatScreenPieceSelectionId').classList.remove('hidden')
        document.getElementById('floatScreenPieceSelectionId').classList.add('float-screen-piece-selection')
        totalPlayers = playerTotal;
    })
})

//Set each player icon
pieceSelectionButton.forEach(icon => {
    let iconButton = icon.button
    let iconPiece = icon.gamePiece
    let iconIdname = icon.gamePieceId
    let iconColor = icon.color
    iconButton.addEventListener('click', function (e){
        currentPlayerTurn.gamePiece = iconPiece
        currentPlayerTurn.pieceId = iconIdname
        currentPlayerTurn.color = iconColor
        playersSelected++
        document.querySelector(`${iconIdname}Btn`).disabled = true;
        document.querySelector(`${iconIdname}Btn`).style.opacity = "0";
        whosTurnSetup();

        if (playersSelected === totalPlayers){
            generatePlayerPieces();
        }
    })


})

function whosTurnSetup (){
    if (playerTurnTicker === 1){
        playerTurnTicker++
        currentPlayerTurn = activePlayers[1];
        if (playerTurnTicker === totalPlayers + 1){
            currentPlayerTurn = activePlayers[0];
            playerTurnTicker = 1  
        }
        return;
    }
    else if(playerTurnTicker === 2){
        playerTurnTicker++
        currentPlayerTurn = activePlayers[2];
        if (playerTurnTicker === totalPlayers + 1){
            currentPlayerTurn = activePlayers[0];
            playerTurnTicker = 1  
        }
        return;
    } 
    else if(playerTurnTicker === 3){
        playerTurnTicker++
        currentPlayerTurn = activePlayers[3];
        if (playerTurnTicker === totalPlayers + 1){
            currentPlayerTurn = activePlayers[0];
            playerTurnTicker = 1  
        }
        return;
    }
    else {
        currentPlayerTurn = activePlayers[0];
        playerTurnTicker = 1  
    }
}

function generatePlayerPieces(){
    for (let i = 0; i < totalPlayers ; i++ ){
        placePiece();
        whosTurnSetup();
        displayPlayerCash()
    }
    currentPlayerTurn = activePlayers[0];
    startGame();
}

function displayPlayerCash(){
    document.getElementById(currentPlayerTurn.cashDisplayId).innerText = `${currentPlayerTurn.name} Cash: ${currentPlayerTurn.cash}`
    document.getElementById(currentPlayerTurn.cashDisplayId).style.color = currentPlayerTurn.color
}

function updatePlayerCashTotalDisplay(){
    for (let i = 0; i < totalPlayers; i++){
        document.getElementById(activePlayers[i].cashDisplayId).innerText = `${activePlayers[i].name} Cash: ${activePlayers[i].cash}`
    }
}

function startGame (){
    if (totalPlayers === playersSelected){
        document.getElementById('floatScreenPieceSelectionId').classList.add('hidden')
        document.getElementById('floatScreenPieceSelectionId').classList.remove('float-screen-piece-selection')
        document.getElementById('floatScreenGameId').classList.add('float-screen-game')
        document.getElementById('floatScreenGameId').classList.remove('hidden')
        updateMiddleScreenPlayerTurn()
        updateMiddleScreenPlayerLocation()
    }

}

function updateMiddleScreenPlayerTurn (){
    document.getElementById('float-screen-game-middle-playerTurn').innerHTML = `<span class="enlarge-font-span">${currentPlayerTurn.name}</span>`
    document.getElementById('float-screen-game-middle-playerTurn').style.color = currentPlayerTurn.color

}

function updateMiddleScreenPlayerLocation (){
    document.getElementById('float-screen-game-middle-currentLocation').innerHTML = `Current Location:<br>${propertyArray[currentPlayerTurn.position].name}`
}


//Game Interactions
//Game Interactions
//Game Interactions
//Game Interactions

//Player Turn Dice Roll
rollBtn.addEventListener('click', function (e){
    hasRolled = true
    dicTwoValue = rollDiceTwo()
    diceOneValue = rollDiceOne()
    if(diceOneValue === diceTwoValue){
        currentPlayerTurn.doublesCounter++
        if (currentPlayerTurn.doublesCounter > 2){
            removeHouseHotelMortgageScreen()
            displayDiceRollOutput(diceOneValue, diceTwoValue);
            addturnInteractionDescriptionDisplay()
            turnInteractionDescription.innerText = "Rolled Doubles 3 Times. Go To Jail";
            goToJail()
            return;
        }
    }
    propertyArray[currentPlayerTurn.position].currentOccupants -= 1;
    currentPlayerTurn.position += (diceOneValue + diceTwoValue)
       if (currentPlayerTurn.position > 39){
           currentPlayerTurn.position -= 40;
           currentPlayerTurn.cash += 200;
           updatePlayerCashTotalDisplay()
       }
       displayDiceRollOutput(diceOneValue, diceTwoValue);
       playerPiece().remove();
       placePiece()
       removeDice()
       removeHouseHotelMortgageScreen()
       currentLocationInteraction()
 })

function displayDiceRollOutput(roll1, roll2){
    document.getElementById('rollCounterDisplay').innerHTML = `Dice One: ${roll1}<br>Dice Two: ${roll2}<br>Total: ${(roll1 + roll2)}<br>Doubles Streak: ${currentPlayerTurn.doublesCounter}`
 }

function displayJailRollOutput (roll1, roll2){
    document.getElementById('rollCounterDisplay').innerHTML = `Dice One: ${roll1}<br>Dice Two: ${roll2}<br>Total: ${(roll1 + roll2)}`  
 }

function clearDiceRollOutput(){
    document.getElementById('rollCounterDisplay').innerHTML = ""
 }

 function currentLocationInteraction (){
    if (spaceLandedOn().isProperty === true){
        if (spaceLandedOn().hasOwner === true){
            if (spaceLandedOn().owner.name != currentPlayerTurn.name){
                if(spaceLandedOn().owner.isInJail === false && spaceLandedOn().mortgageOpen === false){
                    addPropertyCard()
                    addPayRentContainer()
                    document.getElementById('payRentLabelId').innerHTML = `You owe ${spaceLandedOn().owner.name} $${spaceLandedOn().rent}.`

                }
                else if(spaceLandedOn().owner.isInJail === true){
                    addturnInteractionDescriptionDisplay()
                    removePropertyCard()
                    addHouseHotelMortgageScreen()
                    turnInteractionDescription.innerHTML = `The owner of ${spaceLandedOn().name} is in jail.  You do not pay rent.`
                    addEndTurnButton()
                }
                else if(spaceLandedOn().mortgageOpen === true){
                    addturnInteractionDescriptionDisplay()
                    removePropertyCard()
                    addHouseHotelMortgageScreen()
                    turnInteractionDescription.innerHTML = `${spaceLandedOn().name} currently has an open mortgage.  You do not pay rent.`
                    addEndTurnButton()
                }
            }
            else{
                addturnInteractionDescriptionDisplay()
                turnInteractionDescription.innerHTML = `You own ${spaceLandedOn().name}`
                removePropertyCard()
                addHouseHotelMortgageScreen()
                addEndTurnButton()
            }
        }
        else if (spaceLandedOn().hasOwner === false){
                addPropertyBuySellButtons()
                addPropertyCard()
                document.getElementById('wouldYouLikeToBuyId').innerHTML = `Would you like to buy ${spaceLandedOn().name} for $${spaceLandedOn().price}?`
        }

    }
    else if (spaceLandedOn().name === "Community Chest"){
        addturnInteractionDescriptionDisplay()
        communityChest()   
    }  
    else if (spaceLandedOn().name === "Chance"){
        addturnInteractionDescriptionDisplay()
        chance()
    }
    else if (spaceLandedOn().name === "Income Tax"){
        addturnInteractionDescriptionDisplay()
        turnInteractionDescription.innerText = "Pay $200 Income Tax"
        currentPlayerTurn.cash -= 200
        addHouseHotelMortgageScreen()
        addEndTurnButton()
    }
    else if (spaceLandedOn().name === "Luxury Tax"){
        addturnInteractionDescriptionDisplay()
        turnInteractionDescription.innerText = "Pay $100 Luxury Tax"
        currentPlayerTurn.cash -= 100
        addHouseHotelMortgageScreen()
        addEndTurnButton()

    }
    else if (spaceLandedOn().name === "Go To Jail"){
        addturnInteractionDescriptionDisplay()
        goToJail()
    }
    else if (spaceLandedOn().name === "Free Parking"){
        addturnInteractionDescriptionDisplay()
        turnInteractionDescription.innerText = "Free Parking"
        addHouseHotelMortgageScreen()
        addEndTurnButton()
    }
    else if (spaceLandedOn().name === "Just Visiting"){
        addturnInteractionDescriptionDisplay()
        turnInteractionDescription.innerText = "Just Visiting"
        addHouseHotelMortgageScreen()
        addEndTurnButton()
    }
    else {
        addturnInteractionDescriptionDisplay()
        turnInteractionDescription.innerText = "You've Reached Go!  Collect $200"
        addEndTurnButton();
        addHouseHotelMortgageScreen()
    }
    updatePlayerCashTotalDisplay()
    
}

function addPropertyBuySellButtons(){
    document.getElementById('propertyForPurchaseId').classList.add('property-for-purchase-grid');
    document.getElementById('propertyForPurchaseId').classList.remove('hidden');
 }

 function removePropertyBuySellButtons(){
    document.getElementById('propertyForPurchaseId').classList.add('hidden');
    document.getElementById('propertyForPurchaseId').classList.remove('property-for-purchase-grid');
 }

 function addturnInteractionDescriptionDisplay(){
    document.getElementById('turnInteractionDescriptionId').classList.add('turn-interaction-description');
    document.getElementById('turnInteractionDescriptionId').classList.remove('hidden');
 }

 function removeTurnInteractionDescriptionDisplay(){
    document.getElementById('turnInteractionDescriptionId').classList.add('hidden');
    document.getElementById('turnInteractionDescriptionId').classList.remove('turn-interaction-description');
 }

//End Turn
endTurnBtn.addEventListener ('click', function (e){
    if (diceOneValue === diceTwoValue  && currentPlayerTurn.isInJail === false){      
    }
    else if (playerTurnTicker === 1){
        currentPlayerTurn.doublesCounter = 0;
        currentPlayerTurn = activePlayers[1]
        playerTurnTicker++
        
    }
    else if(playerTurnTicker === 2){
        currentPlayerTurn.doublesCounter = 0;
        currentPlayerTurn = activePlayers[2];
        playerTurnTicker++
        
        if (playerTurnTicker === totalPlayers + 1){
            currentPlayerTurn = activePlayers[0];
            playerTurnTicker = 1;
        }
        
    } 
    else if(playerTurnTicker === 3){
        currentPlayerTurn.doublesCounter = 0;
        currentPlayerTurn = activePlayers[3];
        playerTurnTicker++
        if (playerTurnTicker === totalPlayers + 1){
            currentPlayerTurn = activePlayers[0];
            playerTurnTicker = 1;
        }
        
    }
    else {
        currentPlayerTurn.doublesCounter = 0;
        currentPlayerTurn = activePlayers[0];
        playerTurnTicker = 1  
        
    }
    removeTurnInteractionDescriptionDisplay()
    addDice()
    removePropertyCard()
    removeEndTurnButton()
    updateMiddleScreenPlayerTurn()
    updateMiddleScreenPlayerLocation()
    clearDiceRollOutput()
    addHouseHotelMortgageScreen()
    checkJailStatusNextPlayer()
    hasRolled = false
})


function removeDice (){
    document.getElementById('rollBtnIdDiv').classList.add('hidden')
    document.getElementById('rollBtnIdDiv').classList.remove('right-bottom-screen')
}

function addDice (){
    document.getElementById('rollBtnIdDiv').classList.remove('hidden')
    document.getElementById('rollBtnIdDiv').classList.add('right-bottom-screen')
}

function removeEndTurnButton (){
    document.getElementById('endTurnBtnId').classList.add('hidden')
    document.getElementById('endTurnBtnId').classList.remove('end-turn-button')
}

function addEndTurnButton (){
    document.getElementById('endTurnBtnId').classList.add('end-turn-button')
    document.getElementById('endTurnBtnId').classList.remove('hidden')
}

function chance (){
    let chanceRoll = chanceDice()
    if (chanceRoll === 1){
        currentLocation.currentOccupants--
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Chance:</span><br>Advance to Boardwalk.`
        playerPiece().remove()
        currentPlayerTurn.position = 39
        placePiece()
        currentLocationInteraction()  
    }
    else if (chanceRoll === 2){
        currentLocation.currentOccupants--
        turnInteractionDescription.innerHTML =`<span class="bold-font-span">Chance:</span><br>Advance to Go (Collect $200).`
        playerPiece().remove()
        currentPlayerTurn.position = 0
        placePiece()
        currentPlayerTurn.cash += 200
        currentLocationInteraction()    
    }
    else if (chanceRoll === 3){
        currentLocation.currentOccupants--
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Chance:</span><br>Advance to Illinois Avenue. If you pass Go, collect $200.`
        if (currentPlayerTurn.position > 23){
            currentPlayerTurn.cash += 200
        }
        playerPiece().remove()
        currentPlayerTurn.position = 24
        placePiece()
        currentLocationInteraction()
    }
    else if (chanceRoll === 4){
        currentLocation.currentOccupants--
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Chance:</span><br>Advance to St. Charles Place. If you pass Go, collect $200.`
        if (currentPlayerTurn.position > 10){
            currentPlayerTurn.cash += 200
        }
        playerPiece().remove()
        currentPlayerTurn.position = 11
        placePiece()
        currentLocationInteraction()
    }
    else if (chanceRoll === 5){
        currentLocation.currentOccupants--
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Chance:</span><br>Advance to the nearest Railroad.`
        playerPiece().remove()
        if (currentPlayerTurn.position === 7){
            currentPlayerTurn.position = 5
        }
        if (currentPlayerTurn.position === 22){
            currentPlayerTurn.position = 25
        }
        if (currentPlayerTurn.position === 36){
            currentPlayerTurn.position = 35
        } 
        placePiece()
        currentLocationInteraction()  
    }
    else if (chanceRoll === 6 || chanceRoll === 7){
        currentLocation.currentOccupants--
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Chance:</span><br>Advance to the nearest Railroad.`
        playerPiece().remove()
        if (currentPlayerTurn.position === 7){
            currentPlayerTurn.position = 5
        }
        if (currentPlayerTurn.position === 22){
            currentPlayerTurn.position = 15
        }
        if (currentPlayerTurn.position === 36){
            currentPlayerTurn.position = 35
        } 
        placePiece()
        currentLocationInteraction()  
    }

    else if (chanceRoll === 8){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Chance:</span><br>Bank pays you dividend of $50.`
        currentPlayerTurn.cash += 50
        addEndTurnButton()
        addHouseHotelMortgageScreen()
    }  
    else if (chanceRoll === 9){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Chance:</span><br>Get Out of Jail Free`
        currentPlayerTurn.getOutOfJailCard++
        addEndTurnButton()   
        addHouseHotelMortgageScreen()     
    }
    else if (chanceRoll === 10){
        currentLocation.currentOccupants--
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Chance:</span><br>Go Back 3 Spaces.`
        playerPiece().remove()
        currentPlayerTurn.position -= 3
        if (currentPlayerTurn.position < 0){
            currentPlayerTurn.position += 40
        }
        placePiece()
        currentLocationInteraction()

    }
    else if (chanceRoll === 11){
        turnInteractionDescription.innerHTML = `<span class='bold-font-span'>Chance:</span><br>Go to Jail. Go directly to Jail, do not pass Go, do not collect $200.`
        goToJail()
    }
    else if (chanceRoll === 12){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Chance:</span><br>Make general repairs on all your property. For each house(${currentPlayerTurn.housesOwned}) pay $25. For each hotel(${currentPlayerTurn.hotelsOwned}) pay $100. Total = $${(currentPlayerTurn.housesOwned * 50) + (currentPlayerTurn.hotelsOwned * 50)}`
        currentPlayerTurn.cash -= (currentPlayerTurn.housesOwned * 25) + (currentPlayerTurn.hotelsOwned * 50)
        addEndTurnButton()
        addHouseHotelMortgageScreen()
    }
    else if (chanceRoll === 13){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Chance:</span><br>Speeding Fine. Pay $15`
        currentPlayerTurn.cash -= 15
        addEndTurnButton()
        addHouseHotelMortgageScreen()
    }
    else if (chanceRoll === 14){
        currentLocation.currentOccupants--
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Chance:</span><br>Take a trip to Reading Railroad. If you pass Go, collect $200.`
        playerPiece().remove()
        if (currentPlayerTurn.position === 7){
            currentPlayerTurn.position = 5
            currentPlayerTurn.cash += 200
        }
        if (currentPlayerTurn.position === 22){
            currentPlayerTurn.position = 5
            currentPlayerTurn.cash += 200
        }
        if (currentPlayerTurn.position === 36){
            currentPlayerTurn.position = 5
            currentPlayerTurn.cash += 200
        } 
        placePiece()
        currentLocationInteraction()  
        
    }
    else if (chanceRoll === 15){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Chance:</span><br>You have been elected Chairman of the Board. Pay each player $50.`
        for (let i = 0; i < totalPlayers; i++){
            if (activePlayers[i].name != currentPlayerTurn.name){
                currentPlayerTurn.cash -= 50
                activePlayers[i].cash += 50
            }
        }
        addEndTurnButton()
        addHouseHotelMortgageScreen()
    }
    else if (chanceRoll === 16){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Chance:</span><br></br>Your building loan matures. Collect $150.`
        currentPlayerTurn.cash += 150
        addEndTurnButton()
        addHouseHotelMortgageScreen()
    }
    updatePlayerCashTotalDisplay()
    updateMiddleScreenPlayerLocation()

}

function communityChest(){
    let communityChestRoll = communityChestDice()
    if (communityChestRoll === 1){
        //This needs to be edited.  Remove Current location...  Make this the current location ineraction
        currentLocation.currentOccupants--
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Community Chest:</span><br>Advance to Go (Collect $200).`
        playerPiece().remove()
        currentPlayerTurn.position = 0
        placePiece()
        currentPlayerTurn.cash += 200  
    }
    else if (communityChestRoll === 2){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Community Chest:</span><br>Bank error in your favor. Collect $200.`
        currentPlayerTurn.cash += 200
    }
    else if (communityChestRoll === 3){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Community Chest:</span><br>Doctor’s fee. Pay $50.`
        currentPlayerTurn.cash -= 50
    }
    else if (communityChestRoll === 4){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Community Chest:</span><br>From sale of stock you get $50.`
        currentPlayerTurn.cash += 50
    }
    else if (communityChestRoll === 5){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Community Chest:</span><br>You get a "Get Out of Jail Free" card.`
        currentPlayerTurn.getOutOfJailCard++
    }
    else if (communityChestRoll === 6){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Community Chest:</span><br>Go to Jail. Go directly to Jail, do not pass Go, do not collect $200.`
        goToJail()
    }
    else if (communityChestRoll === 7){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Community Chest:</span><br>Holiday fund matures. Receive $100.`
        currentPlayerTurn.cash += 100
    }
    else if (communityChestRoll === 8){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Community Chest:</span><br>Income tax refund. Collect $20.`
        currentPlayerTurn.cash += 20
    }
    else if (communityChestRoll === 9){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Community Chest:</span><br>It is your birthday. Collect $10 from every player.`
        for (let i = 0; i < totalPlayers; i++){
            if (currentPlayerTurn.name != activePlayers[i].name){
                currentPlayerTurn.cash +=10
                activePlayers[i].cash -= 10
            }
        }
    }
    else if (communityChestRoll === 10){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Community Chest:</span><br>Life insurance matures. Collect $100.`
        currentPlayerTurn.cash += 100
    }
    else if (communityChestRoll === 11){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Community Chest:</span><br>Pay hospital fees of $100.`
        currentPlayerTurn.cash -= 100
    }
    else if (communityChestRoll === 12){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Community Chest:</span><br>Pay school fees of $50.`
        currentPlayerTurn.cash -= 50
    }
    else if (communityChestRoll === 13){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Community Chest:</span><br>Receive $25 consultancy fee.`
        currentPlayerTurn.cash += 25
    }
    else if (communityChestRoll === 14){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Community Chest:</span><br>You are assessed for street repair. $40 per house(${currentPlayerTurn.housesOwned}), $115 per hotel(${currentPlayerTurn.hotelsOwned}). Total = $${(currentPlayerTurn.housesOwned * 40) + (currentPlayerTurn.hotelsOwned * 115)}`
        currentPlayerTurn.cash -= (currentPlayerTurn.housesOwned * 40) + (currentPlayerTurn.hotelsOwned * 115)
    }
    else if (communityChestRoll === 15){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Community Chest:</span><br>You have won second prize in a beauty contest. Collect $10.`
        currentPlayerTurn.cash += 10
    }
    else if (communityChestRoll === 16){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Community Chest:</span><br>You inherit $100.`
        currentPlayerTurn.cash += 100
    }
    updatePlayerCashTotalDisplay()
    updateMiddleScreenPlayerLocation()
    addHouseHotelMortgageScreen()
    addEndTurnButton()
}

function clearBottomRightScreenContents(){
    if ( document.getElementById('rollBtnIdDiv').classList.contains('hidden') === false){
        removeDice()
    }
    if (document.getElementById('turnInteractionDescriptionId').classList.contains('hidden') === false){
        removeTurnInteractionDescriptionDisplay()
    }
    if ( document.getElementById('payRentContainerId').classList.contains('hidden') === false){
        removePayRentContainer()
    }
    if (document.getElementById('inJailOptionsId').classList.contains('hidden') === false){
        removeJailOptions()
    }
}

//Place Piece
//Place Piece
function placePiece(){
    if (currentPlayerTurn.position >= 0 && currentPlayerTurn.position <= 9){
        placePieceBottom()
    }
    else if(currentPlayerTurn.position >= 11 && currentPlayerTurn.position <= 19){
        placePieceLeft()
    }
    else if (currentPlayerTurn.position >= 20 && currentPlayerTurn.position <= 29){
        placePieceTop()
    }
    else if (currentPlayerTurn.position >= 31 && currentPlayerTurn.position <= 39){
        placePieceRight()
    }
    //Place Piece "Just Visiting"
    else if (currentPlayerTurn.position === 10){
        currentLocation = propertyArray[(currentPlayerTurn.position)]
        if (currentLocation.currentOccupants === 0){
            document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece);
            document.querySelector(currentPlayerTurn.pieceId).style.top = "5px";
            document.querySelector(currentPlayerTurn.pieceId).style.left = "5.5px";
        }
        else if(currentLocation.currentOccupants === 1)
            {
            document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece)
            document.querySelector(currentPlayerTurn.pieceId).style.top = "50px";
            document.querySelector(currentPlayerTurn.pieceId).style.left = "5.5px";
        }
        else if (currentLocation.currentOccupants === 2){
            document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece)
            document.querySelector(currentPlayerTurn.pieceId).style.bottom = "5px";
            document.querySelector(currentPlayerTurn.pieceId).style.left = "5.5px";
    
        }
        else if (currentLocation.currentOccupants === 3){
            document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece)
            document.querySelector(currentPlayerTurn.pieceId).style.bottom = "5px";
            document.querySelector(currentPlayerTurn.pieceId).style.left = "50px";
    
        }  
    }
    //Place Piece "Go To Jail"
    else if (currentPlayerTurn.position === 30){
        addturnInteractionDescriptionDisplay()
        turnInteractionDescription.innerText = `You landed on "Go To Jail" space`
        currentLocation = propertyArray[(currentPlayerTurn.position)]
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece);
    }
    //Place Piece "In Jail"
    else if (currentPlayerTurn.position === 40){
        currentLocation = propertyArray[(currentPlayerTurn.position)]
        if (currentLocation.currentOccupants === 0){
            document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece);
            document.querySelector(currentPlayerTurn.pieceId).style.top = "5px";
            document.querySelector(currentPlayerTurn.pieceId).style.left = "5x";
        }
        else if(currentLocation.currentOccupants === 1)
            {
            document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece)
            document.querySelector(currentPlayerTurn.pieceId).style.top = "5px";
            document.querySelector(currentPlayerTurn.pieceId).style.right = "5px";
        }
        else if (currentLocation.currentOccupants === 2){
            document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece)
            document.querySelector(currentPlayerTurn.pieceId).style.bottom = "5px";
            document.querySelector(currentPlayerTurn.pieceId).style.left = "5px";
    
        }
        else if (currentLocation.currentOccupants === 3){
            document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece)
            document.querySelector(currentPlayerTurn.pieceId).style.bottom = "5px";
            document.querySelector(currentPlayerTurn.pieceId).style.right = "5px";
    
        }
    }

    updateMiddleScreenPlayerLocation();
    currentLocation.currentOccupants++
}

 function placePieceBottom(){
    currentLocation = propertyArray[(currentPlayerTurn.position)]
    if (currentLocation.currentOccupants === 0){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece);
        document.querySelector(currentPlayerTurn.pieceId).style.top = "15%";
        document.querySelector(currentPlayerTurn.pieceId).style.left = "5%";
    }
    else if(currentLocation.currentOccupants === 1)
        {
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece)
        document.querySelector(currentPlayerTurn.pieceId).style.top = "45%";
        document.querySelector(currentPlayerTurn.pieceId).style.left = "5%";
    }
    else if (currentLocation.currentOccupants === 2){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece)
        document.querySelector(currentPlayerTurn.pieceId).style.top = "15%";
        document.querySelector(currentPlayerTurn.pieceId).style.right = "5%";

    }
    else if (currentLocation.currentOccupants === 3){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece)
        document.querySelector(currentPlayerTurn.pieceId).style.top = "45%";
        document.querySelector(currentPlayerTurn.pieceId).style.right = "5%";

    }

}

function placePieceLeft(){
    currentLocation = propertyArray[(currentPlayerTurn.position)]
    if (currentLocation.currentOccupants === 0){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece);
        document.querySelector(currentPlayerTurn.pieceId).style.right = "15%"
        document.querySelector(currentPlayerTurn.pieceId).style.top = "5%";
        document.querySelector(currentPlayerTurn.pieceId).style.transform = "rotate(90deg)";
    }
    else if(currentLocation.currentOccupants === 1)
        {
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece)
        document.querySelector(currentPlayerTurn.pieceId).style.right = "45%";
        document.querySelector(currentPlayerTurn.pieceId).style.top = "5%";
        document.querySelector(currentPlayerTurn.pieceId).style.transform = "rotate(90deg)";
    }
    else if (currentLocation.currentOccupants === 2){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece)
        document.querySelector(currentPlayerTurn.pieceId).style.right = "15%";
        document.querySelector(currentPlayerTurn.pieceId).style.bottom = "5%";
        document.querySelector(currentPlayerTurn.pieceId).style.transform = "rotate(90deg)";
    }
    else if (currentLocation.currentOccupants === 3){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece)
        document.querySelector(currentPlayerTurn.pieceId).style.right = "45%";
        document.querySelector(currentPlayerTurn.pieceId).style.bottom = "5%";
        document.querySelector(currentPlayerTurn.pieceId).style.transform = "rotate(90deg)";
    }

}

function placePieceTop(){
    currentLocation = propertyArray[(currentPlayerTurn.position)]
    if (currentLocation.currentOccupants === 0){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece);
        document.querySelector(currentPlayerTurn.pieceId).style.bottom = "15%"
        document.querySelector(currentPlayerTurn.pieceId).style.right = "5%";
        document.querySelector(currentPlayerTurn.pieceId).style.transform = "rotate(180deg)";
    }
    else if(currentLocation.currentOccupants === 1)
        {
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece)
        document.querySelector(currentPlayerTurn.pieceId).style.bottom = "45%";
        document.querySelector(currentPlayerTurn.pieceId).style.right = "5%";
        document.querySelector(currentPlayerTurn.pieceId).style.transform = "rotate(180deg)";
    }
    else if (currentLocation.currentOccupants === 2){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece)
        document.querySelector(currentPlayerTurn.pieceId).style.bottom = "15%";
        document.querySelector(currentPlayerTurn.pieceId).style.left = "5%";
        document.querySelector(currentPlayerTurn.pieceId).style.transform = "rotate(180deg)";
    }
    else if (currentLocation.currentOccupants === 3){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece)
        document.querySelector(currentPlayerTurn.pieceId).style.bottom = "45%";
        document.querySelector(currentPlayerTurn.pieceId).style.left = "5%";
        document.querySelector(currentPlayerTurn.pieceId).style.transform = "rotate(180deg)";
    }

}

function placePieceRight(){
    currentLocation = propertyArray[(currentPlayerTurn.position)]
    if (currentLocation.currentOccupants === 0){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece);
        document.querySelector(currentPlayerTurn.pieceId).style.bottom = "5%"
        document.querySelector(currentPlayerTurn.pieceId).style.left = "15%";
        document.querySelector(currentPlayerTurn.pieceId).style.transform = "rotate(270deg)";
    }
    else if(currentLocation.currentOccupants === 1)
        {
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece)
        document.querySelector(currentPlayerTurn.pieceId).style.bottom = "5%";
        document.querySelector(currentPlayerTurn.pieceId).style.left = "45%";
        document.querySelector(currentPlayerTurn.pieceId).style.transform = "rotate(270deg)";
    }
    else if (currentLocation.currentOccupants === 2){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece)
        document.querySelector(currentPlayerTurn.pieceId).style.top = "5%";
        document.querySelector(currentPlayerTurn.pieceId).style.left = "15%";
        document.querySelector(currentPlayerTurn.pieceId).style.transform = "rotate(270deg)";
    }
    else if (currentLocation.currentOccupants === 3){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', currentPlayerTurn.gamePiece)
        document.querySelector(currentPlayerTurn.pieceId).style.top = "5%";
        document.querySelector(currentPlayerTurn.pieceId).style.left = "45%";
        document.querySelector(currentPlayerTurn.pieceId).style.transform = "rotate(270deg)";
    }

}


//Property Cards
//Property Cards
payRentBtn.addEventListener('click', function (e){
    if ((currentPlayerTurn.cash - spaceLandedOn().rent) < 0){
        console.log('success')
        return
    }
    currentPlayerTurn.cash -= spaceLandedOn().rent
    spaceLandedOn().owner.cash += spaceLandedOn().rent
    addEndTurnButton()
    removePayRentContainer()
    updatePlayerCashTotalDisplay()

    if (document.getElementById('propertyCardId').classList.contains('hidden') === false){
        removePropertyCard()
    }
    addHouseHotelMortgageScreen()
    sellToPayRentBtn.disabled = false
    addEndTurnButton()
 })

 sellToPayRentBtn.addEventListener('click', function(e){
    removePropertyCard()
    addHouseHotelMortgageScreen()
    this.disabled = true
 })

function addPayRentContainer(){
    document.getElementById('payRentContainerId').classList.add('pay-rent-container')
    document.getElementById('payRentContainerId').classList.remove('hidden')
 }

function removePayRentContainer(){
    document.getElementById('payRentContainerId').classList.add('hidden')
    document.getElementById('payRentContainerId').classList.remove('pay-rent-container')
 }

function addPropertyCard (){
    if (currentLocation.type === "color"){
        addColorPropertyCard()
    }
    else if (currentLocation.type === "railroad"){
        addRailroadPropertyCard()
    }
    else if (currentLocation.type === "utility" ){
        addUtilityCard()
    }
    else {
        return
    }
}

function removePropertyCard (){
    if (currentLocation.type === "color"){
        removeColorPropertyCard()
    }
    else if (currentLocation.type === "railroad"){
        removeRailroadPropertyCard()
    }
    else if (currentLocation.type === "utility" ){
        removeUtilityCard()
    }
    else {
        return
    }
}

function addColorPropertyCard(){
    document.getElementById('propertyCardId').innerHTML = colorPropertyCard;
    document.getElementById('colorPropertyName').innerHTML = `${currentLocation.name}`
    document.getElementById('colorPropertyName').style.borderTop = `20px solid ${currentLocation.color}`
    document.getElementById('colorPropertyRent').innerHTML = `Rent: $${currentLocation.startingRent}`
    document.getElementById('colorPropertyOneHouse').innerHTML = `One House Rent: $${currentLocation.oneHouseRent}`
    document.getElementById('colorPropertyTwoHouse').innerHTML = `Two Houses Rent: $${currentLocation.twoHouseRent}`
    document.getElementById('colorPropertyThreeHouse').innerHTML = `Three Houses Rent: $${currentLocation.threeHouseRent}`
    document.getElementById('colorPropertyFourHouse').innerHTML = `Four Houses Rent: $${currentLocation.fourHouseRent}`
    document.getElementById('colorPropertyHotelRent').innerHTML = `Hotel Rent: $${currentLocation.hotelRent}`
    document.getElementById('colorPropertyHouseCost').innerHTML = `Cost to build house: $${currentLocation.buildingCost}`
    document.getElementById('colorPropertyHotelCost').innerHTML = `Cost to build hotel: $${currentLocation.buildingCost}`
    document.getElementById('colorPropertyMortgage').innerHTML = `Mortgage Value: $${currentLocation.mortgage}`
    document.getElementById('propertyCardId').classList.add('color-property-card')
    document.getElementById('propertyCardId').classList.remove('hidden')
}

function removeColorPropertyCard(){
    document.getElementById('propertyCardId').classList.add('hidden')
    document.getElementById('propertyCardId').classList.remove('color-property-card')
}

function addRailroadPropertyCard(){
    document.getElementById('propertyCardId').innerHTML = railroadPropertyCard;
    document.getElementById('railroadPropertyName').innerHTML = `${currentLocation.name}`
    document.getElementById('propertyCardId').classList.add('railroad-property-card')
    document.getElementById('propertyCardId').classList.remove('hidden')
}

function removeRailroadPropertyCard(){
    document.getElementById('propertyCardId').classList.remove('railroad-property-card')
    document.getElementById('propertyCardId').classList.add('hidden')
}

function addUtilityCard(){
    document.getElementById('propertyCardId').innerHTML = utilityPropertyCard;
    document.getElementById('utilityPropertyName').innerHTML = `${currentLocation.name}`
    document.getElementById('propertyCardId').classList.add('utility-property-card')
    document.getElementById('propertyCardId').classList.remove('hidden')
}

function removeUtilityCard(){
    document.getElementById('propertyCardId').classList.remove('utility-property-card')
    document.getElementById('propertyCardId').classList.add('hidden')
}

buyPropertyYesBtn.addEventListener('click', function(e){
    spaceLandedOn().owner = currentPlayerTurn
    spaceLandedOn().hasOwner = true
    currentPlayerTurn.cash -= spaceLandedOn().price
    updateRent()
    updatePlayerCashTotalDisplay()
    document.getElementById(spaceLandedOn().id).style.backgroundColor = currentPlayerTurn.color;
    removePropertyBuySellButtons()
    addEndTurnButton()
    addturnInteractionDescriptionDisplay()
    removePropertyCard()
    addHouseHotelMortgageScreen()
    document.getElementById('turnInteractionDescriptionId').innerHTML = `You purchased ${spaceLandedOn().name} for $${spaceLandedOn().price}` 
})

buyPropertyNoBtn.addEventListener('click', function(e){
    removePropertyBuySellButtons()
    addEndTurnButton()
    removePropertyCard()
    addHouseHotelMortgageScreen()
})


//Jail Functions
//Jail Functions

function goToJail (){
    removeHouseHotelMortgageScreen()
    currentLocation.currentOccupants--
    currentPlayerTurn.doublesCounter = 0
    playerPiece().remove()
    currentPlayerTurn.position = 40
    placePiece()
    currentPlayerTurn.isInJail = true
    updateMiddleScreenPlayerLocation()
    addEndTurnButton()
    removeDice()
}

function checkJailStatusNextPlayer(){
    if (currentPlayerTurn.isInJail === true){
        removeDice()
        addJailOptions()
        removeHouseHotelMortgageScreen()
        removeHouseHotelMortgageScreen()
        if (currentPlayerTurn.getOutOfJailCard === 0){
            document.getElementById('getOutJailCardBtnId').disabled = true;
            document.getElementById('getOutJailCardBtnId').style.opacity = "0";
        }
        else if (currentPlayerTurn.getOutOfJailCard != 0){
            document.getElementById('getOutJailCardBtnId').disabled = false;
            document.getElementById('getOutJailCardBtnId').style.opacity = "1";
        }
    }
}

attemptDoublesBtn.addEventListener('click', function (e){
    rollDiceOne()
    rollDiceTwo()
    displayJailRollOutput(diceOneValue, diceTwoValue)
    if (diceOneValue === diceTwoValue){
        hasRolled = true
        currentPlayerTurn.doublesCounter = 1
        currentPlayerTurn.jailRollAttempts = 3
        currentPlayerTurn.isInJail = false
        playerPiece().remove()
        currentLocation.currentOccupants--
        currentPlayerTurn.position = (diceOneValue + diceTwoValue +10)
        placePiece()
        currentLocationInteraction()
    }
    else{
        currentPlayerTurn.jailRollAttempts--
        addEndTurnButton()
    }
    removeJailOptions()
    addHouseHotelMortgageScreen()
})

payJailFeeBtn.addEventListener('click', function (e){
    currentPlayerTurn.cash -= 50
    getOutOfJail()
    updatePlayerCashTotalDisplay()
})

getOutJailCardBtn.addEventListener('click', function (e){
    currentPlayerTurn.getOutOfJailCard--
    getOutOfJail()
})

function getOutOfJail (){
    currentPlayerTurn.jailRollAttempts = 3
    currentPlayerTurn.isInJail = false
    currentLocation = propertyArray[(currentPlayerTurn.position)]
    currentLocation.currentOccupants--
    playerPiece().remove()
    currentPlayerTurn.position = 10
    placePiece()
    updateMiddleScreenPlayerLocation()
    removeJailOptions()
    addDice()
    addHouseHotelMortgageScreen()
}

function addJailOptions (){
    document.getElementById('inJailOptionsId').classList.remove('hidden')
    document.getElementById('inJailOptionsId').classList.add('in-jail-options-screen')
}

function removeJailOptions (){
    document.getElementById('inJailOptionsId').classList.add('hidden')
    document.getElementById('inJailOptionsId').classList.remove('in-jail-options-screen')
}

//Buy Sell House Hotel Mortgage Functions
//Buy Sell House Hotel Mortgage Functions
//Buy Sell House Hotel Mortgage Functions
//Buy Sell House Hotel Mortgage Functions

function updateRent(){
    if (currentLocation.type === "color"){
        updateRentColor()
    }
    else if (currentLocation.type === "railroad"){
        updateRentRailroad()
    }
    else if (currentLocation.type === "utility" ){
        updateRentUtility()
    }
}

function updateRentColor(){
    ownedPropertyArray = []
    generatePlayerPropertyArray()
    let sameColorProperties = []
    //Filter for same color properties as last bought property
    sameColorProperties = ownedPropertyArray.filter(function(property){return property.color === currentLocation.color})
    for (let i = 0; i < sameColorProperties.length;){
        if (sameColorProperties[i].setTotal === 2 && sameColorProperties.length === 2){
                sameColorProperties[i].rent = (sameColorProperties[i].startingRent * 2)
                sameColorProperties[i+1].rent = (sameColorProperties[i+1].startingRent * 2)
                return
        }
        else if (sameColorProperties[i].setTotal === 3 && sameColorProperties.length === 3){
                sameColorProperties[i].rent = (sameColorProperties[i].startingRent * 2)
                sameColorProperties[i+1].rent = (sameColorProperties[i+1].startingRent * 2)
                sameColorProperties[i+2].rent = (sameColorProperties[i+2].startingRent * 2)
                return         
        }
        else{
            return
        }
    }
}

function updateRentHouseHotel(property){
    if (property.totalHouses === 0){
        property.rent = (property.startingRent * 2)
    }
    else if (property.totalHouses === 1){
        property.rent = property.oneHouseRent
    }
    else if (property.totalHouses === 2){
        property.rent = property.twoHouseRent
    }
    else if (property.totalHouses === 3){
        property.rent = property.threeHouseRent
    }
    else if (property.totalHouses === 4){
        property.rent = property.fourHouseRent
    }
    else if (property.totalHouses === 5){
        property.rent = property.hotelRent
    }
}

function updateRentRailroad(){
    ownedPropertyArray = []
    generatePlayerPropertyArray()
    let railroadProperties = []
    //Filter for railroads
    railroadProperties = ownedPropertyArray.filter(function(property){return property.type === currentLocation.type})
    railroadProperties.forEach(railroad =>{
        if (railroadProperties.length === 1){
            railroad.rent = 25
        }
        else if (railroadProperties.length === 2){
            railroad.rent = 50
        }
        else if (railroadProperties.length === 3){
            railroad.rent = 100
        }
        else{
            railroad.rent = 200
        }
    })
}

function updateRentUtility(){
    ownedPropertyArray = []
    generatePlayerPropertyArray()
    let utilityProperties = []
    //Filter for utilities
    utilityProperties = ownedPropertyArray.filter(function(property){return property.type === currentLocation.type})
    utilityProperties.forEach(utility =>{
        if (utilityProperties.length === 1){
            utility.rent =  (diceOneValue + diceTwoValue) * 4
        }
        else if (utilityProperties.length === 2){
            utility.rent =  (diceOneValue + diceTwoValue) * 10
        }
    })
}


function generatePlayerPropertyArray(){
    ownedPropertyArray = []

    for (let i = 0; i < 40; i++){
        if (propertyArray[i].owner === currentPlayerTurn){
            ownedPropertyArray.push(propertyArray[i])
        }
    }
}

function addHouseHotelMortgageScreen (){
    document.getElementById('houseHotelMortgageScreenId').classList.add('house-hotel-mortgage-screen');
    document.getElementById('houseHotelMortgageScreenId').classList.remove('hidden');
 }

 function removeHouseHotelMortgageScreen (){
    document.getElementById('houseHotelMortgageScreenId').classList.add('hidden');
    document.getElementById('houseHotelMortgageScreenId').classList.remove('house-hotel-mortgage-screen');
 }

//Buy House Functions
//Buy House Functions
buyHouseHotelBtn.addEventListener('click', function(e){
    removeDice()
    generatePlayerPropertyArray()
    removeHouseHotelMortgageScreen()
    removeEndTurnButton()
    addFinishBuyHouseBtn()
    addBuyHouseTutorial()
    canBuyHouseHotelArray = []

    //Sort owned property into array of full color set matches
    for (let i = 0; i < ownedPropertyArray.length;){
        if (ownedPropertyArray[i].type === 'color' && ownedPropertyArray[i].setTotal === 2 && (i + 1) < ownedPropertyArray.length){
                if(ownedPropertyArray[i].color === ownedPropertyArray[i+1].color){
                    canBuyHouseHotelArray.push(ownedPropertyArray[i])
                    canBuyHouseHotelArray.push(ownedPropertyArray[i+1])
                    i += 2
                } 
                else{
                    i++
                }        
        }
        else if(ownedPropertyArray[i].type === 'color' && ownedPropertyArray[i].setTotal === 3 && (i + 2) < ownedPropertyArray.length){
            if (ownedPropertyArray[i].color === ownedPropertyArray[i+1].color && ownedPropertyArray[i].color === ownedPropertyArray[i+2].color){
                canBuyHouseHotelArray.push(ownedPropertyArray[i])
                canBuyHouseHotelArray.push(ownedPropertyArray[i+1])
                canBuyHouseHotelArray.push(ownedPropertyArray[i+2])
                i += 3
            }
            else{
                i++
            }
        }
        else{
            i++
        }
       
    }
    //Create clickable property to build houses on
    canBuyHouseHotelArray.forEach(property =>{
        let clickableProperty = document.getElementById(property.id)
        clickableProperty.classList.add('can-buy-house')
        clickableProperty.addEventListener('click', buyHousePropertySpace) 

        //Create clickable property to buy
        function buyHousePropertySpace (){
            if(property.totalHouses < 4){
                document.getElementById('buyHouseLabel').innerHTML = `Would you like to buy a house on ${property.name} for $${property.buildingCost}?`        
            }
            else if (property.totalHouses === 4){
                document.getElementById('buyHouseLabel').innerHTML = `Would you like to buy a hotel on ${property.name} for $${property.buildingCost}?`  
            }
            else{
                return
            }
            removeBuyHouseTutorial()
            addBuyHouseYesNoButtons()
            buyHouseYesBtn.addEventListener('click', buyHouseYesBtnOutcome)
            buyHouseNoBtn.addEventListener('click', buyHouseNoBtnOutcome) 
            removeFinishBuyHouseBtn()
            //Prevent user from clicking multiple properties at once
            for (let i = 0; i < canBuyHouseHotelArray.length; i++){
                document.getElementById(canBuyHouseHotelArray[i].id).classList.add('disable-clicks')
                document.getElementById(canBuyHouseHotelArray[i].id).classList.remove('can-buy-house')
            }
        }

        //Yes button function
        function buyHouseYesBtnOutcome(){
            //Restore function and class indicators to add houses to eligible properties
            for (let i = 0; i < canBuyHouseHotelArray.length; i++){
                document.getElementById(canBuyHouseHotelArray[i].id).classList.remove('disable-clicks')
                document.getElementById(canBuyHouseHotelArray[i].id).classList.add('can-buy-house')
            }
            if(property.totalHouses < 4){
                currentPlayerTurn.housesOwned++
            }
            else{
                currentPlayerTurn.hotelsOwned++
                currentPlayerTurn.housesOwned -= 4
                clickableProperty.removeEventListener('click', buyHousePropertySpace)
            }
            property.totalHouses++
            currentPlayerTurn.cash -= property.buildingCost
            updateRentHouseHotel(property)
            placeHouseHotel(property)
            updatePlayerCashTotalDisplay()
            removeBuyHouseYesNoButtons()
            addBuyHouseTutorial()
            buyHouseYesBtn.removeEventListener('click', buyHouseYesBtnOutcome)
            buyHouseNoBtn.removeEventListener('click', buyHouseNoBtnOutcome)
            addFinishBuyHouseBtn()
        }
        
        //No Button Function
        function buyHouseNoBtnOutcome(){
            //Restore function and class indicators to add houses to eligible properties
            for (let i = 0; i < canBuyHouseHotelArray.length; i++){
                document.getElementById(canBuyHouseHotelArray[i].id).classList.remove('disable-clicks')
                document.getElementById(canBuyHouseHotelArray[i].id).classList.add('can-buy-house')
            }
            buyHouseYesBtn.removeEventListener('click', buyHouseYesBtnOutcome)
            buyHouseNoBtn.removeEventListener('click', buyHouseNoBtnOutcome)
            removeBuyHouseYesNoButtons()
            addBuyHouseTutorial()
            addFinishBuyHouseBtn()
        } 

        //Finish Button Function
        finishBuyHouseBtn.addEventListener('click', finishBuyHouseBtnOutcome)
        function finishBuyHouseBtnOutcome (){
            clickableProperty.classList.remove('can-buy-house')
            clickableProperty.removeEventListener('click', buyHousePropertySpace)
            finishBuyHouseBtn.removeEventListener('click', finishBuyHouseBtnOutcome)     
        }
    }) 
})

function placeHouseHotel(property){
    if (property.number < 10 && property.number > 0){
        placeHouseHotelBottom(property)
    }
    else if (property.number < 20 && property.number > 10){
        placeHouseHotelLeft(property)   
    }
    else if (property.number < 30 && property.number > 20){
        placeHouseHotelTop(property)
    }
    else if (property.number < 40 && property.number > 30){
        placeHouseHotelRight(property)
    }
}

function placeHouseHotelBottom(property){
    if(property.totalHouses === 1){
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', housePiece);
        document.getElementById(property.id).firstChild.style.left = "0px"

    }
    else if(property.totalHouses === 2){
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', housePiece);
        document.getElementById(property.id).firstChild.style.left = "26.7px"

    }
    else if (property.totalHouses === 3){
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', housePiece);
        document.getElementById(property.id).firstChild.style.right = "26.7px"
   
    }
    else if (property.totalHouses === 4){
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', housePiece);
        document.getElementById(property.id).firstChild.style.right = "0px"
        document.getElementById(property.id).firstChild.style.top = "0px"
    }
    else if(property.totalHouses === 5){
        document.getElementById(property.id).firstChild.remove()
        document.getElementById(property.id).firstChild.remove()
        document.getElementById(property.id).firstChild.remove()
        document.getElementById(property.id).firstChild.remove()
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', hotelPiece);
        document.getElementById(property.id).firstChild.style.left = "50%"
        document.getElementById(property.id).firstChild.style.marginLeft = "-20px"
    }

}

function placeHouseHotelLeft(property){
    if(property.totalHouses === 1){
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', housePiece);
        document.getElementById(property.id).firstChild.style.right = "0px"
        document.getElementById(property.id).firstChild.style.transform = "rotate(90deg)"

    }
    else if(property.totalHouses === 2){
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', housePiece);
        document.getElementById(property.id).firstChild.style.right = "0px"
        document.getElementById(property.id).firstChild.style.top = "26.7px"
        document.getElementById(property.id).firstChild.style.transform = "rotate(90deg)"

    }
    else if (property.totalHouses === 3){
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', housePiece);
        document.getElementById(property.id).firstChild.style.right = "0px"
        document.getElementById(property.id).firstChild.style.bottom = "26.7px"
        document.getElementById(property.id).firstChild.style.transform = "rotate(90deg)"   
    }
    else if (property.totalHouses === 4){
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', housePiece);
        document.getElementById(property.id).firstChild.style.right = "0px"
        document.getElementById(property.id).firstChild.style.bottom = "0px"
        document.getElementById(property.id).firstChild.style.transform = "rotate(90deg)"
    }
    else if(property.totalHouses === 5){
        document.getElementById(property.id).firstChild.remove()
        document.getElementById(property.id).firstChild.remove()
        document.getElementById(property.id).firstChild.remove()
        document.getElementById(property.id).firstChild.remove()
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', hotelPiece);
        document.getElementById(property.id).firstChild.style.transform = "rotate(90deg)"
        document.getElementById(property.id).firstChild.style.right = "-10px"
        document.getElementById(property.id).firstChild.style.top = "40%"
    }

}

function placeHouseHotelTop(property){
    if(property.totalHouses === 1){
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', housePiece);
        document.getElementById(property.id).firstChild.style.bottom = "0px"
        document.getElementById(property.id).firstChild.style.right = "0px"
        document.getElementById(property.id).firstChild.style.transform = "rotate(180deg)"

    }
    else if(property.totalHouses === 2){
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', housePiece);
        document.getElementById(property.id).firstChild.style.bottom = "0px"
        document.getElementById(property.id).firstChild.style.right = "26.7px"
        document.getElementById(property.id).firstChild.style.transform = "rotate(180deg)"

    }
    else if (property.totalHouses === 3){
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', housePiece);
        document.getElementById(property.id).firstChild.style.bottom = "0px"
        document.getElementById(property.id).firstChild.style.left = "26.7px"
        document.getElementById(property.id).firstChild.style.transform = "rotate(180deg)"   
    }
    else if (property.totalHouses === 4){
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', housePiece);
        document.getElementById(property.id).firstChild.style.bottom = "0px"
        document.getElementById(property.id).firstChild.style.left = "0px"
        document.getElementById(property.id).firstChild.style.transform = "rotate(180deg)"
    }
    else if(property.totalHouses === 5){
        document.getElementById(property.id).firstChild.remove()
        document.getElementById(property.id).firstChild.remove()
        document.getElementById(property.id).firstChild.remove()
        document.getElementById(property.id).firstChild.remove()
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', hotelPiece);
        document.getElementById(property.id).firstChild.style.transform = "rotate(180deg)"
        document.getElementById(property.id).firstChild.style.bottom = "0px"
        document.getElementById(property.id).firstChild.style.right = "50%"
        document.getElementById(property.id).firstChild.style.marginRight = "-20px"
    }

}

function placeHouseHotelRight(property){
    if(property.totalHouses === 1){
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', housePiece);
        document.getElementById(property.id).firstChild.style.bottom = "0px"
        document.getElementById(property.id).firstChild.style.transform = "rotate(270deg)"

    }
    else if(property.totalHouses === 2){
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', housePiece);
        document.getElementById(property.id).firstChild.style.bottom = "26.7px"
        document.getElementById(property.id).firstChild.style.transform = "rotate(270deg)"

    }
    else if (property.totalHouses === 3){
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', housePiece);
        document.getElementById(property.id).firstChild.style.top = "26.7px"
        document.getElementById(property.id).firstChild.style.transform = "rotate(270deg)"   
    }
    else if (property.totalHouses === 4){
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', housePiece);
        document.getElementById(property.id).firstChild.style.transform = "rotate(270deg)"
    }
    else if(property.totalHouses === 5){
        document.getElementById(property.id).firstChild.remove()
        document.getElementById(property.id).firstChild.remove()
        document.getElementById(property.id).firstChild.remove()
        document.getElementById(property.id).firstChild.remove()
        document.getElementById(property.id).insertAdjacentHTML('afterbegin', hotelPiece);
        document.getElementById(property.id).firstChild.style.transform = "rotate(270deg)"
        document.getElementById(property.id).firstChild.style.top = "40%"
        document.getElementById(property.id).firstChild.style.marginLeft = "-10px"
    }

}

finishBuyHouseBtn.addEventListener('click', function(e){ 
    addHouseHotelMortgageScreen()
    removeBuyHouseTutorial()
    removeFinishBuyHouseBtn()
    addEndTurnButton()
        if (hasRolled === false){
            removeEndTurnButton()
            addDice()
        }
    
})

function addBuyHouseYesNoButtons (){
    document.getElementById('buyHouseBtnsId').classList.add('house-hotel-mortgage-btns-container')
    document.getElementById('buyHouseBtnsId').classList.remove('hidden')
}

function removeBuyHouseYesNoButtons (){
    document.getElementById('buyHouseBtnsId').classList.add('hidden')
    document.getElementById('buyHouseBtnsId').classList.remove('house-hotel-mortgage-btns-container')
}

function addBuyHouseTutorial (){
    document.getElementById('buyHouseTutorialId').classList.add('turn-interaction-description')
    document.getElementById('buyHouseTutorialId').classList.remove('hidden')
}

function removeBuyHouseTutorial (){
    document.getElementById('buyHouseTutorialId').classList.add('hidden')
    document.getElementById('buyHouseTutorialId').classList.remove('turn-interaction-description')
}

function addFinishBuyHouseBtn (){
    finishBuyHouseBtn.classList.add('end-turn-button')
    finishBuyHouseBtn.classList.remove('hidden')
}

function removeFinishBuyHouseBtn (){
    finishBuyHouseBtn.classList.add('hidden')
    finishBuyHouseBtn.classList.remove('end-turn-button')
}


//Sell House Functions
//Sell House Functions
sellHouseHotelBtn.addEventListener('click', function(e){
    removeDice()
    generatePlayerPropertyArray()
    removeHouseHotelMortgageScreen()
    removeEndTurnButton()
    addFinishSellHouseHotelBtn()
    addSellHouseHotelTutorial()
    canSellHouseHotelArray = []

    //Sort owned property into array of full color set matches
    for (let i = 0; i < ownedPropertyArray.length;){
        if (ownedPropertyArray[i].type === 'color' && ownedPropertyArray[i].setTotal === 2 && (i + 1) < ownedPropertyArray.length){
                if(ownedPropertyArray[i].color === ownedPropertyArray[i+1].color){
                    canSellHouseHotelArray.push(ownedPropertyArray[i])
                    canSellHouseHotelArray.push(ownedPropertyArray[i+1])
                    i += 2
                } 
                else{
                    i++
                }        
        }
        else if(ownedPropertyArray[i].type === 'color' && ownedPropertyArray[i].setTotal === 3 && (i + 2) < ownedPropertyArray.length){
            if (ownedPropertyArray[i].color === ownedPropertyArray[i+1].color && ownedPropertyArray[i].color === ownedPropertyArray[i+2].color){
                canSellHouseHotelArray.push(ownedPropertyArray[i])
                canSellHouseHotelArray.push(ownedPropertyArray[i+1])
                canSellHouseHotelArray.push(ownedPropertyArray[i+2])
                i += 3
            }
            else{
                i++
            }
        }
        else{
            i++
        }
       
    }
    //Create clickable property to sell houses
    canSellHouseHotelArray.forEach(property =>{
        let clickableProperty = document.getElementById(property.id)
        clickableProperty.classList.add('can-sell-house')
        clickableProperty.addEventListener('click', sellHouseHotelPropertySpace) 

        //Create clickable property to sell houses
        function sellHouseHotelPropertySpace (){
            if(property.totalHouses <= 4 && property.totalHouses > 0){
                document.getElementById('sellHouseHotelLabel').innerHTML = `Would you like to sell a house on ${property.name} for $${property.buildingCost}?`        
            }
            else if (property.totalHouses === 5){
                document.getElementById('sellHouseHotelLabel').innerHTML = `Would you like to sell a hotel on ${property.name} for $${property.buildingCost}?`  
            }
            else{
                return
            }
            removeSellHouseHotelTutorial()
            addSellHouseHotelYesNoButtons()
            sellHouseHotelYesBtn.addEventListener('click', sellHouseHotelYesBtnOutcome)
            sellHouseHotelNoBtn.addEventListener('click', sellHouseHotelNoBtnOutcome) 
            removeFinishSellHouseHotelBtn()
            //Prevent user from clicking multiple properties at once
            for (let i = 0; i < canSellHouseHotelArray.length; i++){
                document.getElementById(canSellHouseHotelArray[i].id).classList.add('disable-clicks')
                document.getElementById(canSellHouseHotelArray[i].id).classList.remove('can-sell-house')
            }
        }

        //Yes button function
        function sellHouseHotelYesBtnOutcome(){
            //Restore function and class indicators to add houses to eligible properties
            for (let i = 0; i < canSellHouseHotelArray.length; i++){
                document.getElementById(canSellHouseHotelArray[i].id).classList.remove('disable-clicks')
                document.getElementById(canSellHouseHotelArray[i].id).classList.add('can-sell-house')
            }
            removeHouseHotel(property)
            if(property.totalHouses < 4){
                currentPlayerTurn.housesOwned--
            }
            else{
                currentPlayerTurn.housesOwned += 4
                currentPlayerTurn.hotelsOwned--
                clickableProperty.removeEventListener('click', sellHouseHotelPropertySpace)
            }
            property.totalHouses--
            currentPlayerTurn.cash += property.buildingCost
            updateRentHouseHotel(property)
            //change placeHouse
            updatePlayerCashTotalDisplay()
            removeSellHouseHotelYesNoButtons()
            addSellHouseHotelTutorial()
            sellHouseHotelYesBtn.removeEventListener('click', sellHouseHotelYesBtnOutcome)
            sellHouseHotelNoBtn.removeEventListener('click', sellHouseHotelNoBtnOutcome)
            addFinishSellHouseHotelBtn()
        }
        
        //No Button Function
        function sellHouseHotelNoBtnOutcome(){
            //Restore function and class indicators to sell houses to eligible properties
            for (let i = 0; i < canSellHouseHotelArray.length; i++){
                document.getElementById(canSellHouseHotelArray[i].id).classList.remove('disable-clicks')
                document.getElementById(canSellHouseHotelArray[i].id).classList.add('can-sell-house')
            }
            sellHouseHotelYesBtn.removeEventListener('click', sellHouseHotelYesBtnOutcome)
            sellHouseHotelNoBtn.removeEventListener('click', sellHouseHotelNoBtnOutcome)
            removeSellHouseHotelYesNoButtons()
            addSellHouseHotelTutorial()
            addFinishSellHouseHotelBtn()
        } 

        //Finish Button Function
        finishSellHouseHotelBtn.addEventListener('click', finishSellHouseHotelBtnOutcome)
        function finishSellHouseHotelBtnOutcome (){
            clickableProperty.classList.remove('can-sell-house')
            clickableProperty.removeEventListener('click', sellHouseHotelPropertySpace)
            finishSellHouseHotelBtn.removeEventListener('click', finishSellHouseHotelBtnOutcome)     
        }
    }) 
})

finishSellHouseHotelBtn.addEventListener('click', function(e){ 
    addHouseHotelMortgageScreen()
    removeSellHouseHotelTutorial()
    removeFinishSellHouseHotelBtn()
    addEndTurnButton()
    //Prevent User From Skipping Turn
    if (hasRolled === false){
        removeEndTurnButton()
        addDice()
    }
})

function removeHouseHotel(property){
    if(property.totalHouses === 1){
        document.getElementById(property.id).firstChild.remove()
    }
    else if(property.totalHouses === 2){
        document.getElementById(property.id).firstChild.remove()
    }
    else if (property.totalHouses === 3){
        document.getElementById(property.id).firstChild.remove() 
    }
    else if (property.totalHouses === 4){
        document.getElementById(property.id).firstChild.remove()
    }
    else if(property.totalHouses === 5){
        document.getElementById(property.id).firstChild.remove()
        property.totalHouses = 1
        for (let i = 0; i < 4; i++){
            placeHouseHotel(property)
            property.totalHouses++
        }
    }
}

function addFinishSellHouseHotelBtn (){
    finishSellHouseHotelBtn.classList.add('end-turn-button')
    finishSellHouseHotelBtn.classList.remove('hidden')
}

function removeFinishSellHouseHotelBtn (){
    finishSellHouseHotelBtn.classList.add('hidden')
    finishSellHouseHotelBtn.classList.remove('end-turn-button')
}

function addSellHouseHotelYesNoButtons (){
    document.getElementById('sellHouseHotelBtnsId').classList.add('house-hotel-mortgage-btns-container')
    document.getElementById('sellHouseHotelBtnsId').classList.remove('hidden')
}

function removeSellHouseHotelYesNoButtons (){
    document.getElementById('sellHouseHotelBtnsId').classList.add('hidden')
    document.getElementById('sellHouseHotelBtnsId').classList.remove('house-hotel-mortgage-btns-container')
}

function addSellHouseHotelTutorial (){
    document.getElementById('sellHouseHotelTutorialId').classList.add('turn-interaction-description')
    document.getElementById('sellHouseHotelTutorialId').classList.remove('hidden')
}

function removeSellHouseHotelTutorial (){
    document.getElementById('sellHouseHotelTutorialId').classList.add('hidden')
    document.getElementById('sellHouseHotelTutorialId').classList.remove('turn-interaction-description')
}

//Open Mortgage Functions
//Open Mortgage Functions
openMortgageBtn.addEventListener('click', function (){
    removeDice()
    generatePlayerPropertyArray()
    removeHouseHotelMortgageScreen()
    removeEndTurnButton()
    addFinishOpenMortgageBtn()
    addOpenMortgageTutorial()
    canOpenMortgageArray = []

    //Sort owned property into array of only mortgageable properties
    for (let i = 0; i < ownedPropertyArray.length; i++){
        if (ownedPropertyArray[i].mortgageOpen === false){
            canOpenMortgageArray.push(ownedPropertyArray[i])
            //Add indicator to mortgagable properties
            document.getElementById(ownedPropertyArray[i].id).classList.add('can-open-mortgage')
        }
    }

     //Create clickable property to open mortgage
    canOpenMortgageArray.forEach(property =>{
        let clickableProperty = document.getElementById(property.id)
        clickableProperty.addEventListener('click', openMortgagePropertySpace) 

        //Choose property to open mortgage
        function openMortgagePropertySpace (){
            document.getElementById('openMortgageLabel').innerHTML = `Would you like to open mortgage for ${property.name} for $${property.mortgage}?`
            removeOpenMortgageTutorial()
            addOpenMortgageYesNoButtons()
            openMortgageYesBtn.addEventListener('click', openMortgageYesBtnOutcome)
            openMortgageNoBtn.addEventListener('click', openMortgageNoBtnOutcome) 
            removeFinishOpenMortgageBtn()
            //Prevent user from clicking multiple properties at once
            for (let i = 0; i < canOpenMortgageArray.length; i++){
                document.getElementById(canOpenMortgageArray[i].id).classList.add('disable-clicks')
                document.getElementById(canOpenMortgageArray[i].id).classList.remove('can-open-mortgage')
            }
        }

        //Yes button function
        function openMortgageYesBtnOutcome(){
            property.mortgageOpen = true
            //Restore function and class indicators to remaining mortgagebale propterties
            for (let i = 0; i < canOpenMortgageArray.length;){
                if(canOpenMortgageArray[i].mortgageOpen === false){
                    document.getElementById(canOpenMortgageArray[i].id).classList.remove('disable-clicks')
                    document.getElementById(canOpenMortgageArray[i].id).classList.add('can-open-mortgage')
                    i++
                }
                else{
                    i++
                }

            }
            currentPlayerTurn.cash += property.mortgage
            updatePlayerCashTotalDisplay()
            removeOpenMortgageYesNoButtons()
            addOpenMortgageTutorial()
            clickableProperty.classList.add('mortgaged')
            clickableProperty.classList.remove('can-open-mortgage')
            clickableProperty.classList.remove('disable-clicks')
            clickableProperty.removeEventListener('click', openMortgagePropertySpace)
            openMortgageYesBtn.removeEventListener('click', openMortgageYesBtnOutcome)
            openMortgageNoBtn.removeEventListener('click', openMortgageNoBtnOutcome)
            addFinishOpenMortgageBtn()
        }
        
        //No Button Function
        function openMortgageNoBtnOutcome(){
        //Restore function and class indicators to remaining mortgagebale propterties
        for (let i = 0; i < canOpenMortgageArray.length;){
            if (canOpenMortgageArray[i].mortgageOpen === false){
                document.getElementById(canOpenMortgageArray[i].id).classList.remove('disable-clicks')
                document.getElementById(canOpenMortgageArray[i].id).classList.add('can-open-mortgage')
                i++
            }
            else{
                i++
            }

        }
            openMortgageYesBtn.removeEventListener('click', openMortgageYesBtnOutcome)
            openMortgageNoBtn.removeEventListener('click', openMortgageNoBtnOutcome)
            removeOpenMortgageYesNoButtons()
            addOpenMortgageTutorial()
            addFinishOpenMortgageBtn()
        } 

        //Finish Button Function
        finishOpenMortgageBtn.addEventListener('click', finishOpenMortgageBtnOutcome)
        function finishOpenMortgageBtnOutcome (){
            let remainingUnmortgagedProperties = []
            remainingUnmortgagedProperties = canOpenMortgageArray.filter(function(remainingProperty){return remainingProperty.mortgageOpen === false})
            //Find reamining unmortgaged properties and remove event listener and class indicators
            remainingUnmortgagedProperties.forEach(remaining =>{
                let notMortgagable = document.getElementById(remaining.id)
                notMortgagable.classList.remove('can-open-mortgage')
                notMortgagable.removeEventListener('click', openMortgagePropertySpace)
                finishOpenMortgageBtn.removeEventListener('click', finishOpenMortgageBtnOutcome)
            })
        }
    })
})

finishOpenMortgageBtn.addEventListener('click', function(e){ 
    addHouseHotelMortgageScreen()
    removeOpenMortgageTutorial()
    removeFinishOpenMortgageBtn()
    addEndTurnButton()
    //Prevent User From Skipping Turn
    if (hasRolled === false){
        removeEndTurnButton()
        addDice()
    }
})

function addOpenMortgageYesNoButtons (){
    document.getElementById('openMortgageBtnsId').classList.add('house-hotel-mortgage-btns-container')
    document.getElementById('openMortgageBtnsId').classList.remove('hidden')
}

function removeOpenMortgageYesNoButtons (){
    document.getElementById('openMortgageBtnsId').classList.add('hidden')
    document.getElementById('openMortgageBtnsId').classList.remove('house-hotel-mortgage-btns-container')
}

function addOpenMortgageTutorial (){
    document.getElementById('openMortgageTutorialId').classList.add('turn-interaction-description')
    document.getElementById('openMortgageTutorialId').classList.remove('hidden')
}

function removeOpenMortgageTutorial (){
    document.getElementById('openMortgageTutorialId').classList.add('hidden')
    document.getElementById('openMortgageTutorialId').classList.remove('turn-interaction-description')
}

function addFinishOpenMortgageBtn (){
    finishOpenMortgageBtn.classList.add('end-turn-button')
    finishOpenMortgageBtn.classList.remove('hidden')
}

function removeFinishOpenMortgageBtn (){
    finishOpenMortgageBtn.classList.add('hidden')
    finishOpenMortgageBtn.classList.remove('end-turn-button')
}

//Close Mortgage Functions
//Close Mortgage Functions
closeMortgageBtn.addEventListener('click', function (e){
    removeDice()
    generatePlayerPropertyArray()
    removeHouseHotelMortgageScreen()
    removeEndTurnButton()
    addFinishCloseMortgageBtn()
    addCloseMortgageTutorial()
    canCloseMortgageArray = []

    //Sort owned property into array of only mortgageable properties
    for (let i = 0; i < ownedPropertyArray.length; i++){
        if (ownedPropertyArray[i].mortgageOpen === true){
            canCloseMortgageArray.push(ownedPropertyArray[i])
            //Add indicator to mortgagable properties
            document.getElementById(ownedPropertyArray[i].id).classList.add('can-close-mortgage')
        }
    }
        //Create clickable property to close mortgage
        canCloseMortgageArray.forEach(property =>{
        let clickableProperty = document.getElementById(property.id)
        clickableProperty.addEventListener('click', closeMortgagePropertySpace) 

        //Choose property to close mortgage
        function closeMortgagePropertySpace (){
            document.getElementById('closeMortgageLabel').innerHTML = `Would you like to close mortgage for ${property.name} for $${property.mortgage}?`
            removeCloseMortgageTutorial()
            addCloseMortgageYesNoButtons()
            closeMortgageYesBtn.addEventListener('click', closeMortgageYesBtnOutcome)
            closeMortgageNoBtn.addEventListener('click', closeMortgageNoBtnOutcome) 
            removeFinishCloseMortgageBtn()
            //Prevent user from clicking multiple properties
            for (let i = 0; i < canCloseMortgageArray.length; i++){
                document.getElementById(canCloseMortgageArray[i].id).classList.add('disable-clicks')
                document.getElementById(canCloseMortgageArray[i].id).classList.remove('can-close-mortgage')
            }
        }

        //Yes button function
        function closeMortgageYesBtnOutcome(){
            property.mortgageOpen = false
            //Restore function and class indicators to remaining mortgagebale propterties
            for (let i = 0; i < canCloseMortgageArray.length;){
                if (canCloseMortgageArray[i].mortgageOpen === true){
                    document.getElementById(canCloseMortgageArray[i].id).classList.remove('disable-clicks')
                    document.getElementById(canCloseMortgageArray[i].id).classList.add('can-close-mortgage')
                    i++
                }
                else{
                    i++
                }

            }
            currentPlayerTurn.cash -= property.mortgage
            updatePlayerCashTotalDisplay()
            removeCloseMortgageYesNoButtons()
            addCloseMortgageTutorial()
            clickableProperty.classList.remove('mortgaged')
            clickableProperty.classList.remove('can-close-mortgage')
            clickableProperty.classList.remove('disable-clicks')
            clickableProperty.removeEventListener('click', closeMortgagePropertySpace)
            closeMortgageYesBtn.removeEventListener('click', closeMortgageYesBtnOutcome)
            closeMortgageNoBtn.removeEventListener('click', closeMortgageNoBtnOutcome)
            addFinishCloseMortgageBtn()
        }
        
        //No Button Function
        function closeMortgageNoBtnOutcome(){
        //Restore function and class indicators to remaining mortgagebale propterties
        for (let i = 0; i < canCloseMortgageArray.length;){
            if(canCloseMortgageArray[i].mortgageOpen === true){
                document.getElementById(canCloseMortgageArray[i].id).classList.remove('disable-clicks')
                document.getElementById(canCloseMortgageArray[i].id).classList.add('can-close-mortgage')
                i++
            }
            else{
                i++
            }

        }
            closeMortgageYesBtn.removeEventListener('click', closeMortgageYesBtnOutcome)
            closeMortgageNoBtn.removeEventListener('click', closeMortgageNoBtnOutcome)
            removeCloseMortgageYesNoButtons()
            addCloseMortgageTutorial()
            addFinishCloseMortgageBtn()
        } 

        //Finish Button Function
        finishCloseMortgageBtn.addEventListener('click', finishCloseMortgageBtnOutcome)
        function finishCloseMortgageBtnOutcome (){
         let remainingMortgagedProperties = []
         remainingMortgagedProperties = canCloseMortgageArray.filter(function(remainingProperty){return remainingProperty.mortgageOpen === true})
         //Find reamining mortgaged properties and remove event listener and class indicators
         remainingMortgagedProperties.forEach(remaining =>{
             let canMortgage = document.getElementById(remaining.id)
             canMortgage.classList.remove('can-close-mortgage')
             canMortgage.removeEventListener('click', closeMortgagePropertySpace)
             finishCloseMortgageBtn.removeEventListener('click', finishCloseMortgageBtnOutcome)
         })
        }
    }) 
})

finishCloseMortgageBtn.addEventListener('click', function(e){ 
    addHouseHotelMortgageScreen()
    removeCloseMortgageTutorial()
    removeFinishCloseMortgageBtn()
    addEndTurnButton()
    //Prevent User From Skipping Turn
    if (hasRolled === false){
        removeEndTurnButton()
        addDice()
    }
})

function addCloseMortgageTutorial (){
    document.getElementById('closeMortgageTutorialId').classList.add('turn-interaction-description')
    document.getElementById('closeMortgageTutorialId').classList.remove('hidden')
}

function removeCloseMortgageTutorial (){
    document.getElementById('closeMortgageTutorialId').classList.add('hidden')
    document.getElementById('closeMortgageTutorialId').classList.remove('turn-interaction-description')
}

function addCloseMortgageYesNoButtons (){
    document.getElementById('closeMortgageBtnsId').classList.add('house-hotel-mortgage-btns-container')
    document.getElementById('closeMortgageBtnsId').classList.remove('hidden')
}

function removeCloseMortgageYesNoButtons (){
    document.getElementById('closeMortgageBtnsId').classList.add('hidden')
    document.getElementById('closeMortgageBtnsId').classList.remove('house-hotel-mortgage-btns-container')
}

function removeFinishCloseMortgageBtn (){
    finishCloseMortgageBtn.classList.add('hidden')
    finishCloseMortgageBtn.classList.remove('end-turn-button')
}

function addFinishCloseMortgageBtn (){
    finishCloseMortgageBtn.classList.add('end-turn-button')
    finishCloseMortgageBtn.classList.remove('hidden')
}
