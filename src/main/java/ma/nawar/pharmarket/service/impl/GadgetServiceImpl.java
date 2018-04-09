package ma.nawar.pharmarket.service.impl;

import ma.nawar.pharmarket.service.GadgetService;
import ma.nawar.pharmarket.domain.Gadget;
import ma.nawar.pharmarket.repository.GadgetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Gadget.
 */
@Service
@Transactional
public class GadgetServiceImpl implements GadgetService {

    private final Logger log = LoggerFactory.getLogger(GadgetServiceImpl.class);

    private final GadgetRepository gadgetRepository;

    public GadgetServiceImpl(GadgetRepository gadgetRepository) {
        this.gadgetRepository = gadgetRepository;
    }

    /**
     * Save a gadget.
     *
     * @param gadget the entity to save
     * @return the persisted entity
     */
    @Override
    public Gadget save(Gadget gadget) {
        log.debug("Request to save Gadget : {}", gadget);
        return gadgetRepository.save(gadget);
    }

    /**
     * Get all the gadgets.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Gadget> findAll(Pageable pageable) {
        log.debug("Request to get all Gadgets");
        return gadgetRepository.findAll(pageable);
    }

    /**
     * Get one gadget by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Gadget findOne(Long id) {
        log.debug("Request to get Gadget : {}", id);
        return gadgetRepository.findOne(id);
    }

    /**
     * Delete the gadget by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Gadget : {}", id);
        gadgetRepository.delete(id);
    }
}
