"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const Data_1 = require("./Data");
const port = 8080;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
app.use((inRequest, inResponse, inNext) => {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With.Content-Type,Accept");
    inNext();
});
app.get("/api/cards", (inRequest, inResponse) => {
    inResponse.type("json");
    inResponse.json((0, Data_1.getCards)());
});
app.get("/api/cards/:id", (inRequest, inResponse) => {
    inResponse.type("json");
    const id = parseInt(inRequest.params.id);
    inResponse.json((0, Data_1.getCard)(id));
});
app.get("/api/storyQueue", (inRequest, inResponse) => {
    inResponse.type("json");
    inResponse.json((0, Data_1.getStoryQueue)());
});
app.get("/api/estimations", (inRequest, inResponse) => {
    inResponse.type("json");
    inResponse.json((0, Data_1.getEstimations)());
});
app.get("/02beb6f43de7e44d0a24.ttf", (inRequest, inResponse) => {
    inResponse.sendFile(path_1.default.join(__dirname, "../../../client/dist/02beb6f43de7e44d0a24.ttf"));
});
app.get("/main.js", (inRequest, inResponse) => {
    inResponse.sendFile(path_1.default.join(__dirname, "../../../client/dist/main.js"));
});
app.get("/*", (inRequest, inResponse) => {
    inResponse.sendFile(path_1.default.join(__dirname, "../../../client/dist/index.html"));
});
app.post("/api/estimations", (inRequest, inResponse) => {
    inResponse.type("json");
    inResponse.json(inRequest.body);
    console.log(inRequest.body);
});
app.listen(port, () => { console.log("Server listening on port: " + port); });
//# sourceMappingURL=main.js.map