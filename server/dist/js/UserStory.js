"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStoryQueue = exports.UserStory = void 0;
const axios_1 = __importDefault(require("axios"));
const URL = "http://localhost:8080/api/";
class UserStory {
    constructor(name = "", storyValues = undefined) {
        this.name = name;
        this.description = "";
        this.storyValues = storyValues;
    }
    setStoryValues(value) {
        this.storyValues = value;
    }
    setDescription(description) {
        this.description = description;
    }
    getStoryValues() {
        return this.storyValues;
    }
    getDescription() {
        return `${this.description}`;
    }
    toString() {
        return `${this.name}`;
    }
}
exports.UserStory = UserStory;
class UserStoryQueue {
    constructor() {
        this.stories = [];
    }
    async fetchStories() {
        let responses = [];
        await axios_1.default.get(URL + "storyQueue")
            .then((response) => {
            responses = response.data;
        })
            .catch((error) => {
            console.log(error);
        });
        responses.forEach((story) => {
            this.addStory(new UserStory(story.name, undefined));
        });
    }
    // add to the array
    addStory(story) {
        this.stories.push(story);
    }
    isNext() {
        return this.stories.length != 0;
    }
    findAt(i) {
        return this.stories[i];
    }
    getLength() {
        return this.stories.length;
    }
    removeStory(id) {
        this.stories.splice(id, 1);
    }
    // get the next element in the array
    nextStory() {
        let next = this.stories.shift();
        return next;
    }
    getStories() {
        return this.stories;
    }
}
exports.UserStoryQueue = UserStoryQueue;
//# sourceMappingURL=UserStory.js.map