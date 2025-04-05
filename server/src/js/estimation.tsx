import React, { useEffect } from "react"
import axios from "axios"
import "../../../client/dist/css/estimation.css" 
import { UserStoryQueue, UserStory } from "./UserStory"
import { NavLink } from "react-router-dom"
import { Card, Cards } from "./Cards"
const storyQueue: UserStoryQueue = new UserStoryQueue();
const estimations: UserStoryQueue = new UserStoryQueue();
const cards: Cards = new Cards();
let currentStory: UserStory | undefined;
const URL = window.location.protocol + "//" + window.location.host + "/api/"; // base url for http requests

const fetch = axios.create({
    baseURL: URL,
    headers: {
        "Content-type": "application/json"
    },
    timeout: 1000 // timeout in ms for http requests
});

cards.fetchCards();
storyQueue.fetchStories();
estimations.fetchStories();

const Estimation = () => { // returns Estimation page
    return (<>
        <header>
            <h1>Got Scrum?</h1>
            <h5><strong>Team CB's Room<br />ID: 12345</strong></h5>
            <NavLink to={"/"}>Leave</NavLink>
        </header>
        <CurrentQueue storyQueue={storyQueue} cards={cards} />
        <StQueue storyQueue={storyQueue} />
        <Estimations estimations={estimations} />
    </>)
}
const CurrentQueue = (props: { storyQueue: UserStoryQueue; cards: Cards }) => { // returns middle section of Estimation page
    const [currentStoryQueue, setStoryQueue] = React.useState(props.storyQueue);
    const [currentCards, setCards] = React.useState(props.cards);
    useEffect(() => { // gets data for current section
        fetch.get("storyQueue").then((response) => {
            setStoryQueue(response.data.stories);
        })
        fetch.get("cards").then((response) => {
            setCards(response.data.cards);
        })
    }, [])


    currentStory = storyQueue.findAt(0);
    let avg: number;
    let total = 0;
    let cardsList = cards.getCards();
    const ListCards = () => { // returns Estimation card buttons
        return (
            <>
                {cardsList.map((card, i) => (

                    <EstimationButton key={i} card={card} />
                ))}
            </>
        );
    }
    return (
        <section id="currentQueue">
            <div>
                <h3>Now estimating:</h3>
                <h4><Story story={currentStory} list={false} /></h4>
            </div>
            <h4>AVG</h4>
            <ul>
                <ListCards />
            </ul>
        </section>
    )

}
const StQueue = (props: { storyQueue: UserStoryQueue }) => { // returns the storyqueue section
    const [currentStoryQueue, setStoryQueue] = React.useState(props.storyQueue);
    useEffect(() => { // gets stories for storyqueue
        fetch.get("storyQueue").then((response) => {
            setStoryQueue(response.data.stories);
        })
    }, [])
    const List = () => { // returns a list of stories for storyqueue
        let stories = []
        for (let index = 1; index < storyQueue.getLength() - 1; index++) {
            if (index == 2) {
                stories.push(<li key={storyQueue.getLength() + 1}></li>)
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
            <form><button>Add Story</button></form>
        </aside>
    )
}
const Story = (props: { story: UserStory | undefined; list: boolean }) => { // returns a single story to be listed on the storyQueue
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

const Estimations = (props: { estimations: UserStoryQueue }) => { // returns already estimated stories section
    let story: UserStory;
<<<<<<< HEAD

    const getStyleClass = (value: number) => {
        if (value <= 3) return "story-small";
        if (value <= 5) return "story-medium";
        return "story-large";
    }    
    const Estimation = (props: { userStory: UserStory | undefined }) => {
=======
    const Estimation = (props: { userStory: UserStory | undefined }) => { // returns an already estimated story
>>>>>>> d228749522d0688ac9af738ee3f8ced808a11e38
        if (props.userStory !== undefined && props.userStory.getStoryValues() !== undefined) {
            story = new UserStory(props.userStory.toString(), props.userStory.getStoryValues());
            estimations.addStory(story)
            return (
                <li className={getStyleClass(props.userStory.getStoryValues()!)}>
                {props.userStory.toString()}: <br />{props.userStory.getStoryValues()}
                </li>
            )
        }
    }
    const [currentEstimations, setEstimations] = React.useState(props.estimations);
    useEffect(() => { // gets estimated stories
        fetch.get("estimations").then((response) => {
            setEstimations(response.data);
            response.data.forEach((story: any) => {
                estimations.addStory(new UserStory(story.name, story.storyValues))
            }
            )
        })
    }, [])
    const List = () => { // returns already estimated stories as a list
        let estimatedStories = [];

        for (let index = 0; index < estimations.getLength(); index++) {
            estimatedStories.push(<Estimation key={index} userStory={estimations.findAt(index)} />)
        }
        return estimatedStories;
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
const EstimationButton = (props: { card: Card }) => { // returns a single estimation card button
    const submit = () => {
        if (currentStory != undefined) {
            fetch.post("estimations", { story: currentStory, value: props.card.getValue() })
        }
        
    }
    return (
        <li><button onClick={submit} value={props.card.getValue()}>{props.card.getValue()}</button></li>
    )
}
export default Estimation;