/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/Card.js
class Card {
  constructor(column) {
    this.container = document.querySelector(".container");
    this.column = column;
    this.id = null;
    this.card = null;
    this.text = null;
    this.btn = null;
    this.idReserv = [];
  }
  cardMaP(id) {
    this.id = id;
    return `<div class="card_content data-id_${id}">
                <textarea class="card_input" type="text" placeholder="Enter a title for this card"></textarea>
                <button class="card_delete hidden">&#10006;</button>
                </div>`;
  }
  createCard(col) {
    const element = this.container.querySelector(`.cards_${col}`);
    this.id = this.generateId();
    element.insertAdjacentHTML("beforeend", this.cardMaP(this.id));
    this.card = element.querySelector(`.data-id_${this.id}`);
    this.text = this.card.querySelector(".card_input").value;
    this.btn = this.card.querySelector(".card_delete");
  }
  saveCard() {
    this.text = this.card.querySelector(".card_input").value;
    if (this.text === "") {
      this.delete(this.card);
    }
    this.card.querySelector(".card_input").blur();
  }
  delete() {
    this.card.remove();
  }
  generateId() {
    const id = Math.floor(Math.random() * 1000000);
    if (this.idReserv.includes(id)) {
      return this.generateId();
    }
    this.idReserv.push(id);
    return id;
  }
}
;// CONCATENATED MODULE: ./src/js/Logic.js

class Logic {
  constructor() {
    this.container = null;
    this.actualElement = null;
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.eventCardMove = this.eventCardMove.bind(this);
    this.actualElementClone = null;
  }
  bindToDOM(container) {
    this.container = container;
    this.eventListenerAdd("todo");
    this.eventListenerAdd("progress");
    this.eventListenerAdd("done");
    document.documentElement.addEventListener("mouseup", this.onMouseUp);
  }
  eventListenerAdd(col) {
    const element = this.container.querySelector(`.an_card_add_${col}`);
    element.addEventListener("mousedown", e => {
      e.preventDefault();
      this.addCard(col);
    });
  }
  addCard(col) {
    const add = this.container.querySelector(`.an_card_add_${col}`);
    add.classList.add("hidden");
    const addbtn = this.container.querySelector(`.card_add_${col}`);
    addbtn.classList.remove("hidden");
    const newcard = new Card(col);
    newcard.createCard(col);
    this.eventListenerAddButton(col, newcard);
  }
  eventListenerAddButton(col, newcard) {
    const element = this.container.querySelector(`.card_add_${col}`);
    element.addEventListener("mousedown", e => {
      e.preventDefault();
      this.addCardButon(col, newcard);
    });
  }
  addCardButon(col, newcard) {
    const add = this.container.querySelector(`.an_card_add_${col}`);
    add.classList.remove("hidden");
    const addbtn = this.container.querySelector(`.card_add_${col}`);
    addbtn.classList.add("hidden");
    newcard.saveCard();
    const {
      card
    } = newcard;
    card.addEventListener("mouseover", e => {
      e.preventDefault();
      this.showClose(card, newcard);
    });
    card.addEventListener("mouseout", e => {
      e.preventDefault();
      this.hiddenClose(card);
    });
    card.addEventListener("mousedown", e => {
      e.preventDefault();
      this.actualElement = document.querySelector(`.data-id_${newcard.id}`);
      this.eventCardMove(e);
    });
  }
  showClose(card, newcard) {
    const close = card.querySelector(".card_delete");
    close.classList.remove("hidden");
    close.addEventListener("mousedown", e => {
      e.preventDefault();
      this.closeClick(card, close, newcard);
    });
  }
  closeClick(card, close, newcard) {
    card.remove();
    card.removeEventListener("mouseover", e => {
      e.preventDefault();
      this.showClose(card);
    });
    card.removeEventListener("mouseout", e => {
      e.preventDefault();
      this.hiddenClose(card);
    });
    card.removeEventListener("mousedown", e => {
      e.preventDefault();
      this.actualElement = document.querySelector(`.data-id_${newcard.id}`);
      this.eventCardMove(e);
    });
    close.removeEventListener("mousedown", e => {
      e.preventDefault();
      this.closeClick(card, close);
    });
  }
  hiddenClose(card) {
    const close = card.querySelector(".card_delete");
    close.classList.add("hidden");
    close.removeEventListener("mousedown", e => {
      e.preventDefault();
      this.closeClick(card, close);
    });
  }
  eventCardMove(e) {
    this.cursorX = e.offsetX;
    this.cursorY = e.offsetY;
    this.actualElement.classList.add("dragged");
    document.body.style.cursor = "grabbing";
    document.documentElement.addEventListener("mouseover", this.onMouseOver);
  }
  onMouseOver(e) {
    const {
      pageX,
      pageY
    } = e;
    this.actualElement.style.left = `${pageX - this.cursorX}px`;
    this.actualElement.style.top = `${pageY - this.cursorY}px`;
    this.actualElementClone = this.actualElement.cloneNode(true);
    this.actualElementClone.querySelector(".card_input").className = "card_clone_input";
    this.actualElementClone.className = "card_clone";
    const {
      target
    } = e;
    const targetColumn = target.closest(".column-item");
    if (target.closest(".card_content")) {
      if (document.querySelector(".card_clone") !== null) {
        document.querySelector(".card_clone").remove();
      }
      target.closest(".cards").insertBefore(this.actualElementClone, target.closest(".card_content"));
    } else if (targetColumn !== null) {
      if (document.querySelector(".card_clone") !== null) {
        document.querySelector(".card_clone").remove();
      }
      targetColumn.querySelector(".cards").appendChild(this.actualElementClone);
    } else if (!target.closest(".card_content") && !target.closest(".column-item") && document.querySelector(".card_clone") !== null) {
      document.querySelector(".card_clone").remove();
    }
    if (this.actualElementClone !== null) {
      this.actualElementClone.addEventListener("mouseup", this.onMouseUp);
    }
  }
  onMouseUp(e) {
    const {
      target
    } = e;
    if (document.querySelector(".dragged") !== null) {
      const targetColumn = target.closest(".column-item");
      const targetClone = target.closest(".card_clone");
      if (targetColumn !== null) {
        targetColumn.querySelector(".cards").insertBefore(this.actualElement, this.actualElementClone);
        document.querySelector(".card_clone").remove();
        this.actualElement.classList.remove("dragged");
        this.actualElement = undefined;
        document.body.style.cursor = "auto";
        this.actualElementClone.removeEventListener("mouseup", this.onMouseUp);
        document.documentElement.removeEventListener("mouseover", this.onMouseOver);
        return;
      }
      if (targetClone !== null) {
        const place = document.elementFromPoint(e.clientX, e.clientY);
        if (place.closest(".card_content")) {
          place.closest(".cards").insertBefore(this.actualElement, place.closest(".card_content"));
        } else {
          place.closest(".cards").appendChild(this.actualElement);
        }
        document.querySelector(".card_clone").remove();
        this.actualElement.classList.remove("dragged");
        this.actualElement = undefined;
        document.body.style.cursor = "auto";
        this.actualElementClone.removeEventListener("mouseup", this.onMouseUp);
        document.documentElement.removeEventListener("mouseover", this.onMouseOver);
        return;
      }
      this.actualElement.classList.remove("dragged");
      this.actualElement = undefined;
      document.body.style.cursor = "auto";
      this.actualElementClone.removeEventListener("mouseup", this.onMouseUp);
      document.documentElement.removeEventListener("mouseover", this.onMouseOver);
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const card = new Logic();
card.bindToDOM(document.querySelector(".container"));
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;