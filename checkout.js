// variables spawnpoint p2
// this page is ugly and not very exciting code-wise sorry
let pay_up_screen = document.getElementById("pay_up");
let paypal = document.getElementById("paypal");
let apple_pay = document.getElementById("apple_pay");
let middle = document.getElementById("middle");
let total_container = document.createElement("p");
total_container.innerHTML = "Total: $" + location.search.substring(1); // grabs total value from URL !

// ------------------------------------------------------------------------------------------
// functions for the paying & purchasing buttons
// ------------------------------------------------------------------------------------------
function return_home(){
  window.location.href="index.html";
}
function success_home(){
  window.location.href="index.html?success";
}

function purchase_clicked(){
  window.setTimeout(success_home, 5000);
  pay_up_screen.innerHTML = "Purchase confirmed! You will be returned to the purchase screen in 5 seconds..."
}

// purchase button configuring
let purchase_button = document.createElement("button");
purchase_button.innerHTML = "Purchase";
purchase_button.addEventListener("click", purchase_clicked);

function pay_pay(){
  middle_text.innerHTML = "Pay with PayPal Selected. \n You would likely enter in your card information here, if this was a real checkout program.";
  middle.appendChild(purchase_button);
}
function pay_apple(){
  // add wait time/ purchase confirmation screen
  middle_text.innerHTML = "Pay with Apple Selected. \n Press button below to complete purchase.";
  middle.appendChild(purchase_button);

}

// back and pay buttons configuring
let back_button = document.createElement("button");
back_button.innerHTML = "Back";
back_button.addEventListener("click", return_home);
paypal.addEventListener("click", pay_pay);
apple_pay.addEventListener("click", pay_apple);

pay_up_screen.appendChild(total_container);
pay_up_screen.appendChild(back_button);

/*
prospective functionality:
could enter in card details
loading circle for five second count down

done: 
return to check out screen
count-down
pass total through url w jquery wow
*/