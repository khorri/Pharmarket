import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { GiftMatPromo } from './gift-mat-promo.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<GiftMatPromo>;

@Injectable()
export class GiftMatPromoService {

    private resourceUrl =  SERVER_API_URL + 'api/gift-mat-promos';

    constructor(private http: HttpClient) { }

    create(giftMatPromo: GiftMatPromo): Observable<EntityResponseType> {
        const copy = this.convert(giftMatPromo);
        return this.http.post<GiftMatPromo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(giftMatPromo: GiftMatPromo): Observable<EntityResponseType> {
        const copy = this.convert(giftMatPromo);
        return this.http.put<GiftMatPromo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<GiftMatPromo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<GiftMatPromo[]>> {
        const options = createRequestOption(req);
        return this.http.get<GiftMatPromo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<GiftMatPromo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: GiftMatPromo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<GiftMatPromo[]>): HttpResponse<GiftMatPromo[]> {
        const jsonResponse: GiftMatPromo[] = res.body;
        const body: GiftMatPromo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to GiftMatPromo.
     */
    private convertItemFromServer(giftMatPromo: GiftMatPromo): GiftMatPromo {
        const copy: GiftMatPromo = Object.assign({}, giftMatPromo);
        return copy;
    }

    /**
     * Convert a GiftMatPromo to a JSON which can be sent to the server.
     */
    private convert(giftMatPromo: GiftMatPromo): GiftMatPromo {
        const copy: GiftMatPromo = Object.assign({}, giftMatPromo);
        return copy;
    }
}
