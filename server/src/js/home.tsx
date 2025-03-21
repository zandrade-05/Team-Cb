import React from "react"
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../css/index.css"
const JoinRoom = () => {
    return (<>
        <div className="index">
            <h1>Got Scrum?</h1>
            <Form type="join" />
            <footer>
                <p>Create your own room for free here: <NavLink to={"/create-room"}>Create New Room</NavLink></p>
            </footer>

        </div>
    </>);
}
const CreateRoom = () => {
    return (<>
        <div className="index">
            <h1>Create Room</h1>
            <Form type="create" />
            <footer>
                <p>Join a room for free here: <NavLink to={"/"}>Join Room</NavLink></p>
            </footer>
        </div>
    </>)
}
const Form = (props: { type: string; }) => {
    let navigate = useNavigate();
    let action: string;
    let nameField: string;
    let buttonText: string;

    if (props.type == "join") {
        action = "/estimate";
        nameField = "Name:"
        buttonText = "Estimate!"
    } else if (props.type == "create") {
        action = "/";
        nameField = "Room Name:"
        buttonText = "Submit!"
    } else {
        return null;
    }
    let actionEvent = () => {
        navigate(action)
    }
    return (
        <form onSubmit={actionEvent} >
            <label htmlFor="name">{nameField}</label>
            <input type="text" id="name" name="name" required /><br /><br />
            <label htmlFor="roomnum">Room ID:</label>
            <input type="text" id="roomnum" name="roomnum" required /><br /><br />
            <button type="submit">{buttonText}</button>
        </form>
    );
}
export default JoinRoom;
export { CreateRoom }