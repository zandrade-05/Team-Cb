import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Estimation from "./estimation";
import "./common.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JoinRoom, { CreateRoom } from "./home";
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route path="" element={<JoinRoom />} />
                    <Route path="create-room" element={<CreateRoom />} />
                    <Route path="estimate" element={<Estimation />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
};
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
