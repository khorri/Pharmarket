package ma.nawar.pharmarket.service;

import ma.nawar.pharmarket.domain.Action;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Action.
 */
public interface ActionService {

    /**
     * Save a action.
     *
     * @param action the entity to save
     * @return the persisted entity
     */
    Action save(Action action);

    /**
     * Get all the actions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Action> findAll(Pageable pageable);

    /**
     * Get the "id" action.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Action findOne(Long id);

    /**
     * Delete the "id" action.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
