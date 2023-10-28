package d9.traning_project.model.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;

import java.util.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "orders")
public class Order extends GenericEntity<Order> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "receiver_name")
    private String receiverName;

    private String address;

    private String phone;

    private String note;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "order_date")
    private Date orderDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private Users users;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "order")
    @JsonIgnore
    private List<OrderDetail> orderDetails = new ArrayList<>();

    private double totalAmount;

    @Convert(converter = OrderStatusConverter.class)
    private OrderStatus orderStatusNames;

    @ManyToMany
    @JoinColumn(name = "discount")
    @JsonIgnore
    private Set<Discount> discounts = new HashSet<>();

    @ManyToMany
    @JoinColumn(name = "promotionevent")
    @Column(name = "promotion_event")
    @JsonIgnore
    private Set<PromotionEvent> promotionEvents = new HashSet<>();

    private double amountAfterDiscount;

}