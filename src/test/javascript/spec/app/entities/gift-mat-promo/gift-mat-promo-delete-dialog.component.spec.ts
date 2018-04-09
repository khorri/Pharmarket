/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PharmarketTestModule } from '../../../test.module';
import { GiftMatPromoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/gift-mat-promo/gift-mat-promo-delete-dialog.component';
import { GiftMatPromoService } from '../../../../../../main/webapp/app/entities/gift-mat-promo/gift-mat-promo.service';

describe('Component Tests', () => {

    describe('GiftMatPromo Management Delete Component', () => {
        let comp: GiftMatPromoDeleteDialogComponent;
        let fixture: ComponentFixture<GiftMatPromoDeleteDialogComponent>;
        let service: GiftMatPromoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [GiftMatPromoDeleteDialogComponent],
                providers: [
                    GiftMatPromoService
                ]
            })
            .overrideTemplate(GiftMatPromoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GiftMatPromoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GiftMatPromoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
