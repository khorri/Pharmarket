import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OrderState } from './order-state.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OrderState>;

@Injectable()
export class OrderStateService {

    private resourceUrl =  SERVER_API_URL + 'api/order-states';

    constructor(private http: HttpClient) { }

    create(orderState: OrderState): Observable<EntityResponseType> {
        const copy = this.convert(orderState);
        return this.http.post<OrderState>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(orderState: OrderState): Observable<EntityResponseType> {
        const copy = this.convert(orderState);
        return this.http.put<OrderState>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrderState>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrderState[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderState[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderState[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrderState = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrderState[]>): HttpResponse<OrderState[]> {
        const jsonResponse: OrderState[] = res.body;
        const body: OrderState[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrderState.
     */
    private convertItemFromServer(orderState: OrderState): OrderState {
        const copy: OrderState = Object.assign({}, orderState);
        return copy;
    }

    /**
     * Convert a OrderState to a JSON which can be sent to the server.
     */
    private convert(orderState: OrderState): OrderState {
        const copy: OrderState = Object.assign({}, orderState);
        return copy;
    }
}
