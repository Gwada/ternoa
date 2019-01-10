/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Message.model.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/08 19:49:28 by dlavaury          #+#    #+#             */
/*   Updated: 2019/01/08 19:49:41 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export class Message {
    "@id": string;
    "@type": string;
    id: number;
    title: string;
    html: string
    createdAt: string;
    updatedAt: string;
    capsule: any;
    medias: any[];
}