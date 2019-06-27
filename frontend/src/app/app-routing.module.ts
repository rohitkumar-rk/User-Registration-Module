import { UpdateUsersComponent } from './update-users/update-users.component';
import { UserTableComponent } from './user-table/user-table.component';
import { FormComponent } from './form/form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'add',component: FormComponent},
  {path:'users', component: UserTableComponent},
  {path: 'update', component: UpdateUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [FormComponent, UserTableComponent, UpdateUsersComponent]
