import { Component, Input } from '@angular/core';
import { emptyPlayer, Player } from '../interfaces/interfaces';
import { PLAYER_HINTS } from '../enums/enums';

@Component({
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.css'],
})
export class HintsComponent {
  @Input() vm: Player = emptyPlayer;
  PLAYER_HINTS = PLAYER_HINTS;

  getDraftData(): string {
    const draftNumber = this.vm.playerInfo.draftNumber;
    const draftRound = this.vm.playerInfo.draftRound;
    const draftYear = this.vm.playerInfo.draftYear;
    return `${draftYear}: Rd:${draftRound}, Pk${draftNumber}`;
  }

  getPhysicals(): string {
    return `${this.vm.playerInfo.height}, ${this.vm.playerInfo.weight} lbs`;
  }
}
