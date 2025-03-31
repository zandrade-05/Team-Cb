"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
require("../css/estimation.css");
const UserStory_1 = require("./UserStory");
const react_router_dom_1 = require("react-router-dom");
const Cards_1 = require("./Cards");
const storyQueue = new UserStory_1.UserStoryQueue();
const estimations = new UserStory_1.UserStoryQueue();
const cards = new Cards_1.Cards();
let currentStory;
const URL = "http://localhost:8080/api/";
const fetch = axios_1.default.create({
    baseURL: URL,
    headers: {
        "Content-type": "application/json"
    },
    timeout: 1000
});
cards.fetchCards();
storyQueue.fetchStories();
estimations.fetchStories();
const Estimation = () => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("header", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Got Scrum?" }), (0, jsx_runtime_1.jsx)("h5", { children: (0, jsx_runtime_1.jsxs)("strong", { children: ["Team CB's Room", (0, jsx_runtime_1.jsx)("br", {}), "ID: 12345"] }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, { to: "/", children: "Leave" })] }), (0, jsx_runtime_1.jsx)(CurrentQueue, { storyQueue: storyQueue, cards: cards }), (0, jsx_runtime_1.jsx)(StQueue, { storyQueue: storyQueue }), (0, jsx_runtime_1.jsx)(Estimations, { estimations: estimations })] }));
};
const CurrentQueue = (props) => {
    const [currentStoryQueue, setStoryQueue] = react_1.default.useState(props.storyQueue);
    const [currentCards, setCards] = react_1.default.useState(props.cards);
    (0, react_1.useEffect)(() => {
        fetch.get("storyQueue").then((response) => {
            setStoryQueue(response.data.stories);
        });
        fetch.get("cards").then((response) => {
            setCards(response.data.cards);
        });
    }, []);
    currentStory = storyQueue.findAt(0);
    let avg;
    let total = 0;
    let cardsList = cards.getCards();
    const ListCards = () => {
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: cardsList.map((card, i) => ((0, jsx_runtime_1.jsx)(EstimationButton, { card: card }, i))) }));
    };
    return ((0, jsx_runtime_1.jsxs)("section", { id: "currentQueue", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Now estimating:" }), (0, jsx_runtime_1.jsx)("h4", { children: (0, jsx_runtime_1.jsx)(Story, { story: currentStory, list: false }) })] }), (0, jsx_runtime_1.jsx)("h4", { children: "AVG" }), (0, jsx_runtime_1.jsx)("ul", { children: (0, jsx_runtime_1.jsx)(ListCards, {}) })] }));
};
const StQueue = (props) => {
    const [currentStoryQueue, setStoryQueue] = react_1.default.useState(props.storyQueue);
    (0, react_1.useEffect)(() => {
        fetch.get("storyQueue").then((response) => {
            setStoryQueue(response.data.stories);
        });
    }, []);
    const List = () => {
        let stories = [];
        for (let index = 1; index < storyQueue.getLength() - 1; index++) {
            if (index == 2) {
                stories.push((0, jsx_runtime_1.jsx)("li", {}, storyQueue.getLength() + 1));
            }
            stories.push((0, jsx_runtime_1.jsx)(Story, { story: storyQueue.findAt(index), list: true }, index));
        }
        return stories;
    };
    return ((0, jsx_runtime_1.jsxs)("aside", { id: "storyQueue", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Story Queue" }), (0, jsx_runtime_1.jsx)("h6", { children: (0, jsx_runtime_1.jsx)("i", { children: "Up next:" }) }), (0, jsx_runtime_1.jsx)("div", {}), (0, jsx_runtime_1.jsx)("ol", { children: (0, jsx_runtime_1.jsx)(List, {}) }), (0, jsx_runtime_1.jsx)("div", {})] }));
};
const Story = (props) => {
    let story;
    if (props.story !== undefined) {
        story = new UserStory_1.UserStory(props.story.toString());
        storyQueue.addStory(story);
        if (props.list) {
            return ((0, jsx_runtime_1.jsx)("li", { children: story.toString() }));
        }
        else {
            return story.toString();
        }
    }
};
const Estimations = (props) => {
    let story;
    const Estimation = (props) => {
        if (props.userStory !== undefined && props.userStory.getStoryValues() !== undefined) {
            story = new UserStory_1.UserStory(props.userStory.toString(), props.userStory.getStoryValues());
            estimations.addStory(story);
            return ((0, jsx_runtime_1.jsxs)("li", { children: [props.userStory.toString(), ": ", (0, jsx_runtime_1.jsx)("br", {}), props.userStory.getStoryValues()] }));
        }
    };
    const [currentEstimations, setEstimations] = react_1.default.useState(props.estimations);
    (0, react_1.useEffect)(() => {
        fetch.get("estimations").then((response) => {
            setEstimations(response.data);
            console.log(response.data);
            response.data.forEach((story) => {
                estimations.addStory(new UserStory_1.UserStory(story.name, story.storyValues));
            });
        });
    }, []);
    const List = () => {
        let estimatedStories = [];
        for (let index = 0; index < estimations.getLength(); index++) {
            estimatedStories.push((0, jsx_runtime_1.jsx)(Estimation, { userStory: estimations.findAt(index) }, index));
            console.log(estimations.getLength());
        }
        return estimatedStories;
    };
    return ((0, jsx_runtime_1.jsxs)("aside", { id: "estimations", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Estimations" }), (0, jsx_runtime_1.jsx)("ul", { children: (0, jsx_runtime_1.jsx)(List, {}) })] }));
};
const EstimationButton = (props) => {
    const submit = () => {
        if (currentStory != undefined) {
            fetch.post("estimations", { story: currentStory, value: props.card.getValue() });
        }
    };
    return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", { onClick: submit, value: props.card.getValue(), children: props.card.getValue() }) }));
};
exports.default = Estimation;
//# sourceMappingURL=estimation.js.map