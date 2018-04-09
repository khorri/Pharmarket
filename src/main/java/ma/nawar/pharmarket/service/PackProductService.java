package ma.nawar.pharmarket.service;

import ma.nawar.pharmarket.domain.PackProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing PackProduct.
 */
public interface PackProductService {

    /**
     * Save a packProduct.
     *
     * @param packProduct the entity to save
     * @return the persisted entity
     */
    PackProduct save(PackProduct packProduct);

    /**
     * Get all the packProducts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PackProduct> findAll(Pageable pageable);

    /**
     * Get the "id" packProduct.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PackProduct findOne(Long id);

    /**
     * Delete the "id" packProduct.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
