import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
    ) {
  }

  onSubmit(form: NgForm) {
    const loader = this.loadingCtrl.create();
    loader.present();
    this.authService.signup(form.value.email, form.value.password)
      .then(data => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Sign up Successful'
        }).present();
      })
      .catch(error => {
        loader.dismiss();
        this.alertCtrl.create({
          title: 'Sign up Failed!',
          message: error.message,
          buttons: ['Ok']
        }).present();
      });
  }

}
