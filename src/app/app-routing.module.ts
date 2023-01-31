import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './guards/auth.guard';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { LandingPage } from './pages/landing/landing.page';
import { TrainerPage } from './pages/trainer/trainer.page';


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

export class AppRoutingModule { }
