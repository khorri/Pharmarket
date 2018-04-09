package ma.nawar.pharmarket.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.nawar.pharmarket.domain.Conditions;
import ma.nawar.pharmarket.service.ConditionsService;
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
 * REST controller for managing Conditions.
 */
@RestController
@RequestMapping("/api")
public class ConditionsResource {

    private final Logger log = LoggerFactory.getLogger(ConditionsResource.class);

    private static final String ENTITY_NAME = "conditions";

    private final ConditionsService conditionsService;

    public ConditionsResource(ConditionsService conditionsService) {
        this.conditionsService = conditionsService;
    }

    /**
     * POST  /conditions : Create a new conditions.
     *
     * @param conditions the conditions to create
     * @return the ResponseEntity with status 201 (Created) and with body the new conditions, or with status 400 (Bad Request) if the conditions has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/conditions")
    @Timed
    public ResponseEntity<Conditions> createConditions(@Valid @RequestBody Conditions conditions) throws URISyntaxException {
        log.debug("REST request to save Conditions : {}", conditions);
        if (conditions.getId() != null) {
            throw new BadRequestAlertException("A new conditions cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Conditions result = conditionsService.save(conditions);
        return ResponseEntity.created(new URI("/api/conditions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /conditions : Updates an existing conditions.
     *
     * @param conditions the conditions to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated conditions,
     * or with status 400 (Bad Request) if the conditions is not valid,
     * or with status 500 (Internal Server Error) if the conditions couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/conditions")
    @Timed
    public ResponseEntity<Conditions> updateConditions(@Valid @RequestBody Conditions conditions) throws URISyntaxException {
        log.debug("REST request to update Conditions : {}", conditions);
        if (conditions.getId() == null) {
            return createConditions(conditions);
        }
        Conditions result = conditionsService.save(conditions);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, conditions.getId().toString()))
            .body(result);
    }

    /**
     * GET  /conditions : get all the conditions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of conditions in body
     */
    @GetMapping("/conditions")
    @Timed
    public ResponseEntity<List<Conditions>> getAllConditions(Pageable pageable) {
        log.debug("REST request to get a page of Conditions");
        Page<Conditions> page = conditionsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/conditions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /conditions/:id : get the "id" conditions.
     *
     * @param id the id of the conditions to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the conditions, or with status 404 (Not Found)
     */
    @GetMapping("/conditions/{id}")
    @Timed
    public ResponseEntity<Conditions> getConditions(@PathVariable Long id) {
        log.debug("REST request to get Conditions : {}", id);
        Conditions conditions = conditionsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(conditions));
    }

    /**
     * DELETE  /conditions/:id : delete the "id" conditions.
     *
     * @param id the id of the conditions to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/conditions/{id}")
    @Timed
    public ResponseEntity<Void> deleteConditions(@PathVariable Long id) {
        log.debug("REST request to delete Conditions : {}", id);
        conditionsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
