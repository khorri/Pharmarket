package ma.nawar.pharmarket.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import ma.nawar.pharmarket.service.util.OffreDeserializer;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Offre.
 */
@Entity
@Table(name = "offre")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@JsonDeserialize(using = OffreDeserializer.class)
public class Offre extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "jhi_start")
    private Instant start;

    @Column(name = "jhi_end")
    private Instant end;

    @Column(name = "status")
    private String status;

    @Column(name = "description")
    private String description;

    @Column(name = "quantity_min")
    private Integer quantityMin;

    @Column(name = "amount_min")
    private Integer amountMin;

    @Column(name = "offre_type")
    private String offreType;

    @OneToMany(mappedBy = "offre", cascade = CascadeType.REMOVE)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Pack> packs = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "offre_shipping",
        joinColumns = @JoinColumn(name = "offres_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "shippings_id", referencedColumnName = "id"))
    private Set<Shipping> shippings = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Offre name(String name) {
        this.name = name;
        return this;
    }

    public Instant getStart() {
        return start;
    }

    public void setStart(Instant start) {
        this.start = start;
    }

    public Offre start(Instant start) {
        this.start = start;
        return this;
    }

    public Instant getEnd() {
        return end;
    }

    public void setEnd(Instant end) {
        this.end = end;
    }

    public Offre end(Instant end) {
        this.end = end;
        return this;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Offre status(String status) {
        this.status = status;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Offre description(String description) {
        this.description = description;
        return this;
    }

    public Integer getQuantityMin() {
        return quantityMin;
    }

    public void setQuantityMin(Integer quantityMin) {
        this.quantityMin = quantityMin;
    }

    public Offre quantityMin(Integer quantityMin) {
        this.quantityMin = quantityMin;
        return this;
    }

    public Integer getAmountMin() {
        return amountMin;
    }

    public void setAmountMin(Integer amountMin) {
        this.amountMin = amountMin;
    }

    public Offre amountMin(Integer amountMin) {
        this.amountMin = amountMin;
        return this;
    }

    public String getOffreType() {
        return offreType;
    }

    public void setOffreType(String offreType) {
        this.offreType = offreType;
    }

    public Offre offreType(String offreType) {
        this.offreType = offreType;
        return this;
    }

    public Set<Pack> getPacks() {
        return packs;
    }

    public void setPacks(Set<Pack> packs) {
        this.packs = packs;
    }

    public Offre packs(Set<Pack> packs) {
        this.packs = packs;
        return this;
    }

    public Offre addPack(Pack pack) {
        this.packs.add(pack);
        pack.setOffre(this);
        return this;
    }

    public Offre removePack(Pack pack) {
        this.packs.remove(pack);
        pack.setOffre(null);
        return this;
    }

    public Set<Shipping> getShippings() {
        return shippings;
    }

    public void setShippings(Set<Shipping> shippings) {
        this.shippings = shippings;
    }

    public Offre shippings(Set<Shipping> shippings) {
        this.shippings = shippings;
        return this;
    }

    public Offre addShipping(Shipping shipping) {
        this.shippings.add(shipping);
        shipping.getOffres().add(this);
        return this;
    }

    public Offre removeShipping(Shipping shipping) {
        this.shippings.remove(shipping);
        shipping.getOffres().remove(this);
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Offre offre = (Offre) o;
        if (offre.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), offre.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Offre{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            ", status='" + getStatus() + "'" +
            ", description='" + getDescription() + "'" +
            ", quantityMin=" + getQuantityMin() +
            ", amountMin=" + getAmountMin() +
            ", offreType='" + getOffreType() + "'" +
            "}";
    }
}
