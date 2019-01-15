/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   User.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/20 16:56:10 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/15 10:02:06 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export class User {
    '@context'?: string;
    '@id'?: string;
    '@type'?: string;

    city: any = null;

    email: string = '';
    fullname: string = '';
    username: string = '';
    firstName: string = '';
    lastName: string = '';

    credits: number = 0;

    capsules: any[] = [];
    intentedCapsules: any[] = [];

    createdAt: any = '';
    updatedAt: any = '';
}