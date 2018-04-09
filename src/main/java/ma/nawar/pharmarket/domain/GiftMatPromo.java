package ma.nawar.pharmarket.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A GiftMatPromo.
 */
@Entity
@Table(name = "gift_mat_promo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GiftMatPromo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private Long quantity;

    @OneToOne
    @JoinColumn(unique = true)
    private MaterielPromo matpromo;

    @OneToOne
    @JoinColumn(unique = true)
    private Rule rule;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuantity() {
        return quantity;
    }

    public GiftMatPromo quantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public MaterielPromo getMatpromo() {
        return matpromo;
    }

    public GiftMatPromo matpromo(MaterielPromo materielPromo) {
        this.matpromo = materielPromo;
        return this;
    }

    public void setMatpromo(MaterielPromo materielPromo) {
        this.matpromo = materielPromo;
    }

    public Rule getRule() {
        return rule;
    }

    public GiftMatPromo rule(Rule rule) {
        this.rule = rule;
        return this;
    }

    public void setRule(Rule rule) {
        this.rule = rule;
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
        GiftMatPromo giftMatPromo = (GiftMatPromo) o;
        if (giftMatPromo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), giftMatPromo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GiftMatPromo{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            "}";
    }
}
