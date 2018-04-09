import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MaterielPromo } from './materiel-promo.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MaterielPromo>;

@Injectable()
export class MaterielPromoService {

    private resourceUrl =  SERVER_API_URL + 'api/materiel-promos';

    constructor(private http: HttpClient) { }

    create(materielPromo: MaterielPromo): Observable<EntityResponseType> {
        const copy = this.convert(materielPromo);
        return this.http.post<MaterielPromo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(materielPromo: MaterielPromo): Observable<EntityResponseType> {
        const copy = this.convert(materielPromo);
        return this.http.put<MaterielPromo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MaterielPromo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MaterielPromo[]>> {
        const options = createRequestOption(req);
        return this.http.get<MaterielPromo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MaterielPromo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MaterielPromo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MaterielPromo[]>): HttpResponse<MaterielPromo[]> {
        const jsonResponse: MaterielPromo[] = res.body;
        const body: MaterielPromo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MaterielPromo.
     */
    private convertItemFromServer(materielPromo: MaterielPromo): MaterielPromo {
        const copy: MaterielPromo = Object.assign({}, materielPromo);
        return copy;
    }

    /**
     * Convert a MaterielPromo to a JSON which can be sent to the server.
     */
    private convert(materielPromo: MaterielPromo): MaterielPromo {
        const copy: MaterielPromo = Object.assign({}, materielPromo);
        return copy;
    }
}
