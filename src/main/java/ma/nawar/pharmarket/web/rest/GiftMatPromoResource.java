package ma.nawar.pharmarket.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.nawar.pharmarket.domain.GiftMatPromo;
import ma.nawar.pharmarket.service.GiftMatPromoService;
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
 * REST controller for managing GiftMatPromo.
 */
@RestController
@RequestMapping("/api")
public class GiftMatPromoResource {

    private final Logger log = LoggerFactory.getLogger(GiftMatPromoResource.class);

    private static final String ENTITY_NAME = "giftMatPromo";

    private final GiftMatPromoService giftMatPromoService;

    public GiftMatPromoResource(GiftMatPromoService giftMatPromoService) {
        this.giftMatPromoService = giftMatPromoService;
    }

    /**
     * POST  /gift-mat-promos : Create a new giftMatPromo.
     *
     * @param giftMatPromo the giftMatPromo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new giftMatPromo, or with status 400 (Bad Request) if the giftMatPromo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gift-mat-promos")
    @Timed
    public ResponseEntity<GiftMatPromo> createGiftMatPromo(@RequestBody GiftMatPromo giftMatPromo) throws URISyntaxException {
        log.debug("REST request to save GiftMatPromo : {}", giftMatPromo);
        if (giftMatPromo.getId() != null) {
            throw new BadRequestAlertException("A new giftMatPromo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GiftMatPromo result = giftMatPromoService.save(giftMatPromo);
        return ResponseEntity.created(new URI("/api/gift-mat-promos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gift-mat-promos : Updates an existing giftMatPromo.
     *
     * @param giftMatPromo the giftMatPromo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated giftMatPromo,
     * or with status 400 (Bad Request) if the giftMatPromo is not valid,
     * or with status 500 (Internal Server Error) if the giftMatPromo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gift-mat-promos")
    @Timed
    public ResponseEntity<GiftMatPromo> updateGiftMatPromo(@RequestBody GiftMatPromo giftMatPromo) throws URISyntaxException {
        log.debug("REST request to update GiftMatPromo : {}", giftMatPromo);
        if (giftMatPromo.getId() == null) {
            return createGiftMatPromo(giftMatPromo);
        }
        GiftMatPromo result = giftMatPromoService.save(giftMatPromo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, giftMatPromo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gift-mat-promos : get all the giftMatPromos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of giftMatPromos in body
     */
    @GetMapping("/gift-mat-promos")
    @Timed
    public ResponseEntity<List<GiftMatPromo>> getAllGiftMatPromos(Pageable pageable) {
        log.debug("REST request to get a page of GiftMatPromos");
        Page<GiftMatPromo> page = giftMatPromoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/gift-mat-promos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /gift-mat-promos/:id : get the "id" giftMatPromo.
     *
     * @param id the id of the giftMatPromo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the giftMatPromo, or with status 404 (Not Found)
     */
    @GetMapping("/gift-mat-promos/{id}")
    @Timed
    public ResponseEntity<GiftMatPromo> getGiftMatPromo(@PathVariable Long id) {
        log.debug("REST request to get GiftMatPromo : {}", id);
        GiftMatPromo giftMatPromo = giftMatPromoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(giftMatPromo));
    }

    /**
     * DELETE  /gift-mat-promos/:id : delete the "id" giftMatPromo.
     *
     * @param id the id of the giftMatPromo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gift-mat-promos/{id}")
    @Timed
    public ResponseEntity<Void> deleteGiftMatPromo(@PathVariable Long id) {
        log.debug("REST request to delete GiftMatPromo : {}", id);
        giftMatPromoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
