console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  let keyCode = 76;
  let car1 = new Car("car1","car1","car1","images/police.gif",0,0,0,116,65);
  car1.makeCar();
  let car2 = new Car("car2","car2","car2","images/police.gif",0,0,0,116,65);
  car2.makeCar();

  //startButton listener
  $("#startButton").on("click", function(event){
    event.preventDefault();
    let endDate = new Date().getTime();
    endDate = endDate + 5000;
    countDown(5,true,true,100,endDate);
  })
  // code in here
  $(document).on("keydown",function(event){
    event.preventDefault();

    if (event.which == keyCode){
      car1.incrementPosRight();
    };

  });
});

function Car(id,name,cssClass,image="images/police.gif", speed=0, posRight=0, posTop=0,width=116,height=65,actionKey) {
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
  this.increaseSpeed = function(units=1){
    this.speed += units;
  };
  this.incrementPosRight = function(increment=1){
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
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //if we are displaying the countdown set the html of the countDown element to num seconds left
    if (displayTime){
      $("#countDown").html(seconds);
    }
    //if countdown has elaspsed
    if (distance <= 0){
      //stop interval
      clearInterval(intervalId);
      //switch stoplight
      $("#stopLight").removeClass(addClass).addClass(removeClass);
    }
  }, interval);
}
