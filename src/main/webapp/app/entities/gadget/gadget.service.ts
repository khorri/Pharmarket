import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Gadget } from './gadget.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Gadget>;

@Injectable()
export class GadgetService {

    private resourceUrl =  SERVER_API_URL + 'api/gadgets';

    constructor(private http: HttpClient) { }

    create(gadget: Gadget): Observable<EntityResponseType> {
        const copy = this.convert(gadget);
        return this.http.post<Gadget>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(gadget: Gadget): Observable<EntityResponseType> {
        const copy = this.convert(gadget);
        return this.http.put<Gadget>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Gadget>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Gadget[]>> {
        const options = createRequestOption(req);
        return this.http.get<Gadget[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Gadget[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Gadget = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Gadget[]>): HttpResponse<Gadget[]> {
        const jsonResponse: Gadget[] = res.body;
        const body: Gadget[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Gadget.
     */
    private convertItemFromServer(gadget: Gadget): Gadget {
        const copy: Gadget = Object.assign({}, gadget);
        return copy;
    }

    /**
     * Convert a Gadget to a JSON which can be sent to the server.
     */
    private convert(gadget: Gadget): Gadget {
        const copy: Gadget = Object.assign({}, gadget);
        return copy;
    }
}
