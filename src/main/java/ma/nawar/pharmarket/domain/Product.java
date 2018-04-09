package ma.nawar.pharmarket.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "ppv", nullable = false)
    private Long ppv;

    @Column(name = "pph")
    private Long pph;

    @Column(name = "code")
    private String code;

    @Column(name = "is_new")
    private Boolean isNew;

    @Column(name = "refrence")
    private String refrence;

    @Column(name = "commercial_name")
    private String commercialName;

    @Column(name = "marque")
    private String marque;

    @Column(name = "tva")
    private Float tva;

    @Column(name = "fabrication_price")
    private Double fabricationPrice;

    @Column(name = "actif")
    private Boolean actif;

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

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPpv() {
        return ppv;
    }

    public Product ppv(Long ppv) {
        this.ppv = ppv;
        return this;
    }

    public void setPpv(Long ppv) {
        this.ppv = ppv;
    }

    public Long getPph() {
        return pph;
    }

    public Product pph(Long pph) {
        this.pph = pph;
        return this;
    }

    public void setPph(Long pph) {
        this.pph = pph;
    }

    public String getCode() {
        return code;
    }

    public Product code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Boolean isIsNew() {
        return isNew;
    }

    public Product isNew(Boolean isNew) {
        this.isNew = isNew;
        return this;
    }

    public void setIsNew(Boolean isNew) {
        this.isNew = isNew;
    }

    public String getRefrence() {
        return refrence;
    }

    public Product refrence(String refrence) {
        this.refrence = refrence;
        return this;
    }

    public void setRefrence(String refrence) {
        this.refrence = refrence;
    }

    public String getCommercialName() {
        return commercialName;
    }

    public Product commercialName(String commercialName) {
        this.commercialName = commercialName;
        return this;
    }

    public void setCommercialName(String commercialName) {
        this.commercialName = commercialName;
    }

    public String getMarque() {
        return marque;
    }

    public Product marque(String marque) {
        this.marque = marque;
        return this;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public Float getTva() {
        return tva;
    }

    public Product tva(Float tva) {
        this.tva = tva;
        return this;
    }

    public void setTva(Float tva) {
        this.tva = tva;
    }

    public Double getFabricationPrice() {
        return fabricationPrice;
    }

    public Product fabricationPrice(Double fabricationPrice) {
        this.fabricationPrice = fabricationPrice;
        return this;
    }

    public void setFabricationPrice(Double fabricationPrice) {
        this.fabricationPrice = fabricationPrice;
    }

    public Boolean isActif() {
        return actif;
    }

    public Product actif(Boolean actif) {
        this.actif = actif;
        return this;
    }

    public void setActif(Boolean actif) {
        this.actif = actif;
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
        Product product = (Product) o;
        if (product.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), product.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", ppv=" + getPpv() +
            ", pph=" + getPph() +
            ", code='" + getCode() + "'" +
            ", isNew='" + isIsNew() + "'" +
            ", refrence='" + getRefrence() + "'" +
            ", commercialName='" + getCommercialName() + "'" +
            ", marque='" + getMarque() + "'" +
            ", tva=" + getTva() +
            ", fabricationPrice=" + getFabricationPrice() +
            ", actif='" + isActif() + "'" +
            "}";
    }
}
