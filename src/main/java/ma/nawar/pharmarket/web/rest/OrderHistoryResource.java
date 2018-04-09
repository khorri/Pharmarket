package ma.nawar.pharmarket.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.nawar.pharmarket.domain.OrderHistory;
import ma.nawar.pharmarket.service.OrderHistoryService;
import ma.nawar.pharmarket.web.rest.errors.BadRequestAlertException;
import ma.nawar.pharmarket.web.rest.util.HeaderUtil;
import ma.nawar.pharmarket.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing OrderHistory.
 */
@RestController
@RequestMapping("/api")
public class OrderHistoryResource {

    private final Logger log = LoggerFactory.getLogger(OrderHistoryResource.class);

    private static final String ENTITY_NAME = "orderHistory";

    private final OrderHistoryService orderHistoryService;

    public OrderHistoryResource(OrderHistoryService orderHistoryService) {
        this.orderHistoryService = orderHistoryService;
    }

    /**
     * POST  /order-histories : Create a new orderHistory.
     *
     * @param orderHistory the orderHistory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderHistory, or with status 400 (Bad Request) if the orderHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-histories")
    @Timed
    public ResponseEntity<OrderHistory> createOrderHistory(@RequestBody OrderHistory orderHistory) throws URISyntaxException {
        log.debug("REST request to save OrderHistory : {}", orderHistory);
        if (orderHistory.getId() != null) {
            throw new BadRequestAlertException("A new orderHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderHistory result = orderHistoryService.save(orderHistory);
        return ResponseEntity.created(new URI("/api/order-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-histories : Updates an existing orderHistory.
     *
     * @param orderHistory the orderHistory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderHistory,
     * or with status 400 (Bad Request) if the orderHistory is not valid,
     * or with status 500 (Internal Server Error) if the orderHistory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-histories")
    @Timed
    public ResponseEntity<OrderHistory> updateOrderHistory(@RequestBody OrderHistory orderHistory) throws URISyntaxException {
        log.debug("REST request to update OrderHistory : {}", orderHistory);
        if (orderHistory.getId() == null) {
            return createOrderHistory(orderHistory);
        }
        OrderHistory result = orderHistoryService.save(orderHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderHistory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-histories : get all the orderHistories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of orderHistories in body
     */
    @GetMapping("/order-histories")
    @Timed
    public ResponseEntity<List<OrderHistory>> getAllOrderHistories(Pageable pageable) {
        log.debug("REST request to get a page of OrderHistories");
        Page<OrderHistory> page = orderHistoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/order-histories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /order-histories/:id : get the "id" orderHistory.
     *
     * @param id the id of the orderHistory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderHistory, or with status 404 (Not Found)
     */
    @GetMapping("/order-histories/{id}")
    @Timed
    public ResponseEntity<OrderHistory> getOrderHistory(@PathVariable Long id) {
        log.debug("REST request to get OrderHistory : {}", id);
        OrderHistory orderHistory = orderHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(orderHistory));
    }

    /**
     * DELETE  /order-histories/:id : delete the "id" orderHistory.
     *
     * @param id the id of the orderHistory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-histories/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderHistory(@PathVariable Long id) {
        log.debug("REST request to delete OrderHistory : {}", id);
        orderHistoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
