package d9.traning_project.model.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.Arrays;

public enum OrderStatus {

    PENDING(1),
    PROCESSING(2),
    SHIPPING(3),
    DELIVERED(4),
    USER_CANCELLED(5),
    SHOP_CANCELLED(6);

    private Integer value;

    OrderStatus(Integer value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    @JsonCreator
    public static OrderStatus of(Integer value) {
        return Arrays.stream(OrderStatus.values())
                .filter(orderStatus -> orderStatus.value == value)
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
