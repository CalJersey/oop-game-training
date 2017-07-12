console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  let keyCode = 76;
  let car1 = new Car("car1","car1","car1","images/police.gif",0,0,0,116,65);
  car1.makeCar();
  let car2 = new Car("car2","car2","car2","images/police.gif",0,0,0,116,65);
  car2.makeCar();

  //global array of car objects
  carChoices = [];
  carChoices[0] = {'name':'police','image':'police.gif', 'width':288, 'thumbnailWidth':72,};
  carChoices[1] = {'name':'brown','image':'brownCar.gif', 'width':288, 'thumbnailWidth':72,};
  carChoices[2] = {'name':'tractor','image':'tractor.gif', 'width':288, 'thumbnailWidth':72,};
  carChoices[3] = {'name':'bug','image':'bug.gif', 'width':288, 'thumbnailWidth':72,};

  //setup car choice radio buttons and HTML sturctures to add to the form down below
  carChoices.forEach(function(v,i){
    let tempString = "";
    tempString = `<span class="carForm"><img name="${v.name}" title="${v.name}" src="images/${v.image}" width="${v.thumbnailWidth}">`;
    tempString = `${tempString}<br><input type="radio" name="carChoice" value="${i}"></span>`;
    radioButContentStr = `${radioButContentStr}${tempString}`;
  });

  //init Game
  game = new Game();
  //minimum of 2 players
  player0 = new Player();
  player1 = new Player();
  game.addPlayer(player0);
  game.addPlayer(player0);

  //2 Player Game listener
  $("#players2").on("click",function(){
    game.players[0].playerForm.loadPlayerForm(game.numPlayers-1);
    toggleButtons(1);
  });
  //3 Player Game listener
  $("#players3").on("click",function(){
    player = new Player();
    game.addPlayer(player);
    game.players[0].playerForm.loadPlayerForm(game.numPlayers-1);
    toggleButtons(1);
  });
  //4 Player Game listener
  $("#players4").on("click",function(){
    player0 = new Player();
    player1 = new Player();
    game.addPlayer(player0);
    game.addPlayer(player1);
    game.players[0].playerForm.loadPlayerForm(game.numPlayers-1);
    toggleButtons(1);
  });
  //startButton listener
  $("#startButton").on("click", function(event){
    event.preventDefault();
    let endDate = new Date().getTime();
    endDate = endDate + 5000;
    countDown(5,true,true,50,endDate);
  });

  // code in here
  $(document).on("keydown",function(event){
    event.preventDefault();
    if (event.which == keyCode){
      car1.incrementPosRight();
      car2.incrementPosRight();
    };

  });
});

function Game(numPlayers=2,players=[],isStarted=0,isInProgress=0,isEnded=0,elapsedTime=0,) {
  this.numPlayers = numPlayers;
  this.players = players;
  this.isStarted = isStarted;
  this.isInProgress = isInProgress;
  this.isEnded = isEnded;
  this.elapsedTime = elapsedTime;
  this.addPlayer = function(player=[]){
    this.players.push(player);
    this.numPlayers += 1;
  };
}

function Car(id,name,cssClass,image="images/police.gif", speed=0, posRight=0, posTop=0,width=116,height=65,actionKey,) {
	this.image = image;
	this.speed = speed;
  this.cssClass = cssClass;
  this.posRight = posRight;
  this.posTop = posTop;
  this.id = id;
  this.name = name;
  this.width = width;
  this.height = height;
  this.actionKey = actionKey;
  this.setRight = function(posRight=this.posRight){$(`#${this.id}`).css({right:posRight})};
  //this.setTop = function(posY=posY){};
  this.increaseSpeed = function(units=10){
    this.speed += units;
  };
  this.incrementPosRight = function(increment=10){
    this.posRight+=increment;
    this.setRight();
  }
  this.decreaseSpeed = function(units=1){
    this.speed -= units;
  };
  this.makeCar = function(){
      $("#raceTrack").append(`<img class="${this.cssClass}" id="${this.id}" name="${this.name}" src="${this.image}" width="${this.width}" height="${this.height}">`);
      this.makeCar = function(){return false;};
  };
  this.generateListener = function(){

  }

}

function Player(name="",car=new Car(),index=0,actionKey=0,){
  this.name = name;
  this.car = car;
  this.index = index;
  this.num = index+1;
  this.actionKey = actionKey;
  this.playerForm = new PlayerForm(this);
  this.setCar = function(car){
    this.car = car;
  }
  this.setActionKey = function(key){
    this.actionKey = key;
  }
  this.setName = function(name){
    this.name = name;
  }
  this.setPlayerForm = function(){

  }
}
//Playerform object creates the modal window and option entry form for each player
function PlayerForm(parent){
  let radioButContentStr = "";
  this.parent = parent;
  this.playerIndex = this.parent.index;
  this.playerNum = this.parent.num;
  this.playerName = this.parent.name;
  this.playerCar = this.parent.car;
  this.playerActionKey = this.parent.actionKey;
  this.buttonStr = "";

  //create form button for modal window - will either lead to next player or start race
  this.createButtonStr = function(maxPlayerIndex){
    let nextPlayer = 0;
    if (this.playerIndex < maxPlayerIndex){
        nextPlayer = this.playerIndex + 2; //index is one lower than player number so have to add two
        this.buttonStr = `<a href="#" class="gameButton" id="playerFormSubmit">Proceed to Driver ${nextPlayer}</a>`;
      } else {
        this.buttonStr = `<a href="#" class="gameButton" id="startButton">Let's Race!</ra>`;
      }
  }
  //return button content from creator function set ti tit to this instances
  //this.buttonStr = this.createFormButtom(maxPlayerIndex);
  //modal form to collect Player info
  this.loadPlayerForm = function(maxPlayerIndex){
    //create submit button with proper text and event trigger
    this.createButtonStr(maxPlayerIndex);

    //build the form and bind it to the modal
    $("#modalContainer").append(`
      <div class="easy-modal-animated" id="modalform${this.playerIndex}">
        <div class="modalTitle">Driver ${this.playerNum}</div>
        <div class="modalContent">
          Driver ${this.playerNum}, please make your selections.
        </div>
        <form name="Driver${this.playerIndex}" action="#" method="POST">
          <div class="modalForm">
            <label class="modalLabel" for="Name">Name:</label>
            <input type="text" name="DriverName" value="" size="15" class="driverName"/>
          </div>
          <div class="modalForm">
            <label class="modalLabel" for="AcceleratorKey">Accelerator Key:</label>
            <input type="text" name="Accelerator" value="" size="3" maxlength="1" class="accelerator"/>
            <div class="imageCheckBoxes" id="imageCheckBoxes${this.playerIndex}"></div>
            ${this.buttonStr}
          </div>
        </form>
      </div>
    `
  ).easyModal({
      top: 50,
      autoOpen: true,
      overlayOpacity: 0.3,
      overlayColor: "#333",
      overlayClose: false,
      closeOnEscape: false,
      transitionIn: 'animated fadeInUpBig',
      transitionOut: 'animated fadeOutUpBig',
      closeButtonClass: '.noClass'
    });


    //startButton listener - have to create it after the sturucture it is tied to is created
    $("#playerFormSubmit").on("click", function(event){
      event.preventDefault();
      game.players[this.playerIndex+1].playerForm.loadPlayerForm(game.numPlayers-1);
    });
  }
}

function countDown(countStart=5,displayTime=false,startRed=true,interval=100,endDate=new Date().getTime()){
  let removeClass = "";
  let addClass = "";
  //determine if stoplight should start as red or green
  if (startRed){
    removeClass = "start";
    addClass = "stop";
  } else {
    removeClass = "stop";
    addClass = "start";
  }

  //add/remove appropriate classes for stoplight to display correctly as countdown begins
  $("#stopLight").removeClass(removeClass).addClass(addClass);

  //countdown
  let intervalId = setInterval(function() {
    let now = new Date().getTime();
    let distance = endDate - now;
    let seconds = Math.round((distance % (1000 * 60)) / 1000);
    //if we are displaying the countdown set the html of the countDown element to num seconds left
    if (displayTime){
      $("#countDown").html(seconds);
    }
    //if countdown has elaspsed
    if (seconds <= 0){
      //stop interval
      clearInterval(intervalId);
      //switch stoplight
      $("#stopLight").removeClass(addClass).addClass(removeClass);
      //clear countdown display
      $("#countDown").html("");
    }
  }, interval);
}

function toggleButtons(off){
  let playerDisplay = "";
  let startDisplay = "";
  if (off) {
    playerDisplay = "none";
    startDisplay = "inline";
  } else{
    playerDisplay = "none";
    startDisplay = "inline";
  };
  setInterval(function(){
    $("#players2").css("display",playerDisplay);
    $("#players3").css("display",playerDisplay);
    $("#players4").css("display",playerDisplay);
    $("#startButton").css("display",startDisplay);
  },1000);
}
