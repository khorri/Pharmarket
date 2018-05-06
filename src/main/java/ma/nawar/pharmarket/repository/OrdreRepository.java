package ma.nawar.pharmarket.repository;

import ma.nawar.pharmarket.domain.Ordre;
import ma.nawar.pharmarket.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Ordre entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrdreRepository extends JpaRepository<Ordre, Long> {

    Page<Ordre> findByCreatedByIn(Pageable pageable, List<String> users);


}
