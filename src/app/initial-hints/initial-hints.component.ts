import { Component, Input } from '@angular/core';
import { Player, emptyPlayer } from '../interfaces/interfaces';

@Component({
  selector: 'app-initial-hints',
  templateUrl: './initial-hints.component.html',
  styleUrls: ['./initial-hints.component.css']
})
export class InitialHintsComponent {
  @Input() vm: Player = emptyPlayer;
  date = new Date().getFullYear() - 1;
}
