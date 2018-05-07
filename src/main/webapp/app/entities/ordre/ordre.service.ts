import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Ordre } from './ordre.model';
import { createRequestOption } from '../../shared';
import {PackProduct} from "../pack-product/pack-product.model";
import {Rule} from '../rule';

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

    public applyDiscount(p: PackProduct): void {

        let discountRules: Rule[] = p.rules.filter((rule: Rule) => {
            return rule.type.code === 'reduction';
        });
        let ugRules: Rule[] = p.rules.filter((rule: Rule) => {
            return rule.type.code === 'ug';
        });
        if (discountRules && discountRules.length > 0) {
            let discount = discountRules.map(rule => {
                return rule.reduction;
            }).reduce((r1, r2) => {
                return (r1 + r2);
            });
            p.totalDiscounted = (1 - discount / 100) * p.totalTtc;
        }
        if (ugRules && ugRules.length > 0) {
            p.ugQuantity = ugRules.map((rule: Rule) => {
                return Math.floor((p.quantity / rule.quantityMin) * rule.giftQuantity);
            }).reduce((r1, r2) => {
                return (r1 + r2);
            });
            p.totalTtc = (p.ugQuantity + p.quantity) * p.product.pph;
            p.totalDiscounted = p.quantity * p.product.pph;


        }


    }

    public calculatePackTotals(pack) {

        this.calculateSubTotals(pack);

        pack.packQte = pack.packProducts.map(packProduct => {
            return packProduct.quantity ? packProduct.quantity : 0;
        }).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        });

        this.applyPackRules(pack);
    }

    private applyPackRules(pack: any): void {
        if (pack.operator === 'and') {
            this.applyDiscountRules(pack);
            this.applyUgRules(pack);
        }
        if (pack.operator === 'or') {
            this.applyOneRule(pack);
        }
        pack.totalUgQuantity = pack.packProducts.map(packProduct => {
            return packProduct.ugQuantity ? packProduct.ugQuantity : 0;
        }).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        });


    }

    private applyDiscountRules(pack) {
        let discountRules: Rule[] = pack.rules.filter((rule: Rule) => {
            return rule.type.code === 'reduction';
        });

        if (discountRules && discountRules.length > 0) {
            let rules = discountRules.filter((rule: Rule) => {
                return pack.packQte >= rule.quantityMin;
            });
            let discount = (rules && rules.length > 0) ? rules.map(rule => {
                    return rule.reduction;
                }).reduce((r1, r2) => {
                    return (r1 + r2);
                }) : 0;
            pack.totalDiscounted = (1 - discount / 100) * pack.totalDiscounted;
        }
    }

    private applyUgRules(pack) {
        let ugRules: Rule[] = pack.rules.filter((rule: Rule) => {
            return rule.type.code === 'ug';
        });

        if (ugRules && ugRules.length > 0) {
            ugRules.filter((rule: Rule) => {
                return pack.packQte >= rule.quantityMin;
            }).forEach((rule) => {
                pack.packProducts.forEach((p) => {
                    if (p.product.id === rule.product.id) {
                        p.ugQuantity = Math.floor((pack.packQte / rule.quantityMin) * rule.giftQuantity)
                        p.totalTtc = (p.quantity + p.ugQuantity) * p.product.pph;
                    } else {
                        //show error
                    }
                });
            });


        }
    }

    private applyOneRule(pack) {
        pack.rules.sort((r1: Rule, r2: Rule) => {
            return r1.quantityMin - r2.quantityMin;
        });
        for (let i = pack.rules.length - 1; i > -1; i--) {
            let rule: Rule = pack.rules[i];
            if (rule.quantityMin <= pack.packQte) {
                if (rule.type.code === 'ug') {
                    pack.packProducts.forEach((p) => {
                        if (p.product.id === rule.product.id) {
                            p.ugQuantity = Math.floor((pack.packQte / pack.packQteMin) * rule.giftQuantity)
                            p.totalTtc = (p.quantity + p.ugQuantity) * p.product.pph;
                        } else {
                            //show error
                        }
                    });
                }
                if (rule.type.code === 'reduction') {
                    pack.totalDiscounted = (1 - rule.reduction / 100) * pack.totalDiscounted;
                }
                break;
            }
        }
    }

    private calculateSubTotals(pack) {
        pack.totalTtc = pack.packProducts.map(packProduct => {
            return packProduct.totalTtc ? packProduct.totalTtc : 0;
        }).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        });
        pack.totalDiscounted = pack.packProducts.map(packProduct => {
            return packProduct.totalDiscounted ? packProduct.totalDiscounted : 0;
        }).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        });

    }


    public getTotalTtc(packs) {
        return packs.map((pack: any) => {
            return (pack.totalTtc) ? pack.totalTtc : 0;
        }).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        });
    }

    public getTotalDiscounted(packs) {
        return packs.map((pack: any) => {
            return (pack.totalTtc) ? pack.totalTtc : 0;
        }).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        });
    }
}
