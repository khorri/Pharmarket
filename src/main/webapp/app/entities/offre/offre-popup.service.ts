import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Offre } from './offre.model';
import { OffreService } from './offre.service';

@Injectable()
export class OffrePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private offreService: OffreService

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
                this.offreService.find(id)
                    .subscribe((offreResponse: HttpResponse<Offre>) => {
                        const offre: Offre = offreResponse.body;
                        offre.start = this.datePipe
                            .transform(offre.start, 'yyyy-MM-ddTHH:mm:ss');
                        offre.end = this.datePipe
                            .transform(offre.end, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.offreModalRef(component, offre);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.offreModalRef(component, new Offre());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    offreModalRef(component: Component, offre: Offre): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.offre = offre;
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
