package ma.nawar.pharmarket.repository;

import ma.nawar.pharmarket.domain.OrderHistory;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OrderHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Long> {

}
