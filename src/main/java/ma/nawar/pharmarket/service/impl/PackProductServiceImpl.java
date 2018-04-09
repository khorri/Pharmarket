package ma.nawar.pharmarket.service.impl;

import ma.nawar.pharmarket.service.PackProductService;
import ma.nawar.pharmarket.domain.PackProduct;
import ma.nawar.pharmarket.repository.PackProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing PackProduct.
 */
@Service
@Transactional
public class PackProductServiceImpl implements PackProductService {

    private final Logger log = LoggerFactory.getLogger(PackProductServiceImpl.class);

    private final PackProductRepository packProductRepository;

    public PackProductServiceImpl(PackProductRepository packProductRepository) {
        this.packProductRepository = packProductRepository;
    }

    /**
     * Save a packProduct.
     *
     * @param packProduct the entity to save
     * @return the persisted entity
     */
    @Override
    public PackProduct save(PackProduct packProduct) {
        log.debug("Request to save PackProduct : {}", packProduct);
        return packProductRepository.save(packProduct);
    }

    /**
     * Get all the packProducts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PackProduct> findAll(Pageable pageable) {
        log.debug("Request to get all PackProducts");
        return packProductRepository.findAll(pageable);
    }

    /**
     * Get one packProduct by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PackProduct findOne(Long id) {
        log.debug("Request to get PackProduct : {}", id);
        return packProductRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the packProduct by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PackProduct : {}", id);
        packProductRepository.delete(id);
    }
}
