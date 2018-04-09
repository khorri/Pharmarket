package ma.nawar.pharmarket.domain;

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

    @ManyToOne
    private Ordre ordre;

    @OneToOne
    @JoinColumn(unique = true)
    private Product product;

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

    public OrderDetails quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getQuantityShipped() {
        return quantityShipped;
    }

    public OrderDetails quantityShipped(Integer quantityShipped) {
        this.quantityShipped = quantityShipped;
        return this;
    }

    public void setQuantityShipped(Integer quantityShipped) {
        this.quantityShipped = quantityShipped;
    }

    public Ordre getOrdre() {
        return ordre;
    }

    public OrderDetails ordre(Ordre ordre) {
        this.ordre = ordre;
        return this;
    }

    public void setOrdre(Ordre ordre) {
        this.ordre = ordre;
    }

    public Product getProduct() {
        return product;
    }

    public OrderDetails product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
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
            "}";
    }
}
