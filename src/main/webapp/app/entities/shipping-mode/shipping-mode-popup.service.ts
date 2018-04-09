import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ShippingMode } from './shipping-mode.model';
import { ShippingModeService } from './shipping-mode.service';

@Injectable()
export class ShippingModePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private shippingModeService: ShippingModeService

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
                this.shippingModeService.find(id)
                    .subscribe((shippingModeResponse: HttpResponse<ShippingMode>) => {
                        const shippingMode: ShippingMode = shippingModeResponse.body;
                        this.ngbModalRef = this.shippingModeModalRef(component, shippingMode);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.shippingModeModalRef(component, new ShippingMode());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    shippingModeModalRef(component: Component, shippingMode: ShippingMode): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.shippingMode = shippingMode;
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
