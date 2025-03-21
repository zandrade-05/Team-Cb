"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cards = exports.Card = void 0;
const axios_1 = __importDefault(require("axios"));
const URL = "http://localhost:8080/api/";
class Card {
    constructor(cardValue) {
        this.cardValue = cardValue;
    }
    setValue(newValue) {
        this.cardValue = newValue;
    }
    getValue() {
        return this.cardValue;
    }
}
exports.Card = Card;
class Cards {
    constructor() {
        this.cards = [];
    }
    async fetchCards() {
        let responses = [];
        await axios_1.default.get(URL + "cards")
            .then((response) => {
            responses = response.data;
        })
            .catch((error) => {
            console.log(error);
        });
        for (let i = 0; i < responses.length; i++) {
            this.cards.push(new Card(responses[i].cardValue));
        }
    }
    addCard(card) {
        this.cards.push(card);
    }
    isNext() {
        return this.cards.length != 0;
    }
    getCardAt(i) {
        return this.cards[i];
    }
    getLength() {
        return this.cards.length;
    }
    getCards() {
        return this.cards;
    }
}
exports.Cards = Cards;
//# sourceMappingURL=Cards.js.map