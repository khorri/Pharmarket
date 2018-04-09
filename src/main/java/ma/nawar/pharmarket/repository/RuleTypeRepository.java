package ma.nawar.pharmarket.repository;

import ma.nawar.pharmarket.domain.RuleType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RuleType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RuleTypeRepository extends JpaRepository<RuleType, Long> {

}
