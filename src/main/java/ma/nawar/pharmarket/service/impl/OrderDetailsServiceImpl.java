package ma.nawar.pharmarket.service.impl;

import ma.nawar.pharmarket.service.OrderDetailsService;
import ma.nawar.pharmarket.domain.OrderDetails;
import ma.nawar.pharmarket.repository.OrderDetailsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing OrderDetails.
 */
@Service
@Transactional
public class OrderDetailsServiceImpl implements OrderDetailsService {

    private final Logger log = LoggerFactory.getLogger(OrderDetailsServiceImpl.class);

    private final OrderDetailsRepository orderDetailsRepository;

    public OrderDetailsServiceImpl(OrderDetailsRepository orderDetailsRepository) {
        this.orderDetailsRepository = orderDetailsRepository;
    }

    /**
     * Save a orderDetails.
     *
     * @param orderDetails the entity to save
     * @return the persisted entity
     */
    @Override
    public OrderDetails save(OrderDetails orderDetails) {
        log.debug("Request to save OrderDetails : {}", orderDetails);
        return orderDetailsRepository.save(orderDetails);
    }

    /**
     * Get all the orderDetails.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<OrderDetails> findAll(Pageable pageable) {
        log.debug("Request to get all OrderDetails");
        return orderDetailsRepository.findAll(pageable);
    }

    /**
     * Get one orderDetails by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public OrderDetails findOne(Long id) {
        log.debug("Request to get OrderDetails : {}", id);
        return orderDetailsRepository.findOne(id);
    }

    /**
     * Delete the orderDetails by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrderDetails : {}", id);
        orderDetailsRepository.delete(id);
    }
}
