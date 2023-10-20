import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path:'', component: IndexComponent},
  {path:'auth', component: AuthComponent},
  {path: "**", pathMatch: "full", component: IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
