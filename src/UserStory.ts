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
    public length: number;
    constructor() {
        this.stories = [];
        this.length = this.stories.length;
    }
    // add to the array
    public addStory(story: UserStory): void {
        this.stories.push(story);
        this.length = this.stories.length;
    }
    public isNext(): boolean {
        return this.stories.length != 0;
    }
    public findAt(i: number): UserStory | undefined {
        return this.stories.at(i);
    }
    // get the next element in the array
    public nextStory(): UserStory | undefined {
        let next = this.stories.shift();
        this.length = this.stories.length;
        return next;
    }

}
export { UserStory, UserStoryQueue };