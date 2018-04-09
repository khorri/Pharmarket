package ma.nawar.pharmarket.repository;

import ma.nawar.pharmarket.domain.Rule;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Rule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RuleRepository extends JpaRepository<Rule, Long> {

}
