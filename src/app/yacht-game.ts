import { Die } from "./die";
import { GameState } from "./game-state";
import { Player } from "./player";

const RollableState = [GameState.WaitingForFirstRoll, GameState.WaitingForSecondRoll, GameState.WaitingForThirdRoll];
const DiceCount = 5;

export class YachtGame {
    players: Player[] = [];
    currentPlayerIndex = 0;
    dice: Die[] = [];
    gameState: GameState = GameState.WaitingForFirstRoll;

    constructor(playerCount: number) {
        for (let i = 0; i < playerCount; i++) {
            this.players.push(new Player(`Player ${i + 1}`));
        }

        this.initializeDice();
    }

    private initializeDice() {
        this.dice = [];
        for (let i = 0; i < DiceCount; i++) {
            this.dice.push(new Die());
        }
    }

    currentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }

    nextPlayer(): void {
        this.currentPlayerIndex++;
        if (this.currentPlayerIndex >= this.players.length) {
            this.currentPlayerIndex = 0;
        }
        this.gameState = GameState.WaitingForFirstRoll;
    }

    playerCanRoll(): boolean {
        const allDiceOnHold = this.dice.filter(d => d.held).length == this.dice.length;

        return !allDiceOnHold && RollableState.includes(this.gameState);
    }

    rollDice() {
        if (!this.playerCanRoll()) {
            return;
        }

        if (this.gameState == GameState.WaitingForFirstRoll) {
            this.initializeDice();
        }

        console.log(JSON.stringify(this.dice));

        for (let i = 0; i < this.dice.length; i++) {
            const currentDie = this.dice[i];

            if (!currentDie.held) {
                const newValue = Math.floor(Math.random() * 6) + 1;
                currentDie.value = newValue;
            }
        }

        this.progressState();
    }

    private progressState() {
        switch (this.gameState) {
            case GameState.WaitingForFirstRoll:
                this.gameState = GameState.WaitingForSecondRoll;
                break;
            case GameState.WaitingForSecondRoll:
                this.gameState = GameState.WaitingForThirdRoll;
                break;
            case GameState.WaitingForThirdRoll:
                this.gameState = GameState.WaitingForFinalCategorySelection;
                break;
            case GameState.WaitingForFinalCategorySelection:
                this.gameState = GameState.WaitingForFirstRoll;
                break;
        }
    }

    getCurrentValueScore(value: number, recordedScore: number | null): number | null {
        const currentScore = this.dice.filter(d => d.value === value).length * value;

        return recordedScore === null ? currentScore : null;
    }

    recordScore(score: number | null, recordScoreFn: (score: number) => void) {
        if(score === null) {
            return;
        }

        recordScoreFn(score);
        this.nextPlayer();
    }

    getCurrentOnesScore(): number | null {
        return this.getCurrentValueScore(1, this.currentPlayer().onesScore);
    }

    recordOnesScore(): void {
        this.recordScore(this.getCurrentOnesScore(), (score) => this.currentPlayer().onesScore = score);
    }

    getCurrentTwosScore(): number | null {
        return this.getCurrentValueScore(2, this.currentPlayer().twosScore);
    }

    recordTwosScore(): void {
        this.recordScore(this.getCurrentTwosScore(), (score) => this.currentPlayer().twosScore = score);
    }

    getCurrentThreesScore(): number | null {
        return this.getCurrentValueScore(3, this.currentPlayer().threesScore);
    }

    recordThreesScore(): void {
        this.recordScore(this.getCurrentThreesScore(), (score) => this.currentPlayer().threesScore = score);
    }

    getCurrentFoursScore(): number | null {
        return this.getCurrentValueScore(4, this.currentPlayer().foursScore);
    }

    recordFoursScore(): void {
        this.recordScore(this.getCurrentFoursScore(), (score) => this.currentPlayer().foursScore = score);
    }

    getCurrentFivesScore(): number | null {
        return this.getCurrentValueScore(5, this.currentPlayer().fivesScore);
    }

    recordFivesScore(): void {
        this.recordScore(this.getCurrentFivesScore(), (score) => this.currentPlayer().fivesScore = score);
    }

    getCurrentSixesScore(): number | null {
        return this.getCurrentValueScore(6, this.currentPlayer().sixesScore);
    }

    recordSixesScore(): void {
        this.recordScore(this.getCurrentSixesScore(), (score) => this.currentPlayer().sixesScore = score);
    }

    private shallowSortedDiceCopy(): Die[] {
        const shallowDiceCopy = [...this.dice];

        shallowDiceCopy.sort((a, b) => {
            if (a.value < b.value) {
                return -1;
            } else if (a.value === b.value) {
                return 0;
            } else {
                return 1;
            }
        });

        return shallowDiceCopy;
    }

    getCurrentFullHouseScore(): number | null {
        const recordedFullHouseScore = this.currentPlayer().fullHouseScore;
        if (recordedFullHouseScore !== null) {
            return null;
        }

        const shallowSortedDiceCopy = this.shallowSortedDiceCopy();

        const firstTwoAndLastThreeEqual =
            shallowSortedDiceCopy[0].value === shallowSortedDiceCopy[1].value &&
            shallowSortedDiceCopy[2].value === shallowSortedDiceCopy[3].value &&
            shallowSortedDiceCopy[2].value === shallowSortedDiceCopy[4].value;

        const firstThreeAndLastTwoEqual =
            shallowSortedDiceCopy[0].value === shallowSortedDiceCopy[1].value &&
            shallowSortedDiceCopy[0].value === shallowSortedDiceCopy[2].value &&
            shallowSortedDiceCopy[3].value === shallowSortedDiceCopy[4].value;

        if (!firstTwoAndLastThreeEqual && !firstThreeAndLastTwoEqual) {
            return 0;
        }

        const currentFullHouseScore = this.dice.reduce((acc, cur) => acc + cur.value, 0);
        return currentFullHouseScore;
    }

    recordFullHouseScore(): void {
        this.recordScore(this.getCurrentFullHouseScore(), (score) => this.currentPlayer().fullHouseScore = score);
    }

    getCurrentFourOfAKindScore(): number | null {
        const recordedFourOfAKind = this.currentPlayer().fourOfAKindScore;
        if (recordedFourOfAKind !== null) {
            return null;
        }

        const shallowSortedDiceCopy = this.shallowSortedDiceCopy();

        const lowestDieValue = shallowSortedDiceCopy[0].value;
        const lowestMatchCount = shallowSortedDiceCopy
            .filter(d => d.value === lowestDieValue).length;
        const highestDieValue = shallowSortedDiceCopy[shallowSortedDiceCopy.length - 1].value;
        const highestMatchCount = shallowSortedDiceCopy
            .filter(d => d.value === highestDieValue).length;

        if (lowestMatchCount === 4) {
            return lowestDieValue * 4;
        } else if (highestMatchCount === 4) {
            return highestDieValue * 4;
        } else {
            return 0;
        }
    }

    recordFourOfAKind(): void {
        this.recordScore(this.getCurrentFourOfAKindScore(), (score) => this.currentPlayer().fourOfAKindScore = score);
    }

    getCurrentLittleStraightScore(): number | null {
        const recordedLittleStraight = this.currentPlayer().littleStraightScore;
        if (recordedLittleStraight !== null) {
            return null;
        }

        const shallowSortedDiceCopy = this.shallowSortedDiceCopy();

        let inOrder = true;
        for (let i = 0; i < shallowSortedDiceCopy.length; i++) {
            if (shallowSortedDiceCopy[i].value !== i + 1) {
                inOrder = false;
            }
        }

        if (inOrder) {
            return 30;
        }

        return 0;
    }

    recordLittleStraightScore(): void {
        this.recordScore(this.getCurrentLittleStraightScore(), (score) => this.currentPlayer().littleStraightScore = score);
    }

    getCurrentBigStraightScore(): number | null {
        const recordedBigStraight = this.currentPlayer().bigStraightScore;
        if (recordedBigStraight !== null) {
            return null;
        }

        const shallowSortedDiceCopy = this.shallowSortedDiceCopy();

        let inOrder = true;
        for (let i = 0; i < shallowSortedDiceCopy.length; i++) {
            if (shallowSortedDiceCopy[i].value !== i + 2) {
                inOrder = false;
            }
        }

        if (inOrder) {
            return 30;
        }

        return 0;
    }

    recordBigStraightScore(): void {
        this.recordScore(this.getCurrentBigStraightScore(), (score) => this.currentPlayer().bigStraightScore = score);
    }

    getCurrentChoiceScore(): number | null {
        const recordedChoiceScore = this.currentPlayer().choiceScore;
        if (recordedChoiceScore !== null) {
            return null;
        }

        return this.dice.reduce((acc, cur) => acc + cur.value, 0);
    }

    recordChoiceScore(): void {
        this.recordScore(this.getCurrentChoiceScore(), (score) => this.currentPlayer().choiceScore = score);
    }

    getCurrentYachtScore(): number | null {
        const recordedYachtScore = this.currentPlayer().yachtScore;
        if (recordedYachtScore !== null) {
            return null;
        }

        const firstDieValue = this.dice[0].value;
        const allDiceEqualValue = this.dice.filter(d => d.value === firstDieValue).length === this.dice.length;

        if (allDiceEqualValue) {
            return 50;
        }

        return 0;
    }

    recordYachtScore(): void {
        this.recordScore(this.getCurrentYachtScore(), (score) => this.currentPlayer().yachtScore = score);
    }
}
