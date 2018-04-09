package ma.nawar.pharmarket.web.rest;

import ma.nawar.pharmarket.PharmarketApp;

import ma.nawar.pharmarket.domain.GiftMatPromo;
import ma.nawar.pharmarket.repository.GiftMatPromoRepository;
import ma.nawar.pharmarket.service.GiftMatPromoService;
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
 * Test class for the GiftMatPromoResource REST controller.
 *
 * @see GiftMatPromoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PharmarketApp.class)
public class GiftMatPromoResourceIntTest {

    private static final Long DEFAULT_QUANTITY = 1L;
    private static final Long UPDATED_QUANTITY = 2L;

    @Autowired
    private GiftMatPromoRepository giftMatPromoRepository;

    @Autowired
    private GiftMatPromoService giftMatPromoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGiftMatPromoMockMvc;

    private GiftMatPromo giftMatPromo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GiftMatPromoResource giftMatPromoResource = new GiftMatPromoResource(giftMatPromoService);
        this.restGiftMatPromoMockMvc = MockMvcBuilders.standaloneSetup(giftMatPromoResource)
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
    public static GiftMatPromo createEntity(EntityManager em) {
        GiftMatPromo giftMatPromo = new GiftMatPromo()
            .quantity(DEFAULT_QUANTITY);
        return giftMatPromo;
    }

    @Before
    public void initTest() {
        giftMatPromo = createEntity(em);
    }

    @Test
    @Transactional
    public void createGiftMatPromo() throws Exception {
        int databaseSizeBeforeCreate = giftMatPromoRepository.findAll().size();

        // Create the GiftMatPromo
        restGiftMatPromoMockMvc.perform(post("/api/gift-mat-promos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(giftMatPromo)))
            .andExpect(status().isCreated());

        // Validate the GiftMatPromo in the database
        List<GiftMatPromo> giftMatPromoList = giftMatPromoRepository.findAll();
        assertThat(giftMatPromoList).hasSize(databaseSizeBeforeCreate + 1);
        GiftMatPromo testGiftMatPromo = giftMatPromoList.get(giftMatPromoList.size() - 1);
        assertThat(testGiftMatPromo.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void createGiftMatPromoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = giftMatPromoRepository.findAll().size();

        // Create the GiftMatPromo with an existing ID
        giftMatPromo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGiftMatPromoMockMvc.perform(post("/api/gift-mat-promos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(giftMatPromo)))
            .andExpect(status().isBadRequest());

        // Validate the GiftMatPromo in the database
        List<GiftMatPromo> giftMatPromoList = giftMatPromoRepository.findAll();
        assertThat(giftMatPromoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGiftMatPromos() throws Exception {
        // Initialize the database
        giftMatPromoRepository.saveAndFlush(giftMatPromo);

        // Get all the giftMatPromoList
        restGiftMatPromoMockMvc.perform(get("/api/gift-mat-promos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(giftMatPromo.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())));
    }

    @Test
    @Transactional
    public void getGiftMatPromo() throws Exception {
        // Initialize the database
        giftMatPromoRepository.saveAndFlush(giftMatPromo);

        // Get the giftMatPromo
        restGiftMatPromoMockMvc.perform(get("/api/gift-mat-promos/{id}", giftMatPromo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(giftMatPromo.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingGiftMatPromo() throws Exception {
        // Get the giftMatPromo
        restGiftMatPromoMockMvc.perform(get("/api/gift-mat-promos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGiftMatPromo() throws Exception {
        // Initialize the database
        giftMatPromoService.save(giftMatPromo);

        int databaseSizeBeforeUpdate = giftMatPromoRepository.findAll().size();

        // Update the giftMatPromo
        GiftMatPromo updatedGiftMatPromo = giftMatPromoRepository.findOne(giftMatPromo.getId());
        // Disconnect from session so that the updates on updatedGiftMatPromo are not directly saved in db
        em.detach(updatedGiftMatPromo);
        updatedGiftMatPromo
            .quantity(UPDATED_QUANTITY);

        restGiftMatPromoMockMvc.perform(put("/api/gift-mat-promos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGiftMatPromo)))
            .andExpect(status().isOk());

        // Validate the GiftMatPromo in the database
        List<GiftMatPromo> giftMatPromoList = giftMatPromoRepository.findAll();
        assertThat(giftMatPromoList).hasSize(databaseSizeBeforeUpdate);
        GiftMatPromo testGiftMatPromo = giftMatPromoList.get(giftMatPromoList.size() - 1);
        assertThat(testGiftMatPromo.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    public void updateNonExistingGiftMatPromo() throws Exception {
        int databaseSizeBeforeUpdate = giftMatPromoRepository.findAll().size();

        // Create the GiftMatPromo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGiftMatPromoMockMvc.perform(put("/api/gift-mat-promos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(giftMatPromo)))
            .andExpect(status().isCreated());

        // Validate the GiftMatPromo in the database
        List<GiftMatPromo> giftMatPromoList = giftMatPromoRepository.findAll();
        assertThat(giftMatPromoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGiftMatPromo() throws Exception {
        // Initialize the database
        giftMatPromoService.save(giftMatPromo);

        int databaseSizeBeforeDelete = giftMatPromoRepository.findAll().size();

        // Get the giftMatPromo
        restGiftMatPromoMockMvc.perform(delete("/api/gift-mat-promos/{id}", giftMatPromo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GiftMatPromo> giftMatPromoList = giftMatPromoRepository.findAll();
        assertThat(giftMatPromoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GiftMatPromo.class);
        GiftMatPromo giftMatPromo1 = new GiftMatPromo();
        giftMatPromo1.setId(1L);
        GiftMatPromo giftMatPromo2 = new GiftMatPromo();
        giftMatPromo2.setId(giftMatPromo1.getId());
        assertThat(giftMatPromo1).isEqualTo(giftMatPromo2);
        giftMatPromo2.setId(2L);
        assertThat(giftMatPromo1).isNotEqualTo(giftMatPromo2);
        giftMatPromo1.setId(null);
        assertThat(giftMatPromo1).isNotEqualTo(giftMatPromo2);
    }
}
