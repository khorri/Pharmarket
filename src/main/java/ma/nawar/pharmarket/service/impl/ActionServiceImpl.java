package ma.nawar.pharmarket.service.impl;

import ma.nawar.pharmarket.service.ActionService;
import ma.nawar.pharmarket.domain.Action;
import ma.nawar.pharmarket.repository.ActionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Action.
 */
@Service
@Transactional
public class ActionServiceImpl implements ActionService {

    private final Logger log = LoggerFactory.getLogger(ActionServiceImpl.class);

    private final ActionRepository actionRepository;

    public ActionServiceImpl(ActionRepository actionRepository) {
        this.actionRepository = actionRepository;
    }

    /**
     * Save a action.
     *
     * @param action the entity to save
     * @return the persisted entity
     */
    @Override
    public Action save(Action action) {
        log.debug("Request to save Action : {}", action);
        return actionRepository.save(action);
    }

    /**
     * Get all the actions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Action> findAll(Pageable pageable) {
        log.debug("Request to get all Actions");
        return actionRepository.findAll(pageable);
    }

    /**
     * Get one action by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Action findOne(Long id) {
        log.debug("Request to get Action : {}", id);
        return actionRepository.findOne(id);
    }

    /**
     * Delete the action by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Action : {}", id);
        actionRepository.delete(id);
    }
}
