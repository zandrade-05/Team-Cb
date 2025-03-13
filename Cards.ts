class Card {
    private cardValue: number;
    
    constructor(cardValue: number) {
        this.cardValue = cardValue;
    }

    setValue(newValue: number) {
        this.cardValue = newValue;
    }

    getValue() {
        return this.cardValue;
    }
}

export {Card};
