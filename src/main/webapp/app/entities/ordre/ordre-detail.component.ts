import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Ordre } from './ordre.model';
import { OrdreService } from './ordre.service';
import {ShippingModeService} from "../shipping-mode/shipping-mode.service";
import {PaymentService} from "../payment/payment.service";
import {ShippingService} from "../shipping/shipping.service";
import {CityService} from "../city/city.service";
import {OffreService} from "../offre/offre.service";
import {Offre} from "../offre/offre.model";
import {OrderDetails} from "../order-details/order-details.model";
import {Pack} from "../pack/pack.model";
import {PackProduct} from "../pack-product/pack-product.model";
import {Principal} from "../../shared/auth/principal.service";

@Component({
    selector: 'jhi-ordre-detail',
    templateUrl: './ordre-detail.component.html'
})
export class OrdreDetailComponent implements OnInit, OnDestroy {

    ordre: Ordre;
    orderLine: Offre;
    totalDiscounted: any;
    totalTtc: any;
    selectedPackProducts: any[];
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    currentAccount;


    constructor(
        private eventManager: JhiEventManager,
        private ordreService: OrdreService,
        private route: ActivatedRoute,
        private offreService: OffreService,
        private cityService: CityService,
        private shippingService: ShippingService,
        private paymentService: PaymentService,
        private shippingModeService: ShippingModeService,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOrdres();
    }

    load(id) {
        this.ordreService.find(id)
            .subscribe((ordreResponse: HttpResponse<Ordre>) => {
                this.ordre = ordreResponse.body;
                this.loadOffre(this.ordre.offre.id);
            });
    }

    loadOffre(id) {
        this.offreService.find(id)
            .subscribe((res: HttpResponse<Offre>) => {
                this.ordre.offre = res.body;
                this.processPacks(this.ordre);


            });
    }

    processPacks(order: Ordre) {

        let offre = this.ordre.offre;
        let orderDetails = this.ordre.orderDetails;
        offre.packs.forEach((pack: Pack) => {
            pack.packProducts.forEach((packProduct: PackProduct) => {
                let detail: OrderDetails[] = orderDetails.filter((orderDetails: OrderDetails) => {
                    return orderDetails.packProduct.id === packProduct.id;
                });
                if (detail && detail.length > 0) {
                    pack.selected = true;
                    packProduct.quantity = detail[0].quantity;
                    packProduct.ugQuantity = detail[0].ugQuantity;
                    packProduct.totalTtc = packProduct.quantity * packProduct.product.pph;
                    packProduct.totalDiscounted = packProduct.quantity * packProduct.product.pph;
                    if (packProduct.quantity >= packProduct.quantityMin)
                        this.ordreService.applyDiscount(packProduct);
                }
            });
            this.ordreService.calculatePackTotals(pack);
        });
        this.calculateOrderTotals(offre.packs);
    }


    private calculateOrderTotals(packs) {
        this.totalTtc = this.ordreService.getTotalTtc(packs);
        this.totalDiscounted = this.ordreService.getTotalTtc(packs);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrdres() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ordreListModification',
            (response) => this.load(this.ordre.id)
        );
    }

    isEditable() {
        return (this.currentAccount.authorities.includes('ROLE_REP') && this.ordre.currentStatus && this.ordre.currentStatus.priority === 1);
    }
}
