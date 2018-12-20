/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/20 14:14:57 by dlavaury          #+#    #+#             */
/*   Updated: 2018/12/20 16:30:15 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@angular/core';
import { LoginForm } from '../../models/LoginForm';
import { User } from '../../models/User';
import { Subject } from 'rxjs/Subject';
import { RequestProvider } from '../request/request';

@Injectable()
export class UserProvider {
  private user: User;
  user$ = new Subject<User>();
  private isAuth: boolean = false;
  isAuth$ = new Subject<boolean>();
  
  constructor(private reqService: RequestProvider) {
      console.log('Hello UserProvider Provider');
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
    console.log(form);
    return new Promise(
      (resolve, reject) => this.reqService.post('login_check', form).then(
        (resp) => {
          this.reqService.setToken(resp.token ? resp.token : '');
          resolve(true);
        },
        (err) => reject(err)
      )
    );
  }

  getProfile(): Promise<any> {
    return new Promise(
      (resolve, reject) => this.reqService.get('profile').then(
        (profile) => {
          this.isAuth = true;
          this.emitIsAuth();
          resolve(profile);
        },
        (err) => reject(err)
      )
    );
  }

  signIn(form: LoginForm): Promise<boolean> {
    return new Promise(
      (resolve, reject) => this.getToken(form).then(
        (token: boolean) => this.getProfile().then(
          (profile) => {
            resolve(profile);
          },
          (err) => reject(err)
        ),
        (err) => reject(err)
      )
    );
  }

}
