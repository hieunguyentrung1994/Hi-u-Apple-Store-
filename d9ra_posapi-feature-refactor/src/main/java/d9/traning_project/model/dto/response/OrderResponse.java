package d9.traning_project.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse extends BaseResponse {

    private Long id;

    private String receiverName;

    private String address;

    private String phone;

    private String note;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date orderDate;

    private Long userId;

    private double totalAmount;

    private double amountAfterDiscount;

    private String orderStatus;

}
