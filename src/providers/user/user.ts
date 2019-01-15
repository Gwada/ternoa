/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/20 14:14:57 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/15 17:02:23 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@angular/core';
import { LoginForm } from '../../models/LoginForm';
import { User } from '../../models/User';
import { Subject } from 'rxjs/Subject';
import { RequestProvider } from '../request/request';
import { RegisterForm } from '../../models/registerForm';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UserProvider {
  private user: User;
  private isAuth: boolean = false;

  /**
   * SUBJECT
   */
  public user$ = new Subject<User>();
  public isAuth$ = new Subject<boolean>();
  public creditsSubject = new Subject<number>();

  /**
   * OBSERVABLES
   */
  public credits$ = this.creditsSubject.asObservable();

  /**
   * 
   * @param reqService 
   * @param storage 
   */
  constructor(private reqService: RequestProvider,
              private storage: Storage,
              private toastCtrl: ToastController) {
  }

  emitIsAuth(): void {
    this.isAuth$.next(this.isAuth);
  }

  emitUser(): void {
    this.user$.next(this.user);
  }

  emitCredits(): void {
    this.creditsSubject.next(this.user.credits);
  }

  toggleIsAuth(): void {
    this.isAuth = !this.isAuth;
  }

  /**
   * Token generation with identifiers
   * @param form 
   */
  getToken(form: LoginForm): Promise<any> {
    return new Promise(
      (resolve, reject) => this.reqService.post('login_check', form, 'json').then(
        (resp) => {
          if (!resp || !resp.token || resp.token.len < 1) {
            reject(false);
          }
          this.reqService.setToken(resp.token);
          this.storage.set('ternoaToken', resp.token);
          resolve(true);
        },
        (error) => reject(error)
      )
    );
  }

  /**
   * Get the profile back with the token
   */
  getProfile(): Promise<any> {
    return new Promise(
      (resolve, reject) => this.reqService.get('profile').then(
        (profile) => {
          this.isAuth = true;
          this.user = profile;
          this.emitIsAuth();
          this.emitUser();
          console.log(profile);
          resolve(profile);
        },
        (error) => reject(error)
      )
    );
  }

  /**
   * Search a user with keyword
   * @param term 
   */
  findUserByTerm(term: string): Promise<any> {
    const param = `users?searchParam=${term}&order[firstName]`;

    return new Promise(
      (resolve, reject) => this.reqService.get(param).then(
        (apiRespnse: any) => resolve(apiRespnse),
        (err: any) => reject(err)
      )
    );
  }

  /**
   * GET request to retrieve the token then the user's profile
   * @param form 
   */
  signIn(form: LoginForm): Promise<any> {
    return new Promise(
      (resolve, reject) => this.getToken(form).then(
        (token: boolean) => this.getProfile().then(
          (profile) => resolve(profile),
          (error) => reject(error)
        ),
        (error) => reject(error)
      )
    );
  }

  /**
   * POST request for entity creation
   * @param form 
   */
  signUp(form: RegisterForm): Promise<any> {
    return new Promise(
      (resolve, reject) => this.reqService.post('users', form, 'json').then(
        () => resolve(true),
        (error) => reject(error)
      )
    );
  }

  put(body: any): Promise<any> {
    return new Promise(
      (resolve, reject) => this.reqService.put(this.EndPoint, body).then(
        (user: User) => {
          this.user = user;
          this.emitUser();
          console.log(this.user);
          resolve(user);
        },
        err => reject(err)
      )
    );
  }

  /**
   * Disconnects the user and destroys the session
   */
  logOut() {
    delete(this.user);
    this.isAuth = false;
    this.storage.remove('ternoaToken');
    this.emitIsAuth();
    this.emitUser();
  }

  /**
   * ACCESSORS
   */
  get EndPoint(): string {
    return this.user['@id'];
  }

  get Credits(): number {
    return this.user.credits;
  }

  adjustCredits(toAdd: number): boolean {
    if (toAdd + this.user.credits < 0) {
      this.displayToast('You do not have enough Timesules');
      return false;
    }
    this.user.credits += toAdd;
    this.emitCredits();
    if (toAdd < 0) {
      this.displayToast(`You have consumed ${-toAdd} Timesules`);
    } else if (toAdd > 0) {
      this.displayToast(`Your account is credited with ${toAdd} timesules`);
    }
    return true;
  }

  displayToast(msg: string): void {
    this.toastCtrl.create(
      {
        message: msg,
        duration: 3500
      }
    ).present();
  }

  addCapsule(updatedUser: any): Promise<any> {
    this.user.capsules.forEach(
      capsule => updatedUser.capsules.push(capsule['@id'])
    );
    console.log(updatedUser);
    return this.put(updatedUser);
  }
}
