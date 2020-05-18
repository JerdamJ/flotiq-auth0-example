import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { EntriesComponent } from './entries/entries.component';
import { EntriesListComponent } from './entries/entries-list/entries-list.component';
import { EntriesDetailsComponent } from './entries/entries-details/entries-details.component';
import { EntriesEditComponent } from './entries/entries-edit/entries-edit.component';
import { EntryComponent } from './entries/entries-list/entry/entry.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShortenPipe } from './pipe/shorten.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    EntriesComponent,
    EntriesListComponent,
    EntriesDetailsComponent,
    EntriesEditComponent,
    EntryComponent,
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
