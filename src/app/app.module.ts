import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { LoginFormComponent } from './components/login-form/login-form.component'
import { FormsModule } from '@angular/forms';
import { LandingPage } from './pages/landing/landing.page';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonListItemComponent } from './components/pokemon-list-item/pokemon-list-item.component';
import { FavouritePokemonButtonComponent } from './components/favourite-pokemon-button/favourite-pokemon-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    LandingPage,
    CataloguePage,
    TrainerPage,
    NavbarComponent,
    PokemonListComponent,
    PokemonListItemComponent,
    FavouritePokemonButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
