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
    updateChoosePieceName()      
})

function updateChoosePieceName(){
    if (playersSelected != totalPlayers){
        document.getElementById('choosePieceTextId').innerHTML = `${activePlayers[playersSelected].name}:<br>Choose your game piece`
    }
}

//Set each player icon
pieceSelectionButton.forEach(icon => {
    let iconButton = icon.button
    let iconPiece = icon.gamePiece
    let iconIdname = icon.gamePieceId
    let iconColorLight = icon.colorLight
    let iconColorDark = icon.colorDark
    iconButton.addEventListener('click', function (e){
        currentPlayerTurn.gamePiece = iconPiece
        currentPlayerTurn.pieceId = iconIdname
        currentPlayerTurn.colorLight = iconColorLight
        currentPlayerTurn.colorDark = iconColorDark
        currentPlayerTurn.isBankrupt = false
        playersSelected++
        updateChoosePieceName()
        document.getElementById(`${iconIdname}Btn`).disabled = true;
        document.getElementById(`${iconIdname}Btn`).style.opacity = "0";
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
        placePiece(currentPlayerTurn);
        whosTurnSetup();
        displayPlayerCash()
    }
    currentPlayerTurn = activePlayers[0];
    startGame();
}

function displayPlayerCash(){
    document.getElementById(currentPlayerTurn.cashDisplayId).innerText = `${currentPlayerTurn.name} Cash: ${currentPlayerTurn.cash}`
    document.getElementById(currentPlayerTurn.cashDisplayId).style.color = currentPlayerTurn.colorDark

}

function updatePlayerCashTotalDisplay(){
    for (let i = 0; i < totalPlayers; i++){
        document.getElementById(activePlayers[i].cashDisplayId).innerText = `${activePlayers[i].name} Cash: ${activePlayers[i].cash}`
        if (activePlayers[i].isBankrupt === true){
            document.getElementById(activePlayers[i].cashDisplayId).style.opacity = .4
            document.getElementById(activePlayers[i].cashDisplayId).innerText = `${activePlayers[i].name}: Bankrupt`
        }
    }
}

function updatePlayerTotalAssets(){
    for (let i = 0; i < totalPlayers; i++){
        activePlayers[i].updateTotalAssets()
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
    document.getElementById('playerTurnNameId').innerHTML = `${currentPlayerTurn.name}`
    document.getElementById('playerTurnNameId').style.color = currentPlayerTurn.colorDark
    document.getElementById('playerTurnNameId').style.fontSize = "2em"
}

function updateMiddleScreenPlayerLocation (){
    document.getElementById('float-screen-game-middle-currentLocation').innerHTML = `Current Location:<br><span class="enlarge-font-span">${propertyArray[currentPlayerTurn.position].name}</span>`
}

function displayDiceRollOutput(roll1, roll2){
    document.getElementById('rollCounterDisplay').innerHTML = `Dice One: ${roll1}<br>Dice Two: ${roll2}<br>Total: ${(roll1 + roll2)}<br>Doubles Streak: ${currentPlayerTurn.doublesCounter}`
 }

function displayJailRollOutput (roll1, roll2){
    document.getElementById('rollCounterDisplay').innerHTML = `Dice One: ${roll1}<br>Dice Two: ${roll2}<br>Total: ${(roll1 + roll2)}`  
 }

function clearDiceRollOutput(){
    document.getElementById('rollCounterDisplay').innerHTML = ""
 }

//Game Interactions
//Game Interactions
//Game Interactions
//Game Interactions

//Player Turn Dice Roll
rollBtn.addEventListener('click', function (e){
    hasRolled = true
    diceTwoValue = rollDiceTwo()
    diceOneValue = rollDiceOne()
    //Check for doubles
    if(diceOneValue === diceTwoValue){
        currentPlayerTurn.doublesCounter++
        //Send to jail if roll doubles 3x
        if (currentPlayerTurn.doublesCounter > 2){
            removeHouseHotelMortgageScreen()
            displayDiceRollOutput(diceOneValue, diceTwoValue);
            addturnInteractionDescriptionDisplay()
            turnInteractionDescription.innerText = "Rolled Doubles 3 Times. Go To Jail";
            goToJail()
            return;
        }
    }
    //Collect $200 if make it back to go
    propertyArray[currentPlayerTurn.position].currentOccupants -= 1;
    currentPlayerTurn.position += (diceOneValue + diceTwoValue)
       if (currentPlayerTurn.position > 39){
           currentPlayerTurn.position -= 40;
           currentPlayerTurn.cash += 200;
           updatePlayerCashTotalDisplay()
       }
       displayDiceRollOutput(diceOneValue, diceTwoValue);
       playerPiece().remove();
       placePiece(currentPlayerTurn)
       removeDice()
       removeHouseHotelMortgageScreen()
       currentLocationInteraction()
 })

//Logic for space landed on
 function currentLocationInteraction (){
    if (spaceLandedOn().isProperty === true){
        if (spaceLandedOn().hasOwner === true){
            if (spaceLandedOn().owner.name != currentPlayerTurn.name){
                //Pay rent
                if(spaceLandedOn().owner.isInJail === false && spaceLandedOn().mortgageOpen === false){
                    if(spaceLandedOn().type === 'utility'){
                        spaceLandedOn().updateRent(spaceLandedOn().owner)
                    }
                    updatePlayerTotalAssets()
                    if (currentPlayerTurn.totalAssets < spaceLandedOn().rent){
                        informBankrupt()
                        return
                    }
                    addPropertyCard('propertyCardId')
                    addPayRentContainer()
                    addPayRentTutorial()
                    document.getElementById('payRentLabelId').innerHTML = `You owe ${spaceLandedOn().owner.name} $${spaceLandedOn().rent}.`

                }
                else if(spaceLandedOn().owner.isInJail === true){
                    addturnInteractionDescriptionDisplay()
                    removePropertyCard('propertyCardId')
                    addHouseHotelMortgageScreen()
                    turnInteractionDescription.innerHTML = `The owner of ${spaceLandedOn().name} is in jail.  You do not pay rent.`
                    addEndTurnButton()
                }
                else if(spaceLandedOn().mortgageOpen === true){
                    addturnInteractionDescriptionDisplay()
                    removePropertyCard('propertyCardId')
                    addHouseHotelMortgageScreen()
                    turnInteractionDescription.innerHTML = `${spaceLandedOn().name} currently has an open mortgage.  You do not pay rent.`
                    addEndTurnButton()
                }
            }
            else{
                addturnInteractionDescriptionDisplay()
                turnInteractionDescription.innerHTML = `You own ${spaceLandedOn().name}`
                removePropertyCard('propertyCardId')
                addHouseHotelMortgageScreen()
                addEndTurnButton()
            }
        }
        //Buy property
        else if (spaceLandedOn().hasOwner === false){
                addPropertyBuySellAuctionButtons()
                addPropertyCard('propertyCardId')
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
        currentPlayerTurn.updateIncomeTax()
        let tenPercentIncomeTax = (Math.floor(currentPlayerTurn.incomeTax / 10))
        if (tenPercentIncomeTax < 200)
        {
            turnInteractionDescription.innerText = `Pay 10% Income Tax ($${tenPercentIncomeTax})`
            currentPlayerTurn.cash -= tenPercentIncomeTax
        }
        else{
            turnInteractionDescription.innerText= 'Pay $200 Income Tax'
            currentPlayerTurn.cash -= 200
        }
        
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

 function addturnInteractionDescriptionDisplay(){
    document.getElementById('turnInteractionDescriptionId').classList.add('turn-interaction-description');
    document.getElementById('turnInteractionDescriptionId').classList.remove('hidden');
 }

 function removeTurnInteractionDescriptionDisplay(){
    document.getElementById('turnInteractionDescriptionId').classList.add('hidden');
    document.getElementById('turnInteractionDescriptionId').classList.remove('turn-interaction-description');
 }

//End Turn
endTurnBtn.addEventListener ('click', endTurn)

function endTurn(){
    //Prevent player turn from changing if doubles are rolled
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
    removeEndTurnButton()
    updateMiddleScreenPlayerTurn()
    updateMiddleScreenPlayerLocation()
    clearDiceRollOutput()
    addHouseHotelMortgageScreen()
    checkJailStatusNextPlayer()
    hasRolled = false
    if (currentPlayerTurn.isBankrupt === true){endTurn()}
}

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
        spaceLandedOn().currentOccupants--
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Chance:</span><br>Advance to Boardwalk.`
        playerPiece().remove()
        currentPlayerTurn.position = 39
        placePiece(currentPlayerTurn)
        currentLocationInteraction()  
    }
    else if (chanceRoll === 2){
        spaceLandedOn().currentOccupants--
        turnInteractionDescription.innerHTML =`<span class="bold-font-span">Chance:</span><br>Advance to Go (Collect $200).`
        playerPiece().remove()
        currentPlayerTurn.position = 0
        placePiece(currentPlayerTurn)
        currentPlayerTurn.cash += 200
        currentLocationInteraction()    
    }
    else if (chanceRoll === 3){
        spaceLandedOn().currentOccupants--
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Chance:</span><br>Advance to Illinois Avenue. If you pass Go, collect $200.`
        if (currentPlayerTurn.position > 23){
            currentPlayerTurn.cash += 200
        }
        playerPiece().remove()
        currentPlayerTurn.position = 24
        placePiece(currentPlayerTurn)
        currentLocationInteraction()
    }
    else if (chanceRoll === 4){
        spaceLandedOn().currentOccupants--
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Chance:</span><br>Advance to St. Charles Place. If you pass Go, collect $200.`
        if (currentPlayerTurn.position > 10){
            currentPlayerTurn.cash += 200
        }
        playerPiece().remove()
        currentPlayerTurn.position = 11
        placePiece(currentPlayerTurn)
        currentLocationInteraction()
    }
    else if (chanceRoll === 5){
        spaceLandedOn().currentOccupants--
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
        placePiece(currentPlayerTurn)
        currentLocationInteraction()  
    }
    else if (chanceRoll === 6 || chanceRoll === 7){
        spaceLandedOn().currentOccupants--
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
        placePiece(currentPlayerTurn)
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
        spaceLandedOn().currentOccupants--
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Chance:</span><br>Go Back 3 Spaces.`
        playerPiece().remove()
        currentPlayerTurn.position -= 3
        if (currentPlayerTurn.position < 0){
            currentPlayerTurn.position += 40
        }
        placePiece(currentPlayerTurn)
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
        spaceLandedOn().currentOccupants--
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
        placePiece(currentPlayerTurn)
        currentLocationInteraction()  
        
    }
    else if (chanceRoll === 15){
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Chance:</span><br>You have been elected Chairman of the Board. Pay each player $50.`
        for (let i = 0; i < totalPlayers; i++){
            if (activePlayers[i].name != currentPlayerTurn.name && activePlayers[i].isBankrupt === false){
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
        spaceLandedOn().currentOccupants--
        turnInteractionDescription.innerHTML = `<span class="bold-font-span">Community Chest:</span><br>Advance to Go (Collect $200).`
        playerPiece().remove()
        currentPlayerTurn.position = 0
        placePiece(currentPlayerTurn)
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
            if (currentPlayerTurn.name != activePlayers[i].name && activePlayers[i].isBankrupt === false){
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
function placePiece(pieceBeingPlaced){
    if (pieceBeingPlaced.position >= 0 && pieceBeingPlaced.position <= 9){
        placePieceBottom(pieceBeingPlaced)
    }
    else if(pieceBeingPlaced.position >= 11 && pieceBeingPlaced.position <= 19){
        placePieceLeft(pieceBeingPlaced)
    }
    else if (pieceBeingPlaced.position >= 20 && pieceBeingPlaced.position <= 29){
        placePieceTop(pieceBeingPlaced)
    }
    else if (pieceBeingPlaced.position >= 31 && pieceBeingPlaced.position <= 39){
        placePieceRight(pieceBeingPlaced)
    }
    //Place Piece "Just Visiting"
    else if (pieceBeingPlaced.position === 10){
        currentLocation = propertyArray[(pieceBeingPlaced.position)]
        if (currentLocation.currentOccupants === 0){
            document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece);
            document.getElementById(pieceBeingPlaced.pieceId).style.top = "5px";
            document.getElementById(pieceBeingPlaced.pieceId).style.left = "5.5px";
        }
        else if(currentLocation.currentOccupants === 1)
            {
            document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
            document.getElementById(pieceBeingPlaced.pieceId).style.top = "50px";
            document.getElementById(pieceBeingPlaced.pieceId).style.left = "5.5px";
        }
        else if (currentLocation.currentOccupants === 2){
            document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
            document.getElementById(pieceBeingPlaced.pieceId).style.bottom = "5px";
            document.getElementById(pieceBeingPlaced.pieceId).style.left = "5.5px";
    
        }
        else if (currentLocation.currentOccupants === 3){
            document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
            document.getElementById(pieceBeingPlaced.pieceId).style.bottom = "5px";
            document.getElementById(pieceBeingPlaced.pieceId).style.left = "50px";
    
        }  
    }
    //Place Piece "Go To Jail"
    else if (pieceBeingPlaced.position === 30){
        addturnInteractionDescriptionDisplay()
        turnInteractionDescription.innerText = `You landed on "Go To Jail" space`
        currentLocation = propertyArray[(pieceBeingPlaced.position)]
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece);
    }
    //Place Piece "In Jail"
    else if (pieceBeingPlaced.position === 40){
        currentLocation = propertyArray[(pieceBeingPlaced.position)]
        if (currentLocation.currentOccupants === 0){
            document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece);
            document.getElementById(pieceBeingPlaced.pieceId).style.top = "5px";
            document.getElementById(pieceBeingPlaced.pieceId).style.left = "5x";
        }
        else if(currentLocation.currentOccupants === 1)
            {
            document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
            document.getElementById(pieceBeingPlaced.pieceId).style.top = "5px";
            document.getElementById(pieceBeingPlaced.pieceId).style.right = "5px";
        }
        else if (currentLocation.currentOccupants === 2){
            document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
            document.getElementById(pieceBeingPlaced.pieceId).style.bottom = "5px";
            document.getElementById(pieceBeingPlaced.pieceId).style.left = "5px";
    
        }
        else if (currentLocation.currentOccupants === 3){
            document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
            document.getElementById(pieceBeingPlaced.pieceId).style.bottom = "5px";
            document.getElementById(pieceBeingPlaced.pieceId).style.right = "5px";
    
        }
    }
    
    currentLocation.currentOccupants++

    //If space left had other occupants, move occupants up one position in previous property container
    if (pieceBeingPlaced === currentPlayerTurn && hasRolled === true){
        updateMiddleScreenPlayerLocation()
        let previousLocation = (currentPlayerTurn.position - diceOneValue - diceTwoValue)
        if (previousLocation < 0){
            previousLocation += 40
        }

        if (propertyArray[previousLocation].currentOccupants > 0){
            propertyArray[previousLocation].currentOccupants = 0
            for (let i = 0; i < totalPlayers; i++){
                if (activePlayers[i].position === previousLocation){
                    let playerToBeRemoved = document.getElementById(activePlayers[i].pieceId)
                    playerToBeRemoved.remove()
                    placePiece(activePlayers[i])
                }
            }
        }
    }
}

 function placePieceBottom(pieceBeingPlaced){
    currentLocation = propertyArray[(pieceBeingPlaced.position)]
    if (currentLocation.currentOccupants === 0){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece);
        document.getElementById(pieceBeingPlaced.pieceId).style.top = "15%";
        document.getElementById(pieceBeingPlaced.pieceId).style.left = "5%";
    }
    else if(currentLocation.currentOccupants === 1)
        {
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
        document.getElementById(pieceBeingPlaced.pieceId).style.top = "45%";
        document.getElementById(pieceBeingPlaced.pieceId).style.left = "5%";
    }
    else if (currentLocation.currentOccupants === 2){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
        document.getElementById(pieceBeingPlaced.pieceId).style.top = "15%";
        document.getElementById(pieceBeingPlaced.pieceId).style.right = "5%";

    }
    else if (currentLocation.currentOccupants === 3){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
        document.getElementById(pieceBeingPlaced.pieceId).style.top = "45%";
        document.getElementById(pieceBeingPlaced.pieceId).style.right = "5%";

    }

}

function placePieceLeft(pieceBeingPlaced){
    currentLocation = propertyArray[(pieceBeingPlaced.position)]
    if (currentLocation.currentOccupants === 0){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece);
        document.getElementById(pieceBeingPlaced.pieceId).style.right = "15%"
        document.getElementById(pieceBeingPlaced.pieceId).style.top = "5%";
        document.getElementById(pieceBeingPlaced.pieceId).style.transform = "rotate(90deg)";
    }
    else if(currentLocation.currentOccupants === 1)
        {
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
        document.getElementById(pieceBeingPlaced.pieceId).style.right = "45%";
        document.getElementById(pieceBeingPlaced.pieceId).style.top = "5%";
        document.getElementById(pieceBeingPlaced.pieceId).style.transform = "rotate(90deg)";
    }
    else if (currentLocation.currentOccupants === 2){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
        document.getElementById(pieceBeingPlaced.pieceId).style.right = "15%";
        document.getElementById(pieceBeingPlaced.pieceId).style.bottom = "5%";
        document.getElementById(pieceBeingPlaced.pieceId).style.transform = "rotate(90deg)";
    }
    else if (currentLocation.currentOccupants === 3){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
        document.getElementById(pieceBeingPlaced.pieceId).style.right = "45%";
        document.getElementById(pieceBeingPlaced.pieceId).style.bottom = "5%";
        document.getElementById(pieceBeingPlaced.pieceId).style.transform = "rotate(90deg)";
    }

}

function placePieceTop(pieceBeingPlaced){
    currentLocation = propertyArray[(pieceBeingPlaced.position)]
    if (currentLocation.currentOccupants === 0){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
        document.getElementById(pieceBeingPlaced.pieceId).style.bottom = "15%"
        document.getElementById(pieceBeingPlaced.pieceId).style.right = "5%";
        document.getElementById(pieceBeingPlaced.pieceId).style.transform = "rotate(180deg)";
    }
    else if(currentLocation.currentOccupants === 1)
        {
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
        document.getElementById(pieceBeingPlaced.pieceId).style.bottom = "45%";
        document.getElementById(pieceBeingPlaced.pieceId).style.right = "5%";
        document.getElementById(pieceBeingPlaced.pieceId).style.transform = "rotate(180deg)";
    }
    else if (currentLocation.currentOccupants === 2){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
        document.getElementById(pieceBeingPlaced.pieceId).style.bottom = "15%";
        document.getElementById(pieceBeingPlaced.pieceId).style.left = "5%";
        document.getElementById(pieceBeingPlaced.pieceId).style.transform = "rotate(180deg)";
    }
    else if (currentLocation.currentOccupants === 3){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
        document.getElementById(pieceBeingPlaced.pieceId).style.bottom = "45%";
        document.getElementById(pieceBeingPlaced.pieceId).style.left = "5%";
        document.getElementById(pieceBeingPlaced.pieceId).style.transform = "rotate(180deg)";
    }

}

function placePieceRight(pieceBeingPlaced){
    currentLocation = propertyArray[(pieceBeingPlaced.position)]
    if (currentLocation.currentOccupants === 0){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece);
        document.getElementById(pieceBeingPlaced.pieceId).style.bottom = "5%"
        document.getElementById(pieceBeingPlaced.pieceId).style.left = "15%";
        document.getElementById(pieceBeingPlaced.pieceId).style.transform = "rotate(270deg)";
    }
    else if(currentLocation.currentOccupants === 1)
        {
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
        document.getElementById(pieceBeingPlaced.pieceId).style.bottom = "5%";
        document.getElementById(pieceBeingPlaced.pieceId).style.left = "45%";
        document.getElementById(pieceBeingPlaced.pieceId).style.transform = "rotate(270deg)";
    }
    else if (currentLocation.currentOccupants === 2){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
        document.getElementById(pieceBeingPlaced.pieceId).style.top = "5%";
        document.getElementById(pieceBeingPlaced.pieceId).style.left = "15%";
        document.getElementById(pieceBeingPlaced.pieceId).style.transform = "rotate(270deg)";
    }
    else if (currentLocation.currentOccupants === 3){
        document.getElementById(currentLocation.id).insertAdjacentHTML('afterbegin', pieceBeingPlaced.gamePiece)
        document.getElementById(pieceBeingPlaced.pieceId).style.top = "5%";
        document.getElementById(pieceBeingPlaced.pieceId).style.left = "45%";
        document.getElementById(pieceBeingPlaced.pieceId).style.transform = "rotate(270deg)";
    }

}

//Property Cards
//Property Cards

function addPropertyCard (locationId){
    if (spaceLandedOn().type === "color"){
        addColorPropertyCard(locationId)
    }
    else if (spaceLandedOn().type === "railroad"){
        addRailroadPropertyCard(locationId)
    }
    else if (spaceLandedOn().type === "utility" ){
        addUtilityCard(locationId)
    }
    else {
        console.log('missing property type add')
        return
    }
}

function removePropertyCard (locationId){
    if (spaceLandedOn().type === "color"){
        removeColorPropertyCard(locationId)
    }
    else if (spaceLandedOn().type === "railroad"){
        removeRailroadPropertyCard(locationId)
    }
    else if (spaceLandedOn().type === "utility" ){
        removeUtilityCard(locationId)
    }
    else {
        console.log('missing property type remove')
        return
    }
}

function addColorPropertyCard(locationId){
    document.getElementById(locationId).innerHTML = colorPropertyCard;
    document.getElementById('colorPropertyName').innerHTML = `${spaceLandedOn().name}`
    document.getElementById('colorPropertyName').style.borderTop = `20px solid ${spaceLandedOn().color}`
    document.getElementById('colorPropertyRent').innerHTML = `Rent: $${spaceLandedOn().startingRent}`
    document.getElementById('colorPropertyOneHouse').innerHTML = `One House Rent: $${spaceLandedOn().oneHouseRent}`
    document.getElementById('colorPropertyTwoHouse').innerHTML = `Two Houses Rent: $${spaceLandedOn().twoHouseRent}`
    document.getElementById('colorPropertyThreeHouse').innerHTML = `Three Houses Rent: $${spaceLandedOn().threeHouseRent}`
    document.getElementById('colorPropertyFourHouse').innerHTML = `Four Houses Rent: $${spaceLandedOn().fourHouseRent}`
    document.getElementById('colorPropertyHotelRent').innerHTML = `Hotel Rent: $${spaceLandedOn().hotelRent}`
    document.getElementById('colorPropertyHouseCost').innerHTML = `Cost to build house: $${spaceLandedOn().buildingCost}`
    document.getElementById('colorPropertyHotelCost').innerHTML = `Cost to build hotel: $${spaceLandedOn().buildingCost}`
    document.getElementById('colorPropertyMortgage').innerHTML = `Mortgage Value: $${spaceLandedOn().mortgage}`
    document.getElementById(locationId).classList.add('color-property-card')
    document.getElementById(locationId).classList.remove('hidden')
}

function removeColorPropertyCard(locationId){
    document.getElementById(locationId).classList.add('hidden')
    document.getElementById(locationId).classList.remove('color-property-card')
    document.getElementById(locationId).innerHTML = ""
}

function addRailroadPropertyCard(locationId){
    document.getElementById(locationId).innerHTML = railroadPropertyCard;
    document.getElementById('railroadPropertyName').innerHTML = `${spaceLandedOn().name}`
    document.getElementById(locationId).classList.add('railroad-property-card')
    document.getElementById(locationId).classList.remove('hidden')
}

function removeRailroadPropertyCard(locationId){
    document.getElementById(locationId).classList.remove('railroad-property-card')
    document.getElementById(locationId).classList.add('hidden')
    document.getElementById(locationId).innerHTML = ""
}

function addUtilityCard(locationId){
    document.getElementById(locationId).innerHTML = utilityPropertyCard;
    document.getElementById('utilityPropertyName').innerHTML = `${spaceLandedOn().name}`
    document.getElementById(locationId).classList.add('utility-property-card')
    document.getElementById(locationId).classList.remove('hidden')
}

function removeUtilityCard(locationId){
    document.getElementById(locationId).classList.remove('utility-property-card')
    document.getElementById(locationId).classList.add('hidden')
    document.getElementById(locationId).innerHTML = ""
}

buyPropertyYesBtn.addEventListener('click', function(e){
    removeBuyPropertyYesBtn()
    currentPlayerTurn.properties.push(spaceLandedOn())
    spaceLandedOn().owner = currentPlayerTurn
    spaceLandedOn().hasOwner = true
    currentPlayerTurn.cash -= spaceLandedOn().price
    currentPlayerTurn.updateTotalAssets()
    updateRent(currentPlayerTurn)
    updatePlayerCashTotalDisplay()
    document.getElementById(spaceLandedOn().id).style.backgroundColor = currentPlayerTurn.colorLight;
    removePropertyBuySellAuctionButtons()
    addEndTurnButton()
    addturnInteractionDescriptionDisplay()
    removePropertyCard('propertyCardId')
    addHouseHotelMortgageScreen()
    document.getElementById('turnInteractionDescriptionId').innerHTML = `You purchased ${spaceLandedOn().name} for $${spaceLandedOn().price}` 
})

buyPropertyAuctionBtn.addEventListener('click', function(e){
    removePropertyBuySellAuctionButtons()
    removeBuyPropertySellBtn()
    addEndTurnButton()
    removePropertyCard('propertyCardId')
    addHouseHotelMortgageScreen()
    addAuctionScreen()
    addPropertyCard('auctionCardId')
    generateAuctionScreen()
})

buyPropertySellBtn.addEventListener('click', function(e){
    removeBuyPropertyYesBtn()
    removeTradeButton()
    removePropertyBuySellAuctionButtons()
    removePropertyCard('propertyCardId')
    addHouseHotelMortgageScreen()
})

function addPropertyBuySellAuctionButtons(){
    document.getElementById('propertyForPurchaseId').classList.add('property-for-purchase-grid');
    document.getElementById('propertyForPurchaseId').classList.remove('hidden');
    updatePlayerTotalAssets()

    if (currentPlayerTurn.cash >= spaceLandedOn().price){
        document.getElementById('wouldYouLikeToBuyId').innerHTML = `Would you like to buy ${spaceLandedOn().name} for $${spaceLandedOn().price}?`
        addBuyPropertyYesBtn()
        removeBuyPropertySellBtn()    
    }
    else if (currentPlayerTurn.totalAssets > spaceLandedOn().price){
        document.getElementById('wouldYouLikeToBuyId').innerHTML = `You need $${spaceLandedOn().price} to buy ${spaceLandedOn().name}. Open a mortgage, sell houses or auction this property`
        addBuyPropertySellBtn()
        removeBuyPropertyYesBtn()
    }
    else{
        document.getElementById('wouldYouLikeToBuyId').innerHTML = `You do not have enough assets to sell to afford ${spaceLandedOn().name}`
    }
 }

function addBuyPropertyYesBtn(){
    buyPropertyYesBtn.classList.remove('hidden')
    buyPropertyYesBtn.classList.add('purchase-property-button')
}
 
function removeBuyPropertyYesBtn(){
    buyPropertyYesBtn.classList.remove('purchase-property-button')
    buyPropertyYesBtn.classList.add('hidden')
}

function addBuyPropertySellBtn(){
    buyPropertySellBtn.classList.remove('hidden')
    buyPropertySellBtn.classList.add('purchase-property-button')
}

function removeBuyPropertySellBtn(){
    buyPropertySellBtn.classList.remove('purchase-property-button')
    buyPropertySellBtn.classList.add('hidden')
}

 function removePropertyBuySellAuctionButtons(){
    document.getElementById('propertyForPurchaseId').classList.add('hidden');
    document.getElementById('propertyForPurchaseId').classList.remove('property-for-purchase-grid');
 }

//Auction Property
//Auction Property
function generateAuctionScreen(){
    document.getElementById('auctionOriginalPriceId').innerText = `Original Price: $${spaceLandedOn().price}`
        //Update Auction screen with active players
    for (let i = 0; i < totalPlayers; i++){
        if (activePlayers[i].isBankrupt === false){
            playerAuctionContainers[i].nameplate.innerHTML =  `${activePlayers[i].name}`
            playerAuctionContainers[i].nameplate.style.color = activePlayers[i].colorDark
            activePlayers[i].colorBid = playerAuctionContainers[i].nameplate.style.color
            playerAuctionContainers[i].cashDisplay.innerHTML = `Availible Cash: ${activePlayers[i].cash}`
            playerAuctionContainers[i].cashDisplay.style.color = activePlayers[i].colorDark
                //Add buttons to bid for property
                for (let j = 0; j < 6; j++){
                    let auctionButton = document.createElement('button')
                    auctionButton.classList.add('auction-btn')
                    auctionButton.style.backgroundColor = activePlayers[i].colorDark
                    auctionButton.innerText = `${auctionButtonsValueArray[j].buttonValue}`
                    activePlayers[i].auctionButtons.push(auctionButton)
                    playerAuctionContainers[i].buttonId.append(auctionButton)
    
                    auctionButton.addEventListener('click', function(){
                        let buttonValue = parseInt(this.innerText)
                        currentAuctionBid += buttonValue
                        spanBid.innerText = `$${currentAuctionBid}`
                        spanBid.style.color = this.style.backgroundColor
                        auctionLeaderColor = this.style.backgroundColor
                        clearTimeout(noBidsGoingOnce)
                        clearTimeout(noBidsGoingTwice)
                        clearTimeout(noBidsFinal)
                        clearTimeout(auctionResult)
                        checkPlayerCanAffordAuctionButtonValue()  
                        setAuctionLeaderColor() 
                        bidOnProperty()
                                             
                    })
                }
        }
        else{
            playerAuctionContainers[i].nameplate.innerHTML =  ""
            playerAuctionContainers[i].cashDisplay.innerHTML = ""
        }
    }
    checkPlayerCanAffordAuctionButtonValue() 
}

function setAuctionLeaderColor(){
    document.documentElement.style.setProperty('--auction-leader-color', auctionLeaderColor);
}

function bidOnProperty(){
    for (let i = 0; i < totalPlayers; i++){
        if (auctionLeaderColor === activePlayers[i].colorBid){
            bidLeader = activePlayers[i].name
            auctioneerText.innerHTML = `<span class="auction-leader-color-span">${bidLeader} </span>is now the highest bidder!`
        }
    }
    noBidsGoingOnce = setTimeout(goingOnceBidOnProperty, 3000)
}

function goingOnceBidOnProperty(){
    auctioneerText.innerHTML = `<span class="auction-leader-color-span">${bidLeader}</span> buying ${spaceLandedOn().name} for <span class="auction-leader-color-span">$${currentAuctionBid}</span> going once!`
    noBidsGoingTwice = setTimeout(goingTwiceBidOnProperty, 3000)
}

function goingTwiceBidOnProperty(){
    auctioneerText.innerHTML = `<span class="auction-leader-color-span">${bidLeader}</span> buying ${spaceLandedOn().name} for <span class="auction-leader-color-span">$${currentAuctionBid}</span> going twice!!`
    noBidsFinal = setTimeout(auctionPropertySoldMessage, 4000)
}

function auctionPropertySoldMessage(){
    for (let i = 0; i < totalPlayers; i++){
        if (activePlayers[i].isBankrupt === false){
            activePlayers[i].auctionButtons = []
            playerAuctionContainers[i].buttonId.innerHTML = ""
        }
    }
    auctioneerText.innerHTML = `${spaceLandedOn().name} sold to <span class="auction-leader-color-span">${bidLeader}</span> for <span class="auction-leader-color-span">$${currentAuctionBid}</span>!`
    auctionResult = setTimeout(auctionWonResult, 4000)
}

function auctionWonResult(){
    removeAuctionScreen()
    spanBid.innerText = "$0"
    spanBid.style.color = "black"
    auctioneerText.innerHTML = `Start the bidding!`
    removePropertyCard('auctionCardId')

    for (let i = 0; i < totalPlayers; i++){
        if (auctionLeaderColor === activePlayers[i].colorBid){
            activePlayers[i].properties.push(spaceLandedOn())
            spaceLandedOn().owner = activePlayers[i]
            spaceLandedOn().hasOwner = true
            activePlayers[i].cash -= currentAuctionBid
            updatePlayerCashTotalDisplay()
            document.getElementById(spaceLandedOn().id).style.backgroundColor = activePlayers[i].colorLight;
            updateRent(activePlayers[i])
        }
    }
    currentAuctionBid = 0
}

function checkPlayerCanAffordAuctionButtonValue(){
    for (let i = 0; i < totalPlayers; i++){
        for (let j = 0; j < 6; j++){
            if (activePlayers[i].isBankrupt === false && parseInt(activePlayers[i].auctionButtons[j].innerText) + currentAuctionBid > activePlayers[i].cash){
                activePlayers[i].auctionButtons[j].classList.add('auction-button-inactive')
                activePlayers[i].auctionButtons[j].classList.add('disable-clicks')
                activePlayers[i].auctionButtons[j].style.backgroundColor = activePlayers[i].colorLight
            }
        }
    }
}

function addAuctionScreen(){
    document.getElementById('floatScreenGameId').classList.remove('float-screen-game')
    document.getElementById('floatScreenGameId').classList.add('hidden')
    document.getElementById('auctionScreenContainerId').classList.add('auction-screen-container')
    document.getElementById('auctionScreenContainerId').classList.remove('hidden')
}

function removeAuctionScreen(){
    document.getElementById('auctionScreenContainerId').classList.remove('auction-screen-container')
    document.getElementById('auctionScreenContainerId').classList.add('hidden')
    document.getElementById('floatScreenGameId').classList.add('float-screen-game')
    document.getElementById('floatScreenGameId').classList.remove('hidden')
}

//Pay Rent / Bankrupt
//Pay Rent / Bankrupt

function addPayRentContainer(){
    //Add rent container and prompt user to pay or sell based on existing cash availible
    document.getElementById('payRentContainerId').classList.add('pay-rent-container')
    document.getElementById('payRentContainerId').classList.remove('hidden')
    if ((currentPlayerTurn.cash - spaceLandedOn().rent) < 0){
        payRentBtn.classList.add('button-inactive')
        payRentBtn.disabled = true
        document.getElementById('payRentTutorialId').innerHTML = `You do not have enough cash to pay rent.  Click the "Sell" button to sell houses, mortgage property, or click "Bankrupt" to quit game.`
        sellToPayRentBtn.classList.remove('button-inactive')
        sellToPayRentBtn.disabled = false
    }
    else {
        sellToPayRentBtn.classList.add('button-inactive')
        sellToPayRentBtn.disabled = true
        document.getElementById('payRentTutorialId').innerHTML = `Pay rent or click "Bankrupt" to quit the game.`
        payRentBtn.classList.remove('button-inactive')
        payRentBtn.disabled = false
    }
}

function removePayRentContainer(){
    document.getElementById('payRentContainerId').classList.add('hidden')
    document.getElementById('payRentContainerId').classList.remove('pay-rent-container')
    payRentBtn.classList.remove('button-inactive')
    payRentBtn.disabled = false
}

payRentBtn.addEventListener('click', function (e){
    currentPlayerTurn.cash -= spaceLandedOn().rent
    spaceLandedOn().owner.cash += spaceLandedOn().rent
    addEndTurnButton()
    removePayRentContainer()
    updatePlayerCashTotalDisplay()

    if (document.getElementById('propertyCardId').classList.contains('hidden') === false){
        removePropertyCard('propertyCardId')
    }
    addHouseHotelMortgageScreen()
    removePayRentTutorial()
    addEndTurnButton()
})

sellToPayRentBtn.addEventListener('click', function(e){
    removePropertyCard('propertyCardId')
    addHouseHotelMortgageScreen()
    removePayRentContainer()
    removeTradeButton()
    document.getElementById('payRentTutorialId').innerHTML = `Sell houses or open mortgage to pay rent.  Click "finish" to pay rent.`
})

function addPayRentTutorial(){
    document.getElementById('payRentTutorialId').classList.add('pay-rent-tutorial')
    document.getElementById('payRentTutorialId').classList.remove('hidden')
}

function removePayRentTutorial(){
    document.getElementById('payRentTutorialId').classList.add('hidden')
    document.getElementById('payRentTutorialId').classList.remove('pay-rent-tutorial')
}

bankruptBtn.addEventListener('click', function(){
    removePropertyCard('propertyCardId')
    addBankruptWarning()
    removePayRentTutorial()
    removePayRentContainer()
    removeHouseHotelMortgageScreen()
    document.getElementById('bankruptWarningTextId').innerHTML = `Pressing "Yes" will remove you from the game and give all your cash and properties to ${spaceLandedOn().owner.name}`
})

bankruptYesBtn.addEventListener('click', function(){
    bankrupt()
})

bankruptNoBtn.addEventListener('click', function(){
    addPayRentContainer()
    addPayRentTutorial()
    removeBankruptWarning()
})

function addBankruptWarning(){
    document.getElementById('bankruptWarningContainerId').classList.add('bankrupt-warning-container')
    document.getElementById('bankruptWarningContainerId').classList.remove('hidden')
}

function removeBankruptWarning(){
    document.getElementById('bankruptWarningContainerId').classList.remove('bankrupt-warning-container')
    document.getElementById('bankruptWarningContainerId').classList.add('hidden')
}

function bankrupt(){
    removeInformBankruptScreen()
    removeBankruptWarning()
    spaceLandedOn().currentOccupants--
    playerPiece().remove()
    let playerOwed = spaceLandedOn().owner
    let playerBankrupt = currentPlayerTurn
    playerBankrupt.isBankrupt = true
    playerOwed.cash += playerBankrupt.cash
    playerBankrupt.cash = 0
    playerOwed.housesOwned += playerBankrupt.housesOwned
    playerOwed.hotelsOwned += playerBankrupt.hotelsOwned
    updatePlayerCashTotalDisplay()
    //Change owner of property and move to owed players property array
    playerBankrupt.properties.forEach(property => {
        playerOwed.properties.push(property)
        property.owner = playerOwed
        document.getElementById(property.id).style.backgroundColor = playerOwed.colorLight
        
    })
    //End game if only 1 player remaining
    let bankruptPlayers = 0
    for (let i = 0; i < totalPlayers; i++){
        if (activePlayers[i].isBankrupt === true){
            bankruptPlayers++
        }
        if (bankruptPlayers === totalPlayers - 1){
            gameOver()
            return
        }
        
    }
    endTurn()
}

function gameOver(){
    for (let i = 0; i < totalPlayers; i++){
        if (activePlayers[i].isBankrupt === false){
            gameWinner = activePlayers[i].name
        }
    }
    document.getElementById('floatScreenGameId').classList.remove('float-screen-game')
    document.getElementById('floatScreenGameId').classList.add('hidden')
    document.getElementById('gameOverScreenId').classList.add('game-over-screen')
    document.getElementById('gameOverScreenId').classList.remove('hidden') 
    document.getElementById('gameOverText').innerHTML = `<span class="enlarge-font-span">Game Over</span><br>${gameWinner} may have lost a friend or two, but they have won the game of Monopoly `  
}

function informBankrupt(){
    removePayRentContainer()
    removeHouseHotelMortgageScreen()
    addInformBankruptScreen()
    document.getElementById('goodbyeTextId').innerHTML = `You do not have enough assets to pay off your debt.  This is your end.`
}

goodbyeBtn.addEventListener('click', function(){
    bankrupt()
})

function addInformBankruptScreen(){
    document.getElementById('bankruptGoodbyeContainer').classList.add('bankrupt-inform-container')
    document.getElementById('bankruptGoodbyeContainer').classList.remove('hidden')
}

function removeInformBankruptScreen(){
    document.getElementById('bankruptGoodbyeContainer').classList.add('hidden')
    document.getElementById('bankruptGoodbyeContainer').classList.remove('bankrupt-inform-container')
}

//Jail Functions
//Jail Functions

function goToJail (){
    removeHouseHotelMortgageScreen()
    spaceLandedOn().currentOccupants--
    currentPlayerTurn.doublesCounter = 0
    playerPiece().remove()
    currentPlayerTurn.position = 40
    placePiece(currentPlayerTurn)
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
    diceTwoValue = rollDiceTwo()
    diceOneValue = rollDiceOne()
    displayJailRollOutput(diceOneValue, diceTwoValue)
    if (diceOneValue === diceTwoValue){
        hasRolled = true
        currentPlayerTurn.doublesCounter = 1
        currentPlayerTurn.jailRollAttempts = 3
        currentPlayerTurn.isInJail = false
        playerPiece().remove()
        spaceLandedOn() = (propertyArray[currentPlayerTurn.position])
        spaceLandedOn().currentOccupants--
        currentPlayerTurn.position = (diceOneValue + diceTwoValue + 10)
        placePiece(currentPlayerTurn)
        removeHouseHotelMortgageScreen()
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
    spaceLandedOn().currentOccupants--
    playerPiece().remove()
    currentPlayerTurn.position = 10
    placePiece(currentPlayerTurn)
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

function updateRent(player){
    if (spaceLandedOn().type === "color"){
        updateRentColor(player)
    }
    else if (spaceLandedOn().type === "railroad"){
        updateRentRailroad(player)
    }
    else if (spaceLandedOn().type === "utility" ){
        updateRentUtility(player)
    }
}

function updateRentColor(player){
    ownedPropertyArray = []
    generatePlayerPropertyArray(player)
    let sameColorProperties = []
    //Filter for same color properties as last bought property
    sameColorProperties = ownedPropertyArray.filter(function(property){return property.color === spaceLandedOn().color})
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

function updateRentRailroad(player){
    ownedPropertyArray = []
    generatePlayerPropertyArray(player)
    let railroadProperties = []
    //Filter for railroads
    railroadProperties = ownedPropertyArray.filter(function(property){return property.type === spaceLandedOn().type})
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

function updateRentUtility(player){
    ownedPropertyArray = []
    generatePlayerPropertyArray(player)
    let utilityProperties = []
    //Filter for utilities
    utilityProperties = ownedPropertyArray.filter(function(property){return property.type === spaceLandedOn().type})
    utilityProperties.forEach(utility =>{
        if (utilityProperties.length === 1){
            utility.updateRent = function() {
                utility.rent = 0
                utility.rent += (diceOneValue + diceTwoValue) * 4
                }
        }

        else if (utilityProperties.length === 2){
            utility.updateRent = function() {
                utility.rent = 0
                utility.rent += (diceOneValue + diceTwoValue) * 10
                }        
        }
    })
}

function generatePlayerPropertyArray(player){
    ownedPropertyArray = []

    for (let i = 0; i < 40; i++){
        if (propertyArray[i].owner === player){
            ownedPropertyArray.push(propertyArray[i])
        }
    }
}

function generatePlayerColorPropertyArray(){
    ownedColorPropertyArray = []

    for (let i = 0; i < 40; i++){
        if (propertyArray[i].owner === currentPlayerTurn && propertyArray[i].type === 'color'){
            ownedColorPropertyArray.push(propertyArray[i])
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

 function addHouseHotelBuyClassBasedOnLocationAllProperties(sortedPropertyArray, action, houseLimit){
    for (let i = 0; i < sortedPropertyArray.length; i++){
        if(sortedPropertyArray[i].totalHouses < houseLimit){
            if(sortedPropertyArray[i].number > 0 && sortedPropertyArray[i].number < 10){
                document.getElementById(sortedPropertyArray[i].id).classList.add(`can-${action}-house-bottom`)
            }
            else if(sortedPropertyArray[i].number > 10 && sortedPropertyArray[i].number < 20){
                document.getElementById(sortedPropertyArray[i].id).classList.add(`can-${action}-house-left`)
            }
            else if(sortedPropertyArray[i].number > 20 && sortedPropertyArray[i].number < 30){
                document.getElementById(sortedPropertyArray[i].id).classList.add(`can-${action}-house-top`)
            }
            else if(sortedPropertyArray[i].number > 30 && sortedPropertyArray[i].number < 40){
                document.getElementById(sortedPropertyArray[i].id).classList.add(`can-${action}-house-right`)
            }
        }
    }

}

function addHouseHotelSellClassBasedOnLocationAllProperties(sortedPropertyArray, action, houseMinimum){
    for (let i = 0; i < sortedPropertyArray.length; i++){
        if(sortedPropertyArray[i].totalHouses > houseMinimum){
            if(sortedPropertyArray[i].number > 0 && sortedPropertyArray[i].number < 10){
                document.getElementById(sortedPropertyArray[i].id).classList.add(`can-${action}-house-bottom`)
            }
            else if(sortedPropertyArray[i].number > 10 && sortedPropertyArray[i].number < 20){
                document.getElementById(sortedPropertyArray[i].id).classList.add(`can-${action}-house-left`)
            }
            else if(sortedPropertyArray[i].number > 20 && sortedPropertyArray[i].number < 30){
                document.getElementById(sortedPropertyArray[i].id).classList.add(`can-${action}-house-top`)
            }
            else if(sortedPropertyArray[i].number > 30 && sortedPropertyArray[i].number < 40){
                document.getElementById(sortedPropertyArray[i].id).classList.add(`can-${action}-house-right`)
            }
        }
    }

}

function removeHouseHotelClassBasedOnLocationAllProperties(sortedPropertyArray, action){
    for (let i = 0; i < sortedPropertyArray.length; i++){
        if(sortedPropertyArray[i].number > 0 && sortedPropertyArray[i].number < 10){
            document.getElementById(sortedPropertyArray[i].id).classList.remove(`can-${action}-house-bottom`)
        }
        else if(sortedPropertyArray[i].number > 10 && sortedPropertyArray[i].number < 20){
            document.getElementById(sortedPropertyArray[i].id).classList.remove(`can-${action}-house-left`)
        }
        else if(sortedPropertyArray[i].number > 20 && sortedPropertyArray[i].number < 30){
            document.getElementById(sortedPropertyArray[i].id).classList.remove(`can-${action}-house-top`)
        }
        else if(sortedPropertyArray[i].number > 30 && sortedPropertyArray[i].number < 40){
            document.getElementById(sortedPropertyArray[i].id).classList.remove(`can-${action}-house-right`)
        }
    }
}

function removeHouseHotelClassBasedOnLocationSingleProperty(action, propertyToChange){
        if(propertyToChange.number > 0 && propertyToChange.number < 10){
            document.getElementById(propertyToChange.id).classList.remove(`can-${action}-house-bottom`)
        }
        else if(propertyToChange.number > 10 && propertyToChange.number < 20){
            document.getElementById(propertyToChange.id).classList.remove(`can-${action}-house-left`)
        }
        else if(propertyToChange.number > 20 && propertyToChange.number < 30){
            document.getElementById(propertyToChange.id).classList.remove(`can-${action}-house-top`)
        }
        else if(propertyToChange.number > 30 && propertyToChange.number < 40){
            document.getElementById(propertyToChange.id).classList.remove(`can-${action}-house-right`)
        }
}

//Buy House Functions
//Buy House Functions


buyHouseHotelBtn.addEventListener('click', function(e){
    removeDice()
    generatePlayerColorPropertyArray()
    removeHouseHotelMortgageScreen()
    removeEndTurnButton()
    addFinishBuyHouseBtn()
    addBuyHouseTutorial()
    canBuyHouseHotelArray = []

    //Sort owned property into array of full color set based on number of properties needed to make full set
    for (let i = 0; i < ownedColorPropertyArray.length;){
        if (ownedColorPropertyArray[i].type === 'color' && ownedColorPropertyArray[i].setTotal === 2 && (i + 1) < ownedColorPropertyArray.length){
                if(ownedColorPropertyArray[i].color === ownedColorPropertyArray[i+1].color){
                    canBuyHouseHotelArray.push(ownedColorPropertyArray[i])
                    canBuyHouseHotelArray.push(ownedColorPropertyArray[i+1])
                    i += 2
                } 
                else{
                    i++
                }        
        }
        else if(ownedColorPropertyArray[i].type === 'color' && ownedColorPropertyArray[i].setTotal === 3 && (i + 2) < ownedColorPropertyArray.length){
            if (ownedColorPropertyArray[i].color === ownedColorPropertyArray[i+1].color && ownedColorPropertyArray[i].color === ownedColorPropertyArray[i+2].color){
                canBuyHouseHotelArray.push(ownedColorPropertyArray[i])
                canBuyHouseHotelArray.push(ownedColorPropertyArray[i+1])
                canBuyHouseHotelArray.push(ownedColorPropertyArray[i+2])
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

    addHouseHotelBuyClassBasedOnLocationAllProperties(canBuyHouseHotelArray, 'buy', 5)
    
    //Create clickable property to build houses on for properties with less than 5 houses
    canBuyHouseHotelArray.forEach(property =>{
        let clickableProperty = document.getElementById(property.id)
        if (property.totalHouses < 5){
            clickableProperty.classList.add('can-buy-house')
            clickableProperty.addEventListener('click', buyHousePropertySpace) 
        }

        //Function for property spaces that are eligible to build houses
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
                if (canBuyHouseHotelArray[i].totalHouses < 5){
                    document.getElementById(canBuyHouseHotelArray[i].id).classList.add('disable-clicks')
                    document.getElementById(canBuyHouseHotelArray[i].id).classList.remove('can-buy-house')
                }
            }
        }

        //Yes button function
        function buyHouseYesBtnOutcome(){
            //Restore function and class indicators to add houses to eligible properties
            for (let i = 0; i < canBuyHouseHotelArray.length; i++){
                if (canBuyHouseHotelArray[i].totalHouses < 5){
                    document.getElementById(canBuyHouseHotelArray[i].id).classList.remove('disable-clicks')
                    document.getElementById(canBuyHouseHotelArray[i].id).classList.add('can-buy-house')
                }
            }
            if(property.totalHouses < 4){
                currentPlayerTurn.housesOwned++
            }
            else{
                currentPlayerTurn.hotelsOwned++
                currentPlayerTurn.housesOwned -= 4
                clickableProperty.removeEventListener('click', buyHousePropertySpace)
                clickableProperty.classList.remove('can-buy-house')
                removeHouseHotelClassBasedOnLocationSingleProperty('buy', property)
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
            removeHouseHotelClassBasedOnLocationAllProperties(canBuyHouseHotelArray, 'buy')   
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

function checkRentPaid(){
    //Return user to pay rent screen
    if (document.getElementById('payRentTutorialId').classList.contains('hidden') === false){
        addPayRentContainer()
        removeHouseHotelMortgageScreen()
        addTradeButton()
    }
}

function checkIfBuyingProperty(){
    if (!buyPropertySellBtn.classList.contains('hidden')){
        removeEndTurnButton()
        removeHouseHotelMortgageScreen()
        addPropertyBuySellAuctionButtons()
        addPropertyCard('propertyCardId')
        addTradeButton()
    }
}

finishBuyHouseBtn.addEventListener('click', function(e){ 
    addHouseHotelMortgageScreen()
    removeBuyHouseTutorial()
    removeFinishBuyHouseBtn()
    addEndTurnButton()
        //Prevent user from skipping turn
        if (hasRolled === false){
            removeEndTurnButton()
            addDice()
        }
        //Prevent user from ending turn before paying rent
        if(document.getElementById('payRentTutorialId').classList.contains('hidden') === false){
            removeEndTurnButton()
        }
        checkRentPaid()
        checkIfBuyingProperty()
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

function removeTradeButton(){
    tradeBtn.classList.add('hidden')
    tradeBtn.classList.remove('trade-button')
}

function addTradeButton(){
    tradeBtn.classList.add('trade-button')
    tradeBtn.classList.remove('hidden')
}


//Sell House Functions
//Sell House Functions


sellHouseHotelBtn.addEventListener('click', function(e){
    removeDice()
    generatePlayerPropertyArray(currentPlayerTurn)
    removeHouseHotelMortgageScreen()
    removeEndTurnButton()
    addFinishSellHouseHotelBtn()
    addSellHouseHotelTutorial()
    canSellHouseHotelArray = []

    //Sort owned property into array of full color set matches
    for (let i = 0; i < ownedColorPropertyArray.length;){
        if (ownedColorPropertyArray[i].type === 'color' && ownedColorPropertyArray[i].setTotal === 2 && (i + 1) < ownedColorPropertyArray.length){
                if(ownedColorPropertyArray[i].color === ownedColorPropertyArray[i+1].color){
                    canSellHouseHotelArray.push(ownedColorPropertyArray[i])
                    canSellHouseHotelArray.push(ownedColorPropertyArray[i+1])
                    i += 2
                } 
                else{
                    i++
                }        
        }
        else if(ownedColorPropertyArray[i].type === 'color' && ownedColorPropertyArray[i].setTotal === 3 && (i + 2) < ownedColorPropertyArray.length){
            if (ownedColorPropertyArray[i].color === ownedColorPropertyArray[i+1].color && ownedColorPropertyArray[i].color === ownedColorPropertyArray[i+2].color){
                canSellHouseHotelArray.push(ownedColorPropertyArray[i])
                canSellHouseHotelArray.push(ownedColorPropertyArray[i+1])
                canSellHouseHotelArray.push(ownedColorPropertyArray[i+2])
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
    addHouseHotelSellClassBasedOnLocationAllProperties(canSellHouseHotelArray, 'sell', 0)

    //Function for property spaces that are eilible to sell houses
    canSellHouseHotelArray.forEach(property =>{
        let clickableProperty = document.getElementById(property.id)
        if (property.totalHouses > 0){
            clickableProperty.classList.add('can-sell-house')
            clickableProperty.addEventListener('click', sellHouseHotelPropertySpace)     
        }
        
        //Create clickable property to sell houses
        function sellHouseHotelPropertySpace (){
            if(property.totalHouses <= 4 && property.totalHouses > 0){
                document.getElementById('sellHouseHotelLabel').innerHTML = `Would you like to sell a house on ${property.name} for $${(Math.floor(property.buildingCost / 2))}?`        
            }
            else if (property.totalHouses === 5){
                document.getElementById('sellHouseHotelLabel').innerHTML = `Would you like to sell a hotel on ${property.name} for $${Math.floor((property.buildingCost / 2))}?`  
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
                if (canSellHouseHotelArray > 0){
                    document.getElementById(canSellHouseHotelArray[i].id).classList.add('disable-clicks')
                    document.getElementById(canSellHouseHotelArray[i].id).classList.remove('can-sell-house')
                }
            }
        }

        //Yes button function
        function sellHouseHotelYesBtnOutcome(){
            //Restore function and class indicators to add houses to eligible properties
            for (let i = 0; i < canSellHouseHotelArray.length; i++){
                if (canSellHouseHotelArray[i].totalHouses > 0){
                    document.getElementById(canSellHouseHotelArray[i].id).classList.remove('disable-clicks')
                    document.getElementById(canSellHouseHotelArray[i].id).classList.add('can-sell-house')
                }              
            }
            removeHouseHotel(property)
            if(property.totalHouses < 4){
                currentPlayerTurn.housesOwned--
                property.totalHouses--
                if(property.totalHouses === 0){
                    clickableProperty.classList.remove('can-sell-house')
                    clickableProperty.removeEventListener('click', sellHouseHotelPropertySpace)
                    removeHouseHotelClassBasedOnLocationSingleProperty('sell', property)
                }
            }
        
            else{
                currentPlayerTurn.housesOwned += 4
                currentPlayerTurn.hotelsOwned--
                property.totalHouses--
            }
            currentPlayerTurn.cash += (Math.floor(property.buildingCost / 2))
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
            removeHouseHotelClassBasedOnLocationAllProperties(canSellHouseHotelArray, 'sell')   
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
    //Prevent user from ending turn before paying rent
    if(document.getElementById('payRentTutorialId').classList.contains('hidden') === false){
        removeEndTurnButton()
    }
    checkRentPaid()
    checkIfBuyingProperty()
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

function addMortgageClassBasedOnLocationAllProperties(sortedPropertyArray, action){
    for (let i = 0; i < sortedPropertyArray.length; i++){
        if(sortedPropertyArray[i].number > 0 && sortedPropertyArray[i].number < 10){
            document.getElementById(sortedPropertyArray[i].id).classList.add(`can-${action}-mortgage-bottom`)
        }
        else if(sortedPropertyArray[i].number > 10 && sortedPropertyArray[i].number < 20){
            document.getElementById(sortedPropertyArray[i].id).classList.add(`can-${action}-mortgage-left`)
        }
        else if(sortedPropertyArray[i].number > 20 && sortedPropertyArray[i].number < 30){
            document.getElementById(sortedPropertyArray[i].id).classList.add(`can-${action}-mortgage-top`)
        }
        else if(sortedPropertyArray[i].number > 30 && sortedPropertyArray[i].number < 40){
            document.getElementById(sortedPropertyArray[i].id).classList.add(`can-${action}-mortgage-right`)
        }
    }
}

function removeMortgageClassBasedOnLocationAllProperties(sortedPropertyArray, action){
    for (let i = 0; i < sortedPropertyArray.length; i++){
        if(sortedPropertyArray[i].number > 0 && sortedPropertyArray[i].number < 10){
            document.getElementById(sortedPropertyArray[i].id).classList.remove(`can-${action}-mortgage-bottom`)
        }
        else if(sortedPropertyArray[i].number > 10 && sortedPropertyArray[i].number < 20){
            document.getElementById(sortedPropertyArray[i].id).classList.remove(`can-${action}-mortgage-left`)
        }
        else if(sortedPropertyArray[i].number > 20 && sortedPropertyArray[i].number < 30){
            document.getElementById(sortedPropertyArray[i].id).classList.remove(`can-${action}-mortgage-top`)
        }
        else if(sortedPropertyArray[i].number > 30 && sortedPropertyArray[i].number < 40){
            document.getElementById(sortedPropertyArray[i].id).classList.remove(`can-${action}-mortgage-right`)
        }
    }
}

function removeMortgageClassBasedOnLocationSingleProperty(action, propertyToChange){
        if(propertyToChange.number > 0 && propertyToChange.number < 10){
            document.getElementById(propertyToChange.id).classList.remove(`can-${action}-mortgage-bottom`)
        }
        else if(propertyToChange.number > 10 && propertyToChange.number < 20){
            document.getElementById(propertyToChange.id).classList.remove(`can-${action}-mortgage-left`)
        }
        else if(propertyToChange.number > 20 && propertyToChange.number < 30){
            document.getElementById(propertyToChange.id).classList.remove(`can-${action}-mortgage-top`)
        }
        else if(propertyToChange.number > 30 && propertyToChange.number < 40){
            document.getElementById(propertyToChange.id).classList.remove(`can-${action}-mortgage-right`)
        }
    }



//Open Mortgage Functions
//Open Mortgage Functions
openMortgageBtn.addEventListener('click', function (){
    removeDice()
    generatePlayerPropertyArray(currentPlayerTurn)
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
        //Add indicator to mortgagable properties based on location
        addMortgageClassBasedOnLocationAllProperties(canOpenMortgageArray, 'open')
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
                //Prevent classes being added back to closed mortgage property after closing multiple mortgage                
                if(canOpenMortgageArray[i].mortgageOpen === false){
                    document.getElementById(canOpenMortgageArray[i].id).classList.add('disable-clicks')
                    document.getElementById(canOpenMortgageArray[i].id).classList.remove('can-open-mortgage')
                }

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
            removeMortgageClassBasedOnLocationSingleProperty('open', property)
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
            //Remove classes for rest of properties based on location
            removeMortgageClassBasedOnLocationAllProperties(canOpenMortgageArray, 'open')
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
     //Prevent user from ending turn before paying rent
     if(document.getElementById('payRentTutorialId').classList.contains('hidden') === false){
         removeEndTurnButton()
     }
     checkRentPaid()
     checkIfBuyingProperty()
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
    generatePlayerPropertyArray(currentPlayerTurn)
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
                //Add indicator to mortgagable properties based on location
                addMortgageClassBasedOnLocationAllProperties(canCloseMortgageArray, 'close')
    }
        //Create clickable property to close mortgage
        canCloseMortgageArray.forEach(property =>{
        let clickableProperty = document.getElementById(property.id)
        clickableProperty.addEventListener('click', closeMortgagePropertySpace) 

        //Choose property to close mortgage
        function closeMortgagePropertySpace (){
            document.getElementById('closeMortgageLabel').innerHTML = `Would you like to close mortgage for ${property.name} for $${Math.floor((property.mortgage * 1.1))}?`
            removeCloseMortgageTutorial()
            addCloseMortgageYesNoButtons()
            closeMortgageYesBtn.addEventListener('click', closeMortgageYesBtnOutcome)
            closeMortgageNoBtn.addEventListener('click', closeMortgageNoBtnOutcome) 
            removeFinishCloseMortgageBtn()
            //Prevent user from clicking multiple properties
            for (let i = 0; i < canCloseMortgageArray.length; i++){
                //Prevent classes being added back to closed mortgage property after closing multiple mortgage
                if (canCloseMortgageArray[i].mortgageOpen === true){
                    document.getElementById(canCloseMortgageArray[i].id).classList.add('disable-clicks')
                    document.getElementById(canCloseMortgageArray[i].id).classList.remove('can-close-mortgage')
                }
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
            currentPlayerTurn.cash -= (Math.floor(property.mortgage * 1.1)) 
            updatePlayerCashTotalDisplay()
            removeCloseMortgageYesNoButtons()
            addCloseMortgageTutorial()
            clickableProperty.classList.remove('mortgaged')
            clickableProperty.classList.remove('can-close-mortgage')
            clickableProperty.classList.remove('disable-clicks')
            removeMortgageClassBasedOnLocationSingleProperty('close', property)
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
          //Remove classes for rest of properties based on location
          removeMortgageClassBasedOnLocationAllProperties(canCloseMortgageArray, 'close')
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
    //Prevent user from ending turn before paying rent
    if(document.getElementById('payRentTutorialId').classList.contains('hidden') === false){
        removeEndTurnButton()
    }
    checkRentPaid()
    checkIfBuyingProperty()
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

// Trade

tradeBtn.addEventListener('click', clickTradeBtn)
tradeOfferBtn.addEventListener('click', clickTradeOfferBtn)
tradeCancelBtn.addEventListener('click', clickTradeCancelBtn)
tradeAcceptBtn.addEventListener('click', clickTradeAcceptBtn)
tradeDeclineBtn.addEventListener('click', clickTradeDeclineBtn)

function clickTradeBtn(){
    trader = currentPlayerTurn
    addTradeScreen()
    addPotentialTradeParterButtons()
    traderNametag.innerText = `${trader.name} - $${trader.cash}`
    traderNametag.style.color = `${trader.colorDark}`
    tradeScreenTutorial.innerText = "Who Would You Like to Trade With?"
}

function clickTradeOfferBtn(){
    addAcceptDeclineButtonsContainer()
    removeTraderOfferButton()
    traderContents.classList.add('green-border')
}

function clickTradeCancelBtn(){
    removeTradeScreen()
    resetPotentialTradeParterButtons()
    addPotentialTradeButtons()
    removePlayerTradeContents()
    removeCashInputContainers()
    removeAcceptDeclineButtonsContainer()
    removeTraderOfferButton()
    tradeeNametag.innerText = ""
    traderPropertyDropoffContainer.innerHTML = ""
    tradeePropertyDropoffContainer.innerHTML = ""
}

function clickTradeAcceptBtn(){

}

function clickTradeDeclineBtn(){

}



function addTradeItem(propertyName, screenAdded){
    let tradeCard = document.createElement('div')
    let tradeContents = document.createElement('div')

    tradeCard.classList.add('trade-property-card')
    tradeContents.classList.add('trade-property-name')
    tradeContents.innerHTML = `${propertyName}`

    tradeCard.append(tradeContents)

    if (selectedTradeProperty.type === 'color'){
        tradeContents.style.borderTop =  `10px solid ${selectedTradeProperty.color}`
    }

    screenAdded.append(tradeCard)


} 

function addPotentialTradeParterButtons(){
    for (let i = 0; i < totalPlayers; i++){
        
        if (activePlayers[i] != trader){
            playerTradeButtons[i].classList.add('trade-partner-button')
            playerTradeButtons[i].classList.remove('hidden')
            playerTradeButtons[i].style.backgroundColor = activePlayers[i].colorDark
        }
    }
}

function resetPotentialTradeParterButtons(){
    for (let i = 0; i < totalPlayers; i++){   
        playerTradeButtons[i].classList.add('hidden')
        playerTradeButtons[i].classList.remove('trade-partner-button')
    }
}

function addTradeScreen(){
    document.getElementById('floatScreenGameId').classList.remove('float-screen-game')
    document.getElementById('floatScreenGameId').classList.add('hidden')
    document.getElementById('tradeScreenContainerId').classList.add('trade-screen-container')
    document.getElementById('tradeScreenContainerId').classList.remove('hidden')
}

function removeTradeScreen(){
    document.getElementById('tradeScreenContainerId').classList.add('hidden')
    document.getElementById('tradeScreenContainerId').classList.remove('trade-screen-container')
    document.getElementById('floatScreenGameId').classList.remove('hidden')
    document.getElementById('floatScreenGameId').classList.add('float-screen-game')
}

playerTradeButtons.forEach((button) => {
    button.addEventListener('click', function(){
        tradeeNametag.innerText = `${this.innerText}`
        tradeScreenTutorial.innerText = `Drag And Drop Properties In Container To Add Them To Trade.  To Add Cash, Enter Cash Amount And Click "Add" Button To Update Cash Offer`
        setTradeeVariable()
        removePotentialTradeButtons()
        addPlayerTradeContentsScreen()
        addTraderOfferButton()
        addCashInputContainers()
        tradeOfferBtn.addEventListener('click', clickTradeOfferBtn)
    })
}) 

function addPotentialTradeButtons(){
    potentailTradeButtons.classList.add('trade-screen-player-options')
    potentailTradeButtons.classList.remove('hidden')
}

function removePotentialTradeButtons(){
    potentailTradeButtons.classList.add('hidden')
    potentailTradeButtons.classList.remove('trade-screen-player-options')
}

function addPlayerTradeContentsScreen(){
    tradeeContents.classList.add('trade-screen-contents')
    tradeeContents.classList.remove('hidden')
    traderContents.classList.add('trade-screen-contents')
    traderContents.classList.remove('hidden')
}

function removePlayerTradeContents(){
    tradeeContents.classList.add('hidden')
    tradeeContents.classList.remove('trade-screen-contents')
    traderContents.classList.add('hidden')
    traderContents.classList.remove('trade-screen-contents')
}

function addEventsForPotentialTradeItems(){
    for (let i = 0; i < totalPlayers; i++){
        if (activePlayers[i] === trader){
            trader.properties.forEach((property) =>{
                let clickableProperty = document.getElementById(property.id)
                clickableProperty.draggable = true
                clickableProperty.classList.add('can-open-mortgage-bottom')
                clickableProperty.addEventListener('dragstart', setSelectedPropertyForTrader)
                clickableProperty.addEventListener('mouseover', addBorderForTraderContainer)
                clickableProperty.addEventListener('mouseout', removeBorderForTraderContainer)
            })
        }

        else if (activePlayers[i] === tradee){
            activePlayers[i].properties.forEach((property) =>{
                let clickableProperty = document.getElementById(property.id)
                clickableProperty.draggable = true
                clickableProperty.classList.add('can-open-mortgage-bottom')
                clickableProperty.addEventListener('dragstart', setSelectedPropertyForTradee)
                clickableProperty.addEventListener('mouseover', addBorderForTradeeContainer)
                clickableProperty.addEventListener('mouseout', removeBorderForTradeeContainer)
            })   
        }
    }
}

tradeePropertyDropoffContainer.addEventListener('dragover', function(event){
    if (selectedTradeProperty.owner === tradee){
        event.preventDefault()
    }
})

tradeePropertyDropoffContainer.addEventListener('drop', function(event){
    if (selectedTradeProperty.owner === tradee)
    addTradeItem(selectedTradeProperty.name, tradeePropertyDropoffContainer)
    removeEventListenersAndClassesTradeeSingleProperty(selectedTradeProperty)
    removeBorderForTradeeContainer()

})

traderPropertyDropoffContainer.addEventListener('dragover', function(event){
    if (selectedTradeProperty.owner === trader){
        event.preventDefault()
    }
})

traderPropertyDropoffContainer.addEventListener('drop', function(event){
    if (selectedTradeProperty.owner === trader)
    addTradeItem(selectedTradeProperty.name, traderPropertyDropoffContainer)
    removeEventListenersAndClassesTraderSingleProperty(selectedTradeProperty)
    removeBorderForTraderContainer()
})

function addBorderForTraderContainer(){
    traderPropertyDropoffContainer.classList.add('green-border')
}

function removeBorderForTraderContainer(){
    traderPropertyDropoffContainer.classList.remove('green-border')
}

function addBorderForTradeeContainer(){
    tradeePropertyDropoffContainer.classList.add('green-border')
}

function removeBorderForTradeeContainer(){
    tradeePropertyDropoffContainer.classList.remove('green-border')
}

function setSelectedPropertyForTrader(event){
    for (let i = 0; i < trader.properties.length; i++){
        if (trader.properties[i].id === event.target.id){
            selectedTradeProperty = trader.properties[i]
        }
    }
}

function setSelectedPropertyForTradee(event){
    for (let i = 0; i < tradee.properties.length; i++){
        if (tradee.properties[i].id === event.target.id){
            selectedTradeProperty = tradee.properties[i]
        }
    }
}

function setTradeeVariable(){
    for (let i = 0; i < totalPlayers; i++){
        if (tradeeNametag.innerText === activePlayers[i].name){
            tradee = activePlayers[i]
        }
    }
        tradeeNametag.style.color = `${tradee.colorDark}`
        tradeeNametag.innerText = `${tradee.name} - $${tradee.cash}`
        addEventsForPotentialTradeItems()
}

function addTraderOfferButton(){
    tradeOfferBtn.classList.add('trade-offer-decline-buttons')
    tradeOfferBtn.classList.remove('hidden')
}

function removeTraderOfferButton(){
    tradeOfferBtn.classList.add('hidden')
    tradeOfferBtn.classList.remove('trade-offer-decline-buttons')
}

function addAcceptDeclineButtonsContainer(){
    acceptDeclineButtonsContainer.classList.add('accept-decline-trade-container')
    acceptDeclineButtonsContainer.classList.remove('hidden')
}

function removeAcceptDeclineButtonsContainer(){
    acceptDeclineButtonsContainer.classList.add('hidden')
    acceptDeclineButtonsContainer.classList.remove('accept-decline-trade-container')
}

function addCashInputContainers(){
    traderCashInputContainer.classList.add('cash-input-container')
    traderCashInputContainer.classList.remove('hidden')

    tradeeCashInputContainer.classList.add('cash-input-container')
    tradeeCashInputContainer.classList.remove('hidden')
}

function removeCashInputContainers(){
    traderCashInputContainer.classList.add('hidden')
    traderCashInputContainer.classList.remove('cash-input-container')

    tradeeCashInputContainer.classList.add('hidden')
    tradeeCashInputContainer.classList.remove('cash-input-container')
}

function removeEventListenersAndClassesTraderAllProperties(){
    traderEligibleTradeProperties.forEach((property) => {
        let clickableProperty = property.id
        clickableProperty.removeEventListener('dragstart', setSelectedPropertyForTrader)
        clickableProperty.removeEventListener('mouseover', addBorderForTraderContainer)
        clickableProperty.removeEventListener('mouseout', removeBorderForTraderContainer)
        clickableProperty.draggable = false
        clickableProperty.classList.add('can-open-mortgage-bottom')

    })
}

function removeEventListenersAndClassesTraderSingleProperty(singleProperty){
    let property = document.getElementById(singleProperty.id)
    property.removeEventListener('dragstart', setSelectedPropertyForTrader)
    property.removeEventListener('mouseover', addBorderForTraderContainer)
    property.removeEventListener('mouseout', removeBorderForTraderContainer)
    property.draggable = false
    property.classList.remove('can-open-mortgage-bottom')
}

function removeEventListenersAndClassesTradeeAllProperties(){
    tradeeEligibleTradeProperties.forEach((property) =>{
        let clickableProperty = document.getElementById(property.id)
        clickableProperty.removeEventListener('dragstart', setSelectedPropertyForTradee)
        clickableProperty.removeEventListener('mouseover', addBorderForTradeeContainer)
        clickableProperty.removeEventListener('mouseout', removeBorderForTradeeContainer)
        clickableProperty.draggable = false
        clickableProperty.classList.add('can-open-mortgage-bottom')
    })
}

function removeEventListenersAndClassesTradeeSingleProperty(singleProperty){
    property = document.getElementById(singleProperty.id)
    property.removeEventListener('dragstart', setSelectedPropertyForTradee)
    property.removeEventListener('mouseover', addBorderForTradeeContainer)
    property.removeEventListener('mouseout', removeBorderForTradeeContainer)
    property.draggable = false
    property.classList.remove('can-open-mortgage-bottom')
}

function addClassesToTradeProperties(propertyToAddClass){
    if(propertyToAddClass.number > 0 && propertyToAddClass.number < 10){

    }
    else if(propertyToAddClass.number > 0 && propertyToAddClass.number < 10){

    }
    else if(propertyToAddClass.number > 0 && propertyToAddClass.number < 10){

    }
    else if(propertyToAddClass.number > 0 && propertyToAddClass.number < 10){

    }
}


//Add logic to bakrupt player if they land on non-owned property square but don't have assets to pay for it
//Add trading window
//Add cpu
//Houses only able to be bought 1 per property until even
//Can only mortgage if no buildings on property
