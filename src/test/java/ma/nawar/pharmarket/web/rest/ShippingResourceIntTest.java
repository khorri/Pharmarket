package ma.nawar.pharmarket.web.rest;

import ma.nawar.pharmarket.PharmarketApp;

import ma.nawar.pharmarket.domain.Shipping;
import ma.nawar.pharmarket.repository.ShippingRepository;
import ma.nawar.pharmarket.service.ShippingService;
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
 * Test class for the ShippingResource REST controller.
 *
 * @see ShippingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PharmarketApp.class)
public class ShippingResourceIntTest {

    private static final String DEFAULT_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_GROSSISTE = false;
    private static final Boolean UPDATED_IS_GROSSISTE = true;

    @Autowired
    private ShippingRepository shippingRepository;

    @Autowired
    private ShippingService shippingService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restShippingMockMvc;

    private Shipping shipping;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ShippingResource shippingResource = new ShippingResource(shippingService);
        this.restShippingMockMvc = MockMvcBuilders.standaloneSetup(shippingResource)
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
    public static Shipping createEntity(EntityManager em) {
        Shipping shipping = new Shipping()
            .reference(DEFAULT_REFERENCE)
            .name(DEFAULT_NAME)
            .address(DEFAULT_ADDRESS)
            .phone(DEFAULT_PHONE)
            .contact(DEFAULT_CONTACT)
            .isGrossiste(DEFAULT_IS_GROSSISTE);
        return shipping;
    }

    @Before
    public void initTest() {
        shipping = createEntity(em);
    }

    @Test
    @Transactional
    public void createShipping() throws Exception {
        int databaseSizeBeforeCreate = shippingRepository.findAll().size();

        // Create the Shipping
        restShippingMockMvc.perform(post("/api/shippings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shipping)))
            .andExpect(status().isCreated());

        // Validate the Shipping in the database
        List<Shipping> shippingList = shippingRepository.findAll();
        assertThat(shippingList).hasSize(databaseSizeBeforeCreate + 1);
        Shipping testShipping = shippingList.get(shippingList.size() - 1);
        assertThat(testShipping.getReference()).isEqualTo(DEFAULT_REFERENCE);
        assertThat(testShipping.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testShipping.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testShipping.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testShipping.getContact()).isEqualTo(DEFAULT_CONTACT);
        assertThat(testShipping.isIsGrossiste()).isEqualTo(DEFAULT_IS_GROSSISTE);
    }

    @Test
    @Transactional
    public void createShippingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = shippingRepository.findAll().size();

        // Create the Shipping with an existing ID
        shipping.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restShippingMockMvc.perform(post("/api/shippings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shipping)))
            .andExpect(status().isBadRequest());

        // Validate the Shipping in the database
        List<Shipping> shippingList = shippingRepository.findAll();
        assertThat(shippingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = shippingRepository.findAll().size();
        // set the field null
        shipping.setName(null);

        // Create the Shipping, which fails.

        restShippingMockMvc.perform(post("/api/shippings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shipping)))
            .andExpect(status().isBadRequest());

        List<Shipping> shippingList = shippingRepository.findAll();
        assertThat(shippingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllShippings() throws Exception {
        // Initialize the database
        shippingRepository.saveAndFlush(shipping);

        // Get all the shippingList
        restShippingMockMvc.perform(get("/api/shippings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shipping.getId().intValue())))
            .andExpect(jsonPath("$.[*].reference").value(hasItem(DEFAULT_REFERENCE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())))
            .andExpect(jsonPath("$.[*].contact").value(hasItem(DEFAULT_CONTACT.toString())))
            .andExpect(jsonPath("$.[*].isGrossiste").value(hasItem(DEFAULT_IS_GROSSISTE.booleanValue())));
    }

    @Test
    @Transactional
    public void getShipping() throws Exception {
        // Initialize the database
        shippingRepository.saveAndFlush(shipping);

        // Get the shipping
        restShippingMockMvc.perform(get("/api/shippings/{id}", shipping.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(shipping.getId().intValue()))
            .andExpect(jsonPath("$.reference").value(DEFAULT_REFERENCE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()))
            .andExpect(jsonPath("$.contact").value(DEFAULT_CONTACT.toString()))
            .andExpect(jsonPath("$.isGrossiste").value(DEFAULT_IS_GROSSISTE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingShipping() throws Exception {
        // Get the shipping
        restShippingMockMvc.perform(get("/api/shippings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateShipping() throws Exception {
        // Initialize the database
        shippingService.save(shipping);

        int databaseSizeBeforeUpdate = shippingRepository.findAll().size();

        // Update the shipping
        Shipping updatedShipping = shippingRepository.findOne(shipping.getId());
        // Disconnect from session so that the updates on updatedShipping are not directly saved in db
        em.detach(updatedShipping);
        updatedShipping
            .reference(UPDATED_REFERENCE)
            .name(UPDATED_NAME)
            .address(UPDATED_ADDRESS)
            .phone(UPDATED_PHONE)
            .contact(UPDATED_CONTACT)
            .isGrossiste(UPDATED_IS_GROSSISTE);

        restShippingMockMvc.perform(put("/api/shippings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedShipping)))
            .andExpect(status().isOk());

        // Validate the Shipping in the database
        List<Shipping> shippingList = shippingRepository.findAll();
        assertThat(shippingList).hasSize(databaseSizeBeforeUpdate);
        Shipping testShipping = shippingList.get(shippingList.size() - 1);
        assertThat(testShipping.getReference()).isEqualTo(UPDATED_REFERENCE);
        assertThat(testShipping.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testShipping.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testShipping.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testShipping.getContact()).isEqualTo(UPDATED_CONTACT);
        assertThat(testShipping.isIsGrossiste()).isEqualTo(UPDATED_IS_GROSSISTE);
    }

    @Test
    @Transactional
    public void updateNonExistingShipping() throws Exception {
        int databaseSizeBeforeUpdate = shippingRepository.findAll().size();

        // Create the Shipping

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restShippingMockMvc.perform(put("/api/shippings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shipping)))
            .andExpect(status().isCreated());

        // Validate the Shipping in the database
        List<Shipping> shippingList = shippingRepository.findAll();
        assertThat(shippingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteShipping() throws Exception {
        // Initialize the database
        shippingService.save(shipping);

        int databaseSizeBeforeDelete = shippingRepository.findAll().size();

        // Get the shipping
        restShippingMockMvc.perform(delete("/api/shippings/{id}", shipping.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Shipping> shippingList = shippingRepository.findAll();
        assertThat(shippingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Shipping.class);
        Shipping shipping1 = new Shipping();
        shipping1.setId(1L);
        Shipping shipping2 = new Shipping();
        shipping2.setId(shipping1.getId());
        assertThat(shipping1).isEqualTo(shipping2);
        shipping2.setId(2L);
        assertThat(shipping1).isNotEqualTo(shipping2);
        shipping1.setId(null);
        assertThat(shipping1).isNotEqualTo(shipping2);
    }
}
