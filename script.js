// ------------------------------------------------------------------------------------------
// script for drinks homepage & order history
// allows you to buy fake drinks and store them in an order history log with the power of cookies
// ------------------------------------------------------------------------------------------
// variables 
let main = document.getElementById("main");
let main_drinks = document.getElementById("main_drinks");
let main_totals = document.getElementById("main_totals");
let subtotal_container = document.createElement("p");
let total_container = document.createElement("p");
let subtotal = 0;
subtotal_container.innerHTML = `Subtotal: \$${subtotal.toFixed(2)}`;
total_container.innerHTML = `Total: \$${(subtotal*1.06).toFixed(2)}`;
let selected_drinks = [];

// ------------------------------------------------------------------------------------------
// organizing drink data 
// ------------------------------------------------------------------------------------------
coffee_names = ["Vanilla Latte", "Iced Coffee", "Coffee Smoothie", "Earl Gray Tea",
               "Caramel Latte", "Rose Tea", "White Peach Oolong", "Tropical Oolong",
               "Mango Chamoy Icy", "Watermelon Icy", "Iced Mocha", "Iced White Mocha",
               "Mango Icy", "Green Apple Icy", "Red Guava", "Dragon Fruit", "Tiramisu Tea"];
coffee_array = [];
for (let i = 0; i < 15; i++){ // creating objects dynamically
  coffee_array[i] = {
    id: i,
    name: coffee_names[i],
    cost: Math.floor(Math.random()*3 + 3),
    class: "grid-item",
    border: "thick solid magenta"
  };
}

// ------------------------------------------------------------------------------------------
// organizing subtotal and drink selection
// ------------------------------------------------------------------------------------------
function addToCart(){
  let temp_pos = 0;
  for (let i = 0; i < coffee_array.length; i++) { // linking data structure and UI element together...
    if (this.id == coffee_array[i].id){
        temp_pos = i;
      }
    }
  let temp_cost = coffee_array[temp_pos].cost;
  let drink_name = coffee_array[temp_pos].name;
  if (this.style.border == "thick solid magenta"){
    // if border is light pink, drink has been selected and added to total
    subtotal += temp_cost;
    selected_drinks.push(drink_name);
    this.style.border = "thick solid pink";
  }
  else{ // unselect drink
    subtotal -= temp_cost; 
    selected_drinks.splice(selected_drinks.indexOf(drink_name),1);
    this.style.border = "thick solid magenta";
  }
  subtotal_container.innerHTML = `Subtotal: \$${subtotal.toFixed(2)}`;
  total_container.innerHTML = `Total: \$${(subtotal*1.06).toFixed(2)}`;
}

// ------------------------------------------------------------------------------------------
// organizing UI
// ------------------------------------------------------------------------------------------
for (let i = 0; i < coffee_array.length; i++){
  let temp = document.createElement("div");
  temp.innerHTML =`<p>${coffee_array[i].name}</p><br><p>\$${(coffee_array[i].cost).toFixed(2)}</p>`;
  temp.style.border = coffee_array[i].border;
  temp.id = coffee_array[i].id;
  temp.addEventListener("click", addToCart);
  // drink element styling
  temp.class = coffee_array[i].class;
  temp.style.padding = "10% 0%";
  temp.style.textAlign= "center";
  temp.style.backgroundColor = "rgba(255, 150, 150, 0.15)";
  main_drinks.appendChild(temp);
}
main_totals.appendChild(subtotal_container);
main_totals.appendChild(total_container);

// ------------------------------------------------------------------------------------------
// handling checkout button
// ------------------------------------------------------------------------------------------
let checkout_button = document.createElement("button"); 
checkout_button.innerHTML = "Check out";
checkout_button.addEventListener("click", function(){
  if (subtotal == 0){
    alert("you haven't bought anything yet silly goose");
  }
  else {
    let cookie_data = document.cookie;
    if (cookie_data != null){ // checking for null is redundant since the button will only show up once an order has been made but ¯\_(ツ)_/¯
      temp_array = cookie_data.split("; "); 
      // assigns unique keys based on length of stored cookies to avoid cookie overwriting bug
      document.cookie = `total${temp_array.length/2}=${(subtotal*1.06).toFixed(2)};`;
      document.cookie = ` drinks${temp_array.length/2}=${selected_drinks};`;
    }
    window.location.href=`checkout.html?${(subtotal*1.06).toFixed(2)}`; // relocates to check out page
  }
  }); 
main_totals.appendChild(checkout_button);
main_totals.appendChild(document.createElement("br"));
main_totals.appendChild(document.createElement("br"));

// ------------------------------------------------------------------------------------------
// order history
// ------------------------------------------------------------------------------------------
let order_history = [];
let order_history_container = document.createElement("p"); 
let history_button = document.createElement("button"); 
history_button.innerHTML = "Order History";
// hide order history from view 
let close_button = document.createElement("button"); 
close_button.innerHTML = "X";
close_button.addEventListener("click", function(){ 
  order_history_container.innerHTML = "";
  main_totals.removeChild(close_button);
});

if (location.search.substring(1) == "success"){ // if purchase has been made
  let cookie_data = document.cookie; 
  temp_array = cookie_data.split("; ");
  for (let i = 0; i < temp_array.length; i+=2){ // get cookies for past drinks and totals
    total = temp_array[i].split("=")[1];
    drinks = temp_array[i+1].split("=")[1];
    order_history.push({temp_drinks:drinks, temp_total: total}); // add them to order history array for formatting
  }
  main_totals.appendChild(history_button);
  selected_drinks = [];
} 

function open_order_history(){ // display order history 
  temp_string = "";
  for (let i = 0; i < order_history.length; i++){ 
    temp_string += `Id: #${i+1} | Total: \$${order_history[i].temp_total} | Drinks: ${order_history[i].temp_drinks} <br>`;
  }
  order_history_container.innerHTML = temp_string;
  main_totals.appendChild(close_button);
  main_totals.appendChild(order_history_container);
}
history_button.addEventListener("click", open_order_history);

function clear_order_history(){ // still need to do this
  /*
  create clear button
  based on length of document.cookie split array
  reset array by setting indexed keys to empty string on data side, and then only adding to text HTML if key != "" on UI side
  */
}


/*
// ----------------------------------------
potential extended functionality:
drinks assigned cost based on category of drink instead of random
stores drinks selected when you press back

potential super extended:
size + hot/cold select for elemnts
picture for each element 
sorting through order history by keyword

// ----------------------------------------
done: 
12-18 coffees, created in a loop ... 
include cost and name for UI element
tax
checkout area 
make it look nicer with grid 
order history w cookies
// ----------------------------------------
could also spin into employee based one (include cash + drink log)
*/

/* order history pseudo
goal: after each successful order, want to create a log of drink combinations, and total 
this can be called upon by pressing 'order history button', which has a close button to hide from view

pseudocode:
each time a drink is selected, it is added to the selected array
each time a drink is unselected, it is removed from the selected array
EDIT: 
document.cookie = "drinks:[selected_drinks]; total:[total]"
once check out is pressed, and order has been purchased, user returns to home with ~success in url

if success is in url is true:
let cookie_data = document.cookie;
add cookie_data to order history 

order psuedocode:
click order history, if selected = empty {You have purchased no drinks}; else wipes out main innerHTML by showing orders, has a close button => index.html
order history: id, drink combination, and total
storage 

data first
order history => array of objects
object => selected array of drinks, total 
*/




