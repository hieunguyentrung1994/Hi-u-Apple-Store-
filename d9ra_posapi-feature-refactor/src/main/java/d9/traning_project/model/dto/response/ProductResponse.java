package d9.traning_project.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse extends BaseResponse {

    private Long id;

    private String productName;

    private double price;

    private int stock;

    private String description;

    private String imgUrlMain;

    private boolean status;

    private String category;

    private Long categoryId;

    private Long supplierId;

    private String supplierName;
}
