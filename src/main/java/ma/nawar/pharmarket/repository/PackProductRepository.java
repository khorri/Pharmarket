package ma.nawar.pharmarket.repository;

import ma.nawar.pharmarket.domain.Pack;
import ma.nawar.pharmarket.domain.PackProduct;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

/**
 * Spring Data JPA repository for the PackProduct entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PackProductRepository extends JpaRepository<PackProduct, Long> {
    @Query("select distinct pack_product from PackProduct pack_product left join fetch pack_product.rules")
    List<PackProduct> findAllWithEagerRelationships();

    @Query("select pack_product from PackProduct pack_product left join fetch pack_product.rules where pack_product.id =:id")
    PackProduct findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select pack_product from PackProduct pack_product left join fetch pack_product.rules where pack_product.pack.id =:id")
    Set<PackProduct> findByPackWithEagerRelationships(@Param("id") Long id);

    @Modifying
    @Query("delete from PackProduct pack_product  where pack_product.pack.id =:packId and pack_product.id not in :ids")
    void delete(@Param("packId") Long packId, @Param("ids") List<Long> ids);
}
