import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Ordre } from './ordre.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Ordre>;

@Injectable()
export class OrdreService {

    private resourceUrl =  SERVER_API_URL + 'api/ordres';

    constructor(private http: HttpClient) { }

    create(ordre: Ordre): Observable<EntityResponseType> {
        const copy = this.convert(ordre);
        return this.http.post<Ordre>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ordre: Ordre): Observable<EntityResponseType> {
        const copy = this.convert(ordre);
        return this.http.put<Ordre>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Ordre>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Ordre[]>> {
        const options = createRequestOption(req);
        return this.http.get<Ordre[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Ordre[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Ordre = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Ordre[]>): HttpResponse<Ordre[]> {
        const jsonResponse: Ordre[] = res.body;
        const body: Ordre[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Ordre.
     */
    private convertItemFromServer(ordre: Ordre): Ordre {
        const copy: Ordre = Object.assign({}, ordre);
        return copy;
    }

    /**
     * Convert a Ordre to a JSON which can be sent to the server.
     */
    private convert(ordre: Ordre): Ordre {
        const copy: Ordre = Object.assign({}, ordre);
        return copy;
    }
}
