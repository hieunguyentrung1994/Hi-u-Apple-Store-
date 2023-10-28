package d9.traning_project.service.impl;

import d9.traning_project.model.domain.OrderDetail;
import d9.traning_project.model.dto.response.OrderDetailResponse;
import d9.traning_project.repository.OrderDetailRepository;
import d9.traning_project.service.mapper.OrderDetailMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private OrderDetailMapper orderDetailMapper;

    public List<OrderDetailResponse> getOrderDetail(Long idOrder) {
        List<OrderDetail> orderDetails = orderDetailRepository.getOrderDetail(idOrder);
        List<OrderDetailResponse> orderDetailResponses = new ArrayList<>();
        for (OrderDetail orderDetail : orderDetails
        ) {
            orderDetailResponses.add(orderDetailMapper.toResponse(orderDetail));
        }
        return orderDetailResponses;
    }

    ;

    public List<OrderDetailResponse> findAll() {
        return orderDetailRepository.findAll().stream()
                .map(c -> orderDetailMapper.toResponse(c)).collect(Collectors.toList());
    }
}


