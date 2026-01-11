import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', redirectTo: 'ranking', pathMatch: 'full' },
	{ path: 'ranking', loadComponent: () => import('./features/ranking/ranking.component').then(m => m.RankingComponent) },
	{ path: 'results', loadComponent: () => import('./features/results/results.component').then(m => m.ResultsComponent) },
	{ path: 'matches', loadComponent: () => import('./features/matches/matches.component').then(m => m.MatchesComponent) },
	{ path: 'apuntados', loadComponent: () => import('./features/apuntados/apuntados.component').then(m => m.ApuntadosComponent) },
	{ path: 'formula', loadComponent: () => import('./features/formula/formula.component').then(m => m.FormulaComponent) },
	{ path: 'pista-inoportuna', loadComponent: () => import('./features/pista-inoportuna/pista-inoportuna.component').then(m => m.PistaInoportunaComponent) },
	{ path: 'orla', loadComponent: () => import('./features/orla/orla.component').then(m => m.OrlaComponent) },
	{ path: 'records', loadComponent: () => import('./features/records/records.component').then(m => m.RecordsComponent) },
	{ path: '**', redirectTo: 'ranking' }
];
