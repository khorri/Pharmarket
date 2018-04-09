/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PharmarketTestModule } from '../../../test.module';
import { GiftProductDialogComponent } from '../../../../../../main/webapp/app/entities/gift-product/gift-product-dialog.component';
import { GiftProductService } from '../../../../../../main/webapp/app/entities/gift-product/gift-product.service';
import { GiftProduct } from '../../../../../../main/webapp/app/entities/gift-product/gift-product.model';
import { ProductService } from '../../../../../../main/webapp/app/entities/product';
import { RuleService } from '../../../../../../main/webapp/app/entities/rule';

describe('Component Tests', () => {

    describe('GiftProduct Management Dialog Component', () => {
        let comp: GiftProductDialogComponent;
        let fixture: ComponentFixture<GiftProductDialogComponent>;
        let service: GiftProductService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [GiftProductDialogComponent],
                providers: [
                    ProductService,
                    RuleService,
                    GiftProductService
                ]
            })
            .overrideTemplate(GiftProductDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GiftProductDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GiftProductService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GiftProduct(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.giftProduct = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'giftProductListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GiftProduct();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.giftProduct = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'giftProductListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
