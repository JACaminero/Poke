import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyFavComponent } from './components/modify-fav/modify-fav.component';
import { PokeListComponent } from './components/poke-list/poke-list.component';

const routes: Routes = [

  { path: 'list', component: PokeListComponent },
  { path: 'favorites', component: ModifyFavComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
