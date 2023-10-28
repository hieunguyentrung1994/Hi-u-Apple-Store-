package d9.traning_project.model.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product extends GenericEntity<Product> implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, name = "product_name")
    private String productName;

    private double price;

    private int stock;

    private String description;

    @Column(name = "img_url_main")
    private String imgUrlMain;

    @Column(name = "product_status")
    private boolean productStatus;

    @ManyToOne
    @JsonIgnore
    private Category category;

    @ManyToOne
    @JsonIgnore
    private Suppliers supplier;

}