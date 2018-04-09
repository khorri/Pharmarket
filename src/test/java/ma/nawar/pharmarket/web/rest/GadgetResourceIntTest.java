package ma.nawar.pharmarket.web.rest;

import ma.nawar.pharmarket.PharmarketApp;

import ma.nawar.pharmarket.domain.Gadget;
import ma.nawar.pharmarket.repository.GadgetRepository;
import ma.nawar.pharmarket.service.GadgetService;
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
 * Test class for the GadgetResource REST controller.
 *
 * @see GadgetResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PharmarketApp.class)
public class GadgetResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private GadgetRepository gadgetRepository;

    @Autowired
    private GadgetService gadgetService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGadgetMockMvc;

    private Gadget gadget;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GadgetResource gadgetResource = new GadgetResource(gadgetService);
        this.restGadgetMockMvc = MockMvcBuilders.standaloneSetup(gadgetResource)
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
    public static Gadget createEntity(EntityManager em) {
        Gadget gadget = new Gadget()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return gadget;
    }

    @Before
    public void initTest() {
        gadget = createEntity(em);
    }

    @Test
    @Transactional
    public void createGadget() throws Exception {
        int databaseSizeBeforeCreate = gadgetRepository.findAll().size();

        // Create the Gadget
        restGadgetMockMvc.perform(post("/api/gadgets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gadget)))
            .andExpect(status().isCreated());

        // Validate the Gadget in the database
        List<Gadget> gadgetList = gadgetRepository.findAll();
        assertThat(gadgetList).hasSize(databaseSizeBeforeCreate + 1);
        Gadget testGadget = gadgetList.get(gadgetList.size() - 1);
        assertThat(testGadget.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGadget.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createGadgetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gadgetRepository.findAll().size();

        // Create the Gadget with an existing ID
        gadget.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGadgetMockMvc.perform(post("/api/gadgets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gadget)))
            .andExpect(status().isBadRequest());

        // Validate the Gadget in the database
        List<Gadget> gadgetList = gadgetRepository.findAll();
        assertThat(gadgetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = gadgetRepository.findAll().size();
        // set the field null
        gadget.setName(null);

        // Create the Gadget, which fails.

        restGadgetMockMvc.perform(post("/api/gadgets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gadget)))
            .andExpect(status().isBadRequest());

        List<Gadget> gadgetList = gadgetRepository.findAll();
        assertThat(gadgetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGadgets() throws Exception {
        // Initialize the database
        gadgetRepository.saveAndFlush(gadget);

        // Get all the gadgetList
        restGadgetMockMvc.perform(get("/api/gadgets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gadget.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getGadget() throws Exception {
        // Initialize the database
        gadgetRepository.saveAndFlush(gadget);

        // Get the gadget
        restGadgetMockMvc.perform(get("/api/gadgets/{id}", gadget.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gadget.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGadget() throws Exception {
        // Get the gadget
        restGadgetMockMvc.perform(get("/api/gadgets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGadget() throws Exception {
        // Initialize the database
        gadgetService.save(gadget);

        int databaseSizeBeforeUpdate = gadgetRepository.findAll().size();

        // Update the gadget
        Gadget updatedGadget = gadgetRepository.findOne(gadget.getId());
        // Disconnect from session so that the updates on updatedGadget are not directly saved in db
        em.detach(updatedGadget);
        updatedGadget
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restGadgetMockMvc.perform(put("/api/gadgets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGadget)))
            .andExpect(status().isOk());

        // Validate the Gadget in the database
        List<Gadget> gadgetList = gadgetRepository.findAll();
        assertThat(gadgetList).hasSize(databaseSizeBeforeUpdate);
        Gadget testGadget = gadgetList.get(gadgetList.size() - 1);
        assertThat(testGadget.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGadget.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingGadget() throws Exception {
        int databaseSizeBeforeUpdate = gadgetRepository.findAll().size();

        // Create the Gadget

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGadgetMockMvc.perform(put("/api/gadgets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gadget)))
            .andExpect(status().isCreated());

        // Validate the Gadget in the database
        List<Gadget> gadgetList = gadgetRepository.findAll();
        assertThat(gadgetList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGadget() throws Exception {
        // Initialize the database
        gadgetService.save(gadget);

        int databaseSizeBeforeDelete = gadgetRepository.findAll().size();

        // Get the gadget
        restGadgetMockMvc.perform(delete("/api/gadgets/{id}", gadget.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Gadget> gadgetList = gadgetRepository.findAll();
        assertThat(gadgetList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Gadget.class);
        Gadget gadget1 = new Gadget();
        gadget1.setId(1L);
        Gadget gadget2 = new Gadget();
        gadget2.setId(gadget1.getId());
        assertThat(gadget1).isEqualTo(gadget2);
        gadget2.setId(2L);
        assertThat(gadget1).isNotEqualTo(gadget2);
        gadget1.setId(null);
        assertThat(gadget1).isNotEqualTo(gadget2);
    }
}
