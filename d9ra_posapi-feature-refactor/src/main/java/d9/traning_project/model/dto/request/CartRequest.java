package d9.traning_project.model.dto.request;


import d9.traning_project.model.domain.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartRequest {

    private Product product;

    private int quantity;

}
