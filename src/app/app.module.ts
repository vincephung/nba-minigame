import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';




import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './player/game.component';
import { SearchPlayerComponent } from './search-player/search-player.component';
import { HintsComponent } from './hints/hints.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    SearchPlayerComponent,
    HintsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
