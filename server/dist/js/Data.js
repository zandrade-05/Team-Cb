"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEstimations = exports.getStoryQueue = exports.getCard = exports.getCards = void 0;
const Cards_1 = require("./Cards");
const UserStory_1 = require("./UserStory");
const cards = [
    new Cards_1.Card(1),
    new Cards_1.Card(2),
    new Cards_1.Card(3),
    new Cards_1.Card(5),
    new Cards_1.Card(8),
    new Cards_1.Card(13),
    new Cards_1.Card(20),
    new Cards_1.Card(40),
    new Cards_1.Card(100)
];
let getCards = () => {
    return cards;
};
exports.getCards = getCards;
let getCard = (id) => {
    return cards.find((card) => card.getValue() === id);
};
exports.getCard = getCard;
const storyQueue = [
    new UserStory_1.UserStory("Current User Story"),
    new UserStory_1.UserStory("User Story #1"),
    new UserStory_1.UserStory("User Story #2"),
    new UserStory_1.UserStory("User Story #3"),
    new UserStory_1.UserStory("User Story #4"),
    new UserStory_1.UserStory("User Story #5"),
];
let getStoryQueue = () => {
    return storyQueue;
};
exports.getStoryQueue = getStoryQueue;
const estimations = [
    new UserStory_1.UserStory("US", 1),
    new UserStory_1.UserStory("US", 2),
    new UserStory_1.UserStory("US", 3),
    new UserStory_1.UserStory("US", 5),
    new UserStory_1.UserStory("US", 8),
    new UserStory_1.UserStory("US", 13),
    new UserStory_1.UserStory("US", 20),
    new UserStory_1.UserStory("US", 40),
    new UserStory_1.UserStory("US", 100)
];
let getEstimations = () => {
    return estimations;
};
exports.getEstimations = getEstimations;
//# sourceMappingURL=Data.js.map