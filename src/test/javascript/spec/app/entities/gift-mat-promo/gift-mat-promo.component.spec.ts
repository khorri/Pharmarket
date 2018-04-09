/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PharmarketTestModule } from '../../../test.module';
import { GiftMatPromoComponent } from '../../../../../../main/webapp/app/entities/gift-mat-promo/gift-mat-promo.component';
import { GiftMatPromoService } from '../../../../../../main/webapp/app/entities/gift-mat-promo/gift-mat-promo.service';
import { GiftMatPromo } from '../../../../../../main/webapp/app/entities/gift-mat-promo/gift-mat-promo.model';

describe('Component Tests', () => {

    describe('GiftMatPromo Management Component', () => {
        let comp: GiftMatPromoComponent;
        let fixture: ComponentFixture<GiftMatPromoComponent>;
        let service: GiftMatPromoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [GiftMatPromoComponent],
                providers: [
                    GiftMatPromoService
                ]
            })
            .overrideTemplate(GiftMatPromoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GiftMatPromoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GiftMatPromoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new GiftMatPromo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.giftMatPromos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
