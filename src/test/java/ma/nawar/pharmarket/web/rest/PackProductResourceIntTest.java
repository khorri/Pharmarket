package ma.nawar.pharmarket.web.rest;

import ma.nawar.pharmarket.PharmarketApp;

import ma.nawar.pharmarket.domain.PackProduct;
import ma.nawar.pharmarket.repository.PackProductRepository;
import ma.nawar.pharmarket.service.PackProductService;
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
 * Test class for the PackProductResource REST controller.
 *
 * @see PackProductResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PharmarketApp.class)
public class PackProductResourceIntTest {

    private static final Integer DEFAULT_QUANTITY_MIN = 1;
    private static final Integer UPDATED_QUANTITY_MIN = 2;

    @Autowired
    private PackProductRepository packProductRepository;

    @Autowired
    private PackProductService packProductService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPackProductMockMvc;

    private PackProduct packProduct;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PackProductResource packProductResource = new PackProductResource(packProductService);
        this.restPackProductMockMvc = MockMvcBuilders.standaloneSetup(packProductResource)
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
    public static PackProduct createEntity(EntityManager em) {
        PackProduct packProduct = new PackProduct()
            .quantityMin(DEFAULT_QUANTITY_MIN);
        return packProduct;
    }

    @Before
    public void initTest() {
        packProduct = createEntity(em);
    }

    @Test
    @Transactional
    public void createPackProduct() throws Exception {
        int databaseSizeBeforeCreate = packProductRepository.findAll().size();

        // Create the PackProduct
        restPackProductMockMvc.perform(post("/api/pack-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(packProduct)))
            .andExpect(status().isCreated());

        // Validate the PackProduct in the database
        List<PackProduct> packProductList = packProductRepository.findAll();
        assertThat(packProductList).hasSize(databaseSizeBeforeCreate + 1);
        PackProduct testPackProduct = packProductList.get(packProductList.size() - 1);
        assertThat(testPackProduct.getQuantityMin()).isEqualTo(DEFAULT_QUANTITY_MIN);
    }

    @Test
    @Transactional
    public void createPackProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = packProductRepository.findAll().size();

        // Create the PackProduct with an existing ID
        packProduct.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPackProductMockMvc.perform(post("/api/pack-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(packProduct)))
            .andExpect(status().isBadRequest());

        // Validate the PackProduct in the database
        List<PackProduct> packProductList = packProductRepository.findAll();
        assertThat(packProductList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkQuantityMinIsRequired() throws Exception {
        int databaseSizeBeforeTest = packProductRepository.findAll().size();
        // set the field null
        packProduct.setQuantityMin(null);

        // Create the PackProduct, which fails.

        restPackProductMockMvc.perform(post("/api/pack-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(packProduct)))
            .andExpect(status().isBadRequest());

        List<PackProduct> packProductList = packProductRepository.findAll();
        assertThat(packProductList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPackProducts() throws Exception {
        // Initialize the database
        packProductRepository.saveAndFlush(packProduct);

        // Get all the packProductList
        restPackProductMockMvc.perform(get("/api/pack-products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(packProduct.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantityMin").value(hasItem(DEFAULT_QUANTITY_MIN)));
    }

    @Test
    @Transactional
    public void getPackProduct() throws Exception {
        // Initialize the database
        packProductRepository.saveAndFlush(packProduct);

        // Get the packProduct
        restPackProductMockMvc.perform(get("/api/pack-products/{id}", packProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(packProduct.getId().intValue()))
            .andExpect(jsonPath("$.quantityMin").value(DEFAULT_QUANTITY_MIN));
    }

    @Test
    @Transactional
    public void getNonExistingPackProduct() throws Exception {
        // Get the packProduct
        restPackProductMockMvc.perform(get("/api/pack-products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePackProduct() throws Exception {
        // Initialize the database
        packProductService.save(packProduct);

        int databaseSizeBeforeUpdate = packProductRepository.findAll().size();

        // Update the packProduct
        PackProduct updatedPackProduct = packProductRepository.findOne(packProduct.getId());
        // Disconnect from session so that the updates on updatedPackProduct are not directly saved in db
        em.detach(updatedPackProduct);
        updatedPackProduct
            .quantityMin(UPDATED_QUANTITY_MIN);

        restPackProductMockMvc.perform(put("/api/pack-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPackProduct)))
            .andExpect(status().isOk());

        // Validate the PackProduct in the database
        List<PackProduct> packProductList = packProductRepository.findAll();
        assertThat(packProductList).hasSize(databaseSizeBeforeUpdate);
        PackProduct testPackProduct = packProductList.get(packProductList.size() - 1);
        assertThat(testPackProduct.getQuantityMin()).isEqualTo(UPDATED_QUANTITY_MIN);
    }

    @Test
    @Transactional
    public void updateNonExistingPackProduct() throws Exception {
        int databaseSizeBeforeUpdate = packProductRepository.findAll().size();

        // Create the PackProduct

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPackProductMockMvc.perform(put("/api/pack-products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(packProduct)))
            .andExpect(status().isCreated());

        // Validate the PackProduct in the database
        List<PackProduct> packProductList = packProductRepository.findAll();
        assertThat(packProductList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePackProduct() throws Exception {
        // Initialize the database
        packProductService.save(packProduct);

        int databaseSizeBeforeDelete = packProductRepository.findAll().size();

        // Get the packProduct
        restPackProductMockMvc.perform(delete("/api/pack-products/{id}", packProduct.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PackProduct> packProductList = packProductRepository.findAll();
        assertThat(packProductList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PackProduct.class);
        PackProduct packProduct1 = new PackProduct();
        packProduct1.setId(1L);
        PackProduct packProduct2 = new PackProduct();
        packProduct2.setId(packProduct1.getId());
        assertThat(packProduct1).isEqualTo(packProduct2);
        packProduct2.setId(2L);
        assertThat(packProduct1).isNotEqualTo(packProduct2);
        packProduct1.setId(null);
        assertThat(packProduct1).isNotEqualTo(packProduct2);
    }
}
