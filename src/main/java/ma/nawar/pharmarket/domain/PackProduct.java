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
 * A PackProduct.
 */
@Entity
@Table(name = "pack_product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PackProduct implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "quantity_min", nullable = false)
    private Integer quantityMin;

    @ManyToOne
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Pack pack;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "pack_product_rule",
               joinColumns = @JoinColumn(name="pack_products_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="rules_id", referencedColumnName="id"))
    private Set<Rule> rules = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantityMin() {
        return quantityMin;
    }

    public void setQuantityMin(Integer quantityMin) {
        this.quantityMin = quantityMin;
    }

    public PackProduct quantityMin(Integer quantityMin) {
        this.quantityMin = quantityMin;
        return this;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public PackProduct product(Product product) {
        this.product = product;
        return this;
    }

    public Pack getPack() {
        return pack;
    }

    public void setPack(Pack pack) {
        this.pack = pack;
    }

    public PackProduct pack(Pack pack) {
        this.pack = pack;
        return this;
    }

    public Set<Rule> getRules() {
        return rules;
    }

    public void setRules(Set<Rule> rules) {
        this.rules = rules;
    }

    public PackProduct rules(Set<Rule> rules) {
        this.rules = rules;
        return this;
    }

    public PackProduct addRule(Rule rule) {
        this.rules.add(rule);
        rule.getPackProducts().add(this);
        return this;
    }

    public PackProduct removeRule(Rule rule) {
        this.rules.remove(rule);
        rule.getPackProducts().remove(this);
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
        PackProduct packProduct = (PackProduct) o;
        if (packProduct.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), packProduct.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PackProduct{" +
            "id=" + getId() +
            ", quantityMin=" + getQuantityMin() +
            "}";
    }
}
