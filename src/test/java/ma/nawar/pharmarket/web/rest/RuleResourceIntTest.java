package ma.nawar.pharmarket.web.rest;

import ma.nawar.pharmarket.PharmarketApp;

import ma.nawar.pharmarket.domain.Rule;
import ma.nawar.pharmarket.repository.RuleRepository;
import ma.nawar.pharmarket.service.RuleService;
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
 * Test class for the RuleResource REST controller.
 *
 * @see RuleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PharmarketApp.class)
public class RuleResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_ACTIVE = false;
    private static final Boolean UPDATED_IS_ACTIVE = true;

    private static final Integer DEFAULT_PRIORITY = 1;
    private static final Integer UPDATED_PRIORITY = 2;

    private static final Integer DEFAULT_QUANTITY_MIN = 1;
    private static final Integer UPDATED_QUANTITY_MIN = 2;

    private static final Double DEFAULT_AMOUNT_MIN = 1D;
    private static final Double UPDATED_AMOUNT_MIN = 2D;

    private static final Double DEFAULT_REDUCTION = 1D;
    private static final Double UPDATED_REDUCTION = 2D;

    private static final Integer DEFAULT_GIFT_QUANTITY = 1;
    private static final Integer UPDATED_GIFT_QUANTITY = 2;

    private static final Integer DEFAULT_GADGET_QUANTITY = 1;
    private static final Integer UPDATED_GADGET_QUANTITY = 2;

    private static final Boolean DEFAULT_IS_FOR_PACK = false;
    private static final Boolean UPDATED_IS_FOR_PACK = true;

    private static final Boolean DEFAULT_IS_FOR_PRODUCT = false;
    private static final Boolean UPDATED_IS_FOR_PRODUCT = true;

    @Autowired
    private RuleRepository ruleRepository;

    @Autowired
    private RuleService ruleService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRuleMockMvc;

    private Rule rule;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RuleResource ruleResource = new RuleResource(ruleService);
        this.restRuleMockMvc = MockMvcBuilders.standaloneSetup(ruleResource)
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
    public static Rule createEntity(EntityManager em) {
        Rule rule = new Rule()
            .name(DEFAULT_NAME)
            .isActive(DEFAULT_IS_ACTIVE)
            .priority(DEFAULT_PRIORITY)
            .quantityMin(DEFAULT_QUANTITY_MIN)
            .amountMin(DEFAULT_AMOUNT_MIN)
            .reduction(DEFAULT_REDUCTION)
            .giftQuantity(DEFAULT_GIFT_QUANTITY)
            .gadgetQuantity(DEFAULT_GADGET_QUANTITY)
            .isForPack(DEFAULT_IS_FOR_PACK)
            .isForProduct(DEFAULT_IS_FOR_PRODUCT);
        return rule;
    }

    @Before
    public void initTest() {
        rule = createEntity(em);
    }

    @Test
    @Transactional
    public void createRule() throws Exception {
        int databaseSizeBeforeCreate = ruleRepository.findAll().size();

        // Create the Rule
        restRuleMockMvc.perform(post("/api/rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rule)))
            .andExpect(status().isCreated());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeCreate + 1);
        Rule testRule = ruleList.get(ruleList.size() - 1);
        assertThat(testRule.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRule.isIsActive()).isEqualTo(DEFAULT_IS_ACTIVE);
        assertThat(testRule.getPriority()).isEqualTo(DEFAULT_PRIORITY);
        assertThat(testRule.getQuantityMin()).isEqualTo(DEFAULT_QUANTITY_MIN);
        assertThat(testRule.getAmountMin()).isEqualTo(DEFAULT_AMOUNT_MIN);
        assertThat(testRule.getReduction()).isEqualTo(DEFAULT_REDUCTION);
        assertThat(testRule.getGiftQuantity()).isEqualTo(DEFAULT_GIFT_QUANTITY);
        assertThat(testRule.getGadgetQuantity()).isEqualTo(DEFAULT_GADGET_QUANTITY);
        assertThat(testRule.isIsForPack()).isEqualTo(DEFAULT_IS_FOR_PACK);
        assertThat(testRule.isIsForProduct()).isEqualTo(DEFAULT_IS_FOR_PRODUCT);
    }

    @Test
    @Transactional
    public void createRuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ruleRepository.findAll().size();

        // Create the Rule with an existing ID
        rule.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRuleMockMvc.perform(post("/api/rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rule)))
            .andExpect(status().isBadRequest());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = ruleRepository.findAll().size();
        // set the field null
        rule.setName(null);

        // Create the Rule, which fails.

        restRuleMockMvc.perform(post("/api/rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rule)))
            .andExpect(status().isBadRequest());

        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRules() throws Exception {
        // Initialize the database
        ruleRepository.saveAndFlush(rule);

        // Get all the ruleList
        restRuleMockMvc.perform(get("/api/rules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rule.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].isActive").value(hasItem(DEFAULT_IS_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY)))
            .andExpect(jsonPath("$.[*].quantityMin").value(hasItem(DEFAULT_QUANTITY_MIN)))
            .andExpect(jsonPath("$.[*].amountMin").value(hasItem(DEFAULT_AMOUNT_MIN.doubleValue())))
            .andExpect(jsonPath("$.[*].reduction").value(hasItem(DEFAULT_REDUCTION.doubleValue())))
            .andExpect(jsonPath("$.[*].giftQuantity").value(hasItem(DEFAULT_GIFT_QUANTITY)))
            .andExpect(jsonPath("$.[*].gadgetQuantity").value(hasItem(DEFAULT_GADGET_QUANTITY)))
            .andExpect(jsonPath("$.[*].isForPack").value(hasItem(DEFAULT_IS_FOR_PACK.booleanValue())))
            .andExpect(jsonPath("$.[*].isForProduct").value(hasItem(DEFAULT_IS_FOR_PRODUCT.booleanValue())));
    }

    @Test
    @Transactional
    public void getRule() throws Exception {
        // Initialize the database
        ruleRepository.saveAndFlush(rule);

        // Get the rule
        restRuleMockMvc.perform(get("/api/rules/{id}", rule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rule.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.isActive").value(DEFAULT_IS_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.priority").value(DEFAULT_PRIORITY))
            .andExpect(jsonPath("$.quantityMin").value(DEFAULT_QUANTITY_MIN))
            .andExpect(jsonPath("$.amountMin").value(DEFAULT_AMOUNT_MIN.doubleValue()))
            .andExpect(jsonPath("$.reduction").value(DEFAULT_REDUCTION.doubleValue()))
            .andExpect(jsonPath("$.giftQuantity").value(DEFAULT_GIFT_QUANTITY))
            .andExpect(jsonPath("$.gadgetQuantity").value(DEFAULT_GADGET_QUANTITY))
            .andExpect(jsonPath("$.isForPack").value(DEFAULT_IS_FOR_PACK.booleanValue()))
            .andExpect(jsonPath("$.isForProduct").value(DEFAULT_IS_FOR_PRODUCT.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRule() throws Exception {
        // Get the rule
        restRuleMockMvc.perform(get("/api/rules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRule() throws Exception {
        // Initialize the database
        ruleService.save(rule);

        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();

        // Update the rule
        Rule updatedRule = ruleRepository.findOne(rule.getId());
        // Disconnect from session so that the updates on updatedRule are not directly saved in db
        em.detach(updatedRule);
        updatedRule
            .name(UPDATED_NAME)
            .isActive(UPDATED_IS_ACTIVE)
            .priority(UPDATED_PRIORITY)
            .quantityMin(UPDATED_QUANTITY_MIN)
            .amountMin(UPDATED_AMOUNT_MIN)
            .reduction(UPDATED_REDUCTION)
            .giftQuantity(UPDATED_GIFT_QUANTITY)
            .gadgetQuantity(UPDATED_GADGET_QUANTITY)
            .isForPack(UPDATED_IS_FOR_PACK)
            .isForProduct(UPDATED_IS_FOR_PRODUCT);

        restRuleMockMvc.perform(put("/api/rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRule)))
            .andExpect(status().isOk());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
        Rule testRule = ruleList.get(ruleList.size() - 1);
        assertThat(testRule.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRule.isIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
        assertThat(testRule.getPriority()).isEqualTo(UPDATED_PRIORITY);
        assertThat(testRule.getQuantityMin()).isEqualTo(UPDATED_QUANTITY_MIN);
        assertThat(testRule.getAmountMin()).isEqualTo(UPDATED_AMOUNT_MIN);
        assertThat(testRule.getReduction()).isEqualTo(UPDATED_REDUCTION);
        assertThat(testRule.getGiftQuantity()).isEqualTo(UPDATED_GIFT_QUANTITY);
        assertThat(testRule.getGadgetQuantity()).isEqualTo(UPDATED_GADGET_QUANTITY);
        assertThat(testRule.isIsForPack()).isEqualTo(UPDATED_IS_FOR_PACK);
        assertThat(testRule.isIsForProduct()).isEqualTo(UPDATED_IS_FOR_PRODUCT);
    }

    @Test
    @Transactional
    public void updateNonExistingRule() throws Exception {
        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();

        // Create the Rule

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRuleMockMvc.perform(put("/api/rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rule)))
            .andExpect(status().isCreated());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRule() throws Exception {
        // Initialize the database
        ruleService.save(rule);

        int databaseSizeBeforeDelete = ruleRepository.findAll().size();

        // Get the rule
        restRuleMockMvc.perform(delete("/api/rules/{id}", rule.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rule.class);
        Rule rule1 = new Rule();
        rule1.setId(1L);
        Rule rule2 = new Rule();
        rule2.setId(rule1.getId());
        assertThat(rule1).isEqualTo(rule2);
        rule2.setId(2L);
        assertThat(rule1).isNotEqualTo(rule2);
        rule1.setId(null);
        assertThat(rule1).isNotEqualTo(rule2);
    }
}
