package ma.nawar.pharmarket.service;

import ma.nawar.pharmarket.domain.Pack;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Pack.
 */
public interface PackService {

    /**
     * Save a pack.
     *
     * @param pack the entity to save
     * @return the persisted entity
     */
    Pack save(Pack pack);

    /**
     * Get all the packs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Pack> findAll(Pageable pageable);

    /**
     * Get the "id" pack.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Pack findOne(Long id);

    /**
     * Delete the "id" pack.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
