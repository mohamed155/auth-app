import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from 'ionic-angular';
import {AuthService} from "../../services/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public authService: AuthService,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController
              ) {

  }

  onLogout() {
    const loader = this.loadingCtrl.create();
    loader.present();
    this.authService.signout()
      .then(data => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Logout Successful'
        }).present();
      })
      .catch(error => {
        loader.dismiss();
        this.alertCtrl.create({
          title: 'Logout Failed!',
          message: error.message,
          buttons: ['Ok']
        }).present();
      });
  }

}
