
  //Prototype of a car. Each car object has these variables and functions.
  function Car(licenseNumber, maker, model, color, price) {
      this.licensePlate = licenseNumber; //this refers to the object that "owns" the current code
      this.manufacturer = maker;         //For example, when object called fiat calls the functions here,
      this.model = model;               //it gets different result than when an object called tesla calls these functions.
      this.paint = color;
      this.price = price;
      this.ignition = false;

      //Methods that the car has. Can be called with objectname.start(); Then only that object starts.
      this.start = function () {
          console.log("Vroom Vroom! " + this.getname() + " is ready to go!");
          this.ignition = true;
      }

      this.stop = function(){
          console.log("Screech! " + this.getname() + " is stopped.");
          this.ignition = false;
      }

      this.drive = function(){
        if(this.ignition) console.log(this.getname() + " is driving");
        else console.log(this.getname() + " is not started yet!");
      }

      this.getname = function(){
        return this.manufacturer + " " + this.model;
      }

      //Add a new method for discounting. Permanently updates the price
      this.discount = function(){
        //If price > 20000, discount is 25%
        if(this.price > 20000) this.price = this.price * 0.75;
        //If price < 5000, discount is 5%
        else if(this.price < 5000) this.price = this.price * 0.95;
        //Otherwise the discount is 10%
        else this.price = this.price*0.90;
      }
  }


//Gets the user input and creates a new car object based on those properties
  function createNewCar(){

    var licensePlate = document.getElementById('license-plate').value;
    var manufacturer = document.getElementById('manufacturer').value;
    var model = document.getElementById('model').value;
	  var price = parseInt(document.getElementById('price').value); //User input is by default in text format, parseInt changes it to number format.
    var paint = document.getElementById('paint').value;

    //Create a new car object with the user input.
    var usercar = new Car(licensePlate, manufacturer, model, paint, price);
    console.log(usercar);
    listOfCars.push(usercar); //Add the new car to the list
    console.table(listOfCars);

  }

  //Since this array is created outside functions, it is a GLOBAL variable. Any function can see and modify it.
  //Anything outside of functions {}-curly lines gets executed when the page loads.
  var listOfCars = [];


//Sorts the array based on the prices of the objects in the array.
  function sortArray(){

    /*Uses the built in sort -method that can accept a function that specifies
      how the array should be sorted. In this case we want the array to be sorted
      based on the object's price. Lower priced cars go first.*/
    function compare(a,b) {
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;
      return 0;
    }
    listOfCars.sort(compare);
    console.table(listOfCars);

  }


  /*Function for searching from the array. Not a very good one but it will do.
    User needs to write the license-plate exactly correct for it to work.
    If one is looking for a car with license-plate ABC-123, it will not find it
    if the user types in "ABC". It will find the right car ONLY if user types
    "ABC-123". User input is retrieved from the same field where new car is created.

    This program has hilariously terrible usability.*/
  function searchFromArray(){

    var userSearch = document.getElementById('license-plate').value;

    for(let i = 0; i<listOfCars.length; i++){
      if (userSearch === listOfCars[i].licensePlate) {
        console.log("I found " + listOfCars[i].getname());
        console.log("The original price was: " + listOfCars[i].price);
        listOfCars[i].discount();
        console.log("The discounted price is: " + listOfCars[i].price);
      }
    }
  }






//Testing the car and customer constructor
var oldcar = new Car("ASD-456", "Opel", "Olympia", "blue", 4000);
var newcar = new Car("ABC-123", "Ferrari", "X", "#FFFFF", 500000);
newcar.discount();
var john = new Customer("John", 50, oldcar);
john.buyCar(newcar);



//Constructor for Customer -object. Note that constructors start with a capital case.
function Customer(name, age, car){
  this.name = name; //Each Customer -object has a name, age, and a car object
  this.age = age;
  this.ownedCar = car;

  this.buyCar = function(car){ //Method for buying a car. The owned car of the customer object gets updated.
    this.ownedCar = car;
  }
}
