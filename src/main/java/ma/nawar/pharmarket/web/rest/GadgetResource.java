package ma.nawar.pharmarket.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.nawar.pharmarket.domain.Gadget;
import ma.nawar.pharmarket.service.GadgetService;
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
 * REST controller for managing Gadget.
 */
@RestController
@RequestMapping("/api")
public class GadgetResource {

    private final Logger log = LoggerFactory.getLogger(GadgetResource.class);

    private static final String ENTITY_NAME = "gadget";

    private final GadgetService gadgetService;

    public GadgetResource(GadgetService gadgetService) {
        this.gadgetService = gadgetService;
    }

    /**
     * POST  /gadgets : Create a new gadget.
     *
     * @param gadget the gadget to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gadget, or with status 400 (Bad Request) if the gadget has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gadgets")
    @Timed
    public ResponseEntity<Gadget> createGadget(@Valid @RequestBody Gadget gadget) throws URISyntaxException {
        log.debug("REST request to save Gadget : {}", gadget);
        if (gadget.getId() != null) {
            throw new BadRequestAlertException("A new gadget cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Gadget result = gadgetService.save(gadget);
        return ResponseEntity.created(new URI("/api/gadgets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gadgets : Updates an existing gadget.
     *
     * @param gadget the gadget to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gadget,
     * or with status 400 (Bad Request) if the gadget is not valid,
     * or with status 500 (Internal Server Error) if the gadget couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gadgets")
    @Timed
    public ResponseEntity<Gadget> updateGadget(@Valid @RequestBody Gadget gadget) throws URISyntaxException {
        log.debug("REST request to update Gadget : {}", gadget);
        if (gadget.getId() == null) {
            return createGadget(gadget);
        }
        Gadget result = gadgetService.save(gadget);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gadget.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gadgets : get all the gadgets.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of gadgets in body
     */
    @GetMapping("/gadgets")
    @Timed
    public ResponseEntity<List<Gadget>> getAllGadgets(Pageable pageable) {
        log.debug("REST request to get a page of Gadgets");
        Page<Gadget> page = gadgetService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/gadgets");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /gadgets/:id : get the "id" gadget.
     *
     * @param id the id of the gadget to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gadget, or with status 404 (Not Found)
     */
    @GetMapping("/gadgets/{id}")
    @Timed
    public ResponseEntity<Gadget> getGadget(@PathVariable Long id) {
        log.debug("REST request to get Gadget : {}", id);
        Gadget gadget = gadgetService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(gadget));
    }

    /**
     * DELETE  /gadgets/:id : delete the "id" gadget.
     *
     * @param id the id of the gadget to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gadgets/{id}")
    @Timed
    public ResponseEntity<Void> deleteGadget(@PathVariable Long id) {
        log.debug("REST request to delete Gadget : {}", id);
        gadgetService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
