/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PharmarketTestModule } from '../../../test.module';
import { GiftMatPromoDialogComponent } from '../../../../../../main/webapp/app/entities/gift-mat-promo/gift-mat-promo-dialog.component';
import { GiftMatPromoService } from '../../../../../../main/webapp/app/entities/gift-mat-promo/gift-mat-promo.service';
import { GiftMatPromo } from '../../../../../../main/webapp/app/entities/gift-mat-promo/gift-mat-promo.model';
import { MaterielPromoService } from '../../../../../../main/webapp/app/entities/materiel-promo';
import { RuleService } from '../../../../../../main/webapp/app/entities/rule';

describe('Component Tests', () => {

    describe('GiftMatPromo Management Dialog Component', () => {
        let comp: GiftMatPromoDialogComponent;
        let fixture: ComponentFixture<GiftMatPromoDialogComponent>;
        let service: GiftMatPromoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [GiftMatPromoDialogComponent],
                providers: [
                    MaterielPromoService,
                    RuleService,
                    GiftMatPromoService
                ]
            })
            .overrideTemplate(GiftMatPromoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GiftMatPromoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GiftMatPromoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GiftMatPromo(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.giftMatPromo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'giftMatPromoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GiftMatPromo();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.giftMatPromo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'giftMatPromoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
