//Feedback Pojo class

export default class Feedback{
    uid! : string;
    rating! : string;
    text! : string;

    constructor(uid : string, rating : string, text : string){
        this.uid = uid;
        this.rating = rating;
        this.text = text;
    }
}