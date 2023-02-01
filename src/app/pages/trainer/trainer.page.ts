import {Component} from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html', 
  styleUrls: ['./trainer.page.css']
})

export class TrainerPage {
  get user(): User | undefined {
    return this.userService.user
  }

  get collection(): Pokemon[]  {
    if (this.userService.user) {
      console.log(this.userService.user.pokemon)
      return this.userService.user.pokemon
    }

    return []
  }

  constructor(
    private readonly userService: UserService,
  ) {

  }
}