import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DailyLeader,
  emptyPlayerInfo,
  emptyPlayerStats,
  emptyStatline,
  PlayerApiResponse,
  PlayerInfo,
  PlayerStats,
  PlayerStatsApiResponse,
  TopDailyStatlines,
} from './interfaces/interfaces';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private http: HttpClient) {}

  private dailyStatUrl = 'v0/api/stats/player/leaders/daily';
  private allPlayersUrl = 'v0/api/stats/player/index';
  private playerStatsUrl = 'v0/api/stats/player';
  private headers = new HttpHeaders({
    'X-Gravitee-Api-Key': config.MY_API_KEY,
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  getDailyStatLeader(stat: string): Observable<DailyLeader> {
    const dailyStatParams = new HttpParams()
      .set('leagueId', '00')
      .set('stat', stat);
    return this.http
      .get<TopDailyStatlines>(this.dailyStatUrl, {
        headers: this.headers,
        params: dailyStatParams,
      })
      .pipe(
        map((res: TopDailyStatlines) => res.playerstats[0]),
        catchError(
          this.handleError<DailyLeader>('getDailyStatLeader', emptyStatline)
        )
      );
  }

  getAllPlayers(): Observable<PlayerInfo[]> {
    const playerParams = new HttpParams()
      .set('leagueId', '00')
      .set('season', new Date().getFullYear() - 1);
    return this.http
      .get<PlayerApiResponse>(this.allPlayersUrl, {
        headers: this.headers,
        params: playerParams,
      })
      .pipe(
        map((res: PlayerApiResponse) => res.players),
        catchError(this.handleError<PlayerInfo[]>('getAllPlayers'))
      );
  }

  getPlayerData(playerId: number): Observable<PlayerInfo> {
    const playerParams = new HttpParams()
      .set('leagueId', '00')
      .set('season', new Date().getFullYear() - 1);
    return this.http
      .get<PlayerApiResponse>(this.allPlayersUrl, {
        headers: this.headers,
        params: playerParams,
      })
      .pipe(
        map(
          (res: PlayerApiResponse) =>
            res.players.find(
              (player: PlayerInfo) => player.playerId === playerId
            ) ?? emptyPlayerInfo
        ),
        catchError(
          this.handleError<PlayerInfo>('getPlayerData', emptyPlayerInfo)
        )
      );
  }

  getPlayerStats(playerId: number): Observable<PlayerStats> {
    const playerParams = new HttpParams()
      .set('leagueId', '00')
      .set('playerId', playerId.toString())
      .set('season', new Date().getFullYear() - 1)
      .set('perMode', 'PerGame')
      .set('seasonType', 'Regular Season');
    return this.http
      .get<PlayerStatsApiResponse>(this.playerStatsUrl, {
        headers: this.headers,
        params: playerParams,
      })
      .pipe(
        map((res) => res.players[0]),
        catchError(
          this.handleError<PlayerStats>('getPlayerData', emptyPlayerStats)
        )
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
