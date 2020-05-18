import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { EntriesComponent } from './entries/entries.component';
import { EntriesEditComponent } from './entries/entries-edit/entries-edit.component';
import { EntriesDetailsComponent } from './entries/entries-details/entries-details.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'entries', component: EntriesComponent, canActivate: [AuthGuard], children: [
    { path: 'new', component: EntriesEditComponent },
    { path: ':id', component: EntriesDetailsComponent },
    { path: ':id/edit', component: EntriesEditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
