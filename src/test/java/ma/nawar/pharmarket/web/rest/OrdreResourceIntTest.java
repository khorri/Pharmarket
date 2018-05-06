package ma.nawar.pharmarket.web.rest;

import ma.nawar.pharmarket.PharmarketApp;

import ma.nawar.pharmarket.domain.Ordre;
import ma.nawar.pharmarket.repository.OrdreRepository;
import ma.nawar.pharmarket.service.OrdreService;
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

import ma.nawar.pharmarket.domain.enumeration.OrderType;
/**
 * Test class for the OrdreResource REST controller.
 *
 * @see OrdreResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PharmarketApp.class)
public class OrdreResourceIntTest {

    private static final Long DEFAULT_TOTAL_PAID = 1L;
    private static final Long UPDATED_TOTAL_PAID = 2L;

    private static final Long DEFAULT_TOTAL_ORDRED = 1L;
    private static final Long UPDATED_TOTAL_ORDRED = 2L;

    private static final OrderType DEFAULT_TYPE = OrderType.DIRECT;
    private static final OrderType UPDATED_TYPE = OrderType.GROSSISTE;

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_PAYMENT_DUE_DATE = "AAAAAAAAAA";
    private static final String UPDATED_PAYMENT_DUE_DATE = "BBBBBBBBBB";

    private static final Double DEFAULT_TOTAL_DISCOUNT = 1D;
    private static final Double UPDATED_TOTAL_DISCOUNT = 2D;

    @Autowired
    private OrdreRepository ordreRepository;

    @Autowired
    private OrdreService ordreService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrdreMockMvc;

    private Ordre ordre;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ordre createEntity(EntityManager em) {
        Ordre ordre = new Ordre()
            .totalPaid(DEFAULT_TOTAL_PAID)
            .totalOrdred(DEFAULT_TOTAL_ORDRED)
            .type(DEFAULT_TYPE)
            .paymentDueDate(DEFAULT_PAYMENT_DUE_DATE)
            .totalDiscount(DEFAULT_TOTAL_DISCOUNT);
        return ordre;
    }

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrdreResource ordreResource = new OrdreResource(ordreService);
        this.restOrdreMockMvc = MockMvcBuilders.standaloneSetup(ordreResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        ordre = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrdre() throws Exception {
        int databaseSizeBeforeCreate = ordreRepository.findAll().size();

        // Create the Ordre
        restOrdreMockMvc.perform(post("/api/ordres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordre)))
            .andExpect(status().isCreated());

        // Validate the Ordre in the database
        List<Ordre> ordreList = ordreRepository.findAll();
        assertThat(ordreList).hasSize(databaseSizeBeforeCreate + 1);
        Ordre testOrdre = ordreList.get(ordreList.size() - 1);
        assertThat(testOrdre.getTotalPaid()).isEqualTo(DEFAULT_TOTAL_PAID);
        assertThat(testOrdre.getTotalOrdred()).isEqualTo(DEFAULT_TOTAL_ORDRED);
        assertThat(testOrdre.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testOrdre.getPaymentDueDate()).isEqualTo(DEFAULT_PAYMENT_DUE_DATE);
        assertThat(testOrdre.getTotalDiscount()).isEqualTo(DEFAULT_TOTAL_DISCOUNT);
    }

    @Test
    @Transactional
    public void createOrdreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ordreRepository.findAll().size();

        // Create the Ordre with an existing ID
        ordre.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrdreMockMvc.perform(post("/api/ordres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordre)))
            .andExpect(status().isBadRequest());

        // Validate the Ordre in the database
        List<Ordre> ordreList = ordreRepository.findAll();
        assertThat(ordreList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTotalPaidIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordreRepository.findAll().size();
        // set the field null
        ordre.setTotalPaid(null);

        // Create the Ordre, which fails.

        restOrdreMockMvc.perform(post("/api/ordres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordre)))
            .andExpect(status().isBadRequest());

        List<Ordre> ordreList = ordreRepository.findAll();
        assertThat(ordreList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTotalOrdredIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordreRepository.findAll().size();
        // set the field null
        ordre.setTotalOrdred(null);

        // Create the Ordre, which fails.

        restOrdreMockMvc.perform(post("/api/ordres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordre)))
            .andExpect(status().isBadRequest());

        List<Ordre> ordreList = ordreRepository.findAll();
        assertThat(ordreList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrdres() throws Exception {
        // Initialize the database
        ordreRepository.saveAndFlush(ordre);

        // Get all the ordreList
        restOrdreMockMvc.perform(get("/api/ordres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ordre.getId().intValue())))
            .andExpect(jsonPath("$.[*].totalPaid").value(hasItem(DEFAULT_TOTAL_PAID.intValue())))
            .andExpect(jsonPath("$.[*].totalOrdred").value(hasItem(DEFAULT_TOTAL_ORDRED.intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].paymentDueDate").value(hasItem(DEFAULT_PAYMENT_DUE_DATE.toString())))
            .andExpect(jsonPath("$.[*].totalDiscount").value(hasItem(DEFAULT_TOTAL_DISCOUNT.doubleValue())));
    }

    @Test
    @Transactional
    public void getOrdre() throws Exception {
        // Initialize the database
        ordreRepository.saveAndFlush(ordre);

        // Get the ordre
        restOrdreMockMvc.perform(get("/api/ordres/{id}", ordre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ordre.getId().intValue()))
            .andExpect(jsonPath("$.totalPaid").value(DEFAULT_TOTAL_PAID.intValue()))
            .andExpect(jsonPath("$.totalOrdred").value(DEFAULT_TOTAL_ORDRED.intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.paymentDueDate").value(DEFAULT_PAYMENT_DUE_DATE.toString()))
            .andExpect(jsonPath("$.totalDiscount").value(DEFAULT_TOTAL_DISCOUNT.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingOrdre() throws Exception {
        // Get the ordre
        restOrdreMockMvc.perform(get("/api/ordres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrdre() throws Exception {
        // Initialize the database
        ordreService.save(ordre);

        int databaseSizeBeforeUpdate = ordreRepository.findAll().size();

        // Update the ordre
        Ordre updatedOrdre = ordreRepository.findOne(ordre.getId());
        // Disconnect from session so that the updates on updatedOrdre are not directly saved in db
        em.detach(updatedOrdre);
        updatedOrdre
            .totalPaid(UPDATED_TOTAL_PAID)
            .totalOrdred(UPDATED_TOTAL_ORDRED)
            .type(UPDATED_TYPE)
            .paymentDueDate(UPDATED_PAYMENT_DUE_DATE)
            .totalDiscount(UPDATED_TOTAL_DISCOUNT);

        restOrdreMockMvc.perform(put("/api/ordres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrdre)))
            .andExpect(status().isOk());

        // Validate the Ordre in the database
        List<Ordre> ordreList = ordreRepository.findAll();
        assertThat(ordreList).hasSize(databaseSizeBeforeUpdate);
        Ordre testOrdre = ordreList.get(ordreList.size() - 1);
        assertThat(testOrdre.getTotalPaid()).isEqualTo(UPDATED_TOTAL_PAID);
        assertThat(testOrdre.getTotalOrdred()).isEqualTo(UPDATED_TOTAL_ORDRED);
        assertThat(testOrdre.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testOrdre.getPaymentDueDate()).isEqualTo(UPDATED_PAYMENT_DUE_DATE);
        assertThat(testOrdre.getTotalDiscount()).isEqualTo(UPDATED_TOTAL_DISCOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingOrdre() throws Exception {
        int databaseSizeBeforeUpdate = ordreRepository.findAll().size();

        // Create the Ordre

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrdreMockMvc.perform(put("/api/ordres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordre)))
            .andExpect(status().isCreated());

        // Validate the Ordre in the database
        List<Ordre> ordreList = ordreRepository.findAll();
        assertThat(ordreList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOrdre() throws Exception {
        // Initialize the database
        ordreService.save(ordre);

        int databaseSizeBeforeDelete = ordreRepository.findAll().size();

        // Get the ordre
        restOrdreMockMvc.perform(delete("/api/ordres/{id}", ordre.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ordre> ordreList = ordreRepository.findAll();
        assertThat(ordreList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ordre.class);
        Ordre ordre1 = new Ordre();
        ordre1.setId(1L);
        Ordre ordre2 = new Ordre();
        ordre2.setId(ordre1.getId());
        assertThat(ordre1).isEqualTo(ordre2);
        ordre2.setId(2L);
        assertThat(ordre1).isNotEqualTo(ordre2);
        ordre1.setId(null);
        assertThat(ordre1).isNotEqualTo(ordre2);
    }
}
