import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
import { emptyPlayer, Player, PlayerInfo } from '../interfaces/interfaces';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.css'],
})
export class SearchPlayerComponent {
  @Output() correctGuess = new EventEmitter<boolean>();
  @Input() vm: Player = emptyPlayer;
  filteredOptions$: Observable<string[]> = of([]);
  players$: Observable<PlayerInfo[]> = of([]);
  myControl = new FormControl('');
  options: string[] = [];

  constructor(private playerService: PlayerService) {}
  ngOnInit(): void {

  this.players$ = this.playerService.getAllPlayers();
  this.players$.subscribe((players)=>{
    this.options = players.map((player)=> `${player.firstName} ${player.lastName}`);
    this.filteredOptions$ = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  })

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  checkAnswer(){
    this.vm.playerName = 'Precious Achiuwa';
    this.correctGuess.emit(this.myControl.value === this.vm.playerName);
  }
}
