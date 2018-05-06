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
public class Ordre extends AbstractAuditingEntity implements Serializable {

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

    @Column(name = "total_discount")
    private Double totalDiscount;

    @ManyToOne
    private Customer customer;

    @OneToMany(mappedBy = "ordre", cascade = CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OrderHistory> orderHistories = new HashSet<>();

    @OneToMany(mappedBy = "ordre", cascade = CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OrderDetails> orderDetails = new HashSet<>();

    @ManyToOne
    private Offre offre;

    @ManyToOne
    private Payment payment;

    @ManyToOne
    private Shipping shipping;

    @ManyToOne
    private ShippingMode shippingMode;

    @ManyToOne
    private Shipping firstGrossiste;

    @ManyToOne
    private Shipping secondGrossiste;


    @ManyToOne
    private Shipping thirdGrossiste;



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

    public void setTotalPaid(Long totalPaid) {
        this.totalPaid = totalPaid;
    }

    public Ordre totalPaid(Long totalPaid) {
        this.totalPaid = totalPaid;
        return this;
    }

    public Long getTotalOrdred() {
        return totalOrdred;
    }

    public void setTotalOrdred(Long totalOrdred) {
        this.totalOrdred = totalOrdred;
    }

    public Ordre totalOrdred(Long totalOrdred) {
        this.totalOrdred = totalOrdred;
        return this;
    }

    public OrderType getType() {
        return type;
    }

    public void setType(OrderType type) {
        this.type = type;
    }

    public Ordre type(OrderType type) {
        this.type = type;
        return this;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Ordre status(String status) {
        this.status = status;
        return this;
    }

    public String getPaymentDueDate() {
        return paymentDueDate;
    }

    public void setPaymentDueDate(String paymentDueDate) {
        this.paymentDueDate = paymentDueDate;
    }

    public Ordre paymentDueDate(String paymentDueDate) {
        this.paymentDueDate = paymentDueDate;
        return this;
    }

    public Double getTotalDiscount() {
        return totalDiscount;
    }

    public void setTotalDiscount(Double totalDiscount) {
        this.totalDiscount = totalDiscount;
    }

    public Ordre totalDiscount(Double totalDiscount) {
        this.totalDiscount = totalDiscount;
        return this;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Ordre customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public Set<OrderHistory> getOrderHistories() {
        return orderHistories;
    }

    public void setOrderHistories(Set<OrderHistory> orderHistories) {
        this.orderHistories = orderHistories;
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

    public Set<OrderDetails> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(Set<OrderDetails> orderDetails) {
        this.orderDetails = orderDetails;
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

    public Offre getOffre() {
        return offre;
    }

    public void setOffre(Offre offre) {
        this.offre = offre;
    }

    public Ordre offre(Offre offre) {
        this.offre = offre;
        return this;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public Ordre payment(Payment payment) {
        this.payment = payment;
        return this;
    }

    public Shipping getShipping() {
        return shipping;
    }

    public void setShipping(Shipping shipping) {
        this.shipping = shipping;
    }

    public Ordre shipping(Shipping shipping) {
        this.shipping = shipping;
        return this;
    }

    public ShippingMode getShippingMode() {
        return shippingMode;
    }

    public void setShippingMode(ShippingMode shippingMode) {
        this.shippingMode = shippingMode;
    }

    public Ordre shippingMode(ShippingMode shippingMode) {
        this.shippingMode = shippingMode;
        return this;
    }

    public Shipping getFirstGrossiste() {
        return firstGrossiste;
    }

    public void setFirstGrossiste(Shipping firstGrossiste) {
        this.firstGrossiste = firstGrossiste;
    }

    public Shipping getSecondGrossiste() {
        return secondGrossiste;
    }

    public void setSecondGrossiste(Shipping secondGrossiste) {
        this.secondGrossiste = secondGrossiste;
    }

    public Shipping getThirdGrossiste() {
        return thirdGrossiste;
    }

    public void setThirdGrossiste(Shipping thirdGrossiste) {
        this.thirdGrossiste = thirdGrossiste;
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
            ", totalDiscount=" + getTotalDiscount() +
            "}";
    }
}
