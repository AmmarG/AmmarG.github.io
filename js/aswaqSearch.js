"use strict";
function autoComplete(selectorID, searchURL) {
  this.selector = selectorID;
  this.url = searchURL;
  this.currentFocus = -1;
  this.DomEl = document.getElementById(`${this.selector}`);
  this.searchHandle = function(e, data) {
    var container,
      val = e.currentTarget.value,
      that = e.currentTarget;
    this.closeAllLists();
    if (!val) {
      return false;
    }
    this.currentFocus = -1;
    container = document.createElement("DIV");
    container.setAttribute("id", that.id + "suggestions");
    container.setAttribute("class", "suggestions-items");
    that.parentNode.appendChild(container);
    data.list.forEach(element => {
      //([^ء-ي]+[ء-ي])|([A-Z])|([a-z])|([0-9])|([ء-ي])
      //([ء-ي])
      //var pattern = /([ء-ي])/;
      if (element.label.search(val) > -1) {
        // console.log(element.label);
        var list = document.createElement("DIV");
        // var re = new RegExp(val, "g");

        list.innerHTML = element.label;
        list.innerHTML +=
          "<input class='suggestions' type='hidden' value='" +
          element.label +
          "'>";
        list.addEventListener(
          "click",
          function(e) {
            this.DomEl.value = list.getElementsByTagName("input")[0].value;
            this.closeAllLists();
          }.bind(this)
        );
        container.appendChild(list);
      }
    });
  }.bind(this);
  this.makeRequest = async function() {
    var source, data;
    try {
      source = await fetch("/js/aswaq.json");
      data = await source.json();
    } catch (e) {
      console.log(e);
    }
    var Dom = this.DomEl;

    Dom.addEventListener(
      "input",
      function(e) {
        this.searchHandle(e, data);
      }.bind(this),
      false
    );
    this.DomEl.addEventListener(
      "keydown",
      function(e) {
        var DomList = document.getElementById(this.selector + "suggestions");
        if (DomList) DomList = DomList.getElementsByTagName("div");
        if (DomList)
          switch (e.keyCode) {
            case 40:
              this.currentFocus++;
              this.addActive(DomList);
              break;
            case 38:
              this.currentFocus--;
              this.addActive(DomList);
              break;
            case 13:
              e.preventDefault();
              if (this.currentFocus > -1) {
                if (DomList) DomList[this.currentFocus].click();
              }
              break;
          }
      }.bind(this)
    );
  };
  this.addActive = function(suggestions) {
    if (!suggestions) return false;
    this.removeActive(suggestions);
    if (this.currentFocus >= suggestions.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = suggestions.length - 1;
    suggestions[this.currentFocus].classList.add("current-active");
  };
  this.removeActive = function(suggestions) {
    for (var i = 0; i < suggestions.length; i++) {
      suggestions[i].classList.remove("current-active");
    }
  };
  this.closeAllLists = function(element) {
    var suggestions = document.getElementsByClassName("suggestions-items");
    for (var i = 0; i < suggestions.length; i++) {
      if (element != suggestions[i] && element != this.DomEl) {
        suggestions[i].parentNode.removeChild(suggestions[i]);
      }
    }
  };
}
var ss = new autoComplete("aswaqSearch", "./aswaq.json");
document.addEventListener("click", function(e) {
  ss.closeAllLists(e.target);
});

ss.makeRequest();
