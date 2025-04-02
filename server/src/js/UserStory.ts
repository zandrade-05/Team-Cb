import axios from "axios";
class UserStory {
    private name: string;
    private description: string;
    private storyValues: number | undefined;
    constructor(name = "", storyValues: undefined | number = undefined) {
        this.name = name;
        this.description = "";
        this.storyValues = storyValues;
    }
    public setStoryValues(value: number): void {
        this.storyValues = value;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getStoryValues(): number | undefined {
        return this.storyValues;
    }

    public getDescription(): string {
        return `${this.description}`;
    }

    public toString(): string {
        return `${this.name}`;
    }
}

class UserStoryQueue {
    private stories: UserStory[];
    constructor() {
        this.stories = [];
    }
    public async fetchStories(): Promise<void> {
        const URL = window.location.protocol + "//" + window.location.host + "/api/"; // base url for http requests
        let responses: any[] = [];
        await axios.get(URL + "storyQueue")
            .then((response) => {
                responses = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
        responses.forEach((story: any) => {
            this.addStory(new UserStory(story.name, undefined));
        }
        )
    }
    // add to the array
    public addStory(story: UserStory): void {
        this.stories.push(story);
    }
    public isNext(): boolean {
        return this.stories.length != 0;
    }
    public findAt(i: number): UserStory | undefined {
        return this.stories[i];
    }
    public getLength(): number {
        return this.stories.length
    }
    public removeStory(id: number): void {
        this.stories.splice(id, 1);
    }
    // get the next element in the array
    public nextStory(): UserStory | undefined {
        let next = this.stories.shift();
        return next;
    }
    public getStories(): UserStory[] {
        return this.stories;
    }
}
export { UserStory, UserStoryQueue };
