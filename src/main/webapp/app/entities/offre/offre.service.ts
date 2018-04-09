import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {Offre} from './offre.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<Offre>;

@Injectable()
export class OffreService {

    private resourceUrl = SERVER_API_URL + 'api/offres';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(offre: Offre): Observable<EntityResponseType> {
        //const copy = this.convert(offre);
        return this.http.post<Offre>(this.resourceUrl, offre, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(offre: Offre): Observable<EntityResponseType> {
        const copy = this.convert(offre);
        return this.http.put<Offre>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Offre>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Offre[]>> {
        const options = createRequestOption(req);
        return this.http.get<Offre[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<Offre[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Offre = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Offre[]>): HttpResponse<Offre[]> {
        const jsonResponse: Offre[] = res.body;
        const body: Offre[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Offre.
     */
    private convertItemFromServer(offre: Offre): Offre {
        const copy: Offre = Object.assign({}, offre);
        copy.start = this.dateUtils
            .convertDateTimeFromServer(offre.start);
        copy.end = this.dateUtils
            .convertDateTimeFromServer(offre.end);
        return copy;
    }

    /**
     * Convert a Offre to a JSON which can be sent to the server.
     */
    private convert(offre: Offre): Offre {
        const copy: Offre = Object.assign({}, offre);

        copy.start = this.dateUtils.toDate(offre.start);

        copy.end = this.dateUtils.toDate(offre.end);
        return copy;
    }
}
