import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthService} from "../../services/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authService: AuthService) {

  }

  onLogout() {
    this.authService.signout();
  }

}
