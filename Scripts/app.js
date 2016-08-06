/**
 * FileName: app.js
 * 
 * @author Kenneth Bato
 * @date August 5, 2016
 * 
 * StudentID: 300448795
 * website: COMP125-Assignment3-300448795.azurewebsites.net
 * @description This file is the main javascript file for the web site
 */

//IIFE
(function () {
    "use strict";
    //declare object for handling AJAX call
    var xhr;
    //define array containing HTML elements
    var documentElements = [];
    documentElements[0] = document.getElementById("aboutMe");
    documentElements[1] = document.getElementById("projectDescBakery");
    documentElements[2] = document.getElementById("projectDescDairy");
    documentElements[3] = document.getElementById("projectDescProduce");

    //Page switch statement based on the document title tag
     switch (document.title) {
        case "Contact Me":
            //create reference for sendButton and contactForm
            var sendButton = document.getElementById("sendButton");
            var contactForm = document.getElementById("contactForm");

            //create variables for form fields
            var firstName = document.getElementById("firstName");
            var lastName = document.getElementById("lastName");
            var email = document.getElementById("email");
            var contactNumber = document.getElementById("contactNumber");
            var message = document.getElementById("message");

            //create event listener to sendButton to output a message to the console
            sendButton.addEventListener("click", function (event) {
                console.log("clicked");
            });

            //create event listener to contactForm to preventDefault submit behavior
            contactForm.addEventListener("submit", function (event) {
                event.preventDefault();
                showFormInputs();
                contactForm.reset();
                console.log("submitted");
            });

            //display form input values on the console
            function showFormInputs() {
                console.log("*******************************");
                console.log("First Name: " + firstName.value);
                console.log("Last Name : " + lastName.value);
                console.log("Email     : " + email.value);
                console.log("Contact # : " + contactNumber.value);
                console.log("Message   : " + message.value);
                console.log("*******************************");
            }
            break;
    }
    //Function to process AJAX request reponse and process paragraph contents.
    function readData() {
        if ((xhr.readyState === 4) && (xhr.status === 200)) {

            var paragraphContents = JSON.parse(xhr.responseText);
            var content = paragraphContents.paragraphs;

            content.forEach(function (paragraphData) {
                var index = paragraphData["index"];
                var Data = paragraphData["data"];
                console.log(index + " => " + paragraphData);
                if (documentElements[index]) {
                    documentElements[index].innerHTML = Data;
                }
            }, this);
        }
    }

    function init() {
        if (!xhr) {
            xhr = new XMLHttpRequest();
        }
        xhr.abort();
        xhr.open("get", "Scripts/paragraphs.json", true);
        xhr.send(); 
        xhr.onreadystatechange = readData;
    }

    //event loads init function
    window.addEventListener("load", init,false);
})();
