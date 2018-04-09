/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PharmarketTestModule } from '../../../test.module';
import { PackComponent } from '../../../../../../main/webapp/app/entities/pack/pack.component';
import { PackService } from '../../../../../../main/webapp/app/entities/pack/pack.service';
import { Pack } from '../../../../../../main/webapp/app/entities/pack/pack.model';

describe('Component Tests', () => {

    describe('Pack Management Component', () => {
        let comp: PackComponent;
        let fixture: ComponentFixture<PackComponent>;
        let service: PackService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PharmarketTestModule],
                declarations: [PackComponent],
                providers: [
                    PackService
                ]
            })
            .overrideTemplate(PackComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PackComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PackService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Pack(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.packs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
