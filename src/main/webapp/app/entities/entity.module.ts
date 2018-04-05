import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PharmarketOffreModule } from './offre/offre.module';
import { PharmarketPackModule } from './pack/pack.module';
import { PharmarketProductModule } from './product/product.module';
import { PharmarketGiftProductModule } from './gift-product/gift-product.module';
import { PharmarketGiftMatPromoModule } from './gift-mat-promo/gift-mat-promo.module';
import { PharmarketPackProductModule } from './pack-product/pack-product.module';
import { PharmarketCustomerModule } from './customer/customer.module';
import { PharmarketRegionModule } from './region/region.module';
import { PharmarketCityModule } from './city/city.module';
import { PharmarketShippingModeModule } from './shipping-mode/shipping-mode.module';
import { PharmarketOrdreModule } from './ordre/ordre.module';
import { PharmarketOrderDetailsModule } from './order-details/order-details.module';
import { PharmarketOrderStateModule } from './order-state/order-state.module';
import { PharmarketOrderHistoryModule } from './order-history/order-history.module';
import { PharmarketPaymentModule } from './payment/payment.module';
import { PharmarketShippingModule } from './shipping/shipping.module';
import { PharmarketMaterielPromoModule } from './materiel-promo/materiel-promo.module';
import { PharmarketRuleModule } from './rule/rule.module';
import { PharmarketConditionsModule } from './conditions/conditions.module';
import { PharmarketActionModule } from './action/action.module';
import { PharmarketRuleTypeModule } from './rule-type/rule-type.module';
import { PharmarketGadgetModule } from './gadget/gadget.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PharmarketOffreModule,
        PharmarketPackModule,
        PharmarketProductModule,
        PharmarketGiftProductModule,
        PharmarketGiftMatPromoModule,
        PharmarketPackProductModule,
        PharmarketCustomerModule,
        PharmarketRegionModule,
        PharmarketCityModule,
        PharmarketShippingModeModule,
        PharmarketOrdreModule,
        PharmarketOrderDetailsModule,
        PharmarketOrderStateModule,
        PharmarketOrderHistoryModule,
        PharmarketPaymentModule,
        PharmarketShippingModule,
        PharmarketMaterielPromoModule,
        PharmarketRuleModule,
        PharmarketConditionsModule,
        PharmarketActionModule,
        PharmarketRuleTypeModule,
        PharmarketGadgetModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PharmarketEntityModule {}
