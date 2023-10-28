package d9.traning_project.service.impl;


import d9.traning_project.exception.BadRequestException;
import d9.traning_project.exception.NotFoundException;
import d9.traning_project.model.domain.Product;
import d9.traning_project.model.domain.PromotionEvent;
import d9.traning_project.model.dto.request.PromotionRequest;
import d9.traning_project.model.dto.response.PromotionResponse;
import d9.traning_project.repository.PromotionEventRepository;
import d9.traning_project.service.GenericService;
import d9.traning_project.service.mapper.PromotionMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromotionService extends GenericService<PromotionRequest, PromotionResponse, PromotionEventRepository, PromotionMapper> {
    @Override
    public List<PromotionResponse> findAll() {
        List<PromotionEvent> listPromotion = repository.findAll();
        Date newDate = new Date();
        for (PromotionEvent p : listPromotion) {
            if (newDate.after(p.getExpiredDate())) {
                p.setStatus(false);
                repository.save(p);
            }
        }
        return listPromotion.stream().map(c ->
                mapper.toResponse(c)).collect(Collectors.toList());
    }


    @Override
    public PromotionResponse save(PromotionRequest promotionRequest) throws BadRequestException {
        if (promotionRequest.getName() == null ||
                promotionRequest.getStartDate() == null ||
                promotionRequest.getExpiredDate() == null ||
                promotionRequest.getDiscountPrice() == 0) {
            throw new BadRequestException(PromotionEvent.class);
        }
        if (promotionRequest.getStartDate().after(promotionRequest.getExpiredDate())) {
            throw new BadRequestException(PromotionEvent.class);
        }
        PromotionEvent promotion = mapper.toEntity(promotionRequest);
        PromotionEvent promotionEvent;
        try {
            promotionEvent = repository.save(promotion);
        } catch (DataIntegrityViolationException e) {
            if (e.getMessage().contains("UK_g5bouahd52dicddci27bb49hu")) {
                throw new BadRequestException(PromotionEvent.class);
            }
            throw new BadRequestException(PromotionEvent.class);
        }

        return mapper.toResponse(promotionEvent);
    }

    @Override
    public PromotionResponse update(PromotionRequest promotionRequest, Long id) throws NotFoundException, BadRequestException {
        PromotionEvent existingPromotion = repository.findById(id)
                .orElseThrow(() -> new NotFoundException(Product.class));

        if (promotionRequest.getName() == null ||
                promotionRequest.getStartDate() == null ||
                promotionRequest.getExpiredDate() == null ||
                promotionRequest.getDiscountPrice() == 0) {
            throw new BadRequestException(PromotionEvent.class);
        }
        if (promotionRequest.getStartDate().after(promotionRequest.getExpiredDate())) {
            throw new BadRequestException(PromotionEvent.class);
        }
        // Update existingPromotion to promotionRequest
        existingPromotion.setName(promotionRequest.getName());
        existingPromotion.setStartDate(promotionRequest.getStartDate());
        existingPromotion.setExpiredDate(promotionRequest.getExpiredDate());
        existingPromotion.setDiscountPrice(promotionRequest.getDiscountPrice());

        PromotionEvent promotionEvent;
        try {
            promotionEvent = repository.save(existingPromotion);
        } catch (Exception e) {
            throw new BadRequestException(PromotionEvent.class);
        }
        return mapper.toResponse(promotionEvent);
    }

    public PromotionResponse changeStatus(Long id) throws NotFoundException, BadRequestException {
        PromotionEvent existingPromotion = repository.findById(id)
                .orElseThrow(() -> new NotFoundException(Product.class));
        existingPromotion.setStatus(!existingPromotion.isStatus());
        try {
            return mapper.toResponse(repository.save(existingPromotion));
        } catch (Exception e) {
            throw new BadRequestException(PromotionEvent.class);
        }
    }


}
