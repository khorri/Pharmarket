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
 * A ShippingMode.
 */
@Entity
@Table(name = "shipping_mode")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ShippingMode implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "shippingMode")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Ordre> ordres = new HashSet<>();

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

    public ShippingMode name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Ordre> getOrdres() {
        return ordres;
    }

    public ShippingMode ordres(Set<Ordre> ordres) {
        this.ordres = ordres;
        return this;
    }

    public ShippingMode addOrdre(Ordre ordre) {
        this.ordres.add(ordre);
        ordre.setShippingMode(this);
        return this;
    }

    public ShippingMode removeOrdre(Ordre ordre) {
        this.ordres.remove(ordre);
        ordre.setShippingMode(null);
        return this;
    }

    public void setOrdres(Set<Ordre> ordres) {
        this.ordres = ordres;
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
        ShippingMode shippingMode = (ShippingMode) o;
        if (shippingMode.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), shippingMode.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ShippingMode{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
