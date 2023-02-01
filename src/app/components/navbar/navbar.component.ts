import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/consts/storage-key.enum';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { StorageUtil } from 'src/app/utils/storage.utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  get user():User|undefined{
    return this.userService.user
  }

  constructor(
    private readonly router:Router,
    private readonly userService:UserService){}

  public handleLogout():void{
    StorageUtil.storageDelete<User>(StorageKeys.User)
    window.location.reload();
  }
}
