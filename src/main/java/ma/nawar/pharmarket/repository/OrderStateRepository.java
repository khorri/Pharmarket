package ma.nawar.pharmarket.repository;

import ma.nawar.pharmarket.domain.OrderState;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OrderState entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderStateRepository extends JpaRepository<OrderState, Long> {

}
