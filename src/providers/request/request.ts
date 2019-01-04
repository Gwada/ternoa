/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   request.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/20 14:13:35 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/02 17:08:15 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@angular/core';
import { RequestOptions, Http, Headers } from '@angular/http';

@Injectable()
export class RequestProvider {
  // apiBaseUrl: string = 'http://35.180.189.141:8080/';
  apiBaseUrl: string = 'http://api:8080/';
  private token: string = '';

  constructor(public http: Http) {
  }

  initRequest(endPoint: string, dataType?: string): {url: string, options: RequestOptions} {
    return {
      url: this.apiBaseUrl + endPoint,
      options: new RequestOptions({headers: this.setHeaders(dataType)})
    };
  }

  setHeaders(type: string): Headers {
    const headers = new Headers();
    const token = 'Bearer ' + this.token;

    type === 'json' ? headers.append('Content-Type', 'application/json') : 0;
    this.token.length > 0 ? headers.append('Authorization', token) : 0;
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

  post(endPoint: string, body: any, dataType?: string): Promise<any> {
    const req: any = this.initRequest(endPoint, dataType);

    return new Promise(
      (resolve, reject) => this.http.post(req.url, body, req.options).subscribe(
        (resp: any) => resolve(resp.json()),
        (err: any) => reject(err.json())
      )
    );
  }

  setBody(data: any): FormData {
    const body = new FormData();

    data.forEach((elem: any) => body.append(elem[0], elem[1]));
    return body;
  }

  setToken(token: string) {
    this.token = token;
  }

}
