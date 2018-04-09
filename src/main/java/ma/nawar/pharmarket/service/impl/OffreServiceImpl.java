package ma.nawar.pharmarket.service.impl;

import ma.nawar.pharmarket.domain.Pack;
import ma.nawar.pharmarket.domain.PackProduct;
import ma.nawar.pharmarket.repository.PackProductRepository;
import ma.nawar.pharmarket.repository.PackRepository;
import ma.nawar.pharmarket.service.OffreService;
import ma.nawar.pharmarket.domain.Offre;
import ma.nawar.pharmarket.repository.OffreRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing Offre.
 */
@Service
@Transactional
public class OffreServiceImpl implements OffreService {

    private final Logger log = LoggerFactory.getLogger(OffreServiceImpl.class);

    private final OffreRepository offreRepository;
    private final PackRepository packRepository;
    private final PackProductRepository packProductRepository;

    public OffreServiceImpl(OffreRepository offreRepository, PackRepository packRepository, PackProductRepository packProductRepository) {
        this.offreRepository = offreRepository;
        this.packRepository = packRepository;
        this.packProductRepository = packProductRepository;

    }

    /**
     * Save a offre.
     *
     * @param offre the entity to save
     * @return the persisted entity
     */
    @Override
    @Transactional
    public Offre save(Offre offre) {
        log.debug("Request to save Offre : {}", offre);
        final Offre offer = offreRepository.save(offre);
        //save packProducts first the save packs
        Set<Pack> packs = offre.getPacks();
        packs = packs.stream().map(pack -> {
            pack.setOffre(offer);
            final Pack pac = packRepository.save(pack);
            Set<PackProduct> pp = pack.getPackProducts().stream().map(packProduct -> {
                packProduct.setPack(pac);
                return packProductRepository.save(packProduct);
            }).collect(Collectors.toSet());
            pac.setPackProducts(pp);
            return pac;
        }).collect(Collectors.toSet());
        offer.setPacks(packs);
        return offer;
    }

    /**
     * Get all the offres.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Offre> findAll(Pageable pageable) {
        log.debug("Request to get all Offres");
        return offreRepository.findAll(pageable);
    }

    /**
     * Get one offre by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Offre findOne(Long id) {
        log.debug("Request to get Offre : {}", id);
        return offreRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the offre by id.
     *
     * @param id the id of the entity
     */
    @Override
    @Transactional
    public void delete(Long id) {
        log.debug("Request to delete Offre : {}", id);
        //List<Pack> packs = packRepository.findByOffre(id);
        //packs.stream().map(PackProductRepository::findByPack).collect(Collectors.toSet());
        offreRepository.delete(id);
    }
}
