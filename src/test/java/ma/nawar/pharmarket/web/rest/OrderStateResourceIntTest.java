package ma.nawar.pharmarket.web.rest;

import ma.nawar.pharmarket.PharmarketApp;

import ma.nawar.pharmarket.domain.OrderState;
import ma.nawar.pharmarket.repository.OrderStateRepository;
import ma.nawar.pharmarket.service.OrderStateService;
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
 * Test class for the OrderStateResource REST controller.
 *
 * @see OrderStateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PharmarketApp.class)
public class OrderStateResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_COLOR = "BBBBBBBBBB";

    private static final Integer DEFAULT_PRIORITY = 1;
    private static final Integer UPDATED_PRIORITY = 2;

    @Autowired
    private OrderStateRepository orderStateRepository;

    @Autowired
    private OrderStateService orderStateService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrderStateMockMvc;

    private OrderState orderState;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderStateResource orderStateResource = new OrderStateResource(orderStateService);
        this.restOrderStateMockMvc = MockMvcBuilders.standaloneSetup(orderStateResource)
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
    public static OrderState createEntity(EntityManager em) {
        OrderState orderState = new OrderState()
            .name(DEFAULT_NAME)
            .color(DEFAULT_COLOR)
            .priority(DEFAULT_PRIORITY);
        return orderState;
    }

    @Before
    public void initTest() {
        orderState = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrderState() throws Exception {
        int databaseSizeBeforeCreate = orderStateRepository.findAll().size();

        // Create the OrderState
        restOrderStateMockMvc.perform(post("/api/order-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderState)))
            .andExpect(status().isCreated());

        // Validate the OrderState in the database
        List<OrderState> orderStateList = orderStateRepository.findAll();
        assertThat(orderStateList).hasSize(databaseSizeBeforeCreate + 1);
        OrderState testOrderState = orderStateList.get(orderStateList.size() - 1);
        assertThat(testOrderState.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOrderState.getColor()).isEqualTo(DEFAULT_COLOR);
        assertThat(testOrderState.getPriority()).isEqualTo(DEFAULT_PRIORITY);
    }

    @Test
    @Transactional
    public void createOrderStateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderStateRepository.findAll().size();

        // Create the OrderState with an existing ID
        orderState.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderStateMockMvc.perform(post("/api/order-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderState)))
            .andExpect(status().isBadRequest());

        // Validate the OrderState in the database
        List<OrderState> orderStateList = orderStateRepository.findAll();
        assertThat(orderStateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderStateRepository.findAll().size();
        // set the field null
        orderState.setName(null);

        // Create the OrderState, which fails.

        restOrderStateMockMvc.perform(post("/api/order-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderState)))
            .andExpect(status().isBadRequest());

        List<OrderState> orderStateList = orderStateRepository.findAll();
        assertThat(orderStateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriorityIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderStateRepository.findAll().size();
        // set the field null
        orderState.setPriority(null);

        // Create the OrderState, which fails.

        restOrderStateMockMvc.perform(post("/api/order-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderState)))
            .andExpect(status().isBadRequest());

        List<OrderState> orderStateList = orderStateRepository.findAll();
        assertThat(orderStateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrderStates() throws Exception {
        // Initialize the database
        orderStateRepository.saveAndFlush(orderState);

        // Get all the orderStateList
        restOrderStateMockMvc.perform(get("/api/order-states?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderState.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].color").value(hasItem(DEFAULT_COLOR.toString())))
            .andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY)));
    }

    @Test
    @Transactional
    public void getOrderState() throws Exception {
        // Initialize the database
        orderStateRepository.saveAndFlush(orderState);

        // Get the orderState
        restOrderStateMockMvc.perform(get("/api/order-states/{id}", orderState.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderState.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.color").value(DEFAULT_COLOR.toString()))
            .andExpect(jsonPath("$.priority").value(DEFAULT_PRIORITY));
    }

    @Test
    @Transactional
    public void getNonExistingOrderState() throws Exception {
        // Get the orderState
        restOrderStateMockMvc.perform(get("/api/order-states/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrderState() throws Exception {
        // Initialize the database
        orderStateService.save(orderState);

        int databaseSizeBeforeUpdate = orderStateRepository.findAll().size();

        // Update the orderState
        OrderState updatedOrderState = orderStateRepository.findOne(orderState.getId());
        // Disconnect from session so that the updates on updatedOrderState are not directly saved in db
        em.detach(updatedOrderState);
        updatedOrderState
            .name(UPDATED_NAME)
            .color(UPDATED_COLOR)
            .priority(UPDATED_PRIORITY);

        restOrderStateMockMvc.perform(put("/api/order-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrderState)))
            .andExpect(status().isOk());

        // Validate the OrderState in the database
        List<OrderState> orderStateList = orderStateRepository.findAll();
        assertThat(orderStateList).hasSize(databaseSizeBeforeUpdate);
        OrderState testOrderState = orderStateList.get(orderStateList.size() - 1);
        assertThat(testOrderState.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOrderState.getColor()).isEqualTo(UPDATED_COLOR);
        assertThat(testOrderState.getPriority()).isEqualTo(UPDATED_PRIORITY);
    }

    @Test
    @Transactional
    public void updateNonExistingOrderState() throws Exception {
        int databaseSizeBeforeUpdate = orderStateRepository.findAll().size();

        // Create the OrderState

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderStateMockMvc.perform(put("/api/order-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderState)))
            .andExpect(status().isCreated());

        // Validate the OrderState in the database
        List<OrderState> orderStateList = orderStateRepository.findAll();
        assertThat(orderStateList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOrderState() throws Exception {
        // Initialize the database
        orderStateService.save(orderState);

        int databaseSizeBeforeDelete = orderStateRepository.findAll().size();

        // Get the orderState
        restOrderStateMockMvc.perform(delete("/api/order-states/{id}", orderState.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrderState> orderStateList = orderStateRepository.findAll();
        assertThat(orderStateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderState.class);
        OrderState orderState1 = new OrderState();
        orderState1.setId(1L);
        OrderState orderState2 = new OrderState();
        orderState2.setId(orderState1.getId());
        assertThat(orderState1).isEqualTo(orderState2);
        orderState2.setId(2L);
        assertThat(orderState1).isNotEqualTo(orderState2);
        orderState1.setId(null);
        assertThat(orderState1).isNotEqualTo(orderState2);
    }
}
