package d9.traning_project.service.impl;

import d9.traning_project.exception.NotFoundException;
import d9.traning_project.model.domain.Discount;
import d9.traning_project.model.dto.request.DiscountRequest;
import d9.traning_project.model.dto.response.DiscountResponse;
import d9.traning_project.repository.*;
import d9.traning_project.service.GenericService;
import d9.traning_project.service.mapper.DiscountMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import java.util.List;
import java.util.Optional;

@Service
public class DiscountService extends GenericService<DiscountRequest, DiscountResponse, DiscountRepository, DiscountMapper> {

    @Autowired
    private DiscountRepository discountRepository;

    @Autowired
    private DiscountMapper discountMapper;

    @Override
    public DiscountResponse save(DiscountRequest discountRequest) throws EntityExistsException {
        Discount discount = discountRepository.save(discountMapper.toEntity(discountRequest));

        return discountMapper.toResponse(discount);
    }

    public DiscountResponse updateStatus(Long id) throws NotFoundException {
        Optional<Discount> optionalDiscount = discountRepository.findById(id);
        if (!optionalDiscount.isPresent()) {
            throw new NotFoundException(Discount.class);
        }
        Discount discount = optionalDiscount.get();
        discount.setStatus(!discount.isStatus());
        discountRepository.save(discount);
        return discountMapper.toResponse(discount);
    }

    @Override
    public DiscountResponse update(DiscountRequest discountRequest, Long id) throws NotFoundException {
        Optional<Discount> optionalDiscount = discountRepository.findById(id);
        if (!optionalDiscount.isPresent()) {
            throw new NotFoundException(Discount.class);
        }
        Discount discount = optionalDiscount.get();
        if (discountRequest != null) {
            discount.setDiscountCode(discountRequest.getDiscountCode());
            discount.setDiscountPercent(discountRequest.getDiscountPercent());
            discount.setStock(discountRequest.getStock());
            discountRepository.save(discount);
        }
        return discountMapper.toResponse(discount);
    }

    public List<Discount> search(String discountCode) {
        return discountRepository.search(discountCode);
    }
}