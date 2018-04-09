package ma.nawar.pharmarket.repository;

import ma.nawar.pharmarket.domain.ShippingMode;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ShippingMode entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShippingModeRepository extends JpaRepository<ShippingMode, Long> {

}
