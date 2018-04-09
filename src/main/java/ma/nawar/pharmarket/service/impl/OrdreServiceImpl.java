package ma.nawar.pharmarket.service.impl;

import ma.nawar.pharmarket.service.OrdreService;
import ma.nawar.pharmarket.domain.Ordre;
import ma.nawar.pharmarket.repository.OrdreRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Ordre.
 */
@Service
@Transactional
public class OrdreServiceImpl implements OrdreService {

    private final Logger log = LoggerFactory.getLogger(OrdreServiceImpl.class);

    private final OrdreRepository ordreRepository;

    public OrdreServiceImpl(OrdreRepository ordreRepository) {
        this.ordreRepository = ordreRepository;
    }

    /**
     * Save a ordre.
     *
     * @param ordre the entity to save
     * @return the persisted entity
     */
    @Override
    public Ordre save(Ordre ordre) {
        log.debug("Request to save Ordre : {}", ordre);
        return ordreRepository.save(ordre);
    }

    /**
     * Get all the ordres.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Ordre> findAll(Pageable pageable) {
        log.debug("Request to get all Ordres");
        return ordreRepository.findAll(pageable);
    }

    /**
     * Get one ordre by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Ordre findOne(Long id) {
        log.debug("Request to get Ordre : {}", id);
        return ordreRepository.findOne(id);
    }

    /**
     * Delete the ordre by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Ordre : {}", id);
        ordreRepository.delete(id);
    }
}
