"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoom = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
require("../css/index.css");
const JoinRoom = () => {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: "index", children: [(0, jsx_runtime_1.jsx)("h1", { children: "Got Scrum?" }), (0, jsx_runtime_1.jsx)(Form, { type: "join" }), (0, jsx_runtime_1.jsx)("footer", { children: (0, jsx_runtime_1.jsxs)("p", { children: ["Create your own room for free here: ", (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, { to: "/create-room", children: "Create New Room" })] }) })] }) }));
};
const CreateRoom = () => {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: "index", children: [(0, jsx_runtime_1.jsx)("h1", { children: "Create Room" }), (0, jsx_runtime_1.jsx)(Form, { type: "create" }), (0, jsx_runtime_1.jsx)("footer", { children: (0, jsx_runtime_1.jsxs)("p", { children: ["Join a room for free here: ", (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, { to: "/", children: "Join Room" })] }) })] }) }));
};
exports.CreateRoom = CreateRoom;
const Form = (props) => {
    let navigate = (0, react_router_dom_1.useNavigate)();
    let action;
    let nameField;
    let buttonText;
    if (props.type == "join") {
        action = "/estimate";
        nameField = "Name:";
        buttonText = "Estimate!";
    }
    else if (props.type == "create") {
        action = "/";
        nameField = "Room Name:";
        buttonText = "Submit!";
    }
    else {
        return null;
    }
    let actionEvent = () => {
        navigate(action);
    };
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: actionEvent, children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "name", children: nameField }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "name", name: "name", required: true }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("label", { htmlFor: "roomnum", children: "Room ID:" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "roomnum", name: "roomnum", required: true }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("button", { type: "submit", children: buttonText })] }));
};
exports.default = JoinRoom;
//# sourceMappingURL=home.js.map