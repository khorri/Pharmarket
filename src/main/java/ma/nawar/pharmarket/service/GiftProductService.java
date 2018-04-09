package ma.nawar.pharmarket.service;

import ma.nawar.pharmarket.domain.GiftProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing GiftProduct.
 */
public interface GiftProductService {

    /**
     * Save a giftProduct.
     *
     * @param giftProduct the entity to save
     * @return the persisted entity
     */
    GiftProduct save(GiftProduct giftProduct);

    /**
     * Get all the giftProducts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<GiftProduct> findAll(Pageable pageable);

    /**
     * Get the "id" giftProduct.
     *
     * @param id the id of the entity
     * @return the entity
     */
    GiftProduct findOne(Long id);

    /**
     * Delete the "id" giftProduct.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
