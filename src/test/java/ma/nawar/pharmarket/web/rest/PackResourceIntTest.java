package ma.nawar.pharmarket.web.rest;

import ma.nawar.pharmarket.PharmarketApp;

import ma.nawar.pharmarket.domain.Pack;
import ma.nawar.pharmarket.repository.PackRepository;
import ma.nawar.pharmarket.service.PackService;
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
 * Test class for the PackResource REST controller.
 *
 * @see PackResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PharmarketApp.class)
public class PackResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private PackRepository packRepository;

    @Autowired
    private PackService packService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPackMockMvc;

    private Pack pack;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PackResource packResource = new PackResource(packService);
        this.restPackMockMvc = MockMvcBuilders.standaloneSetup(packResource)
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
    public static Pack createEntity(EntityManager em) {
        Pack pack = new Pack()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return pack;
    }

    @Before
    public void initTest() {
        pack = createEntity(em);
    }

    @Test
    @Transactional
    public void createPack() throws Exception {
        int databaseSizeBeforeCreate = packRepository.findAll().size();

        // Create the Pack
        restPackMockMvc.perform(post("/api/packs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pack)))
            .andExpect(status().isCreated());

        // Validate the Pack in the database
        List<Pack> packList = packRepository.findAll();
        assertThat(packList).hasSize(databaseSizeBeforeCreate + 1);
        Pack testPack = packList.get(packList.size() - 1);
        assertThat(testPack.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPack.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createPackWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = packRepository.findAll().size();

        // Create the Pack with an existing ID
        pack.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPackMockMvc.perform(post("/api/packs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pack)))
            .andExpect(status().isBadRequest());

        // Validate the Pack in the database
        List<Pack> packList = packRepository.findAll();
        assertThat(packList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = packRepository.findAll().size();
        // set the field null
        pack.setName(null);

        // Create the Pack, which fails.

        restPackMockMvc.perform(post("/api/packs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pack)))
            .andExpect(status().isBadRequest());

        List<Pack> packList = packRepository.findAll();
        assertThat(packList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPacks() throws Exception {
        // Initialize the database
        packRepository.saveAndFlush(pack);

        // Get all the packList
        restPackMockMvc.perform(get("/api/packs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pack.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getPack() throws Exception {
        // Initialize the database
        packRepository.saveAndFlush(pack);

        // Get the pack
        restPackMockMvc.perform(get("/api/packs/{id}", pack.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pack.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPack() throws Exception {
        // Get the pack
        restPackMockMvc.perform(get("/api/packs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePack() throws Exception {
        // Initialize the database
        packService.save(pack);

        int databaseSizeBeforeUpdate = packRepository.findAll().size();

        // Update the pack
        Pack updatedPack = packRepository.findOne(pack.getId());
        // Disconnect from session so that the updates on updatedPack are not directly saved in db
        em.detach(updatedPack);
        updatedPack
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restPackMockMvc.perform(put("/api/packs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPack)))
            .andExpect(status().isOk());

        // Validate the Pack in the database
        List<Pack> packList = packRepository.findAll();
        assertThat(packList).hasSize(databaseSizeBeforeUpdate);
        Pack testPack = packList.get(packList.size() - 1);
        assertThat(testPack.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPack.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingPack() throws Exception {
        int databaseSizeBeforeUpdate = packRepository.findAll().size();

        // Create the Pack

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPackMockMvc.perform(put("/api/packs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pack)))
            .andExpect(status().isCreated());

        // Validate the Pack in the database
        List<Pack> packList = packRepository.findAll();
        assertThat(packList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePack() throws Exception {
        // Initialize the database
        packService.save(pack);

        int databaseSizeBeforeDelete = packRepository.findAll().size();

        // Get the pack
        restPackMockMvc.perform(delete("/api/packs/{id}", pack.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Pack> packList = packRepository.findAll();
        assertThat(packList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pack.class);
        Pack pack1 = new Pack();
        pack1.setId(1L);
        Pack pack2 = new Pack();
        pack2.setId(pack1.getId());
        assertThat(pack1).isEqualTo(pack2);
        pack2.setId(2L);
        assertThat(pack1).isNotEqualTo(pack2);
        pack1.setId(null);
        assertThat(pack1).isNotEqualTo(pack2);
    }
}
