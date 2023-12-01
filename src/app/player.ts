import { ScoringCategory } from "./scoring-category";

export class Player {
    private categoryScore:Map<ScoringCategory, number | null>;

    constructor(public name:string) {
        this.categoryScore = new Map<ScoringCategory, number | null>();
        this.categoryScore.set(ScoringCategory.Ones, null);
        this.categoryScore.set(ScoringCategory.Twos, null);
        this.categoryScore.set(ScoringCategory.Threes, null);
        this.categoryScore.set(ScoringCategory.Fours, null);
        this.categoryScore.set(ScoringCategory.Fives, null);
        this.categoryScore.set(ScoringCategory.Sixes, null);
        this.categoryScore.set(ScoringCategory.FullHouse, null);
        this.categoryScore.set(ScoringCategory.FourOfAKind, null);
        this.categoryScore.set(ScoringCategory.LittleStraight, null);
        this.categoryScore.set(ScoringCategory.BigStraight, null);
        this.categoryScore.set(ScoringCategory.Choice, null);
        this.categoryScore.set(ScoringCategory.Yacht, null);
    }

    private getScore(category:ScoringCategory):string {
        const score = this.categoryScore.get(category)

        if (score === null || score === undefined) {
            return '';
        } else {
            return score?.toString();
        }
    }

    getOnesScore():string {
        return this.getScore(ScoringCategory.Ones);
    }

    getTwosScore():string {
        return this.getScore(ScoringCategory.Twos);
    }

    getThreesScore():string {
        return this.getScore(ScoringCategory.Threes);
    }

    getFoursScore():string {
        return this.getScore(ScoringCategory.Fours);
    }

    getFivesScore():string {
        return this.getScore(ScoringCategory.Fives);
    }

    getSixesScore():string {
        return this.getScore(ScoringCategory.Sixes);
    }

    getFullHouseScore():string {
        return this.getScore(ScoringCategory.FullHouse);
    }

    getFourOfAKindScore():string {
        return this.getScore(ScoringCategory.FourOfAKind);
    }

    getLittleStraightScore():string {
        return this.getScore(ScoringCategory.LittleStraight);
    }

    getBigStraightScore():string {
        return this.getScore(ScoringCategory.BigStraight);
    }

    getChoiceScore():string {
        return this.getScore(ScoringCategory.Choice);
    }

    getYachtScore():string {
        return this.getScore(ScoringCategory.Yacht);
    }

    getTotalScore():number {
        let total = 0;
        
        for(const [key, value] of this.categoryScore) {
            if(value !== undefined && value !== null) {
                total += value;
            }
        }

        return total;
    }
}
