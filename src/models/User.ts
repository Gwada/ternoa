/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   User.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/20 16:56:10 by dlavaury          #+#    #+#             */
/*   Updated: 2018/12/30 02:38:40 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export class User {
    '@context': string;
    city: any = null;

    email: string;
    fullname: string;
    username: string;
    firstName: string;
    lastName: string;

    capsules: any[] = [];
    intentedCapsules: any[] = [];

    createdAt: any;
    updatedAt: any;
}