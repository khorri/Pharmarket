/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PharmarketTestModule } from '../../../test.module';
import { MaterielPromoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/materiel-promo/materiel-promo-delete-dialog.component';
import { MaterielPromoService } from '../../../../../../main/webapp/app/entities/materiel-promo/materiel-promo.service';

describe('Component Tests', () => {

    describe('MaterielPromo Management Delete Component', () => {
        let comp: MaterielPromoDeleteDialogComponent;
        let fixture: ComponentFixture<MaterielPromoDeleteDialogComponent>;
        let service: MaterielPromoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [MaterielPromoDeleteDialogComponent],
                providers: [
                    MaterielPromoService
                ]
            })
            .overrideTemplate(MaterielPromoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaterielPromoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaterielPromoService);
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
