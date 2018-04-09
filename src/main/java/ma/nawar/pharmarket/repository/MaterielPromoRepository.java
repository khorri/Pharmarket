package ma.nawar.pharmarket.repository;

import ma.nawar.pharmarket.domain.MaterielPromo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MaterielPromo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaterielPromoRepository extends JpaRepository<MaterielPromo, Long> {

}
