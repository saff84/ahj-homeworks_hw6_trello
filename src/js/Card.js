export default class Card {
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
