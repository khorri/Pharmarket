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
 * A Pack.
 */
@Entity
@Table(name = "pack")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Pack implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "pack_rule",
        joinColumns = @JoinColumn(name = "packs_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "rules_id", referencedColumnName = "id"))
    private Set<Rule> rules = new HashSet<>();

    @OneToMany(mappedBy = "pack", cascade = {CascadeType.REMOVE})
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PackProduct> packProducts = new HashSet<>();

    @ManyToOne
    @JsonIgnore
    private Offre offre;

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

    public Pack name(String name) {
        this.name = name;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Pack description(String description) {
        this.description = description;
        return this;
    }

    public Set<Rule> getRules() {
        return rules;
    }

    public void setRules(Set<Rule> rules) {
        this.rules = rules;
    }

    public Pack rules(Set<Rule> rules) {
        this.rules = rules;
        return this;
    }

    public Pack addRule(Rule rule) {
        this.rules.add(rule);
        return this;
    }

    public Pack removeRule(Rule rule) {
        this.rules.remove(rule);
        return this;
    }

    public Set<PackProduct> getPackProducts() {
        return packProducts;
    }

    public void setPackProducts(Set<PackProduct> packProducts) {
        this.packProducts = packProducts;
    }

    public Pack packProducts(Set<PackProduct> packProducts) {
        this.packProducts = packProducts;
        return this;
    }

    public Pack addPackProduct(PackProduct packProduct) {
        this.packProducts.add(packProduct);
        packProduct.setPack(this);
        return this;
    }

    public Pack removePackProduct(PackProduct packProduct) {
        this.packProducts.remove(packProduct);
        packProduct.setPack(null);
        return this;
    }

    public Offre getOffre() {
        return offre;
    }

    public void setOffre(Offre offre) {
        this.offre = offre;
    }

    public Pack offre(Offre offre) {
        this.offre = offre;
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
        Pack pack = (Pack) o;
        if (pack.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pack.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pack{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
