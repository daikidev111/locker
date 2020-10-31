/**
* shared.js
* This file contains shared code that runs on both view.html and index.html
*/

const LOCKER_INDEX_KEY = "lockerIndex";
const LOCKER_DATA_KEY = "lockerData";


class Locker
{
  //constructor
  constructor(id)
  {
    this._id = id;
    this._label = "";
    this._locked = false;
    this._pin = "";
    this._color = ("00000" + Math.floor(Math.random() * 0x1000000).toString(16)).substr(-6);//random color generator
    this._contents = "";
  }

  //accessors
  get id()
  {
    return this._id;
  }
  get label()
  {
    return this._label;
  }
  get locked()
  {
    return this._locked;
  }
  get pin()
  {
    return this._pin;
  }
  get color()
  {
    return this._color;
  }
  get contents()
  {
    return this._contents;
  }

  //mutators
  set label(updatedLabel)
  {
    this._label = updatedLabel;
  }
  set locked(updatedLocked)
  {
    // check if the type of the locked status is in boolean type
    if (typeof (updatedLocked) == 'boolean')
    {
      this._locked = updatedLocked;
    }
  }
  set pin(newPin)
  {
    this._pin = newPin;
  }
  set color(newColor)
  {
    this._color = newColor;
  }
  set contents(newContents)
  {
    this._contents = newContents;
  }

  // toString was used for testing
  // toString()
  // {
  //   return `${this._id}</br>${this._label}</br>${this._locked}</br>${this._pin}</br>${this._color}</br>${this._contents}</br></br>`;
  // }

  // Delegating accountability for restoring the data to each class
  fromData(dataObject)
  {
    this._id = dataObject._id;
    this._label = dataObject._label;
    this._locked = dataObject._locked;
    this._pin = dataObject._pin;
    this._color = dataObject._color;
    this._contents = dataObject._contents;
  }
}


class LockerList
{
  //constructor
  constructor()
  {
    this._lockers = [];
  }

  //accessors
  get lockers()
  {
    return this._lockers;
  }
  get count()
  {
    return this._lockers.length;
  }

  //methods
  addLocker(id)
  {
    let tempLockerId = new Locker(id);//make an temporary holder
    this._lockers.push(tempLockerId);//push it into the array
    return this._lockers;
  }
  getLocker(index)
  {
    //return the Locker at index in the _lockers array
    return this._lockers[index];
  }
  removeLocker(id)
  {
    for(let m =0; m<this._lockers.length; m++)
    {
      if (this._lockers[m]._id == id)
      {//splice function is used to remove a locker
        return this._lockers.splice(m,1);
      }

      else
      {
        console.log("We could not find the id. Please try again");
      }

    }

  }
  // toString()
  // {
  //   let output ="";
  //   for(let i =0; i<this._lockers.length; i++)
  //   {
  //     output+=this._lockers[i];
  //   }
  //
  //   let lockerDetail = `Added locker ID is listed below:</br> ${output}</br>`;
  //   return lockerDetail;
  // }

  //this is used to restore a data of this._lockers from the local storage data.

  fromData(dataObject)
  {
    this._lockers = [];
    let data = dataObject._lockers;
    for (let m = 0; m< data.length; m++)
    {
      let locker = new Locker();
      //the data for locker is data[m]
      locker.fromData(data[m]);
      //pushing the data inside the array
      this._lockers.push(locker);
    }
  }

}

function checkIfDataExistsLocalStorage()
{
  //check to see if data exists in local storage at the defined key
  //If it exists and doesn't contain null, undefined, empty string, then the function will return true, otherwise false
  let retrievedData = localStorage.getItem(LOCKER_DATA_KEY);
  if (retrievedData == null || retrievedData == undefined || retrievedData == "")
  {
    return false;
  }
  else
  {
    return true;
  }
}


function updateLocalStorage(data)
{
  let dataString=JSON.stringify(data);// stringify the data
  localStorage.setItem(LOCKER_DATA_KEY, JSON.stringify(data));
}


function getDataLocalStorage()
{
  let retrieveData = localStorage.getItem(LOCKER_DATA_KEY);
  let parsedData = JSON.parse(retrieveData)
  return parsedData;
}


// Global LockerList instance variable
let lockers = new LockerList();
//check of local data exists aat LOCKER_DATA_KEY
if(checkIfDataExistsLocalStorage(LOCKER_DATA_KEY)==true)
{
  let data = getDataLocalStorage();
  console.log(data);// using console.log to see if it returns parsed Data from the local storage
  lockers.fromData(data);// restoring the data into global LockerList instance
}

else {
  lockers.addLocker("A1");
  updateLocalStorage(lockers);
}
