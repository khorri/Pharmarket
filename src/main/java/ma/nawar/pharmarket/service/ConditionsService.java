package ma.nawar.pharmarket.service;

import ma.nawar.pharmarket.domain.Conditions;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Conditions.
 */
public interface ConditionsService {

    /**
     * Save a conditions.
     *
     * @param conditions the entity to save
     * @return the persisted entity
     */
    Conditions save(Conditions conditions);

    /**
     * Get all the conditions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Conditions> findAll(Pageable pageable);

    /**
     * Get the "id" conditions.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Conditions findOne(Long id);

    /**
     * Delete the "id" conditions.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
