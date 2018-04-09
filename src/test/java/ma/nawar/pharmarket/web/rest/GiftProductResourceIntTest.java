package ma.nawar.pharmarket.web.rest;

import ma.nawar.pharmarket.PharmarketApp;

import ma.nawar.pharmarket.domain.GiftProduct;
import ma.nawar.pharmarket.repository.GiftProductRepository;
import ma.nawar.pharmarket.service.GiftProductService;
import ma.nawar.pharmarket.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static ma.nawar.pharmarket.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GiftProductResource REST controller.
 *
 * @see GiftProductResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PharmarketApp.class)
public class GiftProductResourceIntTest {

    private static final Long DEFAULT_QUANTITY = 1L;
    private static final Long UPDATED_QUANTITY = 2L;

    @Autowired
    private GiftProductRepository giftProductRepository;

    @Autowired
    private GiftProductService giftProductService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGiftProductMockMvc;

    private GiftProduct giftProduct;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GiftProductResource giftProductResource = new GiftProductResource(giftProductService);
        this.restGiftProductMockMvc = MockMvcBuilders.standaloneSetup(giftProductResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GiftProduct createEntity(EntityManager em) {
        GiftProduct giftProduct = new GiftProduct()
            .quantity(DEFAULT_QUANTITY);
        return giftProduct;
    }

    @Before
    public void initTest() {
        giftProduct = createEntity(em);
    }

    @Test
    @Transactional
    public void createGiftProduct() throws Exception {
        int databaseSizeBeforeCreate = giftProductRepository.findAll().size();

        // Create the GiftProduct
        restGiftProductMockMvc.perform(post("/api/gift-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(giftProduct)))
            .andExpect(status().isCreated());

        // Validate the GiftProduct in the database
        List<GiftProduct> giftProductList = giftProductRepository.findAll();
        assertThat(giftProductList).hasSize(databaseSizeBeforeCreate + 1);
        GiftProduct testGiftProduct = giftProductList.get(giftProductList.size() - 1);
        assertThat(testGiftProduct.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void createGiftProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = giftProductRepository.findAll().size();

        // Create the GiftProduct with an existing ID
        giftProduct.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGiftProductMockMvc.perform(post("/api/gift-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(giftProduct)))
            .andExpect(status().isBadRequest());

        // Validate the GiftProduct in the database
        List<GiftProduct> giftProductList = giftProductRepository.findAll();
        assertThat(giftProductList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGiftProducts() throws Exception {
        // Initialize the database
        giftProductRepository.saveAndFlush(giftProduct);

        // Get all the giftProductList
        restGiftProductMockMvc.perform(get("/api/gift-products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(giftProduct.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())));
    }

    @Test
    @Transactional
    public void getGiftProduct() throws Exception {
        // Initialize the database
        giftProductRepository.saveAndFlush(giftProduct);

        // Get the giftProduct
        restGiftProductMockMvc.perform(get("/api/gift-products/{id}", giftProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(giftProduct.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingGiftProduct() throws Exception {
        // Get the giftProduct
        restGiftProductMockMvc.perform(get("/api/gift-products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGiftProduct() throws Exception {
        // Initialize the database
        giftProductService.save(giftProduct);

        int databaseSizeBeforeUpdate = giftProductRepository.findAll().size();

        // Update the giftProduct
        GiftProduct updatedGiftProduct = giftProductRepository.findOne(giftProduct.getId());
        // Disconnect from session so that the updates on updatedGiftProduct are not directly saved in db
        em.detach(updatedGiftProduct);
        updatedGiftProduct
            .quantity(UPDATED_QUANTITY);

        restGiftProductMockMvc.perform(put("/api/gift-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGiftProduct)))
            .andExpect(status().isOk());

        // Validate the GiftProduct in the database
        List<GiftProduct> giftProductList = giftProductRepository.findAll();
        assertThat(giftProductList).hasSize(databaseSizeBeforeUpdate);
        GiftProduct testGiftProduct = giftProductList.get(giftProductList.size() - 1);
        assertThat(testGiftProduct.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    public void updateNonExistingGiftProduct() throws Exception {
        int databaseSizeBeforeUpdate = giftProductRepository.findAll().size();

        // Create the GiftProduct

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGiftProductMockMvc.perform(put("/api/gift-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(giftProduct)))
            .andExpect(status().isCreated());

        // Validate the GiftProduct in the database
        List<GiftProduct> giftProductList = giftProductRepository.findAll();
        assertThat(giftProductList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGiftProduct() throws Exception {
        // Initialize the database
        giftProductService.save(giftProduct);

        int databaseSizeBeforeDelete = giftProductRepository.findAll().size();

        // Get the giftProduct
        restGiftProductMockMvc.perform(delete("/api/gift-products/{id}", giftProduct.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GiftProduct> giftProductList = giftProductRepository.findAll();
        assertThat(giftProductList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GiftProduct.class);
        GiftProduct giftProduct1 = new GiftProduct();
        giftProduct1.setId(1L);
        GiftProduct giftProduct2 = new GiftProduct();
        giftProduct2.setId(giftProduct1.getId());
        assertThat(giftProduct1).isEqualTo(giftProduct2);
        giftProduct2.setId(2L);
        assertThat(giftProduct1).isNotEqualTo(giftProduct2);
        giftProduct1.setId(null);
        assertThat(giftProduct1).isNotEqualTo(giftProduct2);
    }
}
