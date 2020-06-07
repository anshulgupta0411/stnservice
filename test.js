//Generator Function
"use strict"
function* ask() { 
    const name = yield "What is your name?"; 
    const sport = yield "What is your favorite sport?"; 
    return `${name}'s favorite sport is ${sport}`; 
 }  
 const it = ask(); 
 console.log(it.next()); 
 console.log(it.next('Ethan'));  
 console.log(it.next('Cricket')); 
 console.log(it.next()); 

//Inside an arrow function if we use this pointer, 
//it will point to the enclosing lexical scope. This means arrow functions do not create a new this pointer instance whenever it is invoked.
//Arrow functions makes use of its enclosing scope. To understand this, let us see an example.

function Student(rollno,firstName,lastName) {
    this.rollno = rollno;
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullNameUsingAnonymous = function(){
       setTimeout(function(){
          //creates a new instance of this ,hides outer scope of this
          console.log("1 : " + this.firstName+ " "+this.lastName)
       },2000)
    }
    this.fullNameUsingArrow = function(){
       setTimeout(()=>{
          //uses this instance of outer scope
          console.log("2 : " + this.firstName+ " "+this.lastName)
       },3000)
    }
 }
 const s1 = new Student(101,'Anshul','Gupta')
 s1.fullNameUsingAnonymous();
 s1.fullNameUsingArrow();