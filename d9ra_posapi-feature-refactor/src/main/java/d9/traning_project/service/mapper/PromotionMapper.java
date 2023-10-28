package d9.traning_project.service.mapper;

import d9.traning_project.model.domain.PromotionEvent;
import d9.traning_project.model.dto.request.PromotionRequest;
import d9.traning_project.model.dto.response.PromotionResponse;
import d9.traning_project.service.IGenericMapper;
import org.springframework.stereotype.Component;

@Component
public class PromotionMapper implements IGenericMapper<PromotionEvent, PromotionRequest, PromotionResponse> {

    @Override
    public PromotionEvent toEntity(PromotionRequest promotionRequest) {
        PromotionEvent promotionEvent = PromotionEvent.builder()
                .name(promotionRequest.getName()).discountPrice(promotionRequest.getDiscountPrice())
                .expiredDate(promotionRequest.getExpiredDate())
                .startDate(promotionRequest.getStartDate())
                .status(true).build();
        return promotionEvent;
    }

    @Override
    public PromotionResponse toResponse(PromotionEvent promotionEvent) {
        PromotionResponse promotionResponse = PromotionResponse.builder()
                .id(promotionEvent.getId())
                .discountPrice(promotionEvent.getDiscountPrice())
                .expiredDate(promotionEvent.getExpiredDate())
                .startDate(promotionEvent.getStartDate())
                .status(promotionEvent.isStatus())
                .name(promotionEvent.getName()).build();
        return promotionResponse;
    }
}
