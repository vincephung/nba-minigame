export interface Player {
  playerID: number;
  playerInfo: PlayerInfo;
  playerName: string;
  playerStats: PlayerStats;
}

export interface PlayerInfo {
  country: string;
  draftNumber: number;
  draftRound: number;
  draftYear: number;
  firstName: string;
  height: string;
  jerseyNum: string;
  lastAffiliation: string;
  lastName: string;
  playerId: number;
  position: string;
  teamCity: string;
  teamName: string;
  weight: string;
}

export interface Hints {
  country: string;
  draft: [];
}

export interface PlayerStatsApiResponse {
  players: PlayerStats[];
}
export interface PlayerStats {
  stats: Stats;
}

export interface Stats {
  ast: number;
  pts: number;
  reb: number;
}

export interface DailyLeader {
  AST?: number;
  PLAYER_ID: number;
  PLAYER_NAME: string;
  PTS?: number;
  REB?: number;
}

export interface TopDailyStatlines {
  playerstats: DailyLeader[];
}

export interface PlayerApiResponse {
  players: PlayerInfo[];
}

export const emptyStatline: DailyLeader = {
  AST: 0,
  PLAYER_ID: 0,
  PLAYER_NAME: '',
  PTS: 0,
  REB: 0,
};

export const emptyPlayerInfo: PlayerInfo = {
  country: '',
  draftNumber: 0,
  draftRound: 0,
  draftYear: 0,
  firstName: '',
  height: '',
  jerseyNum: '',
  lastAffiliation: '',
  lastName: '',
  playerId: 0,
  position: '',
  teamCity: '',
  teamName: '',
  weight: '',
};

export const emptyStats: Stats = {
  ast: 0,
  pts: 0,
  reb: 0,
};

export const emptyPlayerStats: PlayerStats = {
  stats: emptyStats,
};

export const emptyPlayer: Player = {
  playerID: 0,
  playerInfo: emptyPlayerInfo,
  playerName: '',
  playerStats: emptyPlayerStats,
};
