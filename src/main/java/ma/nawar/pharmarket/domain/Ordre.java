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

import ma.nawar.pharmarket.domain.enumeration.OrderType;

/**
 * A Ordre.
 */
@Entity
@Table(name = "ordre")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ordre implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "total_paid", nullable = false)
    private Long totalPaid;

    @NotNull
    @Column(name = "total_ordred", nullable = false)
    private Long totalOrdred;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private OrderType type;

    @Column(name = "status")
    private String status;

    @Column(name = "payment_due_date")
    private String paymentDueDate;

    @ManyToOne
    private Customer customer;

    @OneToMany(mappedBy = "ordre")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OrderHistory> orderHistories = new HashSet<>();

    @OneToMany(mappedBy = "ordre")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OrderDetails> orderDetails = new HashSet<>();

    @OneToMany(mappedBy = "ordre")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Payment> payments = new HashSet<>();

    @OneToMany(mappedBy = "ordre")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ShippingMode> shippingModes = new HashSet<>();

    @OneToMany(mappedBy = "ordre")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Shipping> shippings = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTotalPaid() {
        return totalPaid;
    }

    public Ordre totalPaid(Long totalPaid) {
        this.totalPaid = totalPaid;
        return this;
    }

    public void setTotalPaid(Long totalPaid) {
        this.totalPaid = totalPaid;
    }

    public Long getTotalOrdred() {
        return totalOrdred;
    }

    public Ordre totalOrdred(Long totalOrdred) {
        this.totalOrdred = totalOrdred;
        return this;
    }

    public void setTotalOrdred(Long totalOrdred) {
        this.totalOrdred = totalOrdred;
    }

    public OrderType getType() {
        return type;
    }

    public Ordre type(OrderType type) {
        this.type = type;
        return this;
    }

    public void setType(OrderType type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public Ordre status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPaymentDueDate() {
        return paymentDueDate;
    }

    public Ordre paymentDueDate(String paymentDueDate) {
        this.paymentDueDate = paymentDueDate;
        return this;
    }

    public void setPaymentDueDate(String paymentDueDate) {
        this.paymentDueDate = paymentDueDate;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Ordre customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Set<OrderHistory> getOrderHistories() {
        return orderHistories;
    }

    public Ordre orderHistories(Set<OrderHistory> orderHistories) {
        this.orderHistories = orderHistories;
        return this;
    }

    public Ordre addOrderHistory(OrderHistory orderHistory) {
        this.orderHistories.add(orderHistory);
        orderHistory.setOrdre(this);
        return this;
    }

    public Ordre removeOrderHistory(OrderHistory orderHistory) {
        this.orderHistories.remove(orderHistory);
        orderHistory.setOrdre(null);
        return this;
    }

    public void setOrderHistories(Set<OrderHistory> orderHistories) {
        this.orderHistories = orderHistories;
    }

    public Set<OrderDetails> getOrderDetails() {
        return orderDetails;
    }

    public Ordre orderDetails(Set<OrderDetails> orderDetails) {
        this.orderDetails = orderDetails;
        return this;
    }

    public Ordre addOrderDetail(OrderDetails orderDetails) {
        this.orderDetails.add(orderDetails);
        orderDetails.setOrdre(this);
        return this;
    }

    public Ordre removeOrderDetail(OrderDetails orderDetails) {
        this.orderDetails.remove(orderDetails);
        orderDetails.setOrdre(null);
        return this;
    }

    public void setOrderDetails(Set<OrderDetails> orderDetails) {
        this.orderDetails = orderDetails;
    }

    public Set<Payment> getPayments() {
        return payments;
    }

    public Ordre payments(Set<Payment> payments) {
        this.payments = payments;
        return this;
    }

    public Ordre addPayment(Payment payment) {
        this.payments.add(payment);
        payment.setOrdre(this);
        return this;
    }

    public Ordre removePayment(Payment payment) {
        this.payments.remove(payment);
        payment.setOrdre(null);
        return this;
    }

    public void setPayments(Set<Payment> payments) {
        this.payments = payments;
    }

    public Set<ShippingMode> getShippingModes() {
        return shippingModes;
    }

    public Ordre shippingModes(Set<ShippingMode> shippingModes) {
        this.shippingModes = shippingModes;
        return this;
    }

    public Ordre addShippingMode(ShippingMode shippingMode) {
        this.shippingModes.add(shippingMode);
        shippingMode.setOrdre(this);
        return this;
    }

    public Ordre removeShippingMode(ShippingMode shippingMode) {
        this.shippingModes.remove(shippingMode);
        shippingMode.setOrdre(null);
        return this;
    }

    public void setShippingModes(Set<ShippingMode> shippingModes) {
        this.shippingModes = shippingModes;
    }

    public Set<Shipping> getShippings() {
        return shippings;
    }

    public Ordre shippings(Set<Shipping> shippings) {
        this.shippings = shippings;
        return this;
    }

    public Ordre addShipping(Shipping shipping) {
        this.shippings.add(shipping);
        shipping.setOrdre(this);
        return this;
    }

    public Ordre removeShipping(Shipping shipping) {
        this.shippings.remove(shipping);
        shipping.setOrdre(null);
        return this;
    }

    public void setShippings(Set<Shipping> shippings) {
        this.shippings = shippings;
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
        Ordre ordre = (Ordre) o;
        if (ordre.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ordre.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ordre{" +
            "id=" + getId() +
            ", totalPaid=" + getTotalPaid() +
            ", totalOrdred=" + getTotalOrdred() +
            ", type='" + getType() + "'" +
            ", status='" + getStatus() + "'" +
            ", paymentDueDate='" + getPaymentDueDate() + "'" +
            "}";
    }
}
