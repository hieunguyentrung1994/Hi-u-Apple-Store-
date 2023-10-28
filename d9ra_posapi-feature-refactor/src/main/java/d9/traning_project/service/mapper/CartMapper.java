package d9.traning_project.service.mapper;

import d9.traning_project.model.domain.CartItem;
import d9.traning_project.model.dto.request.CartRequest;
import d9.traning_project.model.dto.response.CartResponse;
import d9.traning_project.service.IGenericMapper;
import org.springframework.stereotype.Component;

@Component
public class CartMapper implements IGenericMapper<CartItem, CartRequest, CartResponse> {
    @Override
    public CartItem toEntity(CartRequest cartRequest) {
        return CartItem.builder()
                .product(cartRequest.getProduct())
                .quantity(cartRequest.getQuantity())
                .build();
    }

    @Override
    public CartResponse toResponse(CartItem cartItem) {
        return CartResponse.builder()
                .idCart(cartItem.getId())
                .productId(cartItem.getProduct().getId())
                .productName(cartItem.getProduct().getProductName())
                .unitPrice(cartItem.getProduct().getPrice())
                .quantity(cartItem.getQuantity())
                .img(cartItem.getProduct().getImgUrlMain())
                .total(cartItem.getProduct().getPrice() * cartItem.getQuantity())
                .build();
    }
}
