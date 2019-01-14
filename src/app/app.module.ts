/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.module.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/20 09:36:20 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/14 10:40:25 by dlavaury         ###   ########.fr       */
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
import { CapsuleDetailsPage } from '../pages/capsules/details/capsule-details';
import { CapsuleListComponent } from '../components/capsules/list/capsule-list';
import { DevAppAccessComponent } from '../components/dev-app-access/dev-app-access';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/account/login/login';
import { RegisterPage } from '../pages/account/register/register';
import { RequestPasswordResettingPage } from '../pages/account/request-password-resetting/request-password-resetting';
import { RequestProvider } from '../providers/request/request';
import { StorageProvider } from '../providers/storage/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { UserProvider } from '../providers/user/user';
import { CapsuleProvider } from '../providers/capsule/capsule';
import { CreateStep_1Page } from '../pages/capsules/create/create-step-1/create-step-1';
import { CreateStep_2Page } from '../pages/capsules/create/create-step-2/create-step-2';
import { CapsuleCreatePage } from '../pages/capsules/create/capsules-create';

@NgModule({
  declarations: [
    AccountPage,
    CapsuleDetailsPage,
    CapsuleListComponent,
    CapsuleCreatePage,
    CreateStep_1Page,
    CreateStep_2Page,
    DevAppAccessComponent,
    HomePage,
    LoginPage,
    MyApp,
    RegisterPage,
    RequestPasswordResettingPage,
    TabsPage,
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
    AccountPage,
    CapsuleDetailsPage,
    CapsuleCreatePage,
    CreateStep_1Page,
    CreateStep_2Page,
    HomePage,
    LoginPage,
    MyApp,
    RegisterPage,
    RequestPasswordResettingPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RequestProvider,
    UserProvider,
    StorageProvider,
    CapsuleProvider
  ]
})
export class AppModule {}
