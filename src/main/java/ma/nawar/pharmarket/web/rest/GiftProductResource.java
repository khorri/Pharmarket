package ma.nawar.pharmarket.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.nawar.pharmarket.domain.GiftProduct;
import ma.nawar.pharmarket.service.GiftProductService;
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
 * REST controller for managing GiftProduct.
 */
@RestController
@RequestMapping("/api")
public class GiftProductResource {

    private final Logger log = LoggerFactory.getLogger(GiftProductResource.class);

    private static final String ENTITY_NAME = "giftProduct";

    private final GiftProductService giftProductService;

    public GiftProductResource(GiftProductService giftProductService) {
        this.giftProductService = giftProductService;
    }

    /**
     * POST  /gift-products : Create a new giftProduct.
     *
     * @param giftProduct the giftProduct to create
     * @return the ResponseEntity with status 201 (Created) and with body the new giftProduct, or with status 400 (Bad Request) if the giftProduct has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gift-products")
    @Timed
    public ResponseEntity<GiftProduct> createGiftProduct(@RequestBody GiftProduct giftProduct) throws URISyntaxException {
        log.debug("REST request to save GiftProduct : {}", giftProduct);
        if (giftProduct.getId() != null) {
            throw new BadRequestAlertException("A new giftProduct cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GiftProduct result = giftProductService.save(giftProduct);
        return ResponseEntity.created(new URI("/api/gift-products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gift-products : Updates an existing giftProduct.
     *
     * @param giftProduct the giftProduct to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated giftProduct,
     * or with status 400 (Bad Request) if the giftProduct is not valid,
     * or with status 500 (Internal Server Error) if the giftProduct couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gift-products")
    @Timed
    public ResponseEntity<GiftProduct> updateGiftProduct(@RequestBody GiftProduct giftProduct) throws URISyntaxException {
        log.debug("REST request to update GiftProduct : {}", giftProduct);
        if (giftProduct.getId() == null) {
            return createGiftProduct(giftProduct);
        }
        GiftProduct result = giftProductService.save(giftProduct);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, giftProduct.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gift-products : get all the giftProducts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of giftProducts in body
     */
    @GetMapping("/gift-products")
    @Timed
    public ResponseEntity<List<GiftProduct>> getAllGiftProducts(Pageable pageable) {
        log.debug("REST request to get a page of GiftProducts");
        Page<GiftProduct> page = giftProductService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/gift-products");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /gift-products/:id : get the "id" giftProduct.
     *
     * @param id the id of the giftProduct to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the giftProduct, or with status 404 (Not Found)
     */
    @GetMapping("/gift-products/{id}")
    @Timed
    public ResponseEntity<GiftProduct> getGiftProduct(@PathVariable Long id) {
        log.debug("REST request to get GiftProduct : {}", id);
        GiftProduct giftProduct = giftProductService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(giftProduct));
    }

    /**
     * DELETE  /gift-products/:id : delete the "id" giftProduct.
     *
     * @param id the id of the giftProduct to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gift-products/{id}")
    @Timed
    public ResponseEntity<Void> deleteGiftProduct(@PathVariable Long id) {
        log.debug("REST request to delete GiftProduct : {}", id);
        giftProductService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
