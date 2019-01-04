/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.module.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/20 09:36:20 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/04 13:09:30 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { AccountPage } from '../pages/account/account';
import { CapsulesPage } from '../pages/capsules/capsules';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/account/login/login';
import { RegisterPage } from '../pages/account/register/register';
import { RequestPasswordResettingPage } from '../pages/account/request-password-resetting/request-password-resetting';
import { TabsPage } from '../pages/tabs/tabs';

import { RequestProvider } from '../providers/request/request';
import { StorageProvider } from '../providers/storage/storage';
import { UserProvider } from '../providers/user/user';
import { DevAppAccessComponent } from '../components/dev-app-access/dev-app-access';
import { CapsuleListComponent } from '../components/capsules/list/capsule-list';
import { CapsuleDetailsPage } from '../pages/capsules/details/capsule-details';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    AccountPage,
    LoginPage,
    RegisterPage,
    CapsulesPage,
    RequestPasswordResettingPage,
    DevAppAccessComponent,
    CapsuleDetailsPage,
    CapsuleListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    AccountPage,
    LoginPage,
    RegisterPage,
    CapsulesPage,
    RequestPasswordResettingPage,
    CapsuleDetailsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RequestProvider,
    UserProvider,
    StorageProvider
  ]
})
export class AppModule {}
