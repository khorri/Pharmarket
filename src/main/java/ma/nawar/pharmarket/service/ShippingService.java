package ma.nawar.pharmarket.service;

import ma.nawar.pharmarket.domain.Shipping;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Shipping.
 */
public interface ShippingService {

    /**
     * Save a shipping.
     *
     * @param shipping the entity to save
     * @return the persisted entity
     */
    Shipping save(Shipping shipping);

    /**
     * Get all the shippings.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Shipping> findAll(Pageable pageable);

    /**
     * Get the "id" shipping.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Shipping findOne(Long id);

    /**
     * Delete the "id" shipping.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
