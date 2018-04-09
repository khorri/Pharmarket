package ma.nawar.pharmarket.service;

import ma.nawar.pharmarket.domain.Gadget;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Gadget.
 */
public interface GadgetService {

    /**
     * Save a gadget.
     *
     * @param gadget the entity to save
     * @return the persisted entity
     */
    Gadget save(Gadget gadget);

    /**
     * Get all the gadgets.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Gadget> findAll(Pageable pageable);

    /**
     * Get the "id" gadget.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Gadget findOne(Long id);

    /**
     * Delete the "id" gadget.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
