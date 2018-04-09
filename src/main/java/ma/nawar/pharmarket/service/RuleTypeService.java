package ma.nawar.pharmarket.service;

import ma.nawar.pharmarket.domain.RuleType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing RuleType.
 */
public interface RuleTypeService {

    /**
     * Save a ruleType.
     *
     * @param ruleType the entity to save
     * @return the persisted entity
     */
    RuleType save(RuleType ruleType);

    /**
     * Get all the ruleTypes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<RuleType> findAll(Pageable pageable);

    /**
     * Get the "id" ruleType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    RuleType findOne(Long id);

    /**
     * Delete the "id" ruleType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
