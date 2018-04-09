package ma.nawar.pharmarket.web.rest;

import ma.nawar.pharmarket.PharmarketApp;

import ma.nawar.pharmarket.domain.MaterielPromo;
import ma.nawar.pharmarket.repository.MaterielPromoRepository;
import ma.nawar.pharmarket.service.MaterielPromoService;
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
 * Test class for the MaterielPromoResource REST controller.
 *
 * @see MaterielPromoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PharmarketApp.class)
public class MaterielPromoResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private MaterielPromoRepository materielPromoRepository;

    @Autowired
    private MaterielPromoService materielPromoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMaterielPromoMockMvc;

    private MaterielPromo materielPromo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MaterielPromoResource materielPromoResource = new MaterielPromoResource(materielPromoService);
        this.restMaterielPromoMockMvc = MockMvcBuilders.standaloneSetup(materielPromoResource)
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
    public static MaterielPromo createEntity(EntityManager em) {
        MaterielPromo materielPromo = new MaterielPromo()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return materielPromo;
    }

    @Before
    public void initTest() {
        materielPromo = createEntity(em);
    }

    @Test
    @Transactional
    public void createMaterielPromo() throws Exception {
        int databaseSizeBeforeCreate = materielPromoRepository.findAll().size();

        // Create the MaterielPromo
        restMaterielPromoMockMvc.perform(post("/api/materiel-promos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materielPromo)))
            .andExpect(status().isCreated());

        // Validate the MaterielPromo in the database
        List<MaterielPromo> materielPromoList = materielPromoRepository.findAll();
        assertThat(materielPromoList).hasSize(databaseSizeBeforeCreate + 1);
        MaterielPromo testMaterielPromo = materielPromoList.get(materielPromoList.size() - 1);
        assertThat(testMaterielPromo.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testMaterielPromo.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createMaterielPromoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = materielPromoRepository.findAll().size();

        // Create the MaterielPromo with an existing ID
        materielPromo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMaterielPromoMockMvc.perform(post("/api/materiel-promos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materielPromo)))
            .andExpect(status().isBadRequest());

        // Validate the MaterielPromo in the database
        List<MaterielPromo> materielPromoList = materielPromoRepository.findAll();
        assertThat(materielPromoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = materielPromoRepository.findAll().size();
        // set the field null
        materielPromo.setName(null);

        // Create the MaterielPromo, which fails.

        restMaterielPromoMockMvc.perform(post("/api/materiel-promos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materielPromo)))
            .andExpect(status().isBadRequest());

        List<MaterielPromo> materielPromoList = materielPromoRepository.findAll();
        assertThat(materielPromoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMaterielPromos() throws Exception {
        // Initialize the database
        materielPromoRepository.saveAndFlush(materielPromo);

        // Get all the materielPromoList
        restMaterielPromoMockMvc.perform(get("/api/materiel-promos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(materielPromo.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getMaterielPromo() throws Exception {
        // Initialize the database
        materielPromoRepository.saveAndFlush(materielPromo);

        // Get the materielPromo
        restMaterielPromoMockMvc.perform(get("/api/materiel-promos/{id}", materielPromo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(materielPromo.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMaterielPromo() throws Exception {
        // Get the materielPromo
        restMaterielPromoMockMvc.perform(get("/api/materiel-promos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMaterielPromo() throws Exception {
        // Initialize the database
        materielPromoService.save(materielPromo);

        int databaseSizeBeforeUpdate = materielPromoRepository.findAll().size();

        // Update the materielPromo
        MaterielPromo updatedMaterielPromo = materielPromoRepository.findOne(materielPromo.getId());
        // Disconnect from session so that the updates on updatedMaterielPromo are not directly saved in db
        em.detach(updatedMaterielPromo);
        updatedMaterielPromo
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restMaterielPromoMockMvc.perform(put("/api/materiel-promos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMaterielPromo)))
            .andExpect(status().isOk());

        // Validate the MaterielPromo in the database
        List<MaterielPromo> materielPromoList = materielPromoRepository.findAll();
        assertThat(materielPromoList).hasSize(databaseSizeBeforeUpdate);
        MaterielPromo testMaterielPromo = materielPromoList.get(materielPromoList.size() - 1);
        assertThat(testMaterielPromo.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testMaterielPromo.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingMaterielPromo() throws Exception {
        int databaseSizeBeforeUpdate = materielPromoRepository.findAll().size();

        // Create the MaterielPromo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMaterielPromoMockMvc.perform(put("/api/materiel-promos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materielPromo)))
            .andExpect(status().isCreated());

        // Validate the MaterielPromo in the database
        List<MaterielPromo> materielPromoList = materielPromoRepository.findAll();
        assertThat(materielPromoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMaterielPromo() throws Exception {
        // Initialize the database
        materielPromoService.save(materielPromo);

        int databaseSizeBeforeDelete = materielPromoRepository.findAll().size();

        // Get the materielPromo
        restMaterielPromoMockMvc.perform(delete("/api/materiel-promos/{id}", materielPromo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MaterielPromo> materielPromoList = materielPromoRepository.findAll();
        assertThat(materielPromoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MaterielPromo.class);
        MaterielPromo materielPromo1 = new MaterielPromo();
        materielPromo1.setId(1L);
        MaterielPromo materielPromo2 = new MaterielPromo();
        materielPromo2.setId(materielPromo1.getId());
        assertThat(materielPromo1).isEqualTo(materielPromo2);
        materielPromo2.setId(2L);
        assertThat(materielPromo1).isNotEqualTo(materielPromo2);
        materielPromo1.setId(null);
        assertThat(materielPromo1).isNotEqualTo(materielPromo2);
    }
}
