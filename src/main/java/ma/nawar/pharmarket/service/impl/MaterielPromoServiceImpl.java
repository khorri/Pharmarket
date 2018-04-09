package ma.nawar.pharmarket.service.impl;

import ma.nawar.pharmarket.service.MaterielPromoService;
import ma.nawar.pharmarket.domain.MaterielPromo;
import ma.nawar.pharmarket.repository.MaterielPromoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing MaterielPromo.
 */
@Service
@Transactional
public class MaterielPromoServiceImpl implements MaterielPromoService {

    private final Logger log = LoggerFactory.getLogger(MaterielPromoServiceImpl.class);

    private final MaterielPromoRepository materielPromoRepository;

    public MaterielPromoServiceImpl(MaterielPromoRepository materielPromoRepository) {
        this.materielPromoRepository = materielPromoRepository;
    }

    /**
     * Save a materielPromo.
     *
     * @param materielPromo the entity to save
     * @return the persisted entity
     */
    @Override
    public MaterielPromo save(MaterielPromo materielPromo) {
        log.debug("Request to save MaterielPromo : {}", materielPromo);
        return materielPromoRepository.save(materielPromo);
    }

    /**
     * Get all the materielPromos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MaterielPromo> findAll(Pageable pageable) {
        log.debug("Request to get all MaterielPromos");
        return materielPromoRepository.findAll(pageable);
    }

    /**
     * Get one materielPromo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MaterielPromo findOne(Long id) {
        log.debug("Request to get MaterielPromo : {}", id);
        return materielPromoRepository.findOne(id);
    }

    /**
     * Delete the materielPromo by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MaterielPromo : {}", id);
        materielPromoRepository.delete(id);
    }
}
