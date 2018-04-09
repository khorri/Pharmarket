package ma.nawar.pharmarket.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
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

    @ManyToOne
    private Ordre ordre;

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

    public Ordre getOrdre() {
        return ordre;
    }

    public ShippingMode ordre(Ordre ordre) {
        this.ordre = ordre;
        return this;
    }

    public void setOrdre(Ordre ordre) {
        this.ordre = ordre;
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
