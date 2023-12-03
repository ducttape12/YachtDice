import { ScoringCategory } from "./scoring-category";

export class Player {
    onesScore: number | null = null;
    twosScore: number | null = null;
    threesScore: number | null = null;
    foursScore: number | null = null;
    fivesScore: number | null = null;
    sixesScore: number | null = null;
    fullHouseScore: number | null = null;
    fourOfAKindScore: number | null = null;
    littleStraightScore: number | null = null;
    bigStraightScore: number | null = null;
    choiceScore: number | null = null;
    yachtScore: number | null = null;

    constructor(public name: string) {

    }

    private nullToZero(value: number | null): number {
        if (value === null) {
            return 0;
        }

        return value;
    }

    getTotalScore(): number {
        return this.nullToZero(this.onesScore) +
            this.nullToZero(this.twosScore) +
            this.nullToZero(this.threesScore) +
            this.nullToZero(this.foursScore) +
            this.nullToZero(this.fivesScore) +
            this.nullToZero(this.sixesScore) +
            this.nullToZero(this.fullHouseScore) +
            this.nullToZero(this.fourOfAKindScore) +
            this.nullToZero(this.littleStraightScore) +
            this.nullToZero(this.bigStraightScore) +
            this.nullToZero(this.choiceScore) +
            this.nullToZero(this.yachtScore);
    }

    scoreCardFull(): boolean {
        return this.onesScore !== null &&
            this.onesScore !== null &&
            this.twosScore !== null &&
            this.threesScore !== null &&
            this.foursScore !== null &&
            this.fivesScore !== null &&
            this.sixesScore !== null &&
            this.fullHouseScore !== null &&
            this.fourOfAKindScore !== null &&
            this.littleStraightScore !== null &&
            this.bigStraightScore !== null &&
            this.choiceScore !== null &&
            this.yachtScore !== null;
    }
}
