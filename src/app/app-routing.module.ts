import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailedObjectComponent } from '../app/detailed-object/detailed-object.component';
import { MainComponent} from '../app/main/main.component';

const routes: Routes = [
  {path:'', component: MainComponent},
  {path:':type', component: MainComponent},

  {path:'details/:id', component: DetailedObjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
