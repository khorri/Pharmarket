package ma.nawar.pharmarket.repository;

import ma.nawar.pharmarket.domain.GiftMatPromo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the GiftMatPromo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GiftMatPromoRepository extends JpaRepository<GiftMatPromo, Long> {

}
