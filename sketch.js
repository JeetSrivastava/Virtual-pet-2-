//Create variables here
var database;
var dog,dogImage,dogImage1
var food,foodImage,foodStock,foodRef;
var feed;
var fedTime,lastFed,foodRem;
var foodObj;
var namebox;
var value;
var milkimg,milkbottle;
function preload()
{
  dogimage = loadImage("dogImg.png");
  dogimage2 = loadImage("dogImg1.png");
  milkimg = loadImage("Milk.png");
}

function setup() {
  createCanvas(500, 500);
  foodObj=new Food();
  //foodObj.updateFoodStock(20);

  dog = createSprite(430,300);
  dog.addImage(dogimage);
  dog.scale = 0.2;

  database = firebase.database();
  //food = database.ref('Food');
  //food.on("value",readStock);

  feed = createButton("Feed your dog");
  feed.position(650,125);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(770,125);
  addFood.mousePressed(addFoods);
  
  namebox = createInput('').attribute('placeholder','Your pet name');
  namebox.position(450,125)

  milkbottle = createSprite(350,320)
  milkbottle.addImage(milkimg)
  milkbottle.visible = 0
  milkbottle.scale = 0.1
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  value = namebox.value();
  console.log(value)
  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  fill("white");
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Fed : 12 AM",350,30);
   }else{
     text("Last Fed : "+ lastFed + " AM", 350,30);
   }
   fill(250)
   textSize(20)
   text(value,400,dog.y-80)
}
function feedDog()
{
  foodObj.getFoodStock();
  if(foodObj.foodStock<=0)
  {
    foodObj.foodStock=0;
    milkbottle.visible=0;
    dog.addImage(dogimage);
  }
  else{
    dog.addImage(dogimage2);
    if(foodObj.foodStock===1)
    {
        milkbottle.visible=0;
        dog.addImage(dogimage);
    }
    else
    milkbottle.visible = 1
    foodObj.updateFoodStock(foodObj.foodStock-1);
    database.ref('/').update({
    Food:foodObj.foodStock,
    FeedTime:hour()
    });
  }
}
function addFoods()
{
  
  foodObj.updateFoodStock(foodObj.foodStock+1);
  database.ref('/').update({
    Food:foodObj.foodStock
  });
}
/*function readStock(data){
  foodStock = data.val();
}*/

/*function keyPressed(){
  if(keyWentDown(UP_ARROW)){
    food = database.ref("Food");
    foodStock = foodStock - 1;
    food.set(foodStock);
    dog.addImage(dogimage2);
  }
  else{
    dog.addImage(dogimage)
  }
} */
