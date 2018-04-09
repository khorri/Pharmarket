package ma.nawar.pharmarket.repository;

import ma.nawar.pharmarket.domain.Gadget;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Gadget entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GadgetRepository extends JpaRepository<Gadget, Long> {

}
