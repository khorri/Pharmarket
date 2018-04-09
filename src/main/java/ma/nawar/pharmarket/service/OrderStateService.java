package ma.nawar.pharmarket.service;

import ma.nawar.pharmarket.domain.OrderState;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing OrderState.
 */
public interface OrderStateService {

    /**
     * Save a orderState.
     *
     * @param orderState the entity to save
     * @return the persisted entity
     */
    OrderState save(OrderState orderState);

    /**
     * Get all the orderStates.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<OrderState> findAll(Pageable pageable);

    /**
     * Get the "id" orderState.
     *
     * @param id the id of the entity
     * @return the entity
     */
    OrderState findOne(Long id);

    /**
     * Delete the "id" orderState.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
