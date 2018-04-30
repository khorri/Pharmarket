package ma.nawar.pharmarket.repository;

import ma.nawar.pharmarket.domain.Offre;
import ma.nawar.pharmarket.domain.Pack;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

/**
 * Spring Data JPA repository for the Pack entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PackRepository extends JpaRepository<Pack, Long> {
    @Query("select distinct pack from Pack pack left join fetch pack.rules")
    List<Pack> findAllWithEagerRelationships();

    @Query("select pack from Pack pack left join fetch pack.rules where pack.id =:id")
    Pack findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select pack from Pack pack left join fetch pack.rules  where pack.offre.id =:id")
    List<Pack> findByOffreWithEagerRelationships(@Param("id") Long id);


    @Query("delete from Pack pack  where pack.offre.id =:offreId and pack.id not in :ids")
    void delete(@Param("offreId") Long offreId, @Param("ids") List<Long> ids);
}
