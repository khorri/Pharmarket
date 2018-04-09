package ma.nawar.pharmarket.service.impl;

import ma.nawar.pharmarket.service.GiftProductService;
import ma.nawar.pharmarket.domain.GiftProduct;
import ma.nawar.pharmarket.repository.GiftProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing GiftProduct.
 */
@Service
@Transactional
public class GiftProductServiceImpl implements GiftProductService {

    private final Logger log = LoggerFactory.getLogger(GiftProductServiceImpl.class);

    private final GiftProductRepository giftProductRepository;

    public GiftProductServiceImpl(GiftProductRepository giftProductRepository) {
        this.giftProductRepository = giftProductRepository;
    }

    /**
     * Save a giftProduct.
     *
     * @param giftProduct the entity to save
     * @return the persisted entity
     */
    @Override
    public GiftProduct save(GiftProduct giftProduct) {
        log.debug("Request to save GiftProduct : {}", giftProduct);
        return giftProductRepository.save(giftProduct);
    }

    /**
     * Get all the giftProducts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<GiftProduct> findAll(Pageable pageable) {
        log.debug("Request to get all GiftProducts");
        return giftProductRepository.findAll(pageable);
    }

    /**
     * Get one giftProduct by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public GiftProduct findOne(Long id) {
        log.debug("Request to get GiftProduct : {}", id);
        return giftProductRepository.findOne(id);
    }

    /**
     * Delete the giftProduct by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GiftProduct : {}", id);
        giftProductRepository.delete(id);
    }
}
