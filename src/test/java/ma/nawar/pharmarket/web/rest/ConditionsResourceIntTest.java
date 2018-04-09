package ma.nawar.pharmarket.web.rest;

import ma.nawar.pharmarket.PharmarketApp;

import ma.nawar.pharmarket.domain.Conditions;
import ma.nawar.pharmarket.repository.ConditionsRepository;
import ma.nawar.pharmarket.service.ConditionsService;
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
 * Test class for the ConditionsResource REST controller.
 *
 * @see ConditionsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PharmarketApp.class)
public class ConditionsResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ConditionsRepository conditionsRepository;

    @Autowired
    private ConditionsService conditionsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restConditionsMockMvc;

    private Conditions conditions;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConditionsResource conditionsResource = new ConditionsResource(conditionsService);
        this.restConditionsMockMvc = MockMvcBuilders.standaloneSetup(conditionsResource)
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
    public static Conditions createEntity(EntityManager em) {
        Conditions conditions = new Conditions()
            .name(DEFAULT_NAME);
        return conditions;
    }

    @Before
    public void initTest() {
        conditions = createEntity(em);
    }

    @Test
    @Transactional
    public void createConditions() throws Exception {
        int databaseSizeBeforeCreate = conditionsRepository.findAll().size();

        // Create the Conditions
        restConditionsMockMvc.perform(post("/api/conditions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conditions)))
            .andExpect(status().isCreated());

        // Validate the Conditions in the database
        List<Conditions> conditionsList = conditionsRepository.findAll();
        assertThat(conditionsList).hasSize(databaseSizeBeforeCreate + 1);
        Conditions testConditions = conditionsList.get(conditionsList.size() - 1);
        assertThat(testConditions.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createConditionsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = conditionsRepository.findAll().size();

        // Create the Conditions with an existing ID
        conditions.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConditionsMockMvc.perform(post("/api/conditions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conditions)))
            .andExpect(status().isBadRequest());

        // Validate the Conditions in the database
        List<Conditions> conditionsList = conditionsRepository.findAll();
        assertThat(conditionsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = conditionsRepository.findAll().size();
        // set the field null
        conditions.setName(null);

        // Create the Conditions, which fails.

        restConditionsMockMvc.perform(post("/api/conditions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conditions)))
            .andExpect(status().isBadRequest());

        List<Conditions> conditionsList = conditionsRepository.findAll();
        assertThat(conditionsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllConditions() throws Exception {
        // Initialize the database
        conditionsRepository.saveAndFlush(conditions);

        // Get all the conditionsList
        restConditionsMockMvc.perform(get("/api/conditions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(conditions.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getConditions() throws Exception {
        // Initialize the database
        conditionsRepository.saveAndFlush(conditions);

        // Get the conditions
        restConditionsMockMvc.perform(get("/api/conditions/{id}", conditions.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(conditions.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingConditions() throws Exception {
        // Get the conditions
        restConditionsMockMvc.perform(get("/api/conditions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConditions() throws Exception {
        // Initialize the database
        conditionsService.save(conditions);

        int databaseSizeBeforeUpdate = conditionsRepository.findAll().size();

        // Update the conditions
        Conditions updatedConditions = conditionsRepository.findOne(conditions.getId());
        // Disconnect from session so that the updates on updatedConditions are not directly saved in db
        em.detach(updatedConditions);
        updatedConditions
            .name(UPDATED_NAME);

        restConditionsMockMvc.perform(put("/api/conditions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConditions)))
            .andExpect(status().isOk());

        // Validate the Conditions in the database
        List<Conditions> conditionsList = conditionsRepository.findAll();
        assertThat(conditionsList).hasSize(databaseSizeBeforeUpdate);
        Conditions testConditions = conditionsList.get(conditionsList.size() - 1);
        assertThat(testConditions.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingConditions() throws Exception {
        int databaseSizeBeforeUpdate = conditionsRepository.findAll().size();

        // Create the Conditions

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restConditionsMockMvc.perform(put("/api/conditions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conditions)))
            .andExpect(status().isCreated());

        // Validate the Conditions in the database
        List<Conditions> conditionsList = conditionsRepository.findAll();
        assertThat(conditionsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteConditions() throws Exception {
        // Initialize the database
        conditionsService.save(conditions);

        int databaseSizeBeforeDelete = conditionsRepository.findAll().size();

        // Get the conditions
        restConditionsMockMvc.perform(delete("/api/conditions/{id}", conditions.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Conditions> conditionsList = conditionsRepository.findAll();
        assertThat(conditionsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Conditions.class);
        Conditions conditions1 = new Conditions();
        conditions1.setId(1L);
        Conditions conditions2 = new Conditions();
        conditions2.setId(conditions1.getId());
        assertThat(conditions1).isEqualTo(conditions2);
        conditions2.setId(2L);
        assertThat(conditions1).isNotEqualTo(conditions2);
        conditions1.setId(null);
        assertThat(conditions1).isNotEqualTo(conditions2);
    }
}
