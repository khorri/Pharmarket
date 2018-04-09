import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { OrderHistory } from './order-history.model';
import { OrderHistoryService } from './order-history.service';

@Injectable()
export class OrderHistoryPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private orderHistoryService: OrderHistoryService

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
                this.orderHistoryService.find(id)
                    .subscribe((orderHistoryResponse: HttpResponse<OrderHistory>) => {
                        const orderHistory: OrderHistory = orderHistoryResponse.body;
                        orderHistory.addDate = this.datePipe
                            .transform(orderHistory.addDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.orderHistoryModalRef(component, orderHistory);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.orderHistoryModalRef(component, new OrderHistory());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    orderHistoryModalRef(component: Component, orderHistory: OrderHistory): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.orderHistory = orderHistory;
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
