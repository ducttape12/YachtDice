import { Die } from "./die";
import { GameState } from "./game-state";
import { Player } from "./player";

export class YachtGame {
    players:Player[] = [];
    currentPlayerIndex = 0;
    dice:Die[] = [];
    gameState: GameState = GameState.WaitingForFirstRoll;
    
    constructor(playerCount: number) {
        for(let i = 0; i < playerCount; i++) {
            this.players.push(new Player(`Player ${i + 1}`));
        }

        this.initializeDice();
    }

    private initializeDice() {
        this.dice = [];
        for(let i = 0; i < 5; i++) {
            this.dice.push(new Die(1));
        }
    }

    rollDice() {
        if(this.gameState == GameState.WaitingForFinalCategorySelection) {
            return;
        }

        if(this.gameState == GameState.WaitingForFirstRoll) {
            this.initializeDice();
        }

        for(let i = 0; i < 5; i++) {
            const currentDie = this.dice[i];

            if(!currentDie.held) {
                const newValue = Math.floor(Math.random() * 6) + 1;
                currentDie.value = newValue;
            }
        }

        this.progressState();
    }

    private progressState() {
        switch(this.gameState) {
            case GameState.WaitingForFirstRoll:
                this.gameState = GameState.WaitingForSecondRoll;
                break;
            case GameState.WaitingForSecondRoll:
                this.gameState = GameState.WaitingForSecondRoll;
                break;
            case GameState.WaitingForThirdRoll:
                this.gameState = GameState.WaitingForThirdRoll;
                break;
            case GameState.WaitingForFinalCategorySelection:
                this.gameState = GameState.WaitingForFirstRoll;
                break;
        }
    }
}
