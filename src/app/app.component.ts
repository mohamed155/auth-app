import { Component, ViewChild } from '@angular/core';
import {AlertController, LoadingController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import {SignupPage} from "../pages/signup/signup";
import {AuthService} from "../services/auth";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  isAuth:boolean = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public authService: AuthService,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController
              ) {
    const loader = loadingCtrl.create();
    loader.present();
    firebase.initializeApp({
      apiKey: "AIzaSyBm-FvHsXCsNgHGdjO-XXJWRl9pQv_hulQ",
      authDomain: "o2d-app-9a3a5.firebaseapp.com",
      databaseURL: "https://o2d-app-9a3a5.firebaseio.com",
      projectId: "o2d-app-9a3a5",
      storageBucket: "o2d-app-9a3a5.appspot.com",
      messagingSenderId: "355895453387",
      appId: "1:355895453387:web:337177900c14e3fd"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuth = true;
        this.rootPage = HomePage;
        loader.dismiss();
      } else {
        this.isAuth = false;
        this.rootPage = LoginPage;
        loader.dismiss();
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onGoToSignIn() {
    this.nav.setRoot(LoginPage);
  }

  onGoToSignUp() {
    if (this.nav.getActive().name != SignupPage.name) {
      this.nav.push(SignupPage);
    }
  }

  onLogout() {
    const loader = this.loadingCtrl.create();
    loader.present();
    this.authService.signout()
      .then(data => loader.dismiss())
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

