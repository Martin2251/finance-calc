const myForm = document.getElementById("info-form");
const affordForm = document.getElementById("repay-info-form");

myForm.addEventListener("submit", calcFinance);
affordForm.addEventListener("submit", calcAfford);

//function that finds out monthly payments with a total amount and total interest paid
function calcFinance(e) {
  e.preventDefault();

  const amount = document.getElementById("amount").value;
  const term = document.getElementById("term").value;
  const interest = document.getElementById("interest");
  const deposit = document.getElementById("deposit").value;

  //checks if the amount entered is correct/valid and if it isn't, it lets the user know
  if (amount <= 0 || term <= 0 || interest.value < 0 || deposit < 0) {
    document.getElementById("error-message").style.display = "block";
    document.getElementById("error").textContent =
      "Please enter valid information";
    document.getElementById("result-id").style.display = "none";
  } else if (interest.value == 0) {
    //if interest value is 0, formula gets simplified
    monthlyNoInterest = (amount - deposit) / term;

    document.getElementById("result-id").style.display = "block";
    document.getElementById("error-message").style.display = "none";
    document.getElementById("answer").textContent =
      "Monthly payment: £" +
      ((monthlyNoInterest * 100) / 100).toFixed(2) +
      "/month";
    document.getElementById("interest-paid").textContent =
      "Total interest paid: £0.00";
    document.getElementById("total-payable").textContent =
      "Total amount repayable: £" + (monthlyNoInterest * term).toFixed(2);
  } else {
    //calculates amount of interest
    let interestPay = parseFloat(interest.value) / 100 / 12;
    let power = Math.pow(1 + interestPay, term);
    //calculates monthly payments
    let monthly = ((amount - deposit) * power * interestPay) / (power - 1);

    document.getElementById("result-id").style.display = "block";
    document.getElementById("error-message").style.display = "none";
    document.getElementById("answer").textContent =
      "Monthly payment: £" + ((monthly * 100) / 100).toFixed(2) + "/month";
    document.getElementById("interest-paid").textContent =
      "Total interest paid: £" +
      (monthly * term - (amount - deposit)).toFixed(2);
    document.getElementById("total-payable").textContent =
      "Total amount repayable: £" + (monthly * term).toFixed(2);
  }
}

//function that calculates an affordable loan depending on the monthly payment input from user
function calcAfford(e) {
  e.preventDefault();

  const repayAmount = document.getElementById("repayAmount").value;
  const term = document.getElementById("repay-term").value;
  const interest = document.getElementById("repay-interest");
  const deposit = document.getElementById("repay-deposit").value;

  if (repayAmount <= 0 || term <= 0 || interest.value < 0 || deposit < 0) {
    document.getElementById("repay-error-message").style.display = "block";
    document.getElementById("repay-error").textContent =
      "Please enter valid information";
    document.getElementById("repay-result-id").style.display = "none";
  } else if (interest.value == 0) {
    //calculates total loan
    let totalNoInterest = repayAmount * term;

    document.getElementById("repay-result-id").style.display = "block";
    document.getElementById("repay-error-message").style.display = "none";
    document.getElementById("repay-answer").textContent =
      "Total amount you can afford: £" +
      ((totalNoInterest * 100) / 100 + parseFloat(deposit)).toFixed(2); //calculates total loan
    document.getElementById("repay-interest-paid").textContent =
      "Total interest paid: £0.00";
    document.getElementById("repay-total-payable").textContent =
      "Total amount repayable: £" + totalNoInterest.toFixed(2); //calculates total loan including deposit
  } else {
    //calculates amount of interest
    let interestPay = parseFloat(interest.value) / 100 / 12;
    let power = Math.pow(1 + interestPay, term);

    //calculates total loan including interest
    let totalNoInterest = repayAmount * term - parseFloat;
    let total = (repayAmount * (power - 1)) / interestPay / power;

    document.getElementById("repay-result-id").style.display = "block";
    document.getElementById("repay-error-message").style.display = "none";
    document.getElementById("repay-answer").textContent =
      "Total amount you can afford: £" +
      ((total * 100) / 100 + parseFloat(deposit)).toFixed(2); //calculates total loan
    document.getElementById("repay-interest-paid").textContent =
      "Total interest paid: £" + (repayAmount * term - total).toFixed(2); //calculates the amount of interest paid
    document.getElementById("repay-total-payable").textContent =
      "Total amount repayable: £" +
      ((total * 10) / 10 + repayAmount * term - total).toFixed(2); //calculates total loan including deposit
  }
}

//setup for tab, help from W3
function openOption(evt, optionName) {
  let i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(optionName).style.display = "block";
  evt.currentTarget.className += " active";
}

//automatically sets the first tab active
document.getElementById("defaultOpen").click();

//formula - 500(repayAmount) = (x*power*interestPay)/(power-1);
//  repayAmount*(power-1) = x*power*interstPay
//  repayAmount*(power-1)/interestPay/power = x
