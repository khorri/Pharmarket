package ma.nawar.pharmarket.service.impl;

import ma.nawar.pharmarket.service.OrderHistoryService;
import ma.nawar.pharmarket.domain.OrderHistory;
import ma.nawar.pharmarket.repository.OrderHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing OrderHistory.
 */
@Service
@Transactional
public class OrderHistoryServiceImpl implements OrderHistoryService {

    private final Logger log = LoggerFactory.getLogger(OrderHistoryServiceImpl.class);

    private final OrderHistoryRepository orderHistoryRepository;

    public OrderHistoryServiceImpl(OrderHistoryRepository orderHistoryRepository) {
        this.orderHistoryRepository = orderHistoryRepository;
    }

    /**
     * Save a orderHistory.
     *
     * @param orderHistory the entity to save
     * @return the persisted entity
     */
    @Override
    public OrderHistory save(OrderHistory orderHistory) {
        log.debug("Request to save OrderHistory : {}", orderHistory);
        return orderHistoryRepository.save(orderHistory);
    }

    /**
     * Get all the orderHistories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<OrderHistory> findAll(Pageable pageable) {
        log.debug("Request to get all OrderHistories");
        return orderHistoryRepository.findAll(pageable);
    }

    /**
     * Get one orderHistory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public OrderHistory findOne(Long id) {
        log.debug("Request to get OrderHistory : {}", id);
        return orderHistoryRepository.findOne(id);
    }

    /**
     * Delete the orderHistory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrderHistory : {}", id);
        orderHistoryRepository.delete(id);
    }
}
