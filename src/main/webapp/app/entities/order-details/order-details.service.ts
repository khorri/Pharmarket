import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OrderDetails } from './order-details.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OrderDetails>;

@Injectable()
export class OrderDetailsService {

    private resourceUrl =  SERVER_API_URL + 'api/order-details';

    constructor(private http: HttpClient) { }

    create(orderDetails: OrderDetails): Observable<EntityResponseType> {
        const copy = this.convert(orderDetails);
        return this.http.post<OrderDetails>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(orderDetails: OrderDetails): Observable<EntityResponseType> {
        const copy = this.convert(orderDetails);
        return this.http.put<OrderDetails>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrderDetails>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrderDetails[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderDetails[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrderDetails = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrderDetails[]>): HttpResponse<OrderDetails[]> {
        const jsonResponse: OrderDetails[] = res.body;
        const body: OrderDetails[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrderDetails.
     */
    private convertItemFromServer(orderDetails: OrderDetails): OrderDetails {
        const copy: OrderDetails = Object.assign({}, orderDetails);
        return copy;
    }

    /**
     * Convert a OrderDetails to a JSON which can be sent to the server.
     */
    private convert(orderDetails: OrderDetails): OrderDetails {
        const copy: OrderDetails = Object.assign({}, orderDetails);
        return copy;
    }
}
