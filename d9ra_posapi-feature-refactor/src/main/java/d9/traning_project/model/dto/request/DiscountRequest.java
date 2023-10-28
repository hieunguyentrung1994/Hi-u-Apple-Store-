package d9.traning_project.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiscountRequest extends BaseRequest {

    @Column(unique = true)
    private String discountCode;

    private double discountPercent;

    private int stock;

    private boolean status;
}