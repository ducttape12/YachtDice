import { ScoringCategory } from "./scoring-category";

export class Player {
    categoryScore: Map<ScoringCategory, number | null>;

    constructor(public name: string) {
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

    private getScore(category: ScoringCategory): number | null {
        const score = this.categoryScore.get(category);

        if (score === undefined) {
            throw RangeError(`Unknown category ${category}`);
        }

        return score;
    }

    getOnesScore(): number | null {
        return this.getScore(ScoringCategory.Ones);
    }

    getTwosScore(): number | null {
        return this.getScore(ScoringCategory.Twos);
    }

    getThreesScore(): number | null {
        return this.getScore(ScoringCategory.Threes);
    }

    getFoursScore(): number | null {
        return this.getScore(ScoringCategory.Fours);
    }

    getFivesScore(): number | null {
        return this.getScore(ScoringCategory.Fives);
    }

    getSixesScore(): number | null {
        return this.getScore(ScoringCategory.Sixes);
    }

    getFullHouseScore(): number | null {
        return this.getScore(ScoringCategory.FullHouse);
    }

    getFourOfAKindScore(): number | null {
        return this.getScore(ScoringCategory.FourOfAKind);
    }

    getLittleStraightScore(): number | null {
        return this.getScore(ScoringCategory.LittleStraight);
    }

    getBigStraightScore(): number | null {
        return this.getScore(ScoringCategory.BigStraight);
    }

    getChoiceScore(): number | null {
        return this.getScore(ScoringCategory.Choice);
    }

    getYachtScore(): number | null {
        return this.getScore(ScoringCategory.Yacht);
    }

    getTotalScore(): number {
        let total = 0;

        for (const [key, value] of this.categoryScore) {
            if (value !== undefined && value !== null) {
                total += value;
            }
        }

        return total;
    }
}
