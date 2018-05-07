package ma.nawar.pharmarket.repository;

import ma.nawar.pharmarket.domain.OrderDetails;
import ma.nawar.pharmarket.domain.Ordre;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;


/**
 * Spring Data JPA repository for the OrderDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {

    Set<OrderDetails> findByOrdre(Ordre ordre);

    void deleteByOrdre(Ordre ordre);
}
