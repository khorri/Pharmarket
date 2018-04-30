package ma.nawar.pharmarket.repository;

import ma.nawar.pharmarket.domain.OrderHistory;
import ma.nawar.pharmarket.domain.Ordre;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.Set;


/**
 * Spring Data JPA repository for the OrderHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Long> {

    Set<OrderHistory> findByOrdre(Ordre ordre);
}
