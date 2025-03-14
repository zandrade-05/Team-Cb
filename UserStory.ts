class UserStory {
    private name: string;
    private description: string;
    private storyValues: number;
    
    constructor(name: string) {
        this.name = name;
    }
    public setStoryValues(): void {
        this.storyValues = 0;
    }

    public setDescription(): void { }

    public getStoryValues(): number {
        return this.storyValues;
    }

    public getDescription(): string {
        return `${this.description}`;
    }
    
    public toString(): string {
        return `${this.name}`;
    }
}

class StoryQueue {
    private stories: UserStory[];
    constructor() {
        this.stories = [];
    }
    // add to the array
    public addStory(): void {
        this.stories.push(this.stories[]);

    }
    // get the next element in the array
    public nextStory(): UserStory | undefined {
        //guard statement
        if (this.stories.length === 0) {
            return this.stories.pop();
        } else {
            return undefined;
        }
    }
}
export {UserStory, StoryQueue};