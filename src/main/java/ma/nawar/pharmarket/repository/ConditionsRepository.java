package ma.nawar.pharmarket.repository;

import ma.nawar.pharmarket.domain.Conditions;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Conditions entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConditionsRepository extends JpaRepository<Conditions, Long> {

}
