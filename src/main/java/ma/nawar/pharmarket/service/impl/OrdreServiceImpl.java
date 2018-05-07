package ma.nawar.pharmarket.service.impl;

import ma.nawar.pharmarket.domain.*;
import ma.nawar.pharmarket.repository.*;
import ma.nawar.pharmarket.security.AuthoritiesConstants;
import ma.nawar.pharmarket.service.OrdreService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


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
    private final AuthorityRepository authorityRepository;

    public OrdreServiceImpl(AuthorityRepository authorityRepository, OrdreRepository ordreRepository, OrderHistoryRepository orderHistoryRepository, OrderDetailsRepository orderDetailsRepository, OrderStateRepository orderStateRepository) {
        this.ordreRepository = ordreRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.orderStateRepository = orderStateRepository;
        this.orderHistoryRepository = orderHistoryRepository;
        this.authorityRepository = authorityRepository;
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
        if (ordre.getId() != null) {
            log.debug("Remove all order details before saving the order");
            orderDetailsRepository.deleteByOrdre(ordre);
        }
        final Ordre order = ordreRepository.save(ordre);
        Set<OrderDetails> orderDetails = order.getOrderDetails();
        List<OrderDetails> toBeRemoved = new ArrayList<OrderDetails>();
        orderDetails.forEach(orderDetail -> {
            OrderDetails ot = orderDetailsRepository.findOne(orderDetail.getId());
            if (ot == null) {
                toBeRemoved.add(orderDetail);
            }
            orderDetail.setOrdre(order);
        });
        if (order.getOrderHistories() != null) {
            order.getOrderHistories().forEach((orderHistory) -> {
                orderHistory.setOrdre(order);
            });
        }
        if (order.getOrderHistories() == null || order.getOrderHistories().isEmpty()) {
            OrderState orderState = orderStateRepository.findOne(1L);
            order.setCurrentStatus(orderState);
            OrderHistory orderHistory = new OrderHistory();
            orderHistory.setOrderState(orderState);
            orderHistory.setAddDate(Instant.now());
            orderHistory.setOrdre(order);
            orderHistoryRepository.save(orderHistory);
        }

        order.getOrderDetails().removeAll(toBeRemoved);
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
        Authentication authenticated = SecurityContextHolder.getContext().getAuthentication();

        if (hasAuthority(authenticated, AuthoritiesConstants.REP)) {
            List<String> users = new ArrayList<String>();
            users.add(((org.springframework.security.core.userdetails.User) authenticated.getPrincipal()).getUsername());
            return ordreRepository.findByCreatedByIn(pageable, users);
        }
        if (hasAuthority(authenticated, AuthoritiesConstants.MANAGER)) {
            List<String> users = new ArrayList<String>();
            users.add(((org.springframework.security.core.userdetails.User) authenticated.getPrincipal()).getUsername());
            //getSubordonates
            return ordreRepository.findByCreatedByIn(pageable, users);
        }
        return ordreRepository.findWithEagerRelationships(pageable);

    }

    private Boolean hasAuthority(Authentication authenticated, String auth) {
        List authorities = authenticated.getAuthorities().stream().filter((authority) -> {
            return auth.equalsIgnoreCase(authority.getAuthority());
        }).collect(Collectors.toList());
        return !authorities.isEmpty();
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
