import { catchError, map, switchMap } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { emptyPlayer, Player } from '../interfaces/interfaces';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { forkJoin, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PlayerService } from '../player.service';
import { STAT_TYPES } from '../enums/enums';

@Component({
  selector: 'app-player',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  @Input() selectedIndex = 0;
  @Input() correctGuess = false;
  showModal: boolean = false;
  vm$: Observable<Player> = of(emptyPlayer);
  statType: string = STAT_TYPES.PTS;

  constructor(private playerService: PlayerService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getStats(STAT_TYPES.PTS);
    this.vm$.subscribe();
  }

  getStats(statType: string) {
    this.vm$ = this.playerService.getDailyStatLeader(statType).pipe(
      switchMap((data) =>
        forkJoin([
          of(data),
          this.playerService.getPlayerData(data.PLAYER_ID),
          this.playerService.getPlayerStats(data.PLAYER_ID),
        ])
      ),
      map(([dailyLeader, playerInfo, playerStats]) => {
        const player: Player = {
          playerID: dailyLeader?.PLAYER_ID ?? 0,
          playerName: dailyLeader?.PLAYER_NAME ?? '',
          playerInfo,
          playerStats,
        };
        return player;
      }),
      catchError((err) => {
        this.openErrorDialog();
        throw err;
      })
    );
  }

  onTabChanged() {
    switch (this.selectedIndex) {
      case 0: {
        this.statType = STAT_TYPES.PTS;
        break;
      }
      case 1: {
        this.statType = STAT_TYPES.AST;
        break;
      }
      case 2: {
        this.statType = STAT_TYPES.REB;
        break;
      }
    }
    this.getStats(this.statType);
  }

  checkAnswer(correctGuess: boolean) {
    this.showModal = correctGuess;
    this.openDialog(correctGuess);
  }

  openDialog(correctGuess: boolean): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: { correctGuess },
    });
  }

  openErrorDialog(): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '250px',
    });
  }
}
