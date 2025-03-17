import React from "react"
import "./estimation.css"
import { UserStoryQueue, UserStory } from "./UserStory"
import { NavLink } from "react-router-dom"

let storyQueue: UserStoryQueue;
storyQueue = new UserStoryQueue();
storyQueue.addStory(new UserStory("Current User Story"))
storyQueue.addStory(new UserStory("User Story #1"))
storyQueue.addStory(new UserStory("User Story #2"))
storyQueue.addStory(new UserStory("User Story #3"))
storyQueue.addStory(new UserStory("User Story #4"))
storyQueue.addStory(new UserStory("User Story #5"))
let currentStory = storyQueue.nextStory();
let backlog = new UserStoryQueue();
backlog.addStory(new UserStory("US", 1))
backlog.addStory(new UserStory("US", 2))
backlog.addStory(new UserStory("US", 4))
backlog.addStory(new UserStory("US", 8))
backlog.addStory(new UserStory("US", 13))
backlog.addStory(new UserStory("US", 20))
backlog.addStory(new UserStory("US", 40))
backlog.addStory(new UserStory("US", 100))

const Estimation = () => {
    return (<>
        <header>
            <h1>Got Scrum?</h1>
            <h5><strong>Team CB's Room<br />ID: 12345</strong></h5>
            <NavLink to={"/"}>Leave</NavLink>
        </header>
        <CurrentQueue />
        <StQueue />
        <Estimations />
    </>)
}
const CurrentQueue = () => {
    let avg: number;
    let total = 0;
    for (let index = 0; index < backlog.length; index++) {
        total += backlog.findAt(index)?.getStoryValues()!;
    }
    if (backlog.length !== 0) {
        avg = total / backlog.length;
    } else avg = 0;
    return (
        <section id="currentQueue">
            <div>
                <h3>Now estimating:</h3>
                <h4><Story story={currentStory} list={false} /></h4>
            </div>
            <h4>AVG</h4>
            <ul>
                <EstimationButton value={0} />
                <EstimationButton value={2} />
                <EstimationButton value={3} />
                <EstimationButton value={4} />
                <EstimationButton value={8} />
                <EstimationButton value={13} />
                <EstimationButton value={20} />
                <EstimationButton value={40} />
                <EstimationButton value={100} />
            </ul>
        </section>
    )
}
const StQueue = () => {
    const List = () => {
        let stories = []
        for (let index = 0; index < storyQueue.length - 2; index++) {
            if (index == 1) {
                stories.push(<li key={storyQueue.length + 1}></li>)
            }
            stories.push(<Story key={index} story={storyQueue.findAt(index)} list={true} />)
        }
        return stories
    }
    return (
        <aside id="storyQueue">
            <h2>Story Queue</h2>
            <h6><i>Up next:</i></h6>
            <div></div>
            <ol>
                <List />
            </ol>
            <div></div>
        </aside>
    )
}
const Story = (props: { story: UserStory | undefined; list: boolean }) => {
    let story: UserStory;
    if (props.story !== undefined) {
        story = new UserStory(props.story.toString());
        storyQueue.addStory(story)
        if (props.list) {
            return (
                <li>
                    {story.toString()}
                </li>
            )
        } else {
            return story.toString()
        }
    }

}

const Estimations = () => {
    const Estimation = (props: { userStory: UserStory | undefined }) => {
        if (props.userStory !== undefined && props.userStory.getStoryValues() !== undefined) {
            return (
                <li>{props.userStory.toString()}: <br />{props.userStory.getStoryValues()}</li>
            )
        }
    }
    const List = () => {
        let stories = []
        for (let index = 0; index < backlog.length; index++) {
            stories.push(<Estimation key={index} userStory={backlog.findAt(index)} />)
        }
        return stories;
    }
    return (
        <aside id="estimations">
            <h2>Estimations</h2>
            <ul>
                <List />
            </ul>
        </aside>
    )
}
const EstimationButton = (props: { value: number }) => {
    const [currentValue, setNewValue] = React.useState(props.value);
    function reassignValue(newValue: number) {
        setNewValue(newValue);
    }
    function getValue() {
        return currentValue;
    }
    function assignPoints() {

    }
    return (
        <li><button type="submit" onSubmit={assignPoints}>{getValue()}</button></li>
    )
}
export default Estimation;