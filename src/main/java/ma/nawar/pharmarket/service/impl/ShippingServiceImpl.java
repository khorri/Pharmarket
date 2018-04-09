package ma.nawar.pharmarket.service.impl;

import ma.nawar.pharmarket.service.ShippingService;
import ma.nawar.pharmarket.domain.Shipping;
import ma.nawar.pharmarket.repository.ShippingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Shipping.
 */
@Service
@Transactional
public class ShippingServiceImpl implements ShippingService {

    private final Logger log = LoggerFactory.getLogger(ShippingServiceImpl.class);

    private final ShippingRepository shippingRepository;

    public ShippingServiceImpl(ShippingRepository shippingRepository) {
        this.shippingRepository = shippingRepository;
    }

    /**
     * Save a shipping.
     *
     * @param shipping the entity to save
     * @return the persisted entity
     */
    @Override
    public Shipping save(Shipping shipping) {
        log.debug("Request to save Shipping : {}", shipping);
        return shippingRepository.save(shipping);
    }

    /**
     * Get all the shippings.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Shipping> findAll(Pageable pageable) {
        log.debug("Request to get all Shippings");
        return shippingRepository.findAll(pageable);
    }

    /**
     * Get one shipping by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Shipping findOne(Long id) {
        log.debug("Request to get Shipping : {}", id);
        return shippingRepository.findOne(id);
    }

    /**
     * Delete the shipping by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Shipping : {}", id);
        shippingRepository.delete(id);
    }
}
