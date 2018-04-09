import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Rule } from './rule.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Rule>;

@Injectable()
export class RuleService {

    private resourceUrl =  SERVER_API_URL + 'api/rules';

    constructor(private http: HttpClient) { }

    create(rule: Rule): Observable<EntityResponseType> {
        const copy = this.convert(rule);
        return this.http.post<Rule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(rule: Rule): Observable<EntityResponseType> {
        const copy = this.convert(rule);
        return this.http.put<Rule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Rule>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Rule[]>> {
        const options = createRequestOption(req);
        return this.http.get<Rule[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Rule[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Rule = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Rule[]>): HttpResponse<Rule[]> {
        const jsonResponse: Rule[] = res.body;
        const body: Rule[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Rule.
     */
    private convertItemFromServer(rule: Rule): Rule {
        const copy: Rule = Object.assign({}, rule);
        return copy;
    }

    /**
     * Convert a Rule to a JSON which can be sent to the server.
     */
    private convert(rule: Rule): Rule {
        const copy: Rule = Object.assign({}, rule);
        return copy;
    }
}
