"use strict";
console.log("Hello");

function copyText() {
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

function encryptText() {
    console.log("encryptText called!");

    var key = document.querySelector("#password");
    var text = document.querySelector("textarea");

    var newkey = getKey();
    if (newkey) {
      console.log(newkey);
      key = newkey;
    }

    var encrypted = CryptoJS.AES.encrypt(text.value, key.value);
    text.value = encrypted.toString();
    copyText();

    console.log("encryptText exit!");
}

function decryptText() {
    console.log("decryptText called!");

    var key = document.querySelector("#password");
    var text = document.querySelector("textarea");

    console.log(key.value);
    var decrypted = CryptoJS.AES.decrypt(text.value, key.value);
    text.value = decrypted.toString(CryptoJS.enc.Utf8);
    copyText();

    console.log("decryptText exit!");
}

function storeKey(keyValue) {
  console.log("storeKey called!");

  chrome.storage.local.set({
    secretKey: keyValue
  });

  console.log("storeKey exit!");
}

function getKey() {
  console.log("getKey called!");

  chrome.storage.local.get("secretKey", (res) => {
    return res.secretKey || null;
  });
}

(function () {
    var
        copy_button       = document.querySelector("#copy_button"),
        decrypt_button    = document.querySelector("#decrypt_button"),
        encrypt_button    = document.querySelector("#encrypt_button");

        // Add event listeners
        copy_button.addEventListener("click", copyText, false);
        encrypt_button.addEventListener("click", encryptText, false);
        decrypt_button.addEventListener("click", decryptText, false);
})();

console.log("Bye!");
