import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { GiftMatPromo } from './gift-mat-promo.model';
import { GiftMatPromoService } from './gift-mat-promo.service';

@Injectable()
export class GiftMatPromoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private giftMatPromoService: GiftMatPromoService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.giftMatPromoService.find(id)
                    .subscribe((giftMatPromoResponse: HttpResponse<GiftMatPromo>) => {
                        const giftMatPromo: GiftMatPromo = giftMatPromoResponse.body;
                        this.ngbModalRef = this.giftMatPromoModalRef(component, giftMatPromo);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.giftMatPromoModalRef(component, new GiftMatPromo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    giftMatPromoModalRef(component: Component, giftMatPromo: GiftMatPromo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.giftMatPromo = giftMatPromo;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
