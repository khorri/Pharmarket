package ma.nawar.pharmarket.service.impl;

import ma.nawar.pharmarket.service.ConditionsService;
import ma.nawar.pharmarket.domain.Conditions;
import ma.nawar.pharmarket.repository.ConditionsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Conditions.
 */
@Service
@Transactional
public class ConditionsServiceImpl implements ConditionsService {

    private final Logger log = LoggerFactory.getLogger(ConditionsServiceImpl.class);

    private final ConditionsRepository conditionsRepository;

    public ConditionsServiceImpl(ConditionsRepository conditionsRepository) {
        this.conditionsRepository = conditionsRepository;
    }

    /**
     * Save a conditions.
     *
     * @param conditions the entity to save
     * @return the persisted entity
     */
    @Override
    public Conditions save(Conditions conditions) {
        log.debug("Request to save Conditions : {}", conditions);
        return conditionsRepository.save(conditions);
    }

    /**
     * Get all the conditions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Conditions> findAll(Pageable pageable) {
        log.debug("Request to get all Conditions");
        return conditionsRepository.findAll(pageable);
    }

    /**
     * Get one conditions by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Conditions findOne(Long id) {
        log.debug("Request to get Conditions : {}", id);
        return conditionsRepository.findOne(id);
    }

    /**
     * Delete the conditions by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Conditions : {}", id);
        conditionsRepository.delete(id);
    }
}
