import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {Ordre, OrderType} from './ordre.model';
import {OrdrePopupService} from './ordre-popup.service';
import {OrdreService} from './ordre.service';
import {Customer, CustomerService} from '../customer';
import {OffreService} from "../offre/offre.service";
import {Offre} from "../offre/offre.model";
import {PackProduct} from "../pack-product/pack-product.model";
import {Rule} from '../rule';
import {CityService} from "../city/city.service";
import {City} from "../city/city.model";
import {ShippingService} from "../shipping/shipping.service";
import {PaymentService} from "../payment/payment.service";
import {ShippingModeService} from "../shipping-mode/shipping-mode.service";
import {Payment} from "../payment/payment.model";
import {Shipping} from "../shipping/shipping.model";
import {ShippingMode} from "../shipping-mode/shipping-mode.model";
import {OrderDetails} from "../order-details/order-details.model";
import {Pack} from "../pack/pack.model";
import {Principal} from "../../shared/auth/principal.service";
import {Account} from "../../shared/user/account.model";
import * as moment from "moment";

@Component({
    selector: 'jhi-ordre-dialog',
    templateUrl: './ordre-new.component.html'
})
export class OrdreNewComponent implements OnInit {

    ordre: Ordre = new Ordre();
    isSaving: boolean;
    isValid: boolean;

    customers: Customer[];
    filtredCustomers: Customer[];
    cities: City[];
    shippings: Shipping[];
    payments: Payment[];
    shippingModes: ShippingMode[];
    offre: Offre;
    totalTtc = 0;
    totalDiscounted = 0;
    city: City;
    selectedCustomer: Customer[];
    selectedPayment: Payment[];
    selectedShippingMode: ShippingMode[];
    selectedShipping: Shipping[];
    orderDetails: OrderDetails[];
    account: Account;
    type;

    dropdownCitySettings = {
        singleSelection: true,
        text: 'Ville',
        selectAllText: 'Selectionner tous',
        unSelectAllText: 'déselectionner tous',
        enableSearchFilter: true,
        classes: 'col-12 mb-2',
        badgeShowLimit: 1,
        labelKey: 'name'
    };

    dropdownCustomerSettings = {
        singleSelection: true,
        text: 'Client',
        enableSearchFilter: true,
        classes: 'col-12 mb-2',
        badgeShowLimit: 1,
        labelKey: 'name'
    };

    dropdownShippingSettings = {
        singleSelection: true,
        text: 'Transporteur',
        enableSearchFilter: true,
        classes: 'col-12 mb-2',
        badgeShowLimit: 1,
        labelKey: 'name'
    };

    dropdownShippingModSettings = {
        singleSelection: true,
        text: 'Mode de livraison',
        enableSearchFilter: true,
        classes: 'col-12 mb-2',
        badgeShowLimit: 1,
        labelKey: 'name'
    };

    dropdownPaymentSettings = {
        singleSelection: true,
        text: 'Mode de paiement',
        enableSearchFilter: true,
        classes: 'col-12 mb-2',
        badgeShowLimit: 1,
        labelKey: 'name'
    };

    constructor(private jhiAlertService: JhiAlertService,
                private ordreService: OrdreService,
                private customerService: CustomerService,
                private eventManager: JhiEventManager,
                private offreService: OffreService,
                private cityService: CityService,
                private shippingService: ShippingService,
                private paymentService: PaymentService,
                private shippingModeService: ShippingModeService,
                private principal: Principal,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.init();
        this.route.params.subscribe((params) => {
            this.type = params['type'];
            this.offreService.getByStatus('IN_PROGRESS')
                .subscribe((res: HttpResponse<Offre[]>) => {
                    if (res.body && res.body.length > 0) {
                        let offres = res.body.filter((offre) => {
                            return offre.offreType === this.type;
                        });
                        if (offres) {
                            this.offre = offres[0];
                        }
                    }


                }, (res: HttpErrorResponse) => this.onError(res.message));
        });

        this.customerService.query({size: 9999})
            .subscribe((res: HttpResponse<Customer[]>) => {
                this.customers = res.body;
                this.filtredCustomers = [].concat(this.customers);
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.cityService.query({size: 9999})
            .subscribe((res: HttpResponse<City[]>) => {
                this.cities = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));


        this.shippingService.query({size: 9999})
            .subscribe((res: HttpResponse<Shipping[]>) => {

                this.shippings = res.body;
                if (this.shippings && this.shippings.length > 0) {
                    this.shippings = this.shippings.filter((shipping) => {
                        return !shipping.isGrossiste;
                    });
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));


        this.paymentService.query({size: 9999})
            .subscribe((res: HttpResponse<Payment[]>) => {
                this.payments = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));


        this.shippingModeService.query({size: 9999})
            .subscribe((res: HttpResponse<ShippingMode[]>) => {
                this.shippingModes = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    private init() {
        let current = moment();
        this.ordre.displayPaymentDueDate = {year: current.year(), month: current.month() + 1, day: current.date()};


    }

    save() {
        this.isSaving = true;
        this.copyDataToOrder();
        if (this.ordre.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ordreService.update(this.ordre));
        } else {
            this.subscribeToSaveResponse(
                this.ordreService.create(this.ordre));
        }
    }

    private isDataValid(): boolean {
        return this.ordre.customer && this.ordre.totalOrdred > 0;

    }

    private copyDataToOrder() {
        this.ordre.offre = this.offre;
        this.ordre.type = this.type;
        if (this.ordre.displayPaymentDueDate) {
            this.ordre.paymentDueDate = new Date(this.ordre.displayPaymentDueDate.year, this.ordre.displayPaymentDueDate.month - 1, this.ordre.displayPaymentDueDate.day);
        }
        this.orderDetails = [];
        this.ordre.totalOrdred = this.totalDiscounted;
        this.ordre.totalPaid = this.totalDiscounted;
        this.ordre.totalDiscount = this.totalTtc - this.totalDiscounted;
        this.ordre.customer = this.selectedCustomer[0];
        this.ordre.shipping = (this.selectedShipping && this.selectedShipping.length > 0) ? this.selectedShipping[0] : null;
        this.ordre.shippingMode = (this.selectedShippingMode && this.selectedShippingMode.length > 0) ? this.selectedShippingMode[0] : null;
        this.ordre.payment = (this.selectedPayment && this.selectedPayment.length > 0) ? this.selectedPayment[0] : null;
        this.offre.packs.forEach((pack: Pack) => {
            pack.packProducts.forEach((p: PackProduct) => {
                if (p.quantity && p.quantity > 0) {
                    let orderDetail = new OrderDetails();
                    orderDetail.quantity = p.quantity;
                    orderDetail.quantityShipped = p.quantity;
                    orderDetail.packProduct = p;
                    this.orderDetails.push(orderDetail);
                }
            });
        });
        this.ordre.orderDetails = this.orderDetails;

    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Ordre>>) {
        result.subscribe((res: HttpResponse<Ordre>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Ordre) {
        this.eventManager.broadcast({name: 'ordreListModification', content: 'OK'});
        this.isSaving = false;
        this.router.navigate(['/ordre']);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }

    trackId(index: number, item: Ordre) {
        return item.id;
    }

    calculateTotals(event: any, p: any, pack: any) {
        p.quantity = event;
        p.totalTtc = p.quantity * p.product.pph;
        p.totalDiscounted = p.quantity * p.product.pph;
        p.ugQuantity = null;
        if (p.quantity >= p.quantityMin)
            this.applyDiscount(p);
        this.calculatePackTotals(pack);
        this.calculateOrderTotals();
    }

    private applyDiscount(p: PackProduct): void {

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

    private calculatePackTotals(pack) {

        this.calculateSubTotals(pack);
        pack.packQteMin = pack.packProducts.map(packProduct => {
            return packProduct.quantityMin ? packProduct.quantityMin : 0;
        }).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        });
        pack.packQte = pack.packProducts.map(packProduct => {
            return packProduct.quantity ? packProduct.quantity : 0;
        }).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        });
        if (pack.packQte >= pack.packQteMin)
            this.applyPackRules(pack);
    }

    private applyPackRules(pack: any): void {
        let discountRules: Rule[] = pack.rules.filter((rule: Rule) => {
            return rule.type.code === 'reduction';
        });
        let ugRules: Rule[] = pack.rules.filter((rule: Rule) => {
            return rule.type.code === 'ug';
        });
        if (discountRules && discountRules.length > 0) {
            let discount = discountRules.map(rule => {
                return rule.reduction;
            }).reduce((r1, r2) => {
                return (r1 + r2);
            });
            pack.totalDiscounted = (1 - discount / 100) * pack.totalDiscounted;
        }

        if (ugRules && ugRules.length > 0) {
            ugRules.forEach((rule) => {
                pack.packProducts.forEach((p) => {
                    if (p.product.id === rule.product.id) {
                        p.ugQuantity = Math.floor((pack.packQte / pack.packQteMin) * rule.giftQuantity)
                        p.totalTtc = (p.quantity + p.ugQuantity) * p.product.pph;
                    } else {
                        //show error
                    }
                });
            });

            this.calculateSubTotals(pack);
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
        pack.totalUgQuantity = pack.packProducts.map(packProduct => {
            return packProduct.ugQuantity ? packProduct.ugQuantity : 0;
        }).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        });
    }

    private calculateOrderTotals() {
        this.totalTtc = this.offre.packs.map((pack: any) => {
            return (pack.totalTtc) ? pack.totalTtc : 0;
        }).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        });
        this.totalDiscounted = this.offre.packs.map((pack: any) => {
            return (pack.totalDiscounted) ? pack.totalDiscounted : 0;
        }).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        });
    }

    onSelectCity(city) {
        this.filtredCustomers = this.customers.filter((customer) => {
            return customer.city.id === city.id;
        });
        console.log(city);
    }

    onDeselectCity(event) {
        this.filtredCustomers = [].concat(this.customers);
    }

    assignQuantity(quantity, pack) {
        pack.packProducts.forEach((p) => {
            p.quantity = p.quantityMin * quantity;
            this.calculateTotals(p.quantity, p, pack);
        });
    }

}

