package d9.traning_project.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiscountResponse extends BaseResponse {

    private Long id;

    private String discountCode;

    private double discountPercent;

    private int stock;

    private boolean status;
}