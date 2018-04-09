import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { GiftProduct } from './gift-product.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<GiftProduct>;

@Injectable()
export class GiftProductService {

    private resourceUrl =  SERVER_API_URL + 'api/gift-products';

    constructor(private http: HttpClient) { }

    create(giftProduct: GiftProduct): Observable<EntityResponseType> {
        const copy = this.convert(giftProduct);
        return this.http.post<GiftProduct>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(giftProduct: GiftProduct): Observable<EntityResponseType> {
        const copy = this.convert(giftProduct);
        return this.http.put<GiftProduct>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<GiftProduct>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<GiftProduct[]>> {
        const options = createRequestOption(req);
        return this.http.get<GiftProduct[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<GiftProduct[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: GiftProduct = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<GiftProduct[]>): HttpResponse<GiftProduct[]> {
        const jsonResponse: GiftProduct[] = res.body;
        const body: GiftProduct[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to GiftProduct.
     */
    private convertItemFromServer(giftProduct: GiftProduct): GiftProduct {
        const copy: GiftProduct = Object.assign({}, giftProduct);
        return copy;
    }

    /**
     * Convert a GiftProduct to a JSON which can be sent to the server.
     */
    private convert(giftProduct: GiftProduct): GiftProduct {
        const copy: GiftProduct = Object.assign({}, giftProduct);
        return copy;
    }
}
