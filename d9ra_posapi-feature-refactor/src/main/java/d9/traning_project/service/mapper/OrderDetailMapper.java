package d9.traning_project.service.mapper;

import d9.traning_project.model.domain.OrderDetail;
import d9.traning_project.model.dto.request.OrderDetailRequest;
import d9.traning_project.model.dto.response.OrderDetailResponse;
import d9.traning_project.service.IGenericMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderDetailMapper implements IGenericMapper<OrderDetail, OrderDetailRequest, OrderDetailResponse> {

    @Autowired
    private ProductMapper productMapper;

    @Override
    public OrderDetail toEntity(OrderDetailRequest orderDetailRequest) {
        return null;
    }

    @Override
    public OrderDetailResponse toResponse(OrderDetail orderDetail) {
        return OrderDetailResponse.builder()
                .id(orderDetail.getId())
                .orderId(orderDetail.getOrder().getId())
                .productResponse(productMapper.toResponse(orderDetail.getProduct()))
                .quantity(orderDetail.getQuantity())
                .build();
    }
}
