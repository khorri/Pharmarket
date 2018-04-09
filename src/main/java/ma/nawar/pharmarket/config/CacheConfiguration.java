package ma.nawar.pharmarket.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(ma.nawar.pharmarket.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Offre.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Pack.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Pack.class.getName() + ".offres", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Pack.class.getName() + ".rules", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Product.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.GiftProduct.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.GiftMatPromo.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.PackProduct.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.PackProduct.class.getName() + ".packs", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.PackProduct.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.PackProduct.class.getName() + ".rules", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Customer.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Customer.class.getName() + ".orders", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Region.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.City.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.City.class.getName() + ".regions", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.ShippingMode.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Ordre.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Ordre.class.getName() + ".orderHistories", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Ordre.class.getName() + ".orderDetails", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Ordre.class.getName() + ".payments", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Ordre.class.getName() + ".shippingModes", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Ordre.class.getName() + ".shippings", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.OrderDetails.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.OrderState.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.OrderHistory.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Payment.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Shipping.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.MaterielPromo.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Rule.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Rule.class.getName() + ".conditions", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Rule.class.getName() + ".actions", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Conditions.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Action.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.RuleType.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.RuleType.class.getName() + ".ruleTypes", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.RuleType.class.getName() + ".rules", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Rule.class.getName() + ".ruleTypes", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Rule.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Rule.class.getName() + ".gadgets", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Rule.class.getName() + ".types", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Gadget.class.getName(), jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Offre.class.getName() + ".packs", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Pack.class.getName() + ".packProducts", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Offre.class.getName() + ".shippings", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Shipping.class.getName() + ".offres", jcacheConfiguration);
            cm.createCache(ma.nawar.pharmarket.domain.Rule.class.getName() + ".packProducts", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
