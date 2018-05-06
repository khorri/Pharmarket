package ma.nawar.pharmarket.service.impl;

import ma.nawar.pharmarket.domain.OrderDetails;
import ma.nawar.pharmarket.domain.OrderHistory;
import ma.nawar.pharmarket.domain.OrderState;
import ma.nawar.pharmarket.repository.OrderDetailsRepository;
import ma.nawar.pharmarket.repository.OrderHistoryRepository;
import ma.nawar.pharmarket.repository.OrderStateRepository;
import ma.nawar.pharmarket.service.OrdreService;
import ma.nawar.pharmarket.domain.Ordre;
import ma.nawar.pharmarket.repository.OrdreRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Set;


/**
 * Service Implementation for managing Ordre.
 */
@Service
@Transactional
public class OrdreServiceImpl implements OrdreService {

    private final Logger log = LoggerFactory.getLogger(OrdreServiceImpl.class);

    private final OrdreRepository ordreRepository;
    private final OrderDetailsRepository orderDetailsRepository;
    private final OrderStateRepository orderStateRepository;
    private final OrderHistoryRepository orderHistoryRepository;

    public OrdreServiceImpl(OrdreRepository ordreRepository, OrderHistoryRepository orderHistoryRepository, OrderDetailsRepository orderDetailsRepository, OrderStateRepository orderStateRepository) {
        this.ordreRepository = ordreRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.orderStateRepository = orderStateRepository;
        this.orderHistoryRepository = orderHistoryRepository;
    }

    /**
     * Save a ordre.
     *
     * @param ordre the entity to save
     * @return the persisted entity
     */
    @Override
    @Transactional
    public Ordre save(Ordre ordre) {
        log.debug("Request to save Ordre : {}", ordre);

        final Ordre order = ordreRepository.save(ordre);
        Set<OrderDetails> orderDetails = order.getOrderDetails();
        orderDetails.forEach(orderDetail -> {
            orderDetail.setOrdre(order);
        });
        if (order.getOrderHistories() == null || order.getOrderHistories().isEmpty()) {
            OrderState orderState = orderStateRepository.findOne(1L);
            order.setStatus(orderState.getName());
            OrderHistory orderHistory = new OrderHistory();
            orderHistory.setOrderState(orderState);
            orderHistory.setAddDate(Instant.now());
            orderHistory.setOrdre(order);
            orderHistoryRepository.save(orderHistory);
        }
        return ordreRepository.save(order);

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
        Ordre ordre = ordreRepository.findOne(id);
        Set<OrderDetails> orderDetails = orderDetailsRepository.findByOrdre(ordre);
        ordre.setOrderDetails(orderDetails);
        ordre.setOrderHistories(orderHistoryRepository.findByOrdre(ordre));
        return ordre;
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
