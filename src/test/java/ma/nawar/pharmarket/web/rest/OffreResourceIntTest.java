package ma.nawar.pharmarket.web.rest;

import ma.nawar.pharmarket.PharmarketApp;

import ma.nawar.pharmarket.domain.Offre;
import ma.nawar.pharmarket.repository.OffreRepository;
import ma.nawar.pharmarket.service.OffreService;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static ma.nawar.pharmarket.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the OffreResource REST controller.
 *
 * @see OffreResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PharmarketApp.class)
public class OffreResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_START = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_QUANTITY_MIN = 1;
    private static final Integer UPDATED_QUANTITY_MIN = 2;

    private static final Integer DEFAULT_AMOUNT_MIN = 1;
    private static final Integer UPDATED_AMOUNT_MIN = 2;

    private static final String DEFAULT_OFFRE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_OFFRE_TYPE = "BBBBBBBBBB";

    @Autowired
    private OffreRepository offreRepository;

    @Autowired
    private OffreService offreService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOffreMockMvc;

    private Offre offre;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OffreResource offreResource = new OffreResource(offreService);
        this.restOffreMockMvc = MockMvcBuilders.standaloneSetup(offreResource)
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
    public static Offre createEntity(EntityManager em) {
        Offre offre = new Offre()
            .name(DEFAULT_NAME)
            .start(DEFAULT_START)
            .end(DEFAULT_END)
            .status(DEFAULT_STATUS)
            .description(DEFAULT_DESCRIPTION)
            .quantityMin(DEFAULT_QUANTITY_MIN)
            .amountMin(DEFAULT_AMOUNT_MIN)
            .offreType(DEFAULT_OFFRE_TYPE);
        return offre;
    }

    @Before
    public void initTest() {
        offre = createEntity(em);
    }

    @Test
    @Transactional
    public void createOffre() throws Exception {
        int databaseSizeBeforeCreate = offreRepository.findAll().size();

        // Create the Offre
        restOffreMockMvc.perform(post("/api/offres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offre)))
            .andExpect(status().isCreated());

        // Validate the Offre in the database
        List<Offre> offreList = offreRepository.findAll();
        assertThat(offreList).hasSize(databaseSizeBeforeCreate + 1);
        Offre testOffre = offreList.get(offreList.size() - 1);
        assertThat(testOffre.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOffre.getStart()).isEqualTo(DEFAULT_START);
        assertThat(testOffre.getEnd()).isEqualTo(DEFAULT_END);
        assertThat(testOffre.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testOffre.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testOffre.getQuantityMin()).isEqualTo(DEFAULT_QUANTITY_MIN);
        assertThat(testOffre.getAmountMin()).isEqualTo(DEFAULT_AMOUNT_MIN);
        assertThat(testOffre.getOffreType()).isEqualTo(DEFAULT_OFFRE_TYPE);
    }

    @Test
    @Transactional
    public void createOffreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = offreRepository.findAll().size();

        // Create the Offre with an existing ID
        offre.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOffreMockMvc.perform(post("/api/offres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offre)))
            .andExpect(status().isBadRequest());

        // Validate the Offre in the database
        List<Offre> offreList = offreRepository.findAll();
        assertThat(offreList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = offreRepository.findAll().size();
        // set the field null
        offre.setName(null);

        // Create the Offre, which fails.

        restOffreMockMvc.perform(post("/api/offres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offre)))
            .andExpect(status().isBadRequest());

        List<Offre> offreList = offreRepository.findAll();
        assertThat(offreList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOffres() throws Exception {
        // Initialize the database
        offreRepository.saveAndFlush(offre);

        // Get all the offreList
        restOffreMockMvc.perform(get("/api/offres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(offre.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].start").value(hasItem(DEFAULT_START.toString())))
            .andExpect(jsonPath("$.[*].end").value(hasItem(DEFAULT_END.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].quantityMin").value(hasItem(DEFAULT_QUANTITY_MIN)))
            .andExpect(jsonPath("$.[*].amountMin").value(hasItem(DEFAULT_AMOUNT_MIN)))
            .andExpect(jsonPath("$.[*].offreType").value(hasItem(DEFAULT_OFFRE_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getOffre() throws Exception {
        // Initialize the database
        offreRepository.saveAndFlush(offre);

        // Get the offre
        restOffreMockMvc.perform(get("/api/offres/{id}", offre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(offre.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.start").value(DEFAULT_START.toString()))
            .andExpect(jsonPath("$.end").value(DEFAULT_END.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.quantityMin").value(DEFAULT_QUANTITY_MIN))
            .andExpect(jsonPath("$.amountMin").value(DEFAULT_AMOUNT_MIN))
            .andExpect(jsonPath("$.offreType").value(DEFAULT_OFFRE_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOffre() throws Exception {
        // Get the offre
        restOffreMockMvc.perform(get("/api/offres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOffre() throws Exception {
        // Initialize the database
        offreService.save(offre);

        int databaseSizeBeforeUpdate = offreRepository.findAll().size();

        // Update the offre
        Offre updatedOffre = offreRepository.findOne(offre.getId());
        // Disconnect from session so that the updates on updatedOffre are not directly saved in db
        em.detach(updatedOffre);
        updatedOffre
            .name(UPDATED_NAME)
            .start(UPDATED_START)
            .end(UPDATED_END)
            .status(UPDATED_STATUS)
            .description(UPDATED_DESCRIPTION)
            .quantityMin(UPDATED_QUANTITY_MIN)
            .amountMin(UPDATED_AMOUNT_MIN)
            .offreType(UPDATED_OFFRE_TYPE);

        restOffreMockMvc.perform(put("/api/offres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOffre)))
            .andExpect(status().isOk());

        // Validate the Offre in the database
        List<Offre> offreList = offreRepository.findAll();
        assertThat(offreList).hasSize(databaseSizeBeforeUpdate);
        Offre testOffre = offreList.get(offreList.size() - 1);
        assertThat(testOffre.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOffre.getStart()).isEqualTo(UPDATED_START);
        assertThat(testOffre.getEnd()).isEqualTo(UPDATED_END);
        assertThat(testOffre.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testOffre.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testOffre.getQuantityMin()).isEqualTo(UPDATED_QUANTITY_MIN);
        assertThat(testOffre.getAmountMin()).isEqualTo(UPDATED_AMOUNT_MIN);
        assertThat(testOffre.getOffreType()).isEqualTo(UPDATED_OFFRE_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingOffre() throws Exception {
        int databaseSizeBeforeUpdate = offreRepository.findAll().size();

        // Create the Offre

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOffreMockMvc.perform(put("/api/offres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offre)))
            .andExpect(status().isCreated());

        // Validate the Offre in the database
        List<Offre> offreList = offreRepository.findAll();
        assertThat(offreList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOffre() throws Exception {
        // Initialize the database
        offreService.save(offre);

        int databaseSizeBeforeDelete = offreRepository.findAll().size();

        // Get the offre
        restOffreMockMvc.perform(delete("/api/offres/{id}", offre.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Offre> offreList = offreRepository.findAll();
        assertThat(offreList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Offre.class);
        Offre offre1 = new Offre();
        offre1.setId(1L);
        Offre offre2 = new Offre();
        offre2.setId(offre1.getId());
        assertThat(offre1).isEqualTo(offre2);
        offre2.setId(2L);
        assertThat(offre1).isNotEqualTo(offre2);
        offre1.setId(null);
        assertThat(offre1).isNotEqualTo(offre2);
    }
}
