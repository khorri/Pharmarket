package ma.nawar.pharmarket.repository;

import ma.nawar.pharmarket.domain.GiftProduct;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the GiftProduct entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GiftProductRepository extends JpaRepository<GiftProduct, Long> {

}
