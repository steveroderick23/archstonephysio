/**
 * Created by jeannie.arbeau on 11/29/16.
 */
/*
* Borrowed solution: http://stackoverflow.com/questions/14555347/html5-localstorage-error-with-safari-quota-exceeded-err-dom-exception-22-an
* IOS Private/Incognito Browsing support for local storage
*/
function getStorage() {
  var storageObj;

  try {
    localStorage.setItem("storage", "");
    localStorage.removeItem("storage");
    storageObj = localStorage;
  } catch(err) {
    storageObj = new LocalStorage();
  }

  return storageObj;
}

function LocalStorage() {
  var storage = {};

  this.setItem = function(key, val) {
    storage[key] = val;
  }

  this.getItem = function(key) {
    if(typeof storage[key] != 'undefined') {
      return storage[key];
    } else {
      return null;
    }
  }

  this.removeItem = function(key) {
    storage[key] = undefined;
  }
}
