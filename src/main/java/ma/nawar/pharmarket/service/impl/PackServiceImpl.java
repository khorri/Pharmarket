package ma.nawar.pharmarket.service.impl;

import ma.nawar.pharmarket.service.PackService;
import ma.nawar.pharmarket.domain.Pack;
import ma.nawar.pharmarket.repository.PackRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Pack.
 */
@Service
@Transactional
public class PackServiceImpl implements PackService {

    private final Logger log = LoggerFactory.getLogger(PackServiceImpl.class);

    private final PackRepository packRepository;

    public PackServiceImpl(PackRepository packRepository) {
        this.packRepository = packRepository;
    }

    /**
     * Save a pack.
     *
     * @param pack the entity to save
     * @return the persisted entity
     */
    @Override
    public Pack save(Pack pack) {
        log.debug("Request to save Pack : {}", pack);
        return packRepository.save(pack);
    }

    /**
     * Get all the packs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Pack> findAll(Pageable pageable) {
        log.debug("Request to get all Packs");
        return packRepository.findAll(pageable);
    }

    /**
     * Get one pack by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Pack findOne(Long id) {
        log.debug("Request to get Pack : {}", id);
        return packRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the pack by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Pack : {}", id);
        packRepository.delete(id);
    }
}
