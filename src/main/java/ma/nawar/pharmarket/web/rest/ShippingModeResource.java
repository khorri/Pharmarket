package ma.nawar.pharmarket.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.nawar.pharmarket.domain.ShippingMode;
import ma.nawar.pharmarket.service.ShippingModeService;
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
 * REST controller for managing ShippingMode.
 */
@RestController
@RequestMapping("/api")
public class ShippingModeResource {

    private final Logger log = LoggerFactory.getLogger(ShippingModeResource.class);

    private static final String ENTITY_NAME = "shippingMode";

    private final ShippingModeService shippingModeService;

    public ShippingModeResource(ShippingModeService shippingModeService) {
        this.shippingModeService = shippingModeService;
    }

    /**
     * POST  /shipping-modes : Create a new shippingMode.
     *
     * @param shippingMode the shippingMode to create
     * @return the ResponseEntity with status 201 (Created) and with body the new shippingMode, or with status 400 (Bad Request) if the shippingMode has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/shipping-modes")
    @Timed
    public ResponseEntity<ShippingMode> createShippingMode(@Valid @RequestBody ShippingMode shippingMode) throws URISyntaxException {
        log.debug("REST request to save ShippingMode : {}", shippingMode);
        if (shippingMode.getId() != null) {
            throw new BadRequestAlertException("A new shippingMode cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ShippingMode result = shippingModeService.save(shippingMode);
        return ResponseEntity.created(new URI("/api/shipping-modes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /shipping-modes : Updates an existing shippingMode.
     *
     * @param shippingMode the shippingMode to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated shippingMode,
     * or with status 400 (Bad Request) if the shippingMode is not valid,
     * or with status 500 (Internal Server Error) if the shippingMode couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/shipping-modes")
    @Timed
    public ResponseEntity<ShippingMode> updateShippingMode(@Valid @RequestBody ShippingMode shippingMode) throws URISyntaxException {
        log.debug("REST request to update ShippingMode : {}", shippingMode);
        if (shippingMode.getId() == null) {
            return createShippingMode(shippingMode);
        }
        ShippingMode result = shippingModeService.save(shippingMode);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, shippingMode.getId().toString()))
            .body(result);
    }

    /**
     * GET  /shipping-modes : get all the shippingModes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of shippingModes in body
     */
    @GetMapping("/shipping-modes")
    @Timed
    public ResponseEntity<List<ShippingMode>> getAllShippingModes(Pageable pageable) {
        log.debug("REST request to get a page of ShippingModes");
        Page<ShippingMode> page = shippingModeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/shipping-modes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /shipping-modes/:id : get the "id" shippingMode.
     *
     * @param id the id of the shippingMode to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the shippingMode, or with status 404 (Not Found)
     */
    @GetMapping("/shipping-modes/{id}")
    @Timed
    public ResponseEntity<ShippingMode> getShippingMode(@PathVariable Long id) {
        log.debug("REST request to get ShippingMode : {}", id);
        ShippingMode shippingMode = shippingModeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(shippingMode));
    }

    /**
     * DELETE  /shipping-modes/:id : delete the "id" shippingMode.
     *
     * @param id the id of the shippingMode to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/shipping-modes/{id}")
    @Timed
    public ResponseEntity<Void> deleteShippingMode(@PathVariable Long id) {
        log.debug("REST request to delete ShippingMode : {}", id);
        shippingModeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
