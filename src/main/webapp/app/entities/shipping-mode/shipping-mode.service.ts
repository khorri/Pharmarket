import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ShippingMode } from './shipping-mode.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ShippingMode>;

@Injectable()
export class ShippingModeService {

    private resourceUrl =  SERVER_API_URL + 'api/shipping-modes';

    constructor(private http: HttpClient) { }

    create(shippingMode: ShippingMode): Observable<EntityResponseType> {
        const copy = this.convert(shippingMode);
        return this.http.post<ShippingMode>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(shippingMode: ShippingMode): Observable<EntityResponseType> {
        const copy = this.convert(shippingMode);
        return this.http.put<ShippingMode>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ShippingMode>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ShippingMode[]>> {
        const options = createRequestOption(req);
        return this.http.get<ShippingMode[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ShippingMode[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ShippingMode = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ShippingMode[]>): HttpResponse<ShippingMode[]> {
        const jsonResponse: ShippingMode[] = res.body;
        const body: ShippingMode[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ShippingMode.
     */
    private convertItemFromServer(shippingMode: ShippingMode): ShippingMode {
        const copy: ShippingMode = Object.assign({}, shippingMode);
        return copy;
    }

    /**
     * Convert a ShippingMode to a JSON which can be sent to the server.
     */
    private convert(shippingMode: ShippingMode): ShippingMode {
        const copy: ShippingMode = Object.assign({}, shippingMode);
        return copy;
    }
}
