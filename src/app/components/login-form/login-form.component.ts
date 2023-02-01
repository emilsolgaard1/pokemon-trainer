import {NgForm} from '@angular/forms'
import { Component, EventEmitter, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent {
 
  @Output() login: EventEmitter<void>=new EventEmitter();
  
   logingIn:boolean=false
 
  constructor( 
    private readonly loginService:LoginService,
    private readonly userService: UserService 
    ){}

  public loginSubmit(loginForm:NgForm):void{

    this.logingIn=true

    const {username}=loginForm.value
    
    this.loginService.login(username)
    .subscribe({
      next:(user:User)=>{
        this.userService.user=user; 
        this.logingIn=false
        this.login.emit()
      }, 
      error:()=>{}
    })
  }
}
