import ReactDOM from "react-dom/client";
import Estimation from "./estimation";
import "../../../client/dist/css/common.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JoinRoom, { CreateRoom } from "./home";
const App = () => { // displays page based on functions and url
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"> /* base url path */
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
