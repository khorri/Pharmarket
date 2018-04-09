import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PackProduct } from './pack-product.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PackProduct>;

@Injectable()
export class PackProductService {

    private resourceUrl =  SERVER_API_URL + 'api/pack-products';

    constructor(private http: HttpClient) { }

    create(packProduct: PackProduct): Observable<EntityResponseType> {
        const copy = this.convert(packProduct);
        return this.http.post<PackProduct>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(packProduct: PackProduct): Observable<EntityResponseType> {
        const copy = this.convert(packProduct);
        return this.http.put<PackProduct>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PackProduct>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PackProduct[]>> {
        const options = createRequestOption(req);
        return this.http.get<PackProduct[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PackProduct[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PackProduct = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PackProduct[]>): HttpResponse<PackProduct[]> {
        const jsonResponse: PackProduct[] = res.body;
        const body: PackProduct[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PackProduct.
     */
    private convertItemFromServer(packProduct: PackProduct): PackProduct {
        const copy: PackProduct = Object.assign({}, packProduct);
        return copy;
    }

    /**
     * Convert a PackProduct to a JSON which can be sent to the server.
     */
    private convert(packProduct: PackProduct): PackProduct {
        const copy: PackProduct = Object.assign({}, packProduct);
        return copy;
    }
}
