package ma.nawar.pharmarket.service.impl;

import ma.nawar.pharmarket.service.RuleService;
import ma.nawar.pharmarket.domain.Rule;
import ma.nawar.pharmarket.repository.RuleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Rule.
 */
@Service
@Transactional
public class RuleServiceImpl implements RuleService {

    private final Logger log = LoggerFactory.getLogger(RuleServiceImpl.class);

    private final RuleRepository ruleRepository;

    public RuleServiceImpl(RuleRepository ruleRepository) {
        this.ruleRepository = ruleRepository;
    }

    /**
     * Save a rule.
     *
     * @param rule the entity to save
     * @return the persisted entity
     */
    @Override
    public Rule save(Rule rule) {
        log.debug("Request to save Rule : {}", rule);
        return ruleRepository.save(rule);
    }

    /**
     * Get all the rules.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Rule> findAll(Pageable pageable) {
        log.debug("Request to get all Rules");
        return ruleRepository.findAll(pageable);
    }

    /**
     * Get one rule by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Rule findOne(Long id) {
        log.debug("Request to get Rule : {}", id);
        return ruleRepository.findOne(id);
    }

    /**
     * Delete the rule by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Rule : {}", id);
        ruleRepository.delete(id);
    }
}
