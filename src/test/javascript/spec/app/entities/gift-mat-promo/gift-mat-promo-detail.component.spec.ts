/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PharmarketTestModule } from '../../../test.module';
import { GiftMatPromoDetailComponent } from '../../../../../../main/webapp/app/entities/gift-mat-promo/gift-mat-promo-detail.component';
import { GiftMatPromoService } from '../../../../../../main/webapp/app/entities/gift-mat-promo/gift-mat-promo.service';
import { GiftMatPromo } from '../../../../../../main/webapp/app/entities/gift-mat-promo/gift-mat-promo.model';

describe('Component Tests', () => {

    describe('GiftMatPromo Management Detail Component', () => {
        let comp: GiftMatPromoDetailComponent;
        let fixture: ComponentFixture<GiftMatPromoDetailComponent>;
        let service: GiftMatPromoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [GiftMatPromoDetailComponent],
                providers: [
                    GiftMatPromoService
                ]
            })
            .overrideTemplate(GiftMatPromoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GiftMatPromoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GiftMatPromoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new GiftMatPromo(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.giftMatPromo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
