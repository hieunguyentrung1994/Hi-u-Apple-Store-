package d9.traning_project.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromotionResponse extends BaseResponse {

    private Long id;

    private String name;

    private double discountPrice;

    private Date startDate;

    private Date expiredDate;

    private boolean status;
}
