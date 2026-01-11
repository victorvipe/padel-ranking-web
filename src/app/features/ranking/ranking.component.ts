import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RankingService } from '../../services/ranking.service';
import { RankingRow } from '../../models/ranking-row';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  template: `
    <h2>Ranking</h2>

    <div *ngIf="loading">Loading ranking...</div>
    <div *ngIf="error" class="error">{{ error }}</div>

    <div class="table-controls" *ngIf="!loading && !error" style="margin-bottom:12px; display:flex; gap:12px; align-items:center;">
      <mat-form-field appearance="outline" style="flex:1; max-width:360px;">
        <mat-icon matPrefix>search</mat-icon>
        <input matInput placeholder="Filter players" [value]="filterValue" (input)="applyFilter($any($event.target).value)" />
        <button mat-icon-button matSuffix aria-label="Clear" *ngIf="filterValue" (click)="clearFilter()">
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>

      <div *ngIf="dataSource?.data?.length !== undefined">{{ dataSource.filteredData.length || 0 }} results</div>
    </div>

    <div class="table-responsive full-bleed" *ngIf="!loading && !error">
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8 ranking-table">

        <!-- Rank -->
        <ng-container matColumnDef="ranking">
          <th mat-header-cell *matHeaderCellDef>#</th>
          <td mat-cell *matCellDef="let element">{{ element.ranking }}</td>
        </ng-container>

        <!-- Player -->
        <ng-container matColumnDef="player">
          <th mat-header-cell *matHeaderCellDef>Player</th>
          <td mat-cell *matCellDef="let element">{{ element.player }}</td>
        </ng-container>

        <!-- Matches -->
        <ng-container matColumnDef="matches">
          <th mat-header-cell *matHeaderCellDef>W / P</th>
          <td mat-cell *matCellDef="let element">{{ element.matchesWon }} / {{ element.matchesPlayed }}</td>
        </ng-container>

        <!-- Games -->
        <ng-container matColumnDef="games">
          <th mat-header-cell *matHeaderCellDef>G W / G P</th>
          <td mat-cell *matCellDef="let element">{{ element.gamesWon }} / {{ element.gamesPlayed }}</td>
        </ng-container>

        <!-- Effect Adj -->
        <ng-container matColumnDef="effectAdj">
          <th mat-header-cell *matHeaderCellDef>Eff Adj</th>
          <td mat-cell *matCellDef="let element">{{ element.effectAdj | percent:'1.0-2' }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <button mat-raised-button color="primary" style="margin-top:16px;" (click)="refresh()">Refresh</button>
    </div>
  `
})
export class RankingComponent implements OnInit {
  displayedColumns = ['ranking', 'player', 'matches', 'games', 'effectAdj'];
  data: RankingRow[] = [];
  dataSource = new MatTableDataSource<RankingRow>([]);
  filterValue = '';
  loading = false;
  error: string | null = null;

  constructor(private rankingService: RankingService) {}

  ngOnInit() {
    this.loadRanking();

    // Filter predicate: check player's name (case-insensitive) and also allow partial matches
    this.dataSource.filterPredicate = (data: RankingRow, filter: string) => {
      const f = filter.trim().toLowerCase();
      return (data.player || '').toLowerCase().includes(f);
    };
  }

  applyFilter(value: string) {
    this.filterValue = value || '';
    this.dataSource.filter = (this.filterValue || '').trim().toLowerCase();
  }

  clearFilter() {
    this.applyFilter('');
  }

  refresh() {
    // Clear any client-side filter so the full list appears after refresh
    this.clearFilter();
    this.loadRanking();
  }

  loadRanking() {
    this.loading = true;
    this.error = null;
    this.rankingService.getRanking().subscribe({
      next: rows => {
        this.data = rows;
        this.dataSource.data = rows;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Unable to load ranking.';
        this.loading = false;
      }
    });
  }
}
