package d9.traning_project.service.mapper;

import d9.traning_project.model.domain.Discount;
import d9.traning_project.model.dto.request.DiscountRequest;
import d9.traning_project.model.dto.response.DiscountResponse;
import d9.traning_project.service.IGenericMapper;
import org.springframework.stereotype.Component;

@Component
public class DiscountMapper implements IGenericMapper<Discount, DiscountRequest, DiscountResponse> {
    @Override
    public Discount toEntity(DiscountRequest discountRequest) {
        return Discount.builder()
                .discountCode(discountRequest.getDiscountCode())
                .discountPercent(discountRequest.getDiscountPercent())
                .stock(discountRequest.getStock())
                .status(true).build();
    }

    @Override
    public DiscountResponse toResponse(Discount discount) {
        return DiscountResponse.builder()
                .id(discount.getId())
                .discountCode(discount.getDiscountCode())
                .discountPercent(discount.getDiscountPercent())
                .stock(discount.getStock())
                .status(discount.isStatus()).build();
    }

}