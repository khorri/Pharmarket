import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { OrderHistory } from './order-history.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OrderHistory>;

@Injectable()
export class OrderHistoryService {

    private resourceUrl =  SERVER_API_URL + 'api/order-histories';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(orderHistory: OrderHistory): Observable<EntityResponseType> {
        const copy = this.convert(orderHistory);
        return this.http.post<OrderHistory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(orderHistory: OrderHistory): Observable<EntityResponseType> {
        const copy = this.convert(orderHistory);
        return this.http.put<OrderHistory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrderHistory>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrderHistory[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderHistory[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrderHistory = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrderHistory[]>): HttpResponse<OrderHistory[]> {
        const jsonResponse: OrderHistory[] = res.body;
        const body: OrderHistory[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrderHistory.
     */
    private convertItemFromServer(orderHistory: OrderHistory): OrderHistory {
        const copy: OrderHistory = Object.assign({}, orderHistory);
        copy.addDate = this.dateUtils
            .convertDateTimeFromServer(orderHistory.addDate);
        return copy;
    }

    /**
     * Convert a OrderHistory to a JSON which can be sent to the server.
     */
    private convert(orderHistory: OrderHistory): OrderHistory {
        const copy: OrderHistory = Object.assign({}, orderHistory);

        copy.addDate = this.dateUtils.toDate(orderHistory.addDate);
        return copy;
    }
}
