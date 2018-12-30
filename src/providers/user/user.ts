/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/20 14:14:57 by dlavaury          #+#    #+#             */
/*   Updated: 2018/12/30 02:04:25 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@angular/core';
import { LoginForm } from '../../models/LoginForm';
import { User } from '../../models/User';
import { Subject } from 'rxjs/Subject';
import { RequestProvider } from '../request/request';
import { RegisterForm } from '../../models/registerForm';

@Injectable()
export class UserProvider {
  private user: User;
  private isAuth: boolean = false;
  public user$ = new Subject<User>();
  public isAuth$ = new Subject<boolean>();
  
  constructor(private reqService: RequestProvider) {
  }
    
  emitIsAuth(): void {
    this.isAuth$.next(this.isAuth);
  }

  emitUser() {
    this.user$.next(this.user);
  }

  toggleIsAuth(): void {
    this.isAuth = !this.isAuth;
  }

  getToken(form: LoginForm): Promise<any> {
    return new Promise(
      (resolve, reject) => this.reqService.post('login_check', form, 'json').then(
        (resp) => {
          this.reqService.setToken(resp.token ? resp.token : '');
          resolve(true);
        },
        (error) => reject(error)
      )
    );
  }

  getProfile(): Promise<any> {
    return new Promise(
      (resolve, reject) => this.reqService.get('profile').then(
        (profile) => {
          this.isAuth = true;
          this.user = profile;
          this.emitIsAuth();
          this.emitUser();
          resolve(profile);
        },
        (error) => reject(error)
      )
    );
  }

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

  signUp(form: RegisterForm): Promise<any> {
    return new Promise(
      (resolve, reject) => this.reqService.post('users', form, 'json').then(
        () => resolve(true),
        (error) => reject(error)
      )
    );
  }

  logOut() {
    delete(this.user);
    this.isAuth = false;
    this.emitIsAuth();
    this.emitUser();
  }

}
