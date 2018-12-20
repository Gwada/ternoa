/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   request.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/20 14:13:35 by dlavaury          #+#    #+#             */
/*   Updated: 2018/12/20 16:27:00 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@angular/core';
import { RequestOptions, Http, Headers } from '@angular/http';

@Injectable()
export class RequestProvider {
  apiBaseUrl: string = 'http://api:8080/';
  private token: string = '';
  
  constructor(public http: Http) {
    console.log('Hello RequestProvider Provider');
  }

  initRequest(endPoint: string): {url: string, options: RequestOptions} {
    return {
      url: this.apiBaseUrl + endPoint,
      options: new RequestOptions({headers: this.setHeaders()})
    };
  }
  
  setHeaders(): Headers {
    const headers = new Headers({'Content-Type': 'application/json'});

    if (this.token.length > 0) {
      headers.append('Authorization', 'Bearer ' + this.token);
    }
    console.log(headers);
    return headers;
  }

  get(endPoint: string): Promise<any> {
    const req: any = this.initRequest(endPoint);

    return new Promise(
      (resolve, reject) => this.http.get(req.url, req.options).subscribe(
        (resp) => resolve(resp.json()),
        (err) => reject(err.json())
      )
    );
  }

  post(endPoint: string, body: any): Promise<any> {
    const req: any = this.initRequest(endPoint);

    return new Promise(
      (resolve, reject) => this.http.post(req.url, body, req.options).subscribe(
        (resp: any) => resolve(resp.json()),
        (err: any) => reject(err.json())
      )
    );
  }

  setToken(token: string) {
    this.token = token;
  }

}
