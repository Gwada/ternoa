/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   User.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/20 16:56:10 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/04 12:14:04 by dlavaury         ###   ########.fr       */
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

    capsules: any[] = [];
    intentedCapsules: any[] = [];

    createdAt: any = '';
    updatedAt: any = '';
}