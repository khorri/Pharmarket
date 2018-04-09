package ma.nawar.pharmarket.repository;

import ma.nawar.pharmarket.domain.Ordre;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Ordre entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrdreRepository extends JpaRepository<Ordre, Long> {

}
