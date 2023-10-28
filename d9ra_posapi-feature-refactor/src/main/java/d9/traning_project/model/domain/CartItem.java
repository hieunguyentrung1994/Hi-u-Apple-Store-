package d9.traning_project.model.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem extends GenericEntity<CartItem> {

    private Long id;

    private Product product;

    private int quantity;

}