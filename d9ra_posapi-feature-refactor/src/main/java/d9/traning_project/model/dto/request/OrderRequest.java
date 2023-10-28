package d9.traning_project.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequest extends BaseRequest {

    @NotBlank(message = "Please enter receiver name")
    private String receiverName;

    @NotBlank(message = "Please enter receiver address")
    private String address;

    @NotBlank(message = "Please enter receiver phone")
    private String phone;

    private String note;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date orderDate;

    private String userEmail;

    private double totalAmount;

    private Set<Long> discountIds;

    private Set<Long> promotionEventIds;

}
