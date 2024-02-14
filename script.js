// ==UserScript==
// @name         Greet in Chat
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Greet in chat using iMacros script
// @author       You
// @match         https://vac.vap.expedia.com/*
// @grant        none
// ==/UserScript==

//      https://vac.vap.expedia.com/*
//    https://vap.expedia.com/*

(function() {
  'use strict';

  // function waitForElement(selector) {
  //   return new Promise(function(resolve) {
  //     const interval = setInterval(function() {
  //       const element = document.querySelector(selector);
  //       if (element) {
  //         clearInterval(interval);
  //         resolve(element);
  //       }
  //     }, 100);
  //   });
  // }

  function waitForElement(selector, iframe) {
    return new Promise(function(resolve) {
      const interval = setInterval(function() {
        const element = iframe ? iframe.contentDocument.querySelector(selector) : document.querySelector(selector);
        if (element) {
          clearInterval(interval);
          //console.log(element);
          resolve(element);}
        // } else {
        //   console.log(`Element ${selector} not found yet.`);
        //   //console.log(element);
        // }
      }, 100);
    });
  }



  function chgEvt (element) {
    var evt = element.ownerDocument.createEvent("Event");
    evt.initEvent("change", true, false);
    element.dispatchEvent(evt);
    }
  function focusEvt (element) {
        var evt = element.ownerDocument.createEvent("Event");
        evt.initEvent("focus", false, false);
        element.dispatchEvent(evt);
    }

  function sendGreeting() {
    const textareaSelector = 'textarea[id^="mousetrap-footer-0"]';
    const sendButtonSelector = 'button[data-test-id="chat-input-send-button"]';
    const iframeOne = 'iframe[title="Chat Window"]';


    waitForElement(textareaSelector).then(function(textarea) {
        focusEvt(textarea);

        return new Promise(function(resolve) {
          setTimeout(function() {
            textarea.value = "Hello, my name is ";
            //console.log('text');
            chgEvt(textarea);
            resolve();
          }, 1);
        });
       })
      .then(function() {
        return waitForElement(sendButtonSelector);
      })
      .then(function(sendButton) {

        //console.log('button');
        //sendButton.removeAttribute('disabled');
        setTimeout(function() {
          sendButton.click();
        }, 2); //  milliseconds delay
      });
  }


  sendGreeting();

    //console.log('end');
})();
