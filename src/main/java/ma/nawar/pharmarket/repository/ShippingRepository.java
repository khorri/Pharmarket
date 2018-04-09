package ma.nawar.pharmarket.repository;

import ma.nawar.pharmarket.domain.Shipping;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Shipping entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShippingRepository extends JpaRepository<Shipping, Long> {

}
