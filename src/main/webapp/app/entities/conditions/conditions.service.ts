import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Conditions } from './conditions.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Conditions>;

@Injectable()
export class ConditionsService {

    private resourceUrl =  SERVER_API_URL + 'api/conditions';

    constructor(private http: HttpClient) { }

    create(conditions: Conditions): Observable<EntityResponseType> {
        const copy = this.convert(conditions);
        return this.http.post<Conditions>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(conditions: Conditions): Observable<EntityResponseType> {
        const copy = this.convert(conditions);
        return this.http.put<Conditions>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Conditions>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Conditions[]>> {
        const options = createRequestOption(req);
        return this.http.get<Conditions[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Conditions[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Conditions = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Conditions[]>): HttpResponse<Conditions[]> {
        const jsonResponse: Conditions[] = res.body;
        const body: Conditions[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Conditions.
     */
    private convertItemFromServer(conditions: Conditions): Conditions {
        const copy: Conditions = Object.assign({}, conditions);
        return copy;
    }

    /**
     * Convert a Conditions to a JSON which can be sent to the server.
     */
    private convert(conditions: Conditions): Conditions {
        const copy: Conditions = Object.assign({}, conditions);
        return copy;
    }
}
