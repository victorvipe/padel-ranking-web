import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RankingRow } from '../models/ranking-row';

@Injectable({ providedIn: 'root' })
export class RankingService {
  private apiUrl =
    'https://script.google.com/macros/s/AKfycbwvilaGQ3Z4pzy5ZggdokvOypL4_xtutVfP8aMF2FZZem22u05EHl7yqWn-yHMg29ZcLw/exec';

  constructor(private http: HttpClient) {}

  getRanking(): Observable<RankingRow[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(items => (items || []).map(raw => this.mapToRankingRow(raw)))
    );
  }

  private mapToRankingRow(raw: any): RankingRow {
    const matchesWon = Number(raw.matchesWon ?? raw.partidosGanados ?? raw.pg ?? 0);
    const matchesPlayed = Number(raw.matchesPlayed ?? raw.partidosJugados ?? raw.pj ?? 0);
    const gamesWon = Number(raw.gamesWon ?? raw.juegosGanados ?? raw.jg ?? 0);
    const gamesPlayed = Number(raw.gamesPlayed ?? raw.juegosJugados ?? raw.jj ?? 0);
    const efficiency = Number(raw.efficiency ?? raw.effec ?? raw.eff ?? 0);
    const adjust = Number(raw.adjust ?? raw.adjust ?? 0);
    const effectAdj = Number(raw.effectAdj ?? raw.effect_adj ?? raw.effectAdj ?? (efficiency + adjust) ?? 0);
    const ranking = Number(raw.ranking ?? raw.rank ?? 0);

    return {
      player: raw.player ?? raw.jugador ?? raw.name ?? '',
      matchesWon,
      matchesPlayed,
      gamesWon,
      gamesPlayed,
      efficiency,
      adjust,
      effectAdj,
      ranking
    };
  }
}
