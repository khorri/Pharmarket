package ma.nawar.pharmarket.service;

import ma.nawar.pharmarket.domain.OrderHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing OrderHistory.
 */
public interface OrderHistoryService {

    /**
     * Save a orderHistory.
     *
     * @param orderHistory the entity to save
     * @return the persisted entity
     */
    OrderHistory save(OrderHistory orderHistory);

    /**
     * Get all the orderHistories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<OrderHistory> findAll(Pageable pageable);

    /**
     * Get the "id" orderHistory.
     *
     * @param id the id of the entity
     * @return the entity
     */
    OrderHistory findOne(Long id);

    /**
     * Delete the "id" orderHistory.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
