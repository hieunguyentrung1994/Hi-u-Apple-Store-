package d9.traning_project.controller;

import d9.traning_project.exception.NotFoundException;
import d9.traning_project.model.domain.Discount;
import d9.traning_project.model.dto.request.DiscountRequest;
import d9.traning_project.model.dto.response.DiscountResponse;
import d9.traning_project.service.impl.DiscountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/discount")
@CrossOrigin("*")
public class DiscountController extends BaseController<DiscountRequest, DiscountResponse, DiscountService> {
    @PostMapping
    public ResponseEntity<DiscountResponse> create(@RequestBody @Valid DiscountRequest discountRequest) {
        return new ResponseEntity<>(service.save(discountRequest), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiscountResponse> update(@RequestBody @Valid DiscountRequest discountRequest, @PathVariable Long id) throws NotFoundException {
        return new ResponseEntity<>(service.update(discountRequest, id), HttpStatus.CREATED);
    }

    @PutMapping("/ChangeStatus/{id}")
    public ResponseEntity<DiscountResponse> updateStatus(@PathVariable Long id) throws NotFoundException {
        return new ResponseEntity<>(service.updateStatus(id), HttpStatus.CREATED);
    }

    @GetMapping("/search/{discountCode}")
    public List<Discount> search(@PathVariable String discountCode) {
        return service.search(discountCode);
    }

}