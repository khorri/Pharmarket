package ma.nawar.pharmarket.service;

import ma.nawar.pharmarket.domain.GiftMatPromo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing GiftMatPromo.
 */
public interface GiftMatPromoService {

    /**
     * Save a giftMatPromo.
     *
     * @param giftMatPromo the entity to save
     * @return the persisted entity
     */
    GiftMatPromo save(GiftMatPromo giftMatPromo);

    /**
     * Get all the giftMatPromos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<GiftMatPromo> findAll(Pageable pageable);

    /**
     * Get the "id" giftMatPromo.
     *
     * @param id the id of the entity
     * @return the entity
     */
    GiftMatPromo findOne(Long id);

    /**
     * Delete the "id" giftMatPromo.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
