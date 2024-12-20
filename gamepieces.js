//Game Pieces
const catPiece = '<div class="game-pieces" id="catPieceId"><svg class = "svg-game-pieces" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#000000" d="M320 192l17.1 0c22.1 38.3 63.5 64 110.9 64c11 0 21.8-1.4 32-4l0 4 0 32 0 192c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-140.8L280 448l56 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-144 0c-53 0-96-43-96-96l0-223.5c0-16.1-12-29.8-28-31.8l-7.9-1c-17.5-2.2-30-18.2-27.8-35.7s18.2-30 35.7-27.8l7.9 1c48 6 84.1 46.8 84.1 95.3l0 85.3c34.4-51.7 93.2-85.8 160-85.8zm160 26.5s0 0 0 0c-10 3.5-20.8 5.5-32 5.5c-28.4 0-54-12.4-71.6-32c0 0 0 0 0 0c-3.7-4.1-7-8.5-9.9-13.2C357.3 164 352 146.6 352 128c0 0 0 0 0 0l0-96 0-20 0-1.3C352 4.8 356.7 .1 362.6 0l.2 0c3.3 0 6.4 1.6 8.4 4.2c0 0 0 0 0 .1L384 21.3l27.2 36.3L416 64l64 0 4.8-6.4L512 21.3 524.8 4.3c0 0 0 0 0-.1c2-2.6 5.1-4.2 8.4-4.2l.2 0C539.3 .1 544 4.8 544 10.7l0 1.3 0 20 0 96c0 17.3-4.6 33.6-12.6 47.6c-11.3 19.8-29.6 35.2-51.4 42.9zM432 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/></svg></div>'
const dogPiece = '<div class="game-pieces" id="dogPieceId"><svg class = "svg-game-pieces" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#5e2222" d="M309.6 158.5L332.7 19.8C334.6 8.4 344.5 0 356.1 0c7.5 0 14.5 3.5 19 9.5L392 32l52.1 0c12.7 0 24.9 5.1 33.9 14.1L496 64l56 0c13.3 0 24 10.7 24 24l0 24c0 44.2-35.8 80-80 80l-32 0-16 0-21.3 0-5.1 30.5-112-64zM416 256.1L416 480c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-115.2c-24 12.3-51.2 19.2-80 19.2s-56-6.9-80-19.2L160 480c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-230.2c-28.8-10.9-51.4-35.3-59.2-66.5L1 167.8c-4.3-17.1 6.1-34.5 23.3-38.8s34.5 6.1 38.8 23.3l3.9 15.5C70.5 182 83.3 192 98 192l30 0 16 0 159.8 0L416 256.1zM464 80a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z"/></svg></div>'
const ghostPiece = '<div class="game-pieces" id="ghostPieceId"><svg class = "svg-game-pieces" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#f62da2" d="M40.1 467.1l-11.2 9c-3.2 2.5-7.1 3.9-11.1 3.9C8 480 0 472 0 462.2L0 192C0 86 86 0 192 0S384 86 384 192l0 270.2c0 9.8-8 17.8-17.8 17.8c-4 0-7.9-1.4-11.1-3.9l-11.2-9c-13.4-10.7-32.8-9-44.1 3.9L269.3 506c-3.3 3.8-8.2 6-13.3 6s-9.9-2.2-13.3-6l-26.6-30.5c-12.7-14.6-35.4-14.6-48.2 0L141.3 506c-3.3 3.8-8.2 6-13.3 6s-9.9-2.2-13.3-6L84.2 471c-11.3-12.9-30.7-14.6-44.1-3.9zM160 192a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg></div>'
const moonPiece = '<div class="game-pieces" id="moonPieceId"><svg class = "svg-game-pieces" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#124973" d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg></div>'
const astronautPiece = '<div class="game-pieces" id="astronautPieceId"><svg class = "svg-game-pieces" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#9172ee" d="M370.7 96.1C346.1 39.5 289.7 0 224 0S101.9 39.5 77.3 96.1C60.9 97.5 48 111.2 48 128l0 64c0 16.8 12.9 30.5 29.3 31.9C101.9 280.5 158.3 320 224 320s122.1-39.5 146.7-96.1c16.4-1.4 29.3-15.1 29.3-31.9l0-64c0-16.8-12.9-30.5-29.3-31.9zM336 144l0 16c0 53-43 96-96 96l-32 0c-53 0-96-43-96-96l0-16c0-26.5 21.5-48 48-48l128 0c26.5 0 48 21.5 48 48zM189.3 162.7l-6-21.2c-.9-3.3-3.9-5.5-7.3-5.5s-6.4 2.2-7.3 5.5l-6 21.2-21.2 6c-3.3 .9-5.5 3.9-5.5 7.3s2.2 6.4 5.5 7.3l21.2 6 6 21.2c.9 3.3 3.9 5.5 7.3 5.5s6.4-2.2 7.3-5.5l6-21.2 21.2-6c3.3-.9 5.5-3.9 5.5-7.3s-2.2-6.4-5.5-7.3l-21.2-6zM112.7 316.5C46.7 342.6 0 407 0 482.3C0 498.7 13.3 512 29.7 512l98.3 0 0-64c0-17.7 14.3-32 32-32l128 0c17.7 0 32 14.3 32 32l0 64 98.3 0c16.4 0 29.7-13.3 29.7-29.7c0-75.3-46.7-139.7-112.7-165.8C303.9 338.8 265.5 352 224 352s-79.9-13.2-111.3-35.5zM176 448c-8.8 0-16 7.2-16 16l0 48 32 0 0-48c0-8.8-7.2-16-16-16zm96 32a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/></svg></div>'
const winePiece = '<div class="game-pieces" id="winePieceId"><svg class = "svg-game-pieces" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ab1c1c" d="M32.1 29.3C33.5 12.8 47.4 0 64 0L256 0c16.6 0 30.5 12.8 31.9 29.3l14 168.4c6 72-42.5 135.2-109.9 150.6l0 99.6 48 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-80 0-80 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l48 0 0-99.6C60.6 333 12.1 269.8 18.1 197.8l14-168.4zm56 98.7l143.8 0-5.3-64L93.4 64l-5.3 64z"/></svg></div>'
const weedPiece = '<div class="game-pieces" id="weedPieceId"><svg class = "svg-game-pieces" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#1b8d41" d="M256 0c5.3 0 10.3 2.7 13.3 7.1c15.8 23.5 36.7 63.7 49.2 109c7.2 26.4 11.8 55.2 10.4 84c11.5-8.8 23.7-16.7 35.8-23.6c41-23.3 84.4-36.9 112.2-42.5c5.2-1 10.7 .6 14.4 4.4s5.4 9.2 4.4 14.5c-5.6 27.7-19.3 70.9-42.7 111.7c-9.1 15.9-19.9 31.7-32.4 46.3c27.8 6.6 52.4 17.3 67.2 25.5c5.1 2.8 8.2 8.2 8.2 14s-3.2 11.2-8.2 14c-15.2 8.4-40.9 19.5-69.8 26.1c-20.2 4.6-42.9 7.2-65.2 4.6l8.3 33.1c1.5 6.1-.6 12.4-5.5 16.4s-11.6 4.6-17.2 1.9L280 417.2l0 70.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-70.8-58.5 29.1c-5.6 2.8-12.3 2.1-17.2-1.9s-7-10.3-5.5-16.4l8.3-33.1c-22.2 2.6-45 0-65.2-4.6c-28.9-6.6-54.6-17.6-69.8-26.1c-5.1-2.8-8.2-8.2-8.2-14s3.2-11.2 8.2-14c14.8-8.2 39.4-18.8 67.2-25.5C78.9 296.3 68.1 280.5 59 264.6c-23.4-40.8-37.1-84-42.7-111.7c-1.1-5.2 .6-10.7 4.4-14.5s9.2-5.4 14.4-4.4c27.9 5.5 71.2 19.2 112.2 42.5c12.1 6.9 24.3 14.7 35.8 23.6c-1.4-28.7 3.1-57.6 10.4-84c12.5-45.3 33.4-85.5 49.2-109c3-4.4 8-7.1 13.3-7.1z"/></svg></div>'
const musicNotePiece = '<div class="game-pieces" id="musicNoteId"><svg class = "svg-game-pieces" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#f4991a" d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7l0 72 0 264c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L448 147 192 223.8 192 432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L128 200l0-72c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/></svg></div>'

const housePiece = '<svg id="housePieceId" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#055719" d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>'
const hotelPiece = '<svg id="hotelPieceId" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#7f0202" d="M0 32C0 14.3 14.3 0 32 0L480 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 384c17.7 0 32 14.3 32 32s-14.3 32-32 32l-176 0 0-48c0-26.5-21.5-48-48-48s-48 21.5-48 48l0 48L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32L32 64C14.3 64 0 49.7 0 32zm96 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM240 96c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM112 192c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM328 384c13.3 0 24.3-10.9 21-23.8c-10.6-41.5-48.2-72.2-93-72.2s-82.5 30.7-93 72.2c-3.3 12.8 7.8 23.8 21 23.8l144 0z"/></svg>'


let activePlayers = [
    {
        name: "Player One",
        colorDark: "",
        colorLight: "",
        colorBid: "",
        position: 0,
        gamePiece: "",
        pieceId: "",
        cash: 1500,
        totalAssets: 0,
        updateTotalAssets: function (){
            this.totalAssets = 0
            this.updateMortgageAssets()
            this.updateHouseAssets()
            this.totalAssets += (this.mortgageAssets + this.houseAssets + this.cash)
        },

        mortgageAssets: 0,
        updateMortgageAssets: function(){
            this.mortgageAssets = 0
            for (let i = 0; i < this.properties.length; i++){
                if (this.properties[i].mortgageOpen === false){
                    this.mortgageAssets += (this.properties[i].mortgage * .9)
                }
            }
        },

        houseAssets: 0,
        updateHouseAssets: function(){
            this.houseAssets = 0
            for (let i = 0; i < this.properties.length;){
                if(this.properties[i].type === 'color'){
                    this.houseAssets += (this.properties[i].totalHouses * (this.properties[i].buildingCost / 2))
                }
                i++
                
            }
        },

        incomeTax: 0,
        updateIncomeTax: function (){
            this.incomeTax = 0
            this.updatePropertyAssetsIncomeTax()
            this.updateHouseAssetsIncomeTax()
            this.incomeTax += (this.propertyAssetsIncomeTax + this.houseAssetsIncomeTax + this.cash)
        },

        propertyAssetsIncomeTax: 0,
        updatePropertyAssetsIncomeTax: function(){
            this.propertyAssetsIncomeTax = 0
            for (let i = 0; i < this.properties.length; i++){
                this.propertyAssetsIncomeTax += (this.properties[i].price)       
            }
        },
        
        houseAssetsIncomeTax: 0,
        updateHouseAssetsIncomeTax: function(){
         this.houseAssetsIncomeTax = 0
         for (let i = 0; i < this.properties.length;){
            if(this.properties[i].type === 'color'){
                this.updateHouseAssetsIncomeTax += (this.properties[i].totalHouses * (this.properties[i].buildingCost))
            }
            i++
            
            }
        },
        
        properties: [],
        auctionButtons: [],
        housesOwned: 0,
        hotelsOwned: 0,
        cashDisplayId: "playerOneCashId",
        getOutOfJailCard: 0,
        isInJail: false,
        jailRollAttempts: 3,
        doublesCounter: 0,
        isBankrupt: true,
    },
    {
        name: "Player Two",
        colorDark: "",
        colorLight: "",
        colorBid: "",
        position: 0,
        gamePiece: "",
        pieceId: "",
        cash: 1500,
        totalAssets: 0,
        updateTotalAssets: function (){
            this.totalAssets = 0
            this.updateMortgageAssets()
            this.updateHouseAssets()
            this.totalAssets += (this.mortgageAssets + this.houseAssets + this.cash)
        },

        mortgageAssets: 0,
        updateMortgageAssets: function(){
            this.mortgageAssets = 0
            for (let i = 0; i < this.properties.length; i++){
                if (this.properties[i].mortgageOpen === false){
                    this.mortgageAssets += (this.properties[i].mortgage * .9)
                }
            }
        },

        houseAssets: 0,
        updateHouseAssets: function(){
            this.houseAssets = 0
            for (let i = 0; i < this.properties.length;){
                if(this.properties[i].type === 'color'){
                    this.houseAssets += (this.properties[i].totalHouses * (this.properties[i].buildingCost / 2))
                }
                i++
                
            }
        },

        incomeTax: 0,
        updateIncomeTax: function (){
            this.incomeTax = 0
            this.updatePropertyAssetsIncomeTax()
            this.updateHouseAssetsIncomeTax()
            this.incomeTax += (this.propertyAssetsIncomeTax + this.houseAssetsIncomeTax + this.cash)
        },

        propertyAssetsIncomeTax: 0,
        updatePropertyAssetsIncomeTax: function(){
            this.propertyAssetsIncomeTax = 0
            for (let i = 0; i < this.properties.length; i++){
                this.propertyAssetsIncomeTax += (this.properties[i].price)       
            }
        },
        
        houseAssetsIncomeTax: 0,
        updateHouseAssetsIncomeTax: function(){
         this.houseAssetsIncomeTax = 0
         for (let i = 0; i < this.properties.length;){
            if(this.properties[i].type === 'color'){
                this.updateHouseAssetsIncomeTax += (this.properties[i].totalHouses * (this.properties[i].buildingCost))
            }
            i++
            
            }
        },
        
        properties: [],
        auctionButtons: [],
        housesOwned: 0,
        hotelsOwned: 0,
        cashDisplayId: "playerTwoCashId",
        getOutOfJailCard: 0,
        isInJail: false,
        jailRollAttempts: 3,
        doublesCounter: 0,
        isBankrupt: true,
    },

    {
        name: "Player Three",
        colorDark: "",
        colorLight: "",
        colorBid: "",
        position: 0,
        gamePiece: "",
        pieceId: "",
        cash: 1500,
        totalAssets: 0,
        updateTotalAssets: function (){
            this.totalAssets = 0
            this.updateMortgageAssets()
            this.updateHouseAssets()
            this.totalAssets += (this.mortgageAssets + this.houseAssets + this.cash)
        },

        mortgageAssets: 0,
        updateMortgageAssets: function(){
            this.mortgageAssets = 0
            for (let i = 0; i < this.properties.length; i++){
                if (this.properties[i].mortgageOpen === false){
                    this.mortgageAssets += (this.properties[i].mortgage * .9)
                }
            }
        },

        houseAssets: 0,
        updateHouseAssets: function(){
            this.houseAssets = 0
            for (let i = 0; i < this.properties.length;){
                if(this.properties[i].type === 'color'){
                    this.houseAssets += (this.properties[i].totalHouses * (this.properties[i].buildingCost / 2))
                }
                i++
                
            }
        },

        incomeTax: 0,
        updateIncomeTax: function (){
            this.incomeTax = 0
            this.updatePropertyAssetsIncomeTax()
            this.updateHouseAssetsIncomeTax()
            this.incomeTax += (this.propertyAssetsIncomeTax + this.houseAssetsIncomeTax + this.cash)
        },

        propertyAssetsIncomeTax: 0,
        updatePropertyAssetsIncomeTax: function(){
            this.propertyAssetsIncomeTax = 0
            for (let i = 0; i < this.properties.length; i++){
                this.propertyAssetsIncomeTax += (this.properties[i].price)       
            }
        },
        
        houseAssetsIncomeTax: 0,
        updateHouseAssetsIncomeTax: function(){
         this.houseAssetsIncomeTax = 0
         for (let i = 0; i < this.properties.length;){
            if(this.properties[i].type === 'color'){
                this.updateHouseAssetsIncomeTax += (this.properties[i].totalHouses * (this.properties[i].buildingCost))
            }
            i++
            
            }
        },
        
        properties: [],
        auctionButtons: [],
        housesOwned: 0,
        hotelsOwned: 0,
        cashDisplayId: "playerThreeCashId",
        getOutOfJailCard: 0,
        isInJail: false,
        jailRollAttempts: 3,
        doublesCounter: 0,
        isBankrupt: true,
    },
    {
        name: "Player Four",
        colorDark: "",
        colorLight: "",
        colorBid: "",
        position: 0,
        gamePiece: "",
        pieceId: "",
        cash: 1500,
        totalAssets: 0,
        updateTotalAssets: function (){
            this.totalAssets = 0
            this.updateMortgageAssets()
            this.updateHouseAssets()
            this.totalAssets += (this.mortgageAssets + this.houseAssets + this.cash)
        },

        mortgageAssets: 0,
        updateMortgageAssets: function(){
            this.mortgageAssets = 0
            for (let i = 0; i < this.properties.length; i++){
                if (this.properties[i].mortgageOpen === false){
                    this.mortgageAssets += (this.properties[i].mortgage * .9)
                }
            }
        },

        houseAssets: 0,
        updateHouseAssets: function(){
            this.houseAssets = 0
            for (let i = 0; i < this.properties.length;){
                if(this.properties[i].type === 'color'){
                    this.houseAssets += (this.properties[i].totalHouses * (this.properties[i].buildingCost / 2))
                }
                i++
                
            }
        },

        incomeTax: 0,
        updateIncomeTax: function (){
            this.incomeTax = 0
            this.updatePropertyAssetsIncomeTax()
            this.updateHouseAssetsIncomeTax()
            this.incomeTax += (this.propertyAssetsIncomeTax + this.houseAssetsIncomeTax + this.cash)
        },

        propertyAssetsIncomeTax: 0,
        updatePropertyAssetsIncomeTax: function(){
            this.propertyAssetsIncomeTax = 0
            for (let i = 0; i < this.properties.length; i++){
                this.propertyAssetsIncomeTax += (this.properties[i].price)       
            }
        },
        
        houseAssetsIncomeTax: 0,
        updateHouseAssetsIncomeTax: function(){
         this.houseAssetsIncomeTax = 0
         for (let i = 0; i < this.properties.length;){
            if(this.properties[i].type === 'color'){
                this.updateHouseAssetsIncomeTax += (this.properties[i].totalHouses * (this.properties[i].buildingCost))
            }
            i++
            
            }
        },

        properties: [],
        auctionButtons: [],
        housesOwned: 0,
        hotelsOwned: 0,
        cashDisplayId: "playerFourCashId",
        getOutOfJailCard: 0,
        isInJail: false,
        jailRollAttempts: 3,
        doublesCounter: 0,
        isBankrupt: true,
    },

]

//Jail Buttons
const attemptDoublesBtn = document.getElementById('attemptDoublesBtnId')
const payJailFeeBtn = document.getElementById('payFeeBtnId')
const getOutJailCardBtn = document.getElementById('getOutJailCardBtnId')

//Game Piece Buttons
const pieceSelectionButton = [
    {button: document.getElementById('dogPieceIdBtn'), gamePiece: dogPiece, gamePieceId: 'dogPieceId', colorLight: '#866b44', colorDark: '#5e2222'},
    {button: document.getElementById('catPieceIdBtn'), gamePiece: catPiece, gamePieceId: 'catPieceId', colorLight: '#555555', colorDark: '#000000'},
    {button: document.getElementById('ghostPieceIdBtn'), gamePiece: ghostPiece, gamePieceId: 'ghostPieceId', colorLight: '#fa93cf', colorDark: '#f62da2'},
    {button: document.getElementById('moonPieceIdBtn'), gamePiece: moonPiece, gamePieceId: 'moonPieceId', colorLight: '#3e586c', colorDark: '#124973'},
    {button: document.getElementById('astronautPieceIdBtn'), gamePiece: astronautPiece, gamePieceId: 'astronautPieceId', colorLight: '#b2a0eb', colorDark: '#9172ee'},
    {button: document.getElementById('winePieceIdBtn'), gamePiece: winePiece, gamePieceId: 'winePieceId', colorLight: '#a84848', colorDark: '#ab1c1c'},
    {button: document.getElementById('weedPieceIdBtn'), gamePiece: weedPiece, gamePieceId:'weedPieceId', colorLight: '#4f9968', colorDark: '#1b8d41'},
    {button: document.getElementById('musicNoteIdBtn'), gamePiece: musicNotePiece, gamePieceId: 'musicNoteId', colorLight: '#ecb363', colorDark: '#f4991a'},
]

//Game Setup Variables
let currentPlayerTurn = activePlayers[0];
let currentLocation;
let totalPlayers;
let playersSelected = 0;
let playerTurnTicker = 1;
let turnInteractionDescription = document.getElementById('turnInteractionDescriptionId')
let hasRolled = false
let gameWinner
let propertyClickedOn

//Game Setup Total Player Buttons
const playerTotalButtons = [
    {button: document.getElementById('twoPlayerBtnId'), value: 2},
    {button: document.getElementById('threePlayerBtnId'), value: 3},
    {button: document.getElementById('fourPlayerBtnId'), value: 4},
]

//Property Variables
let colorPropertyCard = '<container class="color-property-card" id="colorPropertyCardId"><div id="colorPropertyName"></div><div id="colorPropertyRent"></div><div id="colorPropertyOneHouse"></div><div id="colorPropertyTwoHouse"></div><div id="colorPropertyThreeHouse"></div><div id="colorPropertyFourHouse"></div><div id="colorPropertyHotelRent"></div><div id="colorPropertyHouseCost"></div><div id="colorPropertyHotelCost"></div><div id="colorPropertyMortgage"></div></container>'
let railroadPropertyCard = '<container class="railroad-property-card" id="railroadPropertyCardId"><div id="railroadPropertyName"></div><div class="railroad-inner-text">One Railroad: $25</div><div class="railroad-inner-text">Two Railroads: $50</div><div class="railroad-inner-text">Three Railroads: $100</div><div class="railroad-inner-text">Four Railroads: $200</div><div class="railroad-inner-text">Mortgage Value: $100</div></container>'
let utilityPropertyCard = '<container class="utility-property-card" id="utilityPropertyCardId"><div id="utilityPropertyName"></div><div class="utility-inner-text">If one utility property  owned; rent is 4x the cost of roll value.</div><div class="utility-inner-text">If two utility properties onwed; rent is 10x the cost of roll value.</div><div class="utility-inner-text">Mortgage Value: $75</div></container>'
//Game Interactions Buttons
const playBtn = document.getElementById('playBtnId');
const rollBtn = document.getElementById('rollBtnId');
const endTurnBtn = document.getElementById('endTurnBtnId');

//Rent / Property 
//Rent / Property 
let ownedPropertyArray = []
let ownedColorPropertyArray = []
const payRentBtn = document.getElementById('payRentBtnId')
const sellToPayRentBtn = document.getElementById('sellToPayRentBtnId')
const bankruptBtn = document.getElementById('bankruptBtnId')
const bankruptYesBtn = document.getElementById('bankruptYesBtnId')
const bankruptNoBtn = document.getElementById('bankruptNoBtnId')
const goodbyeBtn = document.getElementById('goodbyeBtnId')
const buyPropertyYesBtn = document.getElementById('buyPropertyYesBtn')
const buyPropertySellBtn = document.getElementById('buyPropertySellBtn')
const buyPropertyAuctionBtn = document.getElementById('buyPropertyAuctionBtn')

//Auction Property
let playerAuctionContainers = [
    {container: document.getElementById('playerOneAuctionContainerId'), nameplate: document.getElementById('playerOneAuctionNameplateId'), cashDisplay: document.getElementById('playerOneAuctionCashId'), buttonId: document.getElementById('playerOneAuctionBtnsId')},
    {container: document.getElementById('playerTwoAuctionContainerId'), nameplate: document.getElementById('playerTwoAuctionNameplateId'), cashDisplay: document.getElementById('playerTwoAuctionCashId'), buttonId: document.getElementById('playerTwoAuctionBtnsId')},
    {container: document.getElementById('playerThreeAuctionContainerId'), nameplate: document.getElementById('playerThreeAuctionNameplateId'), cashDisplay: document.getElementById('playerThreeAuctionCashId'), buttonId: document.getElementById('playerThreeAuctionBtnsId')},
    {container: document.getElementById('playerFourAuctionContainerId'), nameplate: document.getElementById('playerFourAuctionNameplateId'), cashDisplay: document.getElementById('playerFourAuctionCashId'), buttonId: document.getElementById('playerFourAuctionBtnsId')},
]
let auctionButtonsValueArray = [
    {buttonValue: 1},
    {buttonValue: 5},
    {buttonValue: 10},
    {buttonValue: 25},
    {buttonValue: 50},
    {buttonValue: 100}
]

let currentAuctionBid = 0
const spanBid = document.getElementById('currentBidSpanId')
const auctioneerText = document.getElementById('auctioneerTextId')
let bidLeader;

let noBidsGoingOnce
let noBidsGoingTwice
let noBidsFinal
let auctionResult
let auctionLeaderColor

//House Hotel Mortgage Variables
//House Hotel Mortgage Variables

//Buy House / Hotel
const buyHouseHotelBtn = document.getElementById('buyHouseHotelBtnId')
const buyHouseHotelYesBtn = document.getElementById('buyHouseHotelYesBtnId')
const buyHouseHotelNoBtn = document.getElementById('buyHouseHotelNoBtnId')
const finishBuyHouseHotelBtn = document.getElementById('finishBuyHouseHotelBtnId')
let canBuyHouseHotelArray = []


//Sell House / Hotel
const sellHouseHotelBtn = document.getElementById('sellHouseHotelBtn')
const sellHouseHotelYesBtn = document.getElementById('sellHouseHotelYesBtnId')
const sellHouseHotelNoBtn = document.getElementById('sellHouseHotelNoBtnId')
const finishSellHouseHotelBtn = document.getElementById('finishSellHouseHotelBtnId')
let canSellHouseHotelArray = []

//Open Mortgage
const openMortgageBtn = document.getElementById('openMortgageBtnId')
const openMortgageYesBtn = document.getElementById('openMortgageYesBtnId')
const openMortgageNoBtn = document.getElementById('openMortgageNoBtnId')
const finishOpenMortgageBtn = document.getElementById('finishOpenMortgageBtnId')
let canOpenMortgageArray = []

//Close Mortgage
const closeMortgageBtn = document.getElementById('closeMortgageBtnId')
const closeMortgageYesBtn = document.getElementById('closeMortgageYesBtnId')
const closeMortgageNoBtn = document.getElementById('closeMortgageNoBtnId')
const finishCloseMortgageBtn = document.getElementById('finishCloseMortgageBtnId')
let canCloseMortgageArray = []

//Trade
//Trade
let trader
let tradee
let tradeDecision
const tradeBtn = document.getElementById('tradeBtnId')
const propertyLabel = document.getElementById('propertyLabelId')
const traderNametag = document.getElementById('traderNameId')
const tradeeNametag = document.getElementById('tradeeNameId')
const potentailTradeButtons = document.getElementById('potentailTradeButtonsId')
const tradeScreenTutorial = document.getElementById('tradeScreenTutorialId')

//Trade Screen Contents
const traderContents = document.getElementById('traderContentsId')
const traderPropertyDropoffContainer = document.getElementById('traderPropertyDropoffContainerId')
const traderCashInputContainer = document.getElementById('traderCashInputContainerId')
const traderCashInputField = document.getElementById('traderCashInputFieldId')
const traderCashOfferDisplay = document.getElementById('traderCashOfferDisplayId')
const traderCashSubmitBtn = document.getElementById('traderCashSubmitBtnId')

const tradeeContents = document.getElementById('tradeeContentsId')
const tradeePropertyDropoffContainer = document.getElementById('tradeePropertyDropoffContainerId')
const tradeeCashInputContainer = document.getElementById('tradeeCashInputContainerId')
const tradeeCashInputField = document.getElementById('tradeeCashInputFieldId')
const tradeeCashOfferDisplay = document.getElementById('tradeeCashOfferDisplayId')
const tradeeCashSubmitBtn = document.getElementById('tradeeCashSubmitBtnId')

//Trade Screen Buttons
const tradeOfferBtn = document.getElementById('tradeOfferBtnId')
const tradeCancelBtn = document.getElementById('tradeCancelBtnId')
const tradeAcceptBtn = document.getElementById('tradeAcceptBtnId')
const tradeDeclineBtn = document.getElementById('tradeDeclineBtnId')
const acceptDeclineButtonsContainer = document.getElementById('acceptDeclineButtonsContainerId')

//Trader Offered Items
let selectedTradeProperty;
let draggablePropertyCopy;

let traderEligibleTradeProperties = []
let traderOfferedPropertyList = []
let traderCashOffer = 0

//Tradee Offered Items
let tradeeEligibleTradeProperties = []
let tradeeOfferedPropertyList = []
let tradeeCashOffer = 0

//Trade Screen Animations
const declineCashOfferMovement = [{ transform: "translateX(0px)" }, {transform: "translateX(-5px)"}, { transform: "translateX(5px)" }]
const declineCashOfferMovementTiming = {duration: 100, iterations: 3}
const declineCashOfferColor = {boxShadow: "0 0 1vh rgb(255, 0, 0)"}
const acceptCashOfferColor = {boxShadow: "0 0 1vh rgb(5, 255, 76)"}
const cashOfferColorTiming = {duration: 300}

//Potential Trade Prospects
const playerTradeButtons = [
 document.getElementById('playerOneTradeButtonId'),
 document.getElementById('playerTwoTradeButtonId'),
 document.getElementById('playerThreeTradeButtonId'),
 document.getElementById('playerFourTradeButtonId'),
]

//Function Variables
//let rollDiceOne = () => {return 8}
//let rollDiceTwo = () => {return 1}
const rollDiceOne = () =>{return(Math.floor(Math.random() * 6) + 1)}
const rollDiceTwo = () =>{return(Math.floor(Math.random() * 6) + 1)}
let diceOneValue;
let diceTwoValue;
let chanceDice = () => {return(Math.floor(Math.random() * 16) + 1)}
let communityChestDice = () => {return(Math.floor(Math.random() * 16) + 1)}
let spaceLandedOn = () => {return propertyArray[currentPlayerTurn.position]}
let playerPiece = () => {return document.getElementById(currentPlayerTurn.pieceId)};


//Properties Array

let propertyArray = [
    {   
       name: "Start Space",
       id: "startId",
       number: 0,
       currentOccupants: 0,

   },
   {
       name: "Mediterranean Avenue",
       id: "mediterraneanId",
       number: 1,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner: "",
       price: 60,
       rent: 2,
       startingRent: 2,
       mortgage: 30,
       mortgageOpen: false,
       buildingCost: 50,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 10,
       twoHouseRent: 30,
       threeHouseRent: 90,
       fourHouseRent: 160,
       hotelRent: 250,
       color: '#5b064e',
       type: "color",
       setTotal: 2,
   },
   {
       name: "Community Chest",
       id: "commChestBotId",
       number: 2,
       currentOccupants: 0,
       isProperty: false,
       hasOwner: false,
   },
   {
       name: "Baltic Avenue",
       id: "balticAvId",
       number: 3,
       currentOccupants: 0,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner: "",
       price: 60,
       rent: 4,
       startingRent: 4,
       mortgage: 30,
       mortgageOpen: false,
       buildingCost: 50,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 20,
       twoHouseRent: 60,
       threeHouseRent: 80,
       fourHouseRent: 320,
       hotelRent: 450,
       color: '#5b064e',
       type: "color",
       setTotal: 2,
   },
   {
       name: "Income Tax",
       id: "incomeTaxId",
       number: 4,
       currentOccupants: 0,  
       isProperty: false,
       hasOwner: false,  
   },
   {
       name: "Reading Railroad",
       id: "readingRailroadId",
       number: 5,
       currentOccupants: 0, 
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 200,
       rent: "",
       mortgage: 100,
       mortgageOpen: false,
       type: "railroad",
       setTotal: 4,
   },
   {
       name: "Oriental Avenue",
       id: "orientalAvId",
       number: 6,
       currentOccupants: 0, 
       isProperty: true,
       hasOwner: false,
       owner: "",
       price: 100,
       rent: 6,
       startingRent: 6,
       mortgage: 50,
       mortgageOpen: false,
       buildingCost: 50,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 30,
       twoHouseRent: 90,
       threeHouseRent: 270,
       fourHouseRent: 400,
       hotelRent: 550,
       color: '#add8e6',
       type: "color",
       setTotal: 3,
   
   },
   {
       name: "Chance",
       id: "chanceBotId",
       number: 7,
       currentOccupants: 0,   
   },
   {
       name: "Vermont Avenue",
       id: "vermontAvId",
       number: 8,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner: "",
       price: 100,
       rent: 6,
       startingRent: 6,
       mortgage: 50,
       mortgageOpen: false,
       buildingCost: 50,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 30,
       twoHouseRent: 90,
       threeHouseRent: 270,
       fourHouseRent: 400,
       hotelRent: 550,
       color: '#add8e6',
       type: "color",
       setTotal: 3,
   },
   {
       name: "Connecticut Avenue",
       id: "connecticutAvId",
       number: 9,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner: "",
       price: 120,
       rent: 8, 
       startingRent: 8,
       mortgage: 60,
       mortgageOpen: false,
       buildingCost: 50,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 40,
       twoHouseRent: 100,
       threeHouseRent: 300,
       fourHouseRent: 450,
       hotelRent: 600,
       color: '#add8e6',
       type: "color",
       setTotal: 3,
   },
   {
       name: "Just Visiting",
       id: "justVisitingId",
       number: 10,
       currentOccupants: 0,
   },
   {
       name: "St. Charles Place",
       id: "stCharlesPlaceId",
       number: 11,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 140,
       rent: 10, 
       startingRent: 10,
       mortgage: 70,
       mortgageOpen: false,
       buildingCost: 100,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 50,
       twoHouseRent: 150,
       threeHouseRent: 450,
       fourHouseRent: 625,
       hotelRent: 750,
       color: '#b420b4',
       type: "color",
       setTotal: 3,
   },
   {
       name: "Electric Company",
       id: "electricCompanyId",
       number: 12,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 150,
       rent: "", 
       updateRent: "",
       mortgage: 75,
       mortgageOpen: false, 
       type: "utility",
       setTotal: 2,
   },
   {
       name: "States Avenue",
       id: "statesAvId",
       number: 13,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 140,
       rent: 10, 
       startingRent: 10,
       mortgage: 70,
       mortgageOpen: false,
       buildingCost: 100,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 50,
       twoHouseRent: 150,
       threeHouseRent: 450,
       fourHouseRent: 625,
       hotelRent: 750,
       color: '#b420b4',
       type: "color",
       setTotal: 3,
   },
   {
       name: "Virginia Avenue",
       id: "virginiaAvId",
       number: 14,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 160,
       rent: 12, 
       startingRent: 12,
       mortgage: 80,
       mortgageOpen: false,
       buildingCost: 100,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 60,
       twoHouseRent: 180,
       threeHouseRent: 500,
       fourHouseRent: 700,
       hotelRent: 900,
       color: '#b420b4',
       type: "color",
       setTotal: 3,
   },
   {
       name: "Pennsylvania Railroad",
       id: "pennRailroadId",
       number: 15,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 200,
       rent: "", 
       mortgage: 100,
       mortgageOpen: false,
       type: "railroad",  
       setTotal: 4,
   },
   {
       name: "St. James Place",
       id: "stJamesPlId",
       number: 16,
       currentOccupants: 0, 
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 180,
       rent: 14, 
       startingRent: 14,
       mortgage: 90,
       mortgageOpen: false,
       buildingCost: 100,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 70,
       twoHouseRent: 200,
       threeHouseRent: 550,
       fourHouseRent: 750,
       hotelRent: 950,
       color: '#ffa500',
       type: "color",
       setTotal: 3,
   },
   {
       name: "Community Chest",
       id: "commChestLeftId",
       number: 17,
       currentOccupants: 0, 
   },
   {
       name: "Tennessee Avenue",
       id: "tennAvId",
       number: 18,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 180,
       rent: 14,  
       startingRent: 14,
       mortgage: 90,
       mortgageOpen: false,
       buildingCost: 100,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 70,
       twoHouseRent: 200,
       threeHouseRent: 550,
       fourHouseRent: 750,
       hotelRent: 950,
       color: '#ffa500',
       type: "color",
       setTotal: 3,
   },
   {
       name: "New York Avenue",
       id: "newYorkAvId",
       number: 19,
       currentOccupants: 0, 
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 200,
       rent: 16, 
       startingRent: 16,
       mortgage: 100,
       mortgageOpen: false,
       buildingCost: 100,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 80,
       twoHouseRent: 220,
       threeHouseRent: 600,
       fourHouseRent: 800,
       hotelRent: 1000,
       color: '#ffa500',
       type: "color",
       setTotal: 3,
   },
   {
       name: "Free Parking",
       id: "freeParkingId",
       number: 20,
       currentOccupants: 0, 
   },
   {
       name: "Kentucky Avenue",
       id: "kentuckyAvId",
       number: 21,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 160,
       rent: 18,  
       startingRent: 18,
       mortgage: 110,
       mortgageOpen: false,
       buildingCost: 150,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 90,
       twoHouseRent: 250,
       threeHouseRent: 700,
       fourHouseRent: 875,
       hotelRent: 1050,
       color: '#ff0000',
       type: "color",
       setTotal: 3,
   },
   {
       name: "Chance",
       id: "chanceTopId",
       number: 22,
       currentOccupants: 0, 
   },
   {
       name: "Indiana Avenue",
       id: "indianaAvId",
       number: 23,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 220,
       rent: 18,  
       startingRent: 18,
       mortgage: 110,
       mortgageOpen: false,
       buildingCost: 150,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 90,
       twoHouseRent: 250,
       threeHouseRent: 700,
       fourHouseRent: 875,
       hotelRent: 1050,
       color: '#ff0000',
       type: "color",
       setTotal: 3,
   },
   {
       name: "Illinois Avenue",
       id: "illinoisAvId",
       number: 24,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 240,
       rent: 20, 
       startingRent: 20,
       mortgage: 120,
       mortgageOpen: false,
       buildingCost: 150,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 100,
       twoHouseRent: 300,
       threeHouseRent: 750,
       fourHouseRent: 925,
       hotelRent: 1100, 
       color: '#ff0000',
       type: "color",
       setTotal: 3,
   },
   {
       name: "B&O Railroad",
       id: "boRailroadId",
       number: 25,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 200,
       rent: "", 
       mortgage: 100,
       mortgageOpen: false,
       type: "railroad",
       setTotal: 4,
   },
   {
       name: "Atlantic Avenue",
       id: "atlanticAvId",
       number: 26,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 260,
       rent: 22,  
       startingRent: 22,
       mortgage: 130,
       mortgageOpen: false,
       buildingCost: 150,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 110,
       twoHouseRent: 330,
       threeHouseRent: 800,
       fourHouseRent: 975,
       hotelRent: 1150,
       color: '#ffff00',
       type: "color",
       setTotal: 3,
   },
   {
       name: "Ventor Avenue",
       id: "ventorAvId",
       number: 27,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 260,
       rent: 22,  
       startingRent: 22,
       mortgage: 130,
       mortgageOpen: false,
       buildingCost: 150,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 110,
       twoHouseRent: 330,
       threeHouseRent: 800,
       fourHouseRent: 975,
       hotelRent: 1150,
       color: '#ffff00',
       type: "color",
       setTotal: 3,
   },
   {
       name: "Water Works",
       id: "waterWorksId",
       number: 28,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner: "",
       price: 150,
       rent: "",
       updateRent: "",
       mortgage: 75,
       mortgageOpen: false,
       type: "utility",
       setTotal: 2,
   },
   {
       name: "Marvin Gardens",
       id: "marvinGardensId",
       number: 29,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 280,
       rent: 24,  
       startingRent: 24,
       mortgage: 140,
       mortgageOpen: false,
       buildingCost: 150,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 120,
       twoHouseRent: 360,
       threeHouseRent: 850,
       fourHouseRent: 1025,
       hotelRent: 1200,
       color: '#ffff00',
       type: "color",
       setTotal: 3,
   },
   {
       name: "Go To Jail",
       id: "goJailId",
       number: 30,
       currentOccupants: 0, 
   },
   {
       name: "Pacific Avenue",
       id: "pacificAvId",
       number: 31,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 300,
       rent: 26,  
       startingRent: 26,
       mortgage: 150,
       mortgageOpen: false,
       buildingCost: 200,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 130,
       twoHouseRent: 390,
       threeHouseRent: 900,
       fourHouseRent: 1100,
       hotelRent: 1275,
       color: '#045b04',
       type: "color",
       setTotal: 3,
   },
   {
       name: "North Carolina Avenue",
       id: "northCarolinaId",
       number: 32,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 300,
       rent: 26,  
       startingRent: 26,
       mortgage: 150,
       mortgageOpen: false,
       buildingCost: 200,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 130,
       twoHouseRent: 390,
       threeHouseRent: 900,
       fourHouseRent: 1100,
       hotelRent: 1275,
       color: '#045b04',
       type: "color",
       setTotal: 3,
   },
   {
       name: "Community Chest",
       id: "commChestRightId",
       number: 33,
       currentOccupants: 0, 
   },
   {
       name: "Pennsylvania Avenue",
       id: "pennAvId",
       number: 34,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 320,
       rent: 28, 
       startingRent: 28,
       mortgage: 160,
       mortgageOpen: false,
       buildingCost: 200,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 150,
       twoHouseRent: 450,
       threeHouseRent: 1000,
       fourHouseRent: 1200,
       hotelRent: 1400, 
       color: '#045b04',
       type: "color",
       setTotal: 3,
   },
   {
       name: "Short Line",
       id: "shortLineId",
       number: 35,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner:  "",
       price: 200,
       rent: "",  
       mortgage: 100,
       mortgageOpen: false,
       type: "railroad",
       setTotal: 4,
   },
   {
       name: "Chance",
       id: "chanceRightId",
       number: 36,
       currentOccupants: 0, 
   },
   {
       name: "Park Place",
       id: "parkPlaceId",
       number: 37,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner: "",
       price: 350,
       rent: 35,  
       startingRent: 35,
       mortgage: 175,
       mortgageOpen: false,
       buildingCost: 200,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 175,
       twoHouseRent: 500,
       threeHouseRent: 1100,
       fourHouseRent: 1300,
       hotelRent: 1500,
       color: '#00008b',
       type: "color",
       setTotal: 2,
   },
   {
       name: "Luxury Tax",
       id: "luxTaxId",
       number: 38,
       currentOccupants: 0, 
   },
   {
       name: "Boardwalk",
       id: "boardwalkId",
       number: 39,
       currentOccupants: 0,
       isProperty: true,
       hasOwner: false,
       owner: "",
       price: 400,
       rent: 50,  
       startingRent: 50,
       mortgage: 200,
       mortgageOpen: false,
       buildingCost: 200,
       totalHouses: 0,
       propertySetTotalHouses: 0,
       oneHouseRent: 200,
       twoHouseRent: 600,
       threeHouseRent: 1400,
       fourHouseRent: 1700,
       hotelRent: 2000,
       color: '#00008b',
       type: "color",
       setTotal: 2,
   },
   {
    name: "Jail",
    id: "inJailId",
    number: 40,
    currentOccupants: 0,

},

]
