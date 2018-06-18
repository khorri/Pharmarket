import {Component, OnInit, OnDestroy, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';
import {Offre, OffreType, OffreStatus} from './offre.model';
import {OffrePopupService} from './offre-popup.service';
import {OffreService} from './offre.service';
import {Shipping, ShippingService} from '../shipping';
import {Rule, RuleService} from '../rule';
import {Pack, PackService} from '../pack';
import {Product, ProductService} from '../product';
import {PackProduct} from "../pack-product/pack-product.model";
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import * as moment from "moment";


const I18N_VALUES = {
    'fr': {
        weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
        months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
    }
    // other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
    language = 'fr';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

    constructor(private _i18n: I18n) {
        super();
    }

    getWeekdayShortName(weekday: number): string {
        return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
    }

    getMonthShortName(month: number): string {
        return I18N_VALUES[this._i18n.language].months[month - 1];
    }

    getMonthFullName(month: number): string {
        return this.getMonthShortName(month);
    }
}

@Component({
    selector: 'jhi-offre-new',
    templateUrl: './offre-new.component.html',
    providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class OffreNewComponent implements OnInit {

    offre: Offre = new Offre();
    isSaving: boolean;

    shippings: Shipping[];
    packRules: Rule[];
    productRules: Rule[];
    products: Product[];

    dropdownSettings = {};
    dropdownSettings1 = {};
    dropdownShipSettings = {};
    types = OffreType;
    status = OffreStatus;
    selectedAll = false;
    rulesAll: Rule[];
    quantityMinAll = 1;


    constructor(private jhiAlertService: JhiAlertService,
                private offreService: OffreService,
                private shippingService: ShippingService,
                private ruleService: RuleService,
                private packService: PackService,
                private productService: ProductService,
                private eventManager: JhiEventManager,
                private router: Router,
                private route: ActivatedRoute) {


    }

    ngOnInit() {
        this.isSaving = false;
        this.init();
        this.offre.status = OffreStatus[0].id;
        this.offre.offreType = OffreType[0];
        this.route.params.subscribe((params) => {
            this.load(params['id']);
        });

        this.shippingService.query({size: 9999})
            .subscribe((res: HttpResponse<Shipping[]>) => {
                this.shippings = res.body;

            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productService.query({size: 9999, actif: true})
            .subscribe((res: HttpResponse<Product[]>) => {
                this.products = res.body;
                console.table(this.products);
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.ruleService.query({size: 9999})
            .subscribe((res: HttpResponse<Rule[]>) => {
                const data = res.body;
                this.packRules = data.filter((rule) => {
                    return rule.isForPack && rule.isActive;
                });
                this.productRules = data.filter((rule) => {
                    return rule.isForProduct && rule.isActive;
                });
            }, (res: HttpErrorResponse) => this.onError(res.message));


        this.dropdownSettings = {
            singleSelection: false,
            text: 'Choisir les règles',
            selectAllText: 'Selectionner tous',
            unSelectAllText: 'déselectionner tous',
            enableSearchFilter: true,
            classes: 'myclass custom-class',
            badgeShowLimit: 3,
            labelKey: 'name'
        };

        this.dropdownSettings1 = {
            singleSelection: false,
            text: 'Ajouter les produits',
            selectAllText: 'Selectionner tous',
            unSelectAllText: 'déselectionner tous',
            enableSearchFilter: true,
            classes: 'myclass custom-class',
            badgeShowLimit: 2,
            labelKey: 'name'
        };

        this.dropdownShipSettings = {
            singleSelection: false,
            text: 'Choisir les grossistes',
            selectAllText: 'Selectionner tous',
            unSelectAllText: 'déselectionner tous',
            classes: 'multi-select',
            enableSearchFilter: true,
            badgeShowLimit: 3,
            labelKey: 'name'
        };


    }

    load(id) {
        if (!id)
            return;
        this.offreService.find(id)
            .subscribe((offreResponse: HttpResponse<Offre>) => {
                this.offre = offreResponse.body;
                let start = moment(this.offre.start);
                let end = moment(this.offre.end);
                this.offre.displayStart = {
                    year: start.year(),
                    month: start.month() + 1,
                    day: start.date()
                };
                this.offre.displayEnd = {
                    year: end.year(),
                    month: end.month() + 1,
                    day: end.date()
                };
            });
    }
    isValidData() {
        if (this.offre.packs && this.offre.packs.length > 0) {
            let pack: Pack = this.offre.packs[0];
            if (pack.packProducts && pack.packProducts.length > 0)
                return true;
        }


        return false;
    }

    selectionChanged(item: any) {
        console.log(item);
    }

    onItemSelect(item: any) {
        console.log(item);
        //console.log(this.selectedItems);
    }

    OnItemDeSelect(item: any) {
        console.log(item);
        // console.log(this.selectedItems);
    }

    onSelectAll(items: any) {
        console.log(items);
    }

    onDeSelectAll(items: any) {
        console.log(items);
    }

    onProductSelect(product: any, pack: any) {
        this.addProduct(product, pack);
    }

    private addProduct(product: any, pack: any) {

        const packProducts: PackProduct = new PackProduct(null, 1, [], product);
        if (!pack.packProducts)
            pack.packProducts = [];
        const alreadyExists = pack.packProducts.filter((p) => {
            return p.product.id === product.id;
        });
        if (alreadyExists && alreadyExists.length > 0)
            return;
        pack.packProducts.push(packProducts);
    }

    OnProductDeSelect(item: any) {
        console.log(item);
        // console.log(this.selectedItems);
    }

    onSelectAllProduct(products: any, pack: any) {
        products.forEach((product) => {
            this.addProduct(product, pack);
        });
    }

    onDeSelectAllProduct(items: any, pack: any) {

    }

    isDisabled(date: NgbDateStruct, current: {year: number; month: number;}) {

        let d = new Date(date.year, date.month - 1, date.day);
        let day = d.getDay();
        let isWeekend = (day == 6) || (day == 0);    // 6 = Saturday, 0 = Sunday
        return isWeekend;
    }

    addPack() {
        let pack: Pack = new Pack(null, '', []);
        pack.operator = 'and';
        pack.packProducts = [];
        if (!this.offre.packs)
            this.offre.packs = [];
        this.offre.packs.push(pack);

    }

    private init() {
        let current = moment();
        let currentDate = moment(current);
        let futureMonth = moment(current).add(1, 'M');
        let futureMonthEnd = moment(futureMonth).endOf('month');

        if (currentDate.date() != futureMonth.date() && futureMonth.isSame(futureMonthEnd.format('YYYY-MM-DD'))) {
            futureMonth = futureMonth.add(1, 'd');
        }
        this.offre.displayStart = {year: currentDate.year(), month: currentDate.month() + 1, day: currentDate.date()};
        this.offre.displayEnd = {year: futureMonth.year(), month: futureMonth.month() + 1, day: futureMonth.date()};

    }


    removeLine(pack, index) {
        if (index > -1) {
            pack.packProducts.splice(index, 1);
        }
    }

    removeSelected(pack) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer les produits sélectionnées?')) {
            return;
        }
        let selectedIndexes = pack.packProducts.filter((p) => {
            return p.selected;
        }).map((p) => {
            return pack.packProducts.indexOf(p);
        });
        if (selectedIndexes) {
            for (var i = selectedIndexes.length - 1; i >= 0; i--)
                pack.packProducts.splice(selectedIndexes[i], 1);
        }
    }

    selectAll(pack) {
        pack.packProducts.forEach((p) => {
            p.selected = !pack.selectedAll;
        });
    }

    removePack(index) {
        if (index > -1) {
            this.offre.packs.splice(index, 1);
        }
    }

    save() {
        this.isSaving = true;
        if (this.offre.displayStart) {
            this.offre.start = new Date(this.offre.displayStart.year, this.offre.displayStart.month - 1, this.offre.displayStart.day);
        }
        if (this.offre.displayEnd) {
            this.offre.end = new Date(this.offre.displayEnd.year, this.offre.displayEnd.month - 1, this.offre.displayEnd.day + 1);
        }

        //this.offre.status = this.offre.status.id;
        /*if (this.offre.id !== undefined) {
            this.subscribeToSaveResponse(
                this.offreService.update(this.offre));
         } else {*/
            this.subscribeToSaveResponse(
                this.offreService.create(this.offre));
        //}
    }

    private    subscribeToSaveResponse(result: Observable < HttpResponse < Offre >>) {
        result.subscribe((res: HttpResponse<Offre>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private    onSaveSuccess(result: Offre) {
        this.eventManager.broadcast({name: 'offreListModification', content: 'OK'});
        this.isSaving = false;
        this.router.navigate(['/offre']);
    }

    private    onSaveError() {
        this.isSaving = false;
    }

    private    onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackShippingById(index: number, item: Shipping) {
        return item.id;
    }

    trackPackRuleById(index: number, item: Rule) {
        return item.id;
    }

    getSelected(selectedVals: Array < any >, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }

    applyAll(pack: Pack) {
        if (this.quantityMinAll) {
            pack.packProducts.forEach((pp: PackProduct) => {
                pp.quantityMin = this.quantityMinAll;
            });
        }
        if (this.rulesAll) {
            pack.packProducts.forEach((pp: PackProduct) => {
                pp.rules = [].concat(this.rulesAll);
            });
        }
    }

    isProductSelected(pack: Pack) {
        if (pack && pack.packProducts && pack.packProducts.length > 0)
            return true;
        return false;
    }

    trackIndex(index: number, item: Offre) {
        return index;
    }
}

