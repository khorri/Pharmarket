package ma.nawar.pharmarket.service.impl;

import ma.nawar.pharmarket.service.RuleTypeService;
import ma.nawar.pharmarket.domain.RuleType;
import ma.nawar.pharmarket.repository.RuleTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing RuleType.
 */
@Service
@Transactional
public class RuleTypeServiceImpl implements RuleTypeService {

    private final Logger log = LoggerFactory.getLogger(RuleTypeServiceImpl.class);

    private final RuleTypeRepository ruleTypeRepository;

    public RuleTypeServiceImpl(RuleTypeRepository ruleTypeRepository) {
        this.ruleTypeRepository = ruleTypeRepository;
    }

    /**
     * Save a ruleType.
     *
     * @param ruleType the entity to save
     * @return the persisted entity
     */
    @Override
    public RuleType save(RuleType ruleType) {
        log.debug("Request to save RuleType : {}", ruleType);
        return ruleTypeRepository.save(ruleType);
    }

    /**
     * Get all the ruleTypes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RuleType> findAll(Pageable pageable) {
        log.debug("Request to get all RuleTypes");
        return ruleTypeRepository.findAll(pageable);
    }

    /**
     * Get one ruleType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public RuleType findOne(Long id) {
        log.debug("Request to get RuleType : {}", id);
        return ruleTypeRepository.findOne(id);
    }

    /**
     * Delete the ruleType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RuleType : {}", id);
        ruleTypeRepository.delete(id);
    }
}
