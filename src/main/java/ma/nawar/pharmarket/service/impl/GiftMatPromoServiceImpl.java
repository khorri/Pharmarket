package ma.nawar.pharmarket.service.impl;

import ma.nawar.pharmarket.service.GiftMatPromoService;
import ma.nawar.pharmarket.domain.GiftMatPromo;
import ma.nawar.pharmarket.repository.GiftMatPromoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing GiftMatPromo.
 */
@Service
@Transactional
public class GiftMatPromoServiceImpl implements GiftMatPromoService {

    private final Logger log = LoggerFactory.getLogger(GiftMatPromoServiceImpl.class);

    private final GiftMatPromoRepository giftMatPromoRepository;

    public GiftMatPromoServiceImpl(GiftMatPromoRepository giftMatPromoRepository) {
        this.giftMatPromoRepository = giftMatPromoRepository;
    }

    /**
     * Save a giftMatPromo.
     *
     * @param giftMatPromo the entity to save
     * @return the persisted entity
     */
    @Override
    public GiftMatPromo save(GiftMatPromo giftMatPromo) {
        log.debug("Request to save GiftMatPromo : {}", giftMatPromo);
        return giftMatPromoRepository.save(giftMatPromo);
    }

    /**
     * Get all the giftMatPromos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<GiftMatPromo> findAll(Pageable pageable) {
        log.debug("Request to get all GiftMatPromos");
        return giftMatPromoRepository.findAll(pageable);
    }

    /**
     * Get one giftMatPromo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public GiftMatPromo findOne(Long id) {
        log.debug("Request to get GiftMatPromo : {}", id);
        return giftMatPromoRepository.findOne(id);
    }

    /**
     * Delete the giftMatPromo by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GiftMatPromo : {}", id);
        giftMatPromoRepository.delete(id);
    }
}
