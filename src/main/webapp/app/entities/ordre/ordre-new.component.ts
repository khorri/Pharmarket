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
import {OrderState} from "../order-state/order-state.model";
import {OrderStateService} from "../order-state/order-state.service";
import {OrderHistory} from "../order-history/order-history.model";

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
    grossistes: Shipping[];
    payments: Payment[];
    shippingModes: ShippingMode[];
    orderStates: OrderState[];
    offre: Offre;
    offres: Offre[];
    totalTtc = 0;
    totalDiscounted = 0;
    city: City;
    selectedCustomer: Customer[];
    selectedPayment: Payment[];
    selectedShippingMode: ShippingMode[];
    selectedShipping: Shipping[];
    orderDetails: OrderDetails[];
    selectedOrderState: OrderState[];
    account: Account;
    type;
    firstGrossiste: any[];
    secondGrossiste: any[];
    thirdGrossiste: any[];
    dropdownCitySettings;
    dropdownCustomerSettings;
    dropdownPaymentSettings;
    dropdownShippingModSettings;
    dropdownGrossisteSettings;
    dropdownShippingSettings;
    dropdownOrderStateSettings;
    isLoading: boolean = true;



    constructor(private jhiAlertService: JhiAlertService,
                private ordreService: OrdreService,
                private customerService: CustomerService,
                private eventManager: JhiEventManager,
                private offreService: OffreService,
                private cityService: CityService,
                private shippingService: ShippingService,
                private paymentService: PaymentService,
                private shippingModeService: ShippingModeService,
                private orderStateService: OrderStateService,
                private principal: Principal,
                private router: Router,
                private route: ActivatedRoute) {

        this.route.params.subscribe((params) => {
            this.type = params['type'];
            this.loadOffre();

        });
    }

    ngOnInit() {
        this.isSaving = false;
        this.init();
        this.route.params.subscribe((params) => {
            let id = params['id'];
            this.loadOrder(id);
        });
        this.loadInitialDetails();


    }

    private loadOffre() {
        this.offreService.getByStatus('IN_PROGRESS')
            .subscribe((res: HttpResponse<Offre[]>) => {
                if (res.body && res.body.length > 0) {
                    this.offres = res.body.filter((offre) => {
                        return offre.offreType === this.type;
                    });
                    if (this.offres) {
                        this.offre = this.offres[0];
                    }
                    if (this.ordre.id) {
                        this.offre = this.getSelectedOffre();
                        this.setQuantities();
                        this.setOrderValues();

                    }
                    this.isLoading = false;

                }


            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    private loadOrder(id) {
        if (!id)
            return;
        this.ordreService.find(id).subscribe((res: HttpResponse<Ordre>) => {
            this.ordre = res.body;
        });
    }

    private getSelectedOffre(): Offre {
        let offres = this.offres.filter((offre) => {
            return offre.id === this.ordre.offre.id;
        });
        return offres[0];
    }

    private loadInitialDetails() {
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
                    this.grossistes = res.body.filter((shipping) => {
                        return shipping.isGrossiste;
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

        this.orderStateService.query({size: 9999})
            .subscribe((res: HttpResponse<OrderState[]>) => {
                this.orderStates = res.body;
                if (this.orderStates && this.orderStates.length > 0) {
                    this.selectedOrderState = (this.ordre.id) ? [].concat(this.ordre.currentStatus) : [].concat(this.orderStates[0]);
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    private init() {
        let current = moment();
        this.ordre.displayPaymentDueDate = {year: current.year(), month: current.month() + 1, day: current.date()};
        this.setDropDownSetting();

    }

    private setQuantities() {
        if (this.offre && this.ordre) {
            this.offre.packs.forEach((pack: Pack) => {
                pack.packProducts.forEach((p: PackProduct) => {
                    this.setProductQuantity(p);
                    this.calculateTotals(p.quantity, p, pack);
                });
            });
        }
    }

    private setProductQuantity(p: PackProduct) {
        for (let i = 0; i < this.ordre.orderDetails.length; i++) {
            let orderDetail: OrderDetails = this.ordre.orderDetails[i];
            if (p.id === orderDetail.packProduct.id) {
                p.quantity = orderDetail.quantity;
                break;
            }
        }
    }

    private setOrderValues() {
        this.selectedPayment = [].concat(this.ordre.payment);
        this.selectedShippingMode = [].concat(this.ordre.shippingMode);
        this.selectedShipping = [].concat(this.ordre.shipping);
        this.selectedCustomer = [].concat(this.ordre.customer);
        this.firstGrossiste = [].concat(this.ordre.firstGrossiste);
        this.secondGrossiste = [].concat(this.ordre.secondGrossiste);
        this.thirdGrossiste = [].concat(this.ordre.thirdGrossiste);
        let paymentDueDate = new Date(this.ordre.paymentDueDate);
        this.ordre.displayPaymentDueDate = {
            year: paymentDueDate.getFullYear(),
            month: paymentDueDate.getMonth() + 1,
            day: paymentDueDate.getDate()
        };
    }

    save(isValidate?: boolean) {
        this.isSaving = true;
        this.copyDataToOrder(isValidate);

        if (this.ordre.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ordreService.update(this.ordre));
        } else {
            this.subscribeToSaveResponse(
                this.ordreService.create(this.ordre));
        }
    }

    validate() {
        this.save(true);
    }

    private isDataValid(): boolean {
        return this.ordre.customer && this.ordre.totalOrdred > 0;

    }

    private copyDataToOrder(isValidate?: boolean) {
        this.ordre.offre = this.offre;
        this.ordre.type = this.type;
        if (this.ordre.displayPaymentDueDate) {
            this.ordre.paymentDueDate = new Date(this.ordre.displayPaymentDueDate.year, this.ordre.displayPaymentDueDate.month - 1, this.ordre.displayPaymentDueDate.day);
        }
        this.orderDetails = [];
        if (this.ordre.currentStatus && this.ordre.currentStatus.priority === 1) {
            this.ordre.totalOrdred = this.totalDiscounted;
        }

        this.ordre.totalPaid = this.totalDiscounted;
        this.ordre.totalDiscount = this.totalTtc - this.totalDiscounted;
        this.ordre.customer = this.selectedCustomer[0];
        this.ordre.shipping = (this.selectedShipping && this.selectedShipping.length > 0) ? this.selectedShipping[0] : null;
        this.ordre.shippingMode = (this.selectedShippingMode && this.selectedShippingMode.length > 0) ? this.selectedShippingMode[0] : null;
        this.ordre.payment = (this.selectedPayment && this.selectedPayment.length > 0) ? this.selectedPayment[0] : null;
        this.ordre.firstGrossiste = (this.firstGrossiste && this.firstGrossiste.length > 0) ? this.firstGrossiste[0] : null;
        this.ordre.secondGrossiste = (this.secondGrossiste && this.secondGrossiste.length > 0) ? this.secondGrossiste[0] : null;
        this.ordre.thirdGrossiste = (this.thirdGrossiste && this.thirdGrossiste.length > 0) ? this.thirdGrossiste[0] : null;
        if (this.ordre.id) {
            this.updateOrderDetails();
        } else {
            this.createOrderDetails();
        }
        this.setOrderState(isValidate);

        this.ordre.orderDetails = this.orderDetails;

    }

    private setOrderState(isValidate) {
        let orderHistory: OrderHistory = new OrderHistory();
        orderHistory.orderState = this.selectedOrderState[0];
        orderHistory.addDate = new Date();


        if (!this.ordre.orderHistories) {
            this.ordre.orderHistories = [];
        }

        if (!this.ordre.currentStatus || this.ordre.currentStatus.id !== this.selectedOrderState[0].id) {
            this.ordre.currentStatus = this.selectedOrderState[0];
        }

        if (isValidate) {

            orderHistory.orderState = this.getValidationOrderState();
            this.ordre.currentStatus = orderHistory.orderState;

        }

        if (!this.isOrderHistoryExist(orderHistory)) {
            this.ordre.orderHistories.push(orderHistory);
        }


    }

    private getValidationOrderState() {
        let orderSates = this.orderStates.filter((orderState: OrderState) => {
            return orderState.priority === 2;
        });
        return (orderSates && orderSates.length > 0) ? orderSates[0] : null;
    }

    private isOrderHistoryExist(orderHistory: OrderHistory) {
        let orderHistoryList = this.ordre.orderHistories.filter((orderHist: OrderHistory) => {
            return orderHist.orderState.id === orderHistory.orderState.id;
        });
        return (orderHistoryList && orderHistoryList.length > 0);
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
            this.ordreService.applyDiscount(p);
        this.ordreService.calculatePackTotals(pack);
        this.calculateOrderTotals();
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

    private createOrderDetails() {
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
    }

    private updateOrderDetails() {
        this.offre.packs.forEach((pack: Pack) => {
            pack.packProducts.forEach((p: PackProduct) => {
                if (p.quantity && p.quantity > 0) {
                    let orderDetail = this.getOrderDetails(p);
                    orderDetail.quantity = p.quantity;
                    orderDetail.quantityShipped = p.quantity;
                    orderDetail.packProduct = p;
                    //orderDetail.ordre = this.ordre;
                    this.orderDetails.push(orderDetail);
                }
            });
        });
    }

    private getOrderDetails(p: PackProduct): OrderDetails {
        let orderDetails = this.ordre.orderDetails.filter((orderDetail: OrderDetails) => {
            return orderDetail.packProduct.id === p.id;
        });
        if (orderDetails && orderDetails.length > 0) {
            return orderDetails[0];
        } else {
            return new OrderDetails();
        }


    }

    private getStyles(state) {
        let styles = {
            'background-color': state.color,
            'color': '#fff',
            'display': 'inline-block',
            'padding': '.25em .4em',
            'font-size': '75%',
            'font-weight': '700',
            'line-height': '1',
            'text-align': 'center',
            'white-space': 'nowrap',
            'vertical-align': 'baseline',
            'border-radius': '.25rem'
        };

        return styles;
    }

    private setDropDownSetting() {
        this.dropdownCitySettings = {
            singleSelection: true,
            text: 'Ville',
            selectAllText: 'Selectionner tous',
            unSelectAllText: 'déselectionner tous',
            enableSearchFilter: true,
            classes: 'col-12 mb-2',
            badgeShowLimit: 1,
            labelKey: 'name'
        };

        this.dropdownCustomerSettings = {
            singleSelection: true,
            text: 'Client',
            enableSearchFilter: true,
            classes: 'col-12 mb-2',
            badgeShowLimit: 1,
            labelKey: 'name'
        };

        this.dropdownShippingSettings = {
            singleSelection: true,
            text: 'Transporteur',
            enableSearchFilter: true,
            classes: 'col-12 mb-2',
            badgeShowLimit: 1,
            labelKey: 'name'
        };
        this.dropdownGrossisteSettings = {
            singleSelection: true,
            text: 'Grossiste',
            enableSearchFilter: true,
            classes: 'col-12 mb-2',
            badgeShowLimit: 1,
            labelKey: 'name'
        };

        this.dropdownShippingModSettings = {
            singleSelection: true,
            text: 'Mode de livraison',
            enableSearchFilter: true,
            classes: 'col-12 mb-2',
            badgeShowLimit: 1,
            labelKey: 'name'
        };

        this.dropdownPaymentSettings = {
            singleSelection: true,
            text: 'Mode de paiement',
            enableSearchFilter: true,
            classes: 'col-12 mb-2',
            badgeShowLimit: 1,
            labelKey: 'name'
        };
        this.dropdownOrderStateSettings = {
            singleSelection: true,
            text: 'Status',
            enableSearchFilter: true,
            classes: 'col-12 mb-2',
            badgeShowLimit: 1,
            labelKey: 'name'
        };

    }
}

