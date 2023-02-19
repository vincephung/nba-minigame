import { Component } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { combineLatest, concatMap, map, switchMap } from 'rxjs/operators';
import { STAT_TYPES } from '../enums/enums';
import {
  DailyLeader,
  emptyPlayer,
  emptyPlayerInfo,
  emptyPlayerStats,
  Player,
  PlayerInfo,
  PlayerStats,
} from '../interfaces/interfaces';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  playerData$: Observable<PlayerInfo> = of(emptyPlayerInfo);
  dailyStatLeader$: DailyLeader | undefined;
  playerStats$: Observable<PlayerStats> = of(emptyPlayerStats);
  exampleObs$ = Observable<PlayerInfo>;
  vm$: Observable<Player> = of(emptyPlayer);

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    // by default start with getting point leader

    //this.getDailyStatLeader(STAT_TYPES.PTS);
    //this.buildPlayerData(1630173)

    // need to handle case where these is NO nba games.
    // Maybe show : No NBA Games please try again when a game has been played.

    /*
    this.playerData$ = this.playerService
    .getDailyStatLeader(STAT_TYPES.AST).pipe(
      switchMap((data) => { return this.playerService.getPlayerData(data.PLAYER_ID)})
    )
    */

    /*
    this.playerData$ = this.playerService
      .getDailyStatLeader(STAT_TYPES.AST)
      .pipe(
        switchMap((data) => {
          return this.playerService.getPlayerData(1630173);
        })
      );

    this.playerStats$ = this.playerService
      .getDailyStatLeader(STAT_TYPES.AST)
      .pipe(
        switchMap((data) => {
          return this.playerService.getPlayerStats(1630173);
        })
      );

      */

    this.vm$ = this.playerService
      .getDailyStatLeader(STAT_TYPES.PTS)
      .pipe(
        switchMap((data) =>
          forkJoin([
            of(data),
            this.playerService.getPlayerData(1630173),
            this.playerService.getPlayerStats(1630173),
          ])
        ),
        map(([dailyLeader,playerInfo,playerStats])=>{
          const player: Player = {
            playerID: dailyLeader?.PLAYER_ID ?? 0,
            playerName: dailyLeader?.PLAYER_NAME ?? '',
            playerInfo,
            playerStats,
          };
          console.log(player)
          return player;
        })
      )

    this.vm$.subscribe();
  }

  getDailyStatLeader(stat_type: string): void {
    this.playerService
      .getDailyStatLeader(stat_type)
      .subscribe((dailyStatLeader) => {
        this.dailyStatLeader$ = dailyStatLeader;
        console.log(dailyStatLeader);
      });
  }

  getPlayerById(playerId: number) {
    this.playerService.getPlayerData(playerId).subscribe((player) => {
      console.log(player);
    });
  }

  getPlayerStats(playerId: number) {
    this.playerService.getPlayerStats(playerId).subscribe((player) => {
      console.log(player);
    });
  }

  buildPlayerData(playerId: number) {
    forkJoin([
      this.playerService.getPlayerData(playerId),
      this.playerService.getPlayerStats(playerId),
    ]).subscribe(([playerData, playerStats]) => {
      //this.playerData$ = playerData;
      //this.playerStats$ = playerStats;
    });
  }
  // ng on init, call api to get data
  // render components
}
