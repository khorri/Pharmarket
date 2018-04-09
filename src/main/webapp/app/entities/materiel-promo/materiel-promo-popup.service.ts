import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { MaterielPromo } from './materiel-promo.model';
import { MaterielPromoService } from './materiel-promo.service';

@Injectable()
export class MaterielPromoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private materielPromoService: MaterielPromoService

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
                this.materielPromoService.find(id)
                    .subscribe((materielPromoResponse: HttpResponse<MaterielPromo>) => {
                        const materielPromo: MaterielPromo = materielPromoResponse.body;
                        this.ngbModalRef = this.materielPromoModalRef(component, materielPromo);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.materielPromoModalRef(component, new MaterielPromo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    materielPromoModalRef(component: Component, materielPromo: MaterielPromo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.materielPromo = materielPromo;
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
