import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AgendaBoardComponent } from './pages/admin/agenda-board.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'admin', component: AgendaBoardComponent },
    { path: '**', redirectTo: '' },
];
