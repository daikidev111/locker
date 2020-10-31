/**
* main.js
* This file contains code that runs on load for index.html
*/

function displayLockers(data)
{
  let output =""; // creating the empty string
  lockerDisplayRef = document.getElementById("lockerDisplay")

  for (let m =0; m<data._lockers.length;m++)
  {
    //produce the HTML code(from index.html) from line 40-54 to append the data in the card.
    output += `<div class="mdl-cell mdl-cell--4-col">`;
    output += `<div class="mdl-card mdl-shadow--2dp locker" style="background-color:#${data._lockers[m].color}">`;
    output += `<div class="mdl-card__title mdl-card--expand">`;
    output += `<h2>${data._lockers[m].id}</h2>`;
    output += `<h4>&nbsp;${data._lockers[m].label}</h4>`;
    output += `</div>`;
    output += `<div class="mdl-card__actions mdl-card--border">`;
    output += `<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onclick="view(${m})">Open Locker</a>`;
    output += `<div class="mdl-layout-spacer"></div>`;
    output += `<i class="material-icons">unlock</i>`;
    output += `</div></div></div>`;
  }
  lockerDisplayRef.innerHTML += output;

}

function addNewLocker()
{
  // prompting a user for an ID
  let promptUser = prompt("Type an ID: ");

  //call lockerlist addLocjer method with the prompted id
  lockers.addLocker(promptUser);

  updateLocalStorage(lockers);// updated it with a parameter of global variable lockers

  displayLockers(lockers);
}

function view(index)
{
  jsonIndex = JSON.stringify(index)
  localStorage.setItem(LOCKER_INDEX_KEY,jsonIndex);
  //redirect a user to view page
  window.location ="view.html"
}



displayLockers(lockers);
