import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokeListComponent } from './components/poke-list/poke-list.component';
import { CreatePokeComponent } from './components/create-poke/create-poke.component';
import { ModifyFavComponent } from './components/modify-fav/modify-fav.component';


@NgModule({
  declarations: [
    AppComponent,
    PokeListComponent,
    CreatePokeComponent,
    ModifyFavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
