/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   User.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/20 16:56:10 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/02 16:11:11 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Capsule } from "./Capsule.model";

export class User {
    '@context'?: string;
    '@id'?: string;
    '@type'?: string;

    city: any = null;

    email: string;
    fullname: string;
    username: string;
    firstName: string;
    lastName: string;

    capsules: string[] | Capsule[] = [];
    intentedCapsules: string[] | Capsule[] = [];

    createdAt: any;
    updatedAt: any;
}