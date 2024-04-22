export class Quote {
    id: string;
    text: string;
    date: string;

    constructor(
        id: string,
        text: string,
        date: string
    ) {
        this.text = text;
        this.date = date;
        this.id = id;
    }
}
