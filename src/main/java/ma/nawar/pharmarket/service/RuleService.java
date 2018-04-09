package ma.nawar.pharmarket.service;

import ma.nawar.pharmarket.domain.Rule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Rule.
 */
public interface RuleService {

    /**
     * Save a rule.
     *
     * @param rule the entity to save
     * @return the persisted entity
     */
    Rule save(Rule rule);

    /**
     * Get all the rules.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Rule> findAll(Pageable pageable);

    /**
     * Get the "id" rule.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Rule findOne(Long id);

    /**
     * Delete the "id" rule.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
