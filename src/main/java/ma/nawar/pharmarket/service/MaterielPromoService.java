package ma.nawar.pharmarket.service;

import ma.nawar.pharmarket.domain.MaterielPromo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing MaterielPromo.
 */
public interface MaterielPromoService {

    /**
     * Save a materielPromo.
     *
     * @param materielPromo the entity to save
     * @return the persisted entity
     */
    MaterielPromo save(MaterielPromo materielPromo);

    /**
     * Get all the materielPromos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MaterielPromo> findAll(Pageable pageable);

    /**
     * Get the "id" materielPromo.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MaterielPromo findOne(Long id);

    /**
     * Delete the "id" materielPromo.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
