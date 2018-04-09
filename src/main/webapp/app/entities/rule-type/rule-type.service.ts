import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RuleType } from './rule-type.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RuleType>;

@Injectable()
export class RuleTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/rule-types';

    constructor(private http: HttpClient) { }

    create(ruleType: RuleType): Observable<EntityResponseType> {
        const copy = this.convert(ruleType);
        return this.http.post<RuleType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ruleType: RuleType): Observable<EntityResponseType> {
        const copy = this.convert(ruleType);
        return this.http.put<RuleType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RuleType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RuleType[]>> {
        const options = createRequestOption(req);
        return this.http.get<RuleType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RuleType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RuleType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RuleType[]>): HttpResponse<RuleType[]> {
        const jsonResponse: RuleType[] = res.body;
        const body: RuleType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RuleType.
     */
    private convertItemFromServer(ruleType: RuleType): RuleType {
        const copy: RuleType = Object.assign({}, ruleType);
        return copy;
    }

    /**
     * Convert a RuleType to a JSON which can be sent to the server.
     */
    private convert(ruleType: RuleType): RuleType {
        const copy: RuleType = Object.assign({}, ruleType);
        return copy;
    }
}
