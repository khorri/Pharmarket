package ma.nawar.pharmarket.service;

import ma.nawar.pharmarket.domain.Ordre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Ordre.
 */
public interface OrdreService {

    /**
     * Save a ordre.
     *
     * @param ordre the entity to save
     * @return the persisted entity
     */
    Ordre save(Ordre ordre);

    /**
     * Get all the ordres.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Ordre> findAll(Pageable pageable);

    /**
     * Get the "id" ordre.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Ordre findOne(Long id);

    /**
     * Delete the "id" ordre.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
