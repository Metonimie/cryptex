/*
  Author: Metonimie
  Date: 20 Aug 2016
 */
"use strict";
console.log("Hello");

var secretKey = null;

var key  = document.querySelector("#password");
var text = document.querySelector("textarea");

function copyTextAction() {
    console.log("copyText called!");
    var field = document.querySelector("textarea");
    field.focus();
    field.setSelectionRange(0, field.value.length);
    var copysuccess;
    try {
        copysuccess = document.execCommand("copy");
    } catch(e) {
        copysuccess = false;
    }
    console.log("copyText exit!");
}

function encryptTextAction() {
    console.log("encryptText called!");

    var keyValue = key.value;
    if ( secretKey != null && keyValue == "") {
        keyValue = secretKey;
    }

    // console.log("Encrypting using " + keyValue);
    var encrypted = CryptoJS.AES.encrypt(text.value, keyValue);
    text.value = encrypted.toString();
    copyText();

    console.log("encryptText exit!");
}

function decryptTextAction() {
    console.log("decryptText called!");

    var keyValue = key.value;
    if ( secretKey != null && keyValue == "") {
        keyValue = secretKey;
    }

    // console.log("Decrypting using " + keyValue);
    var decrypted = CryptoJS.AES.decrypt(text.value, keyValue);
    text.value = decrypted.toString(CryptoJS.enc.Utf8);
    copyText();

    console.log("decryptText exit!");
}

function storeKey(keyValue) {
    console.log("storeKey called!");

    chrome.storage.local.set({
        "secretKey": keyValue
    }, function() {
        if(chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
        }
    });

    console.log("storeKey exit!");
}

function storeKeyAction() {
    console.log("storeKeyAction called!");

    if (key.value != null && key.value != "") {
        secretKey = key.value;
        storeKey(key.value);
    }

    console.log("storeKeyAction exit!");
}

function initKey() {
    console.log("initKey called!");

    chrome.storage.local.get(null, function(results) {
        if(chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
        } else {
              var noteKeys = Object.keys(results);
              secretKey = results[noteKeys[0]];
        }
    });

    console.log("initKey exit!");
}

(function () {
    var
        copyButton       = document.querySelector("#copy-btn"),
        decryptButton    = document.querySelector("#decrypt-btn"),
        encryptButton    = document.querySelector("#encrypt-btn"),
        storeKeyButton   = document.querySelector("#store-btn");

        initKey(); // Try to get key from memory.

        // Add event listeners
        storeKeyButton.addEventListener("click", storeKeyAction, false);
        copyButton.addEventListener("click", copyTextAction, false);
        encryptButton.addEventListener("click", encryptTextAction, false);
        decryptButton.addEventListener("click", decryptTextAction, false);
})();

console.log("Bye!");
