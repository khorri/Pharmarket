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
 * A Rule.
 */
@Entity
@Table(name = "rule")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Rule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "priority")
    private Integer priority;

    @Column(name = "quantity_min")
    private Integer quantityMin;

    @Column(name = "amount_min")
    private Double amountMin;

    @Column(name = "reduction")
    private Double reduction;

    @Column(name = "gift_quantity")
    private Integer giftQuantity;

    @Column(name = "gadget_quantity")
    private Integer gadgetQuantity;

    @Column(name = "is_for_pack")
    private Boolean isForPack;

    @Column(name = "is_for_product")
    private Boolean isForProduct;

    @OneToMany(mappedBy = "rule")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Conditions> conditions = new HashSet<>();

    @OneToMany(mappedBy = "rule")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Action> actions = new HashSet<>();

    @ManyToOne
    private RuleType type;

    @ManyToOne
    private Product product;

    @ManyToOne
    private Gadget gadget;

    @ManyToMany(mappedBy = "rules")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PackProduct> packProducts = new HashSet<>();

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

    public Rule name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public Rule isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Integer getPriority() {
        return priority;
    }

    public Rule priority(Integer priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Integer getQuantityMin() {
        return quantityMin;
    }

    public Rule quantityMin(Integer quantityMin) {
        this.quantityMin = quantityMin;
        return this;
    }

    public void setQuantityMin(Integer quantityMin) {
        this.quantityMin = quantityMin;
    }

    public Double getAmountMin() {
        return amountMin;
    }

    public Rule amountMin(Double amountMin) {
        this.amountMin = amountMin;
        return this;
    }

    public void setAmountMin(Double amountMin) {
        this.amountMin = amountMin;
    }

    public Double getReduction() {
        return reduction;
    }

    public Rule reduction(Double reduction) {
        this.reduction = reduction;
        return this;
    }

    public void setReduction(Double reduction) {
        this.reduction = reduction;
    }

    public Integer getGiftQuantity() {
        return giftQuantity;
    }

    public Rule giftQuantity(Integer giftQuantity) {
        this.giftQuantity = giftQuantity;
        return this;
    }

    public void setGiftQuantity(Integer giftQuantity) {
        this.giftQuantity = giftQuantity;
    }

    public Integer getGadgetQuantity() {
        return gadgetQuantity;
    }

    public Rule gadgetQuantity(Integer gadgetQuantity) {
        this.gadgetQuantity = gadgetQuantity;
        return this;
    }

    public void setGadgetQuantity(Integer gadgetQuantity) {
        this.gadgetQuantity = gadgetQuantity;
    }

    public Boolean isIsForPack() {
        return isForPack;
    }

    public Rule isForPack(Boolean isForPack) {
        this.isForPack = isForPack;
        return this;
    }

    public void setIsForPack(Boolean isForPack) {
        this.isForPack = isForPack;
    }

    public Boolean isIsForProduct() {
        return isForProduct;
    }

    public Rule isForProduct(Boolean isForProduct) {
        this.isForProduct = isForProduct;
        return this;
    }

    public void setIsForProduct(Boolean isForProduct) {
        this.isForProduct = isForProduct;
    }

    public Set<Conditions> getConditions() {
        return conditions;
    }

    public Rule conditions(Set<Conditions> conditions) {
        this.conditions = conditions;
        return this;
    }

    public Rule addConditions(Conditions conditions) {
        this.conditions.add(conditions);
        conditions.setRule(this);
        return this;
    }

    public Rule removeConditions(Conditions conditions) {
        this.conditions.remove(conditions);
        conditions.setRule(null);
        return this;
    }

    public void setConditions(Set<Conditions> conditions) {
        this.conditions = conditions;
    }

    public Set<Action> getActions() {
        return actions;
    }

    public Rule actions(Set<Action> actions) {
        this.actions = actions;
        return this;
    }

    public Rule addAction(Action action) {
        this.actions.add(action);
        action.setRule(this);
        return this;
    }

    public Rule removeAction(Action action) {
        this.actions.remove(action);
        action.setRule(null);
        return this;
    }

    public void setActions(Set<Action> actions) {
        this.actions = actions;
    }

    public RuleType getType() {
        return type;
    }

    public Rule type(RuleType ruleType) {
        this.type = ruleType;
        return this;
    }

    public void setType(RuleType ruleType) {
        this.type = ruleType;
    }

    public Product getProduct() {
        return product;
    }

    public Rule product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Gadget getGadget() {
        return gadget;
    }

    public Rule gadget(Gadget gadget) {
        this.gadget = gadget;
        return this;
    }

    public void setGadget(Gadget gadget) {
        this.gadget = gadget;
    }

    public Set<PackProduct> getPackProducts() {
        return packProducts;
    }

    public Rule packProducts(Set<PackProduct> packProducts) {
        this.packProducts = packProducts;
        return this;
    }

    public Rule addPackProduct(PackProduct packProduct) {
        this.packProducts.add(packProduct);
        packProduct.getRules().add(this);
        return this;
    }

    public Rule removePackProduct(PackProduct packProduct) {
        this.packProducts.remove(packProduct);
        packProduct.getRules().remove(this);
        return this;
    }

    public void setPackProducts(Set<PackProduct> packProducts) {
        this.packProducts = packProducts;
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
        Rule rule = (Rule) o;
        if (rule.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rule.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Rule{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", isActive='" + isIsActive() + "'" +
            ", priority=" + getPriority() +
            ", quantityMin=" + getQuantityMin() +
            ", amountMin=" + getAmountMin() +
            ", reduction=" + getReduction() +
            ", giftQuantity=" + getGiftQuantity() +
            ", gadgetQuantity=" + getGadgetQuantity() +
            ", isForPack='" + isIsForPack() + "'" +
            ", isForProduct='" + isIsForProduct() + "'" +
            "}";
    }
}
