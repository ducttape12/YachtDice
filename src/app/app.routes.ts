import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { NewGameComponent } from './new-game/new-game.component';

export const routes: Routes = [
    { path: 'game/:playerCount', component: GameComponent },
    { path: '', component: NewGameComponent }
];
