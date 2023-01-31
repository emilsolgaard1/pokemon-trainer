import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
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
    component: TrainerPage
  },
  {
    path: 'catalogue',
    component: CataloguePage
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
