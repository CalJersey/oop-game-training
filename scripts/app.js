console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  let keyCode = 76;
  let car1 = new Car("car1","car1","car1","images/police.gif",0,0,0,116,65);
  car1.makeCar();
  let car2 = new Car("car2","car2","car2","images/police.gif",0,0,0,116,65);
  car2.makeCar();
  // code in here
  $(document).on("keydown",function(event){
    event.preventDefault();
    console.log(event.which);
    if (event.which == keyCode){
      car1.incrementPosRight();
    };

  });
});

function Car(id,name,cssClass,image="images/police.gif", speed=0, posRight=0, posTop=0,width=116,height=65) {
	this.image = image;
	this.speed = speed;
  this.cssClass = cssClass;
  this.posRight = posRight;
  this.posTop = posTop;
  this.id = id;
  this.name = name;
  this.width = width;
  this.height = height;
  this.setRight = function(posRight=this.posRight){$(`#${this.id}`).css({right:posRight})};
  //this.setTop = function(posY=posY){};
  this.increaseSpeed = function(units=1){
    this.speed += units;
  };
  this.incrementPosRight = function(increment=1){
    console.log(`Before: ${this.posRight}`);
    this.posRight+=increment;
    console.log(`Before: ${this.posRight}`);
    this.setRight();
  }
  this.decreaseSpeed = function(units=1){
    this.speed -= units;
  };
  this.makeCar = function(){
      $("#raceTrack").append(`<img class="${this.cssClass}" id="${this.id}" name="${this.name}" src="${this.image}" width="${this.width}" height="${this.height}">`);
      this.makeCar = function(){return false;};
  };

}
