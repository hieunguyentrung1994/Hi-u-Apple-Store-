package d9.traning_project.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResponse {

    private Long idCart;

    private Long productId;

    private String productName;

    private String img;

    private int quantity;

    private double unitPrice;

    private double total;

}
