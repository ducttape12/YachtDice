import { Die } from "./die";
import { GameState } from "./game-state";
import { Player } from "./player";

const RollableState = [GameState.WaitingForFirstRoll, GameState.WaitingForSecondRoll, GameState.WaitingForThirdRoll];
const DiceCount = 6;

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
}
