package d9.traning_project.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequest extends BaseRequest {

    private String productName;

    private double price;

    private int stock;

    private String description;

    private MultipartFile imgUrlMain;

    private boolean status;

    private Long categoryId;

    private Long supplierId;
}
