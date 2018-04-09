package ma.nawar.pharmarket.web.rest;

import ma.nawar.pharmarket.PharmarketApp;

import ma.nawar.pharmarket.domain.ShippingMode;
import ma.nawar.pharmarket.repository.ShippingModeRepository;
import ma.nawar.pharmarket.service.ShippingModeService;
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
 * Test class for the ShippingModeResource REST controller.
 *
 * @see ShippingModeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PharmarketApp.class)
public class ShippingModeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ShippingModeRepository shippingModeRepository;

    @Autowired
    private ShippingModeService shippingModeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restShippingModeMockMvc;

    private ShippingMode shippingMode;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ShippingModeResource shippingModeResource = new ShippingModeResource(shippingModeService);
        this.restShippingModeMockMvc = MockMvcBuilders.standaloneSetup(shippingModeResource)
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
    public static ShippingMode createEntity(EntityManager em) {
        ShippingMode shippingMode = new ShippingMode()
            .name(DEFAULT_NAME);
        return shippingMode;
    }

    @Before
    public void initTest() {
        shippingMode = createEntity(em);
    }

    @Test
    @Transactional
    public void createShippingMode() throws Exception {
        int databaseSizeBeforeCreate = shippingModeRepository.findAll().size();

        // Create the ShippingMode
        restShippingModeMockMvc.perform(post("/api/shipping-modes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shippingMode)))
            .andExpect(status().isCreated());

        // Validate the ShippingMode in the database
        List<ShippingMode> shippingModeList = shippingModeRepository.findAll();
        assertThat(shippingModeList).hasSize(databaseSizeBeforeCreate + 1);
        ShippingMode testShippingMode = shippingModeList.get(shippingModeList.size() - 1);
        assertThat(testShippingMode.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createShippingModeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = shippingModeRepository.findAll().size();

        // Create the ShippingMode with an existing ID
        shippingMode.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restShippingModeMockMvc.perform(post("/api/shipping-modes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shippingMode)))
            .andExpect(status().isBadRequest());

        // Validate the ShippingMode in the database
        List<ShippingMode> shippingModeList = shippingModeRepository.findAll();
        assertThat(shippingModeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = shippingModeRepository.findAll().size();
        // set the field null
        shippingMode.setName(null);

        // Create the ShippingMode, which fails.

        restShippingModeMockMvc.perform(post("/api/shipping-modes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shippingMode)))
            .andExpect(status().isBadRequest());

        List<ShippingMode> shippingModeList = shippingModeRepository.findAll();
        assertThat(shippingModeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllShippingModes() throws Exception {
        // Initialize the database
        shippingModeRepository.saveAndFlush(shippingMode);

        // Get all the shippingModeList
        restShippingModeMockMvc.perform(get("/api/shipping-modes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shippingMode.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getShippingMode() throws Exception {
        // Initialize the database
        shippingModeRepository.saveAndFlush(shippingMode);

        // Get the shippingMode
        restShippingModeMockMvc.perform(get("/api/shipping-modes/{id}", shippingMode.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(shippingMode.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingShippingMode() throws Exception {
        // Get the shippingMode
        restShippingModeMockMvc.perform(get("/api/shipping-modes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateShippingMode() throws Exception {
        // Initialize the database
        shippingModeService.save(shippingMode);

        int databaseSizeBeforeUpdate = shippingModeRepository.findAll().size();

        // Update the shippingMode
        ShippingMode updatedShippingMode = shippingModeRepository.findOne(shippingMode.getId());
        // Disconnect from session so that the updates on updatedShippingMode are not directly saved in db
        em.detach(updatedShippingMode);
        updatedShippingMode
            .name(UPDATED_NAME);

        restShippingModeMockMvc.perform(put("/api/shipping-modes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedShippingMode)))
            .andExpect(status().isOk());

        // Validate the ShippingMode in the database
        List<ShippingMode> shippingModeList = shippingModeRepository.findAll();
        assertThat(shippingModeList).hasSize(databaseSizeBeforeUpdate);
        ShippingMode testShippingMode = shippingModeList.get(shippingModeList.size() - 1);
        assertThat(testShippingMode.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingShippingMode() throws Exception {
        int databaseSizeBeforeUpdate = shippingModeRepository.findAll().size();

        // Create the ShippingMode

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restShippingModeMockMvc.perform(put("/api/shipping-modes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shippingMode)))
            .andExpect(status().isCreated());

        // Validate the ShippingMode in the database
        List<ShippingMode> shippingModeList = shippingModeRepository.findAll();
        assertThat(shippingModeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteShippingMode() throws Exception {
        // Initialize the database
        shippingModeService.save(shippingMode);

        int databaseSizeBeforeDelete = shippingModeRepository.findAll().size();

        // Get the shippingMode
        restShippingModeMockMvc.perform(delete("/api/shipping-modes/{id}", shippingMode.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ShippingMode> shippingModeList = shippingModeRepository.findAll();
        assertThat(shippingModeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ShippingMode.class);
        ShippingMode shippingMode1 = new ShippingMode();
        shippingMode1.setId(1L);
        ShippingMode shippingMode2 = new ShippingMode();
        shippingMode2.setId(shippingMode1.getId());
        assertThat(shippingMode1).isEqualTo(shippingMode2);
        shippingMode2.setId(2L);
        assertThat(shippingMode1).isNotEqualTo(shippingMode2);
        shippingMode1.setId(null);
        assertThat(shippingMode1).isNotEqualTo(shippingMode2);
    }
}
