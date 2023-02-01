import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './guards/auth.guard';
import { User } from './models/user.model';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { LandingPage } from './pages/landing/landing.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { UserService } from './services/user.service';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/landing'
  },
  {
    path: 'landing',
    component: LandingPage
  },
  {
    path: 'trainer',
    component: TrainerPage,
    canActivate:[AuthGuard]
  },
  {
    path: 'catalogue',
    component: CataloguePage,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { 

  get user():User|undefined{
    return this.userService.user
  }
  
  constructor(private readonly userService:UserService){}

  handleLogoutClick():void{

  }
}
