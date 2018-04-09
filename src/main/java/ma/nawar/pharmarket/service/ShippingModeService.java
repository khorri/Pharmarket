package ma.nawar.pharmarket.service;

import ma.nawar.pharmarket.domain.ShippingMode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ShippingMode.
 */
public interface ShippingModeService {

    /**
     * Save a shippingMode.
     *
     * @param shippingMode the entity to save
     * @return the persisted entity
     */
    ShippingMode save(ShippingMode shippingMode);

    /**
     * Get all the shippingModes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ShippingMode> findAll(Pageable pageable);

    /**
     * Get the "id" shippingMode.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ShippingMode findOne(Long id);

    /**
     * Delete the "id" shippingMode.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
