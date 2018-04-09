package ma.nawar.pharmarket.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.nawar.pharmarket.domain.OrderState;
import ma.nawar.pharmarket.service.OrderStateService;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing OrderState.
 */
@RestController
@RequestMapping("/api")
public class OrderStateResource {

    private final Logger log = LoggerFactory.getLogger(OrderStateResource.class);

    private static final String ENTITY_NAME = "orderState";

    private final OrderStateService orderStateService;

    public OrderStateResource(OrderStateService orderStateService) {
        this.orderStateService = orderStateService;
    }

    /**
     * POST  /order-states : Create a new orderState.
     *
     * @param orderState the orderState to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderState, or with status 400 (Bad Request) if the orderState has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-states")
    @Timed
    public ResponseEntity<OrderState> createOrderState(@Valid @RequestBody OrderState orderState) throws URISyntaxException {
        log.debug("REST request to save OrderState : {}", orderState);
        if (orderState.getId() != null) {
            throw new BadRequestAlertException("A new orderState cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderState result = orderStateService.save(orderState);
        return ResponseEntity.created(new URI("/api/order-states/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-states : Updates an existing orderState.
     *
     * @param orderState the orderState to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderState,
     * or with status 400 (Bad Request) if the orderState is not valid,
     * or with status 500 (Internal Server Error) if the orderState couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-states")
    @Timed
    public ResponseEntity<OrderState> updateOrderState(@Valid @RequestBody OrderState orderState) throws URISyntaxException {
        log.debug("REST request to update OrderState : {}", orderState);
        if (orderState.getId() == null) {
            return createOrderState(orderState);
        }
        OrderState result = orderStateService.save(orderState);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderState.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-states : get all the orderStates.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of orderStates in body
     */
    @GetMapping("/order-states")
    @Timed
    public ResponseEntity<List<OrderState>> getAllOrderStates(Pageable pageable) {
        log.debug("REST request to get a page of OrderStates");
        Page<OrderState> page = orderStateService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/order-states");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /order-states/:id : get the "id" orderState.
     *
     * @param id the id of the orderState to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderState, or with status 404 (Not Found)
     */
    @GetMapping("/order-states/{id}")
    @Timed
    public ResponseEntity<OrderState> getOrderState(@PathVariable Long id) {
        log.debug("REST request to get OrderState : {}", id);
        OrderState orderState = orderStateService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(orderState));
    }

    /**
     * DELETE  /order-states/:id : delete the "id" orderState.
     *
     * @param id the id of the orderState to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-states/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderState(@PathVariable Long id) {
        log.debug("REST request to delete OrderState : {}", id);
        orderStateService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
