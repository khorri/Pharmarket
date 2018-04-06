import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';
import {Offre, OffreType, OffreStatus} from './offre.model';
import {OffrePopupService} from './offre-popup.service';
import {OffreService} from './offre.service';
import {Shipping, ShippingService} from '../shipping';
import {Rule, RuleService} from '../rule';
import {Pack, PackService} from '../pack';
import {Product, ProductService} from '../product';
import {PackProduct} from "../pack-product/pack-product.model";

@Component({
    selector: 'jhi-offre-new',
    templateUrl: './offre-new.component.html'
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


    constructor(private jhiAlertService: JhiAlertService,
                private offreService: OffreService,
                private shippingService: ShippingService,
                private ruleService: RuleService,
                private packService: PackService,
                private productService: ProductService,
                private eventManager: JhiEventManager,
                private router: Router) {


    }

    ngOnInit() {
        this.isSaving = false;
        this.offre.status = OffreType[0];
        this.offre.offreType = OffreStatus[0].id;
        this.shippingService.query({size: 9999})
            .subscribe((res: HttpResponse<Shipping[]>) => {
                this.shippings = res.body;

            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productService.query({size: 9999})
            .subscribe((res: HttpResponse<Product[]>) => {
                this.products = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.ruleService.query({size: 9999})
            .subscribe((res: HttpResponse<Rule[]>) => {
                const data = res.body;
                this.packRules = data.filter((rule) => {
                    return rule.isForPack;
                });
                this.productRules = data.filter((rule) => {
                    return rule.isForProduct;
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
            badgeShowLimit: 3,
            labelKey: 'name'
        };


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
        const packProducts: PackProduct = new PackProduct(0, 1, [], product);
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

    addPack() {
        let pack: Pack = new Pack(0, '', []);
        pack.packProducts = [];
        if (!this.offre.packs)
            this.offre.packs = [];
        this.offre.packs.push(pack);

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
        //this.offre.status = this.offre.status.id;
        if (this.offre.id !== undefined) {
            this.subscribeToSaveResponse(
                this.offreService.update(this.offre));
        } else {
            this.subscribeToSaveResponse(
                this.offreService.create(this.offre));
        }
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
}


