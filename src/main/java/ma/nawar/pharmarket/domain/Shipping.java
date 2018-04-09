package ma.nawar.pharmarket.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Shipping.
 */
@Entity
@Table(name = "shipping")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Shipping implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reference")
    private String reference;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "phone")
    private String phone;

    @Column(name = "contact")
    private String contact;

    @Column(name = "is_grossiste")
    private Boolean isGrossiste;

    @ManyToOne
    private Ordre ordre;

    @ManyToMany(mappedBy = "shippings")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Offre> offres = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReference() {
        return reference;
    }

    public Shipping reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getName() {
        return name;
    }

    public Shipping name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Shipping address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public Shipping phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getContact() {
        return contact;
    }

    public Shipping contact(String contact) {
        this.contact = contact;
        return this;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public Boolean isIsGrossiste() {
        return isGrossiste;
    }

    public Shipping isGrossiste(Boolean isGrossiste) {
        this.isGrossiste = isGrossiste;
        return this;
    }

    public void setIsGrossiste(Boolean isGrossiste) {
        this.isGrossiste = isGrossiste;
    }

    public Ordre getOrdre() {
        return ordre;
    }

    public Shipping ordre(Ordre ordre) {
        this.ordre = ordre;
        return this;
    }

    public void setOrdre(Ordre ordre) {
        this.ordre = ordre;
    }

    public Set<Offre> getOffres() {
        return offres;
    }

    public Shipping offres(Set<Offre> offres) {
        this.offres = offres;
        return this;
    }

    public Shipping addOffre(Offre offre) {
        this.offres.add(offre);
        offre.getShippings().add(this);
        return this;
    }

    public Shipping removeOffre(Offre offre) {
        this.offres.remove(offre);
        offre.getShippings().remove(this);
        return this;
    }

    public void setOffres(Set<Offre> offres) {
        this.offres = offres;
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
        Shipping shipping = (Shipping) o;
        if (shipping.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), shipping.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Shipping{" +
            "id=" + getId() +
            ", reference='" + getReference() + "'" +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", phone='" + getPhone() + "'" +
            ", contact='" + getContact() + "'" +
            ", isGrossiste='" + isIsGrossiste() + "'" +
            "}";
    }
}
