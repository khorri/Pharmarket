package ma.nawar.pharmarket.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.nawar.pharmarket.domain.PackProduct;
import ma.nawar.pharmarket.service.PackProductService;
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
 * REST controller for managing PackProduct.
 */
@RestController
@RequestMapping("/api")
public class PackProductResource {

    private final Logger log = LoggerFactory.getLogger(PackProductResource.class);

    private static final String ENTITY_NAME = "packProduct";

    private final PackProductService packProductService;

    public PackProductResource(PackProductService packProductService) {
        this.packProductService = packProductService;
    }

    /**
     * POST  /pack-products : Create a new packProduct.
     *
     * @param packProduct the packProduct to create
     * @return the ResponseEntity with status 201 (Created) and with body the new packProduct, or with status 400 (Bad Request) if the packProduct has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pack-products")
    @Timed
    public ResponseEntity<PackProduct> createPackProduct(@Valid @RequestBody PackProduct packProduct) throws URISyntaxException {
        log.debug("REST request to save PackProduct : {}", packProduct);
        if (packProduct.getId() != null) {
            throw new BadRequestAlertException("A new packProduct cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PackProduct result = packProductService.save(packProduct);
        return ResponseEntity.created(new URI("/api/pack-products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pack-products : Updates an existing packProduct.
     *
     * @param packProduct the packProduct to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated packProduct,
     * or with status 400 (Bad Request) if the packProduct is not valid,
     * or with status 500 (Internal Server Error) if the packProduct couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pack-products")
    @Timed
    public ResponseEntity<PackProduct> updatePackProduct(@Valid @RequestBody PackProduct packProduct) throws URISyntaxException {
        log.debug("REST request to update PackProduct : {}", packProduct);
        if (packProduct.getId() == null) {
            return createPackProduct(packProduct);
        }
        PackProduct result = packProductService.save(packProduct);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, packProduct.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pack-products : get all the packProducts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of packProducts in body
     */
    @GetMapping("/pack-products")
    @Timed
    public ResponseEntity<List<PackProduct>> getAllPackProducts(Pageable pageable) {
        log.debug("REST request to get a page of PackProducts");
        Page<PackProduct> page = packProductService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/pack-products");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /pack-products/:id : get the "id" packProduct.
     *
     * @param id the id of the packProduct to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the packProduct, or with status 404 (Not Found)
     */
    @GetMapping("/pack-products/{id}")
    @Timed
    public ResponseEntity<PackProduct> getPackProduct(@PathVariable Long id) {
        log.debug("REST request to get PackProduct : {}", id);
        PackProduct packProduct = packProductService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(packProduct));
    }

    /**
     * DELETE  /pack-products/:id : delete the "id" packProduct.
     *
     * @param id the id of the packProduct to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pack-products/{id}")
    @Timed
    public ResponseEntity<Void> deletePackProduct(@PathVariable Long id) {
        log.debug("REST request to delete PackProduct : {}", id);
        packProductService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
