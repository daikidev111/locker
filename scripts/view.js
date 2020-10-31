/**
* view.js
* This file contains code that runs on load for view.html
*/


function displayLockerInfo(locker)
{

  let lockerInfoRef = document.getElementById("lockerInfo");
  let deleteLockerRef = document.getElementById("deleteLocker");
  let output = "";
  let lockerId =locker.id;
  let lockerColor =locker.color;
  let lockerLabel = locker.label;
  let lockerContents = locker.contents;

  output += `Id: ${lockerId}`;
  output += `Label: ${lockerLabel}`;
  output += `Color: ${lockerColor}`;
  output += `Contents: ${lockerContents}`;
  lockerInfoRef.innerHTML += output;
  //onclick function for deletion of a locker
  deleteLockerRef.onclick = function()
  {
    deleteThisLocker(locker)
  };

  lockerInfoRef.innerHTML = "Locker Information: " +"<br>"+"Id: " + lockerId +"<br>"+ "Color: " + lockerColor +"<br>"+ "Label: " + lockerLabel+"<br>"+ "Contents: " + lockerContents+"<br>";

}


function unlock(locker)
{
  //propmt a pin number
  promptPin = prompt("Choose a locker's PIN");
  // if the prompt pin is valid then unlock locker
  if (promptPin === locker.pin)
  {
    locker.locked == false;
    locker.pin = "";
    // call the display info function
    displayLockerInfo(locker)
  }
  else
  {
    //if invalid, redirect a user to index.html page
    window.location = "index.html";
  }
}




function deleteThisLocker(locker)
{
  // ask the user to confirm for deletion
  if (confirm("Are you very sure?"))
  {
    // this runs if user clicks 'OK'
    let lockerId= locker.id;
    lockers.removeLocker(lockerId);
    updateLocalStorage(lockers);
    alert("The locker has been successfully deleted");
    window.location = "index.html";
  }
  else
  {
    // this runs if user clicks 'Cancel'
    return;
  }
}




function lockLocker()
{
  //  ask the user to confirm for locking
  if (confirm("Confirm to lock locker?"))
  {

    let promptPin = prompt("Enter a new pin");
    // PIN number is asked twice
    let confirmPin = prompt("Enter the pin to confim")
    // if they are the same
    if(promptPin == confirmPin)
    {
      // get the element Ids of color, contents and label
      let colorRef = document.getElementById("lockerColor");
      let contentsRef = document.getElementById("lockerContents");
      let labelRef = document.getElementById("lockerLabel");

      // update the pin prompted
      locker.pin = promptPin;
      locker.locked = true;
      locker.label = labelRef.value;;
      locker.color = colorRef.value;// not innerHTML??
      locker.contents = contentsRef.value;

      //update the local storage
      updateLocalStorage(lockers);

      //alert to notify the user that it is successfully locked
      alert("The locker you chose is locked");

      window.location = "index.html";
    }

    else
    {
      //if the pins entered do not match then alert the user so.
      alert("PIN does not match. Please try again.");
    }
  }

  else
  {
    // runs if user clicks 'Cancel'
    return;
  }
}


function closeLocker()
{
  if (confirm("Do you confirm close the locker without locking?"))
  {
    let colorRef = document.getElementById("lockerColor");
    let contentsRef = document.getElementById("lockerContents");
    let labelRef = document.getElementById("lockerLabel");

    // this is to save the locker information
    locker.color = colorRef.value;
    locker.contents = contentsRef.value;
    locker.label = labelRef.value;

    //updating the local storage
    updateLocalStorage(lockers);
    // inform that it is closed, but it is not locked by using alert
    alert("The locker is closed. However, the locker is not locked.");
    window.location = "index.html";
  }
  else
  {

    return;//cancel
  }
}


// retrieve index from the local storage using the key "LOCKER_INDEX_KEY"
// retrieve selected locker from list into  variable "locker" the indexKey has to be an integer form
let locker = lockers.getLocker(Number(localStorage.getItem(LOCKER_INDEX_KEY)));


if (locker.locked == false)
{
  // if the locker is not locked then call fucntion display Locker Info
  displayLockerInfo(locker);

}
else
{
  // call the unlock function
  unlock(locker);
}
