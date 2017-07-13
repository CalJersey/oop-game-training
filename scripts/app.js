console.log("Sanity Check: JS is working!");

$(document).ready(function() {

  let keyCode = 76;
  let car1 = new Car("car1", "car1", "car1", "images/police.gif", 0, 0, 0, 116, 65);
  car1.makeCar();
  let car2 = new Car("car2", "car2", "car2", "images/police.gif", 0, 0, 0, 116, 65);
  car2.makeCar();

  //global array of car objects
  carChoices = [];
  carChoices[0] = {
    'name': 'police',
    'image': 'police.gif',
    'width': 288,
    'thumbnailWidth': 72,
  };
  carChoices[1] = {
    'name': 'brown',
    'image': 'brownCar.gif',
    'width': 288,
    'thumbnailWidth': 72,
  };
  carChoices[2] = {
    'name': 'tractor',
    'image': 'tractor.gif',
    'width': 288,
    'thumbnailWidth': 72,
  };
  carChoices[3] = {
    'name': 'bug',
    'image': 'bug.gif',
    'width': 288,
    'thumbnailWidth': 72,
  };

  //init Game
  game = new Game();

  //2 Player Game listener
  $("#players2").on("click", function() {
    game.numDrivers = 2;
    initDriverForm();
  });

  //3 Player Game listener
  $("#players3").on("click", function() {
    game.numDrivers = 3;
    initDriverForm();
  });

  //4 Player Game listener
  $("#players4").on("click", function() {
    game.numDrivers = 4;
    initDriverForm();
  });

  //driver form button listener -triggers form submission
  $("#driverFormSubmit").on("click", function(event) {
    event.preventDefault();
    $("#driveForm").trigger("submit");
    //register click on the hid=dden submit button
    $("#driverSubButton").trigger("click");


  });
  $("#driverForm").on("submit",function(event){
    event.preventDefault();

  });
  // Keystroke listener
/*    event.preventDefault();
    if (event.which == keyCode) {
      car1.incrementPosRight();
      car2.incrementPosRight();
    };

  }); */
});

//Game Object
function Game() {
  this.numDrivers = 0;
  this.drivers = [];
  this.isStarted = 0;
  this.isInProgress = 0;
  this.isEnded = 0;
  this.elapsedTime = 0;
}

//Car Object
function Car(id, name, cssClass, image = "images/police.gif", speed = 0, posRight = 0, posTop = 0, width = 116, height = 65, actionKey, ) {
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
  this.setRight = function(posRight = this.posRight) {
    $(`#${this.id}`).css({
      right: posRight
    })
  };
  //this.setTop = function(posY=posY){};
  this.increaseSpeed = function(units = 10) {
    this.speed += units;
  };
  this.incrementPosRight = function(increment = 10) {
    this.posRight += increment;
    this.setRight();
  }
  this.decreaseSpeed = function(units = 1) {
    this.speed -= units;
  };
  this.makeCar = function() {
    $("#raceTrack").append(`<img class="${this.cssClass}" id="${this.id}" name="${this.name}" src="${this.image}" width="${this.width}" height="${this.height}">`);
    this.makeCar = function() {
      return false;
    };
  };
  this.generateListener = function() {}

}

//Player Object
function Driver() {
  this.name = "";
  this.car = {};
  this.num = 0;
  this.actionKey = 0;
  //this.playerForm = new PlayerForm(this,radioButContentStr);
  this.setCar = function(car) {
    this.car = car;
  }
  this.setActionKey = function(key) {
    this.actionKey = key;
  }
  this.setName = function(name) {
    this.name = name;
  }
  this.setNum = function(num) {
    this.num = num;
  }
}


//modal form to collect Driver info
function initDriverForm(num=1) {
  let nextNum = num + 1;
  let buttonStr = "";

  $("span[data-driverNum]").html(num);

  $("#driverNum").val(num)

  if (num < game.numDrivers) {
    $("span[data-nextDriverNum]").html(nextNum);
  } else {
    $("#driverFormSubmit").html("Let's Race!");
  }


  //setup car choice radio buttons and HTML structures to add to the form down below
  let radioButContentStr = "";
  carChoices.forEach(function(v, i) {
    let tempString = "";
    tempString = `<div class="carForm"><input type="radio" class="carChoice" name="carChoice" value="${i}" required>`;
    tempString = `${tempString}<img class="carImage" name="${v.name}" title="${v.name}" src="images/${v.image}" width="${v.thumbnailWidth}"></div>`;
    radioButContentStr = `${radioButContentStr}${tempString}`;
  });

  //create submit button with proper text and event trigger
  $("#imageRadios").html(radioButContentStr);

  //bind modal container to  modal window
  $("#modalContainer").easyModal({
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

}

//countdown function used to start race but also to randomly change traffic light during race
function countDown(countStart = 5, displayTime = false, startRed = true, interval = 100, endDate = new Date().getTime()) {
  let removeClass = "";
  let addClass = "";
  //determine if stoplight should start as red or green
  if (startRed) {
    removeClass = "start";
    addClass = "stop";
  } else {
    removeClass = "stop";
    addClass = "start";
  }

  //add/remove appropriate classes for stoplight to display correctly as countdown begins
  $("#stopLight").removeClass(removeClass).addClass(addClass);

  //countdowf
  let intervalId = setInterval(function() {
    let now = new Date().getTime();
    let distance = endDate - now;
    let seconds = Math.round((distance % (1000 * 60)) / 1000);
    //if we are displaying the countdown set the html of the countDown element to num seconds left
    if (displayTime) {
      $("#countDown").html(seconds);
    }
    //if countdown has elaspsed
    if (seconds <= 0) {
      //stop interval
      clearInterval(intervalId);
      //switch stoplight
      $("#stopLight").removeClass(addClass).addClass(removeClass);
      //clear countdown display
      $("#countDown").html("");
    }
  }, interval);
}
/*
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
*/
