package d9.traning_project.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromotionRequest extends BaseRequest {

    private String name;

    private Date startDate;

    private Date expiredDate;

    private double discountPrice;
}
