package ma.nawar.pharmarket.service;

import ma.nawar.pharmarket.domain.OrderDetails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing OrderDetails.
 */
public interface OrderDetailsService {

    /**
     * Save a orderDetails.
     *
     * @param orderDetails the entity to save
     * @return the persisted entity
     */
    OrderDetails save(OrderDetails orderDetails);

    /**
     * Get all the orderDetails.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<OrderDetails> findAll(Pageable pageable);

    /**
     * Get the "id" orderDetails.
     *
     * @param id the id of the entity
     * @return the entity
     */
    OrderDetails findOne(Long id);

    /**
     * Delete the "id" orderDetails.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
