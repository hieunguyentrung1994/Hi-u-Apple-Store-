package d9.traning_project.model.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromotionEvent extends GenericEntity<PromotionEvent>  implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Long id;

    @Column(name = "event_name")
    private String name;

    @Column(name = "discount_price")
    private double discountPrice;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date expiredDate;

    private boolean status;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "promotionEvents")
    private List<Order> orders = new ArrayList<>();

    @Override
    public Long getId() {
        return null;
    }

}
