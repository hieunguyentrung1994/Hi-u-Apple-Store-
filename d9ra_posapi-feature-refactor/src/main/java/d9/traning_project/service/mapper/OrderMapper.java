package d9.traning_project.service.mapper;

import d9.traning_project.model.domain.*;
import d9.traning_project.model.dto.request.OrderRequest;
import d9.traning_project.model.dto.response.OrderResponse;
import d9.traning_project.repository.DiscountRepository;
import d9.traning_project.repository.PromotionEventRepository;
import d9.traning_project.repository.UserRepository;
import d9.traning_project.service.IGenericMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class OrderMapper implements IGenericMapper<Order, OrderRequest, OrderResponse> {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DiscountRepository discountRepository;

    @Autowired
    private PromotionEventRepository promotionEventRep;

    @Override
    public Order toEntity(OrderRequest orderRequest) {
        double amountAfterDiscount1 = orderRequest.getTotalAmount();
        Set<Discount> discountList = new HashSet<>();
        for (Long id : orderRequest.getDiscountIds()
        ) {
            Optional<Discount> discount = discountRepository.findById(id);
            if (discount.isPresent()) {
                discountList.add(discount.get());
                amountAfterDiscount1 = amountAfterDiscount1 - amountAfterDiscount1 * discount.get().getDiscountPercent() / 100;
            }
        }
        Set<PromotionEvent> promotionEventList = new HashSet<>();
        for (Long id : orderRequest.getPromotionEventIds()
        ) {
            Optional<PromotionEvent> promotionEvent = promotionEventRep.findById(id);
            if (promotionEvent.isPresent()) {
                promotionEventList.add(promotionEvent.get());
                amountAfterDiscount1 = amountAfterDiscount1 - promotionEvent.get().getDiscountPrice();
            }
        }
        Optional<Users> userOptional = userRepository.findByEmail(orderRequest.getUserEmail());
        Users user = userOptional.get();

        return Order.builder()
                .orderDate(orderRequest.getOrderDate())
                .receiverName(orderRequest.getReceiverName())
                .address(orderRequest.getAddress())
                .phone(orderRequest.getPhone())
                .note(orderRequest.getNote())
                .discounts(discountList)
                .promotionEvents(promotionEventList)
                .users(user)
                .orderDate(new Date())
                .totalAmount(orderRequest.getTotalAmount())
                .amountAfterDiscount(amountAfterDiscount1)
                .orderStatusNames(OrderStatus.PENDING)
                .build();
    }


    @Override
    public OrderResponse toResponse(Order order) {
        Set<Discount> discountList = order.getDiscounts();
        Set<PromotionEvent> promotionEventList = order.getPromotionEvents();
        double amountAfterDiscount = order.getTotalAmount();
        if (!discountList.isEmpty())
            for (Discount discount : discountList) {
                amountAfterDiscount = amountAfterDiscount - (amountAfterDiscount * discount.getDiscountPercent() / 100);
            }
        if (!promotionEventList.isEmpty())
            for (PromotionEvent promotionEvent : promotionEventList
            ) {
                amountAfterDiscount = amountAfterDiscount - (promotionEvent.getDiscountPrice());
            }
        return OrderResponse.builder()
                .id(order.getId())
                .address(order.getAddress())
                .phone(order.getPhone())
                .receiverName(order.getReceiverName())
                .note(order.getNote())
                .orderDate(order.getOrderDate())
                .userId(order.getUsers().getId())
                .totalAmount(order.getTotalAmount())
                .amountAfterDiscount(amountAfterDiscount)
                .orderStatus(order.getOrderStatusNames().name())
                .build();
    }

}
