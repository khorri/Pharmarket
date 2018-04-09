package ma.nawar.pharmarket.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.nawar.pharmarket.domain.MaterielPromo;
import ma.nawar.pharmarket.service.MaterielPromoService;
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
 * REST controller for managing MaterielPromo.
 */
@RestController
@RequestMapping("/api")
public class MaterielPromoResource {

    private final Logger log = LoggerFactory.getLogger(MaterielPromoResource.class);

    private static final String ENTITY_NAME = "materielPromo";

    private final MaterielPromoService materielPromoService;

    public MaterielPromoResource(MaterielPromoService materielPromoService) {
        this.materielPromoService = materielPromoService;
    }

    /**
     * POST  /materiel-promos : Create a new materielPromo.
     *
     * @param materielPromo the materielPromo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new materielPromo, or with status 400 (Bad Request) if the materielPromo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/materiel-promos")
    @Timed
    public ResponseEntity<MaterielPromo> createMaterielPromo(@Valid @RequestBody MaterielPromo materielPromo) throws URISyntaxException {
        log.debug("REST request to save MaterielPromo : {}", materielPromo);
        if (materielPromo.getId() != null) {
            throw new BadRequestAlertException("A new materielPromo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MaterielPromo result = materielPromoService.save(materielPromo);
        return ResponseEntity.created(new URI("/api/materiel-promos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /materiel-promos : Updates an existing materielPromo.
     *
     * @param materielPromo the materielPromo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated materielPromo,
     * or with status 400 (Bad Request) if the materielPromo is not valid,
     * or with status 500 (Internal Server Error) if the materielPromo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/materiel-promos")
    @Timed
    public ResponseEntity<MaterielPromo> updateMaterielPromo(@Valid @RequestBody MaterielPromo materielPromo) throws URISyntaxException {
        log.debug("REST request to update MaterielPromo : {}", materielPromo);
        if (materielPromo.getId() == null) {
            return createMaterielPromo(materielPromo);
        }
        MaterielPromo result = materielPromoService.save(materielPromo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, materielPromo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /materiel-promos : get all the materielPromos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of materielPromos in body
     */
    @GetMapping("/materiel-promos")
    @Timed
    public ResponseEntity<List<MaterielPromo>> getAllMaterielPromos(Pageable pageable) {
        log.debug("REST request to get a page of MaterielPromos");
        Page<MaterielPromo> page = materielPromoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/materiel-promos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /materiel-promos/:id : get the "id" materielPromo.
     *
     * @param id the id of the materielPromo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the materielPromo, or with status 404 (Not Found)
     */
    @GetMapping("/materiel-promos/{id}")
    @Timed
    public ResponseEntity<MaterielPromo> getMaterielPromo(@PathVariable Long id) {
        log.debug("REST request to get MaterielPromo : {}", id);
        MaterielPromo materielPromo = materielPromoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(materielPromo));
    }

    /**
     * DELETE  /materiel-promos/:id : delete the "id" materielPromo.
     *
     * @param id the id of the materielPromo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/materiel-promos/{id}")
    @Timed
    public ResponseEntity<Void> deleteMaterielPromo(@PathVariable Long id) {
        log.debug("REST request to delete MaterielPromo : {}", id);
        materielPromoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
