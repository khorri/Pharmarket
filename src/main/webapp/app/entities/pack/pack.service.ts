import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Pack } from './pack.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Pack>;

@Injectable()
export class PackService {

    private resourceUrl =  SERVER_API_URL + 'api/packs';

    constructor(private http: HttpClient) { }

    create(pack: Pack): Observable<EntityResponseType> {
        const copy = this.convert(pack);
        return this.http.post<Pack>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(pack: Pack): Observable<EntityResponseType> {
        const copy = this.convert(pack);
        return this.http.put<Pack>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Pack>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Pack[]>> {
        const options = createRequestOption(req);
        return this.http.get<Pack[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Pack[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Pack = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Pack[]>): HttpResponse<Pack[]> {
        const jsonResponse: Pack[] = res.body;
        const body: Pack[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Pack.
     */
    private convertItemFromServer(pack: Pack): Pack {
        const copy: Pack = Object.assign({}, pack);
        return copy;
    }

    /**
     * Convert a Pack to a JSON which can be sent to the server.
     */
    private convert(pack: Pack): Pack {
        const copy: Pack = Object.assign({}, pack);
        return copy;
    }
}
