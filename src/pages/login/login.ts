import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";
import {SignupPage} from "../signup/signup";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {

  }

  onGoToSignUp() {
    this.navCtrl.push(SignupPage);
  }

  onSubmit(form: NgForm) {
    const loader = this.loadingCtrl.create();
    loader.present();
    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Login Successful'
        }).present();
      })
      .catch(error => {
        loader.dismiss();
        this.alertCtrl.create({
          title: 'Sign in Failed!',
          message: error.message,
          buttons: ['Ok']
        }).present();
      });
  }

}
