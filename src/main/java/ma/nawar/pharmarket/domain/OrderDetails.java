package ma.nawar.pharmarket.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A OrderDetails.
 */
@Entity
@Table(name = "order_details")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrderDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "quantity_shipped")
    private Integer quantityShipped;

    @Column(name = "ug_quantity")
    private Integer ugQuantity;

    @ManyToOne
    @JsonIgnore
    private Ordre ordre;

    @ManyToOne
    private PackProduct packProduct;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public OrderDetails quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public Integer getQuantityShipped() {
        return quantityShipped;
    }

    public void setQuantityShipped(Integer quantityShipped) {
        this.quantityShipped = quantityShipped;
    }

    public OrderDetails quantityShipped(Integer quantityShipped) {
        this.quantityShipped = quantityShipped;
        return this;
    }

    public Integer getUgQuantity() {
        return ugQuantity;
    }

    public void setUgQuantity(Integer ugQuantity) {
        this.ugQuantity = ugQuantity;
    }

    public OrderDetails ugQuantity(Integer ugQuantity) {
        this.ugQuantity = ugQuantity;
        return this;
    }

    public Ordre getOrdre() {
        return ordre;
    }

    public void setOrdre(Ordre ordre) {
        this.ordre = ordre;
    }

    public OrderDetails ordre(Ordre ordre) {
        this.ordre = ordre;
        return this;
    }

    public PackProduct getPackProduct() {
        return packProduct;
    }

    public void setPackProduct(PackProduct packProduct) {
        this.packProduct = packProduct;
    }

    public OrderDetails packProduct(PackProduct packProduct) {
        this.packProduct = packProduct;
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
        OrderDetails orderDetails = (OrderDetails) o;
        if (orderDetails.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderDetails.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderDetails{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", quantityShipped=" + getQuantityShipped() +
            ", ugQuantity=" + getUgQuantity() +
            "}";
    }
}
