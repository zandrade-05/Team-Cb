import React, { use, useEffect } from "react"
import axios from "axios"
import "../css/estimation.css"
import { UserStoryQueue, UserStory } from "./UserStory"
import { NavLink } from "react-router-dom"
import { Card, Cards } from "./Cards"
import { log } from "console"
const storyQueue: UserStoryQueue = new UserStoryQueue();
const estimations: UserStoryQueue = new UserStoryQueue();
const cards: Cards = new Cards();
let currentStory: UserStory | undefined;
const URL = "http://localhost:8080/api/";

const fetch = axios.create({
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
const CurrentQueue = (props: { storyQueue: UserStoryQueue; cards: Cards }) => {
    const [currentStoryQueue, setStoryQueue] = React.useState(props.storyQueue);
    const [currentCards, setCards] = React.useState(props.cards);
    useEffect(() => {
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
    const ListCards = () => {
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
const StQueue = (props: { storyQueue: UserStoryQueue }) => {
    const [currentStoryQueue, setStoryQueue] = React.useState(props.storyQueue);
    useEffect(() => {
        fetch.get("storyQueue").then((response) => {
            setStoryQueue(response.data.stories);
        })
    }, [])
    const List = () => {
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

const Estimations = (props: { estimations: UserStoryQueue }) => {
    let story: UserStory;
    const Estimation = (props: { userStory: UserStory | undefined }) => {
        if (props.userStory !== undefined && props.userStory.getStoryValues() !== undefined) {
            story = new UserStory(props.userStory.toString(), props.userStory.getStoryValues());
            estimations.addStory(story)
            return (
                <li>{props.userStory.toString()}: <br />{props.userStory.getStoryValues()}</li>
            )
        }
    }
    const [currentEstimations, setEstimations] = React.useState(props.estimations);
    useEffect(() => {
        fetch.get("estimations").then((response) => {
            setEstimations(response.data);
            console.log(response.data);
            response.data.forEach((story: any) => {
                estimations.addStory(new UserStory(story.name, story.storyValues))
            }
            )
        })
    }, [])
    const List = () => {
        let estimatedStories = [];

        for (let index = 0; index < estimations.getLength(); index++) {
            estimatedStories.push(<Estimation key={index} userStory={estimations.findAt(index)} />)
            console.log(estimations.getLength());
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
const EstimationButton = (props: { card: Card }) => {
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