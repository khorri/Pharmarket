/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PharmarketTestModule } from '../../../test.module';
import { PackProductDialogComponent } from '../../../../../../main/webapp/app/entities/pack-product/pack-product-dialog.component';
import { PackProductService } from '../../../../../../main/webapp/app/entities/pack-product/pack-product.service';
import { PackProduct } from '../../../../../../main/webapp/app/entities/pack-product/pack-product.model';
import { ProductService } from '../../../../../../main/webapp/app/entities/product';
import { PackService } from '../../../../../../main/webapp/app/entities/pack';
import { RuleService } from '../../../../../../main/webapp/app/entities/rule';

describe('Component Tests', () => {

    describe('PackProduct Management Dialog Component', () => {
        let comp: PackProductDialogComponent;
        let fixture: ComponentFixture<PackProductDialogComponent>;
        let service: PackProductService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [PackProductDialogComponent],
                providers: [
                    ProductService,
                    PackService,
                    RuleService,
                    PackProductService
                ]
            })
            .overrideTemplate(PackProductDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PackProductDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PackProductService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PackProduct(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.packProduct = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'packProductListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PackProduct();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.packProduct = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'packProductListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
