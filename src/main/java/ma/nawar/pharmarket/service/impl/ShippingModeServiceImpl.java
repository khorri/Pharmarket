package ma.nawar.pharmarket.service.impl;

import ma.nawar.pharmarket.service.ShippingModeService;
import ma.nawar.pharmarket.domain.ShippingMode;
import ma.nawar.pharmarket.repository.ShippingModeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ShippingMode.
 */
@Service
@Transactional
public class ShippingModeServiceImpl implements ShippingModeService {

    private final Logger log = LoggerFactory.getLogger(ShippingModeServiceImpl.class);

    private final ShippingModeRepository shippingModeRepository;

    public ShippingModeServiceImpl(ShippingModeRepository shippingModeRepository) {
        this.shippingModeRepository = shippingModeRepository;
    }

    /**
     * Save a shippingMode.
     *
     * @param shippingMode the entity to save
     * @return the persisted entity
     */
    @Override
    public ShippingMode save(ShippingMode shippingMode) {
        log.debug("Request to save ShippingMode : {}", shippingMode);
        return shippingModeRepository.save(shippingMode);
    }

    /**
     * Get all the shippingModes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ShippingMode> findAll(Pageable pageable) {
        log.debug("Request to get all ShippingModes");
        return shippingModeRepository.findAll(pageable);
    }

    /**
     * Get one shippingMode by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ShippingMode findOne(Long id) {
        log.debug("Request to get ShippingMode : {}", id);
        return shippingModeRepository.findOne(id);
    }

    /**
     * Delete the shippingMode by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ShippingMode : {}", id);
        shippingModeRepository.delete(id);
    }
}
