package d9.traning_project.controller;

import d9.traning_project.exception.ExistedException;
import d9.traning_project.exception.NotFoundException;
import d9.traning_project.model.dto.request.ProductRequest;
import d9.traning_project.model.dto.response.ProductResponse;
import d9.traning_project.service.impl.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController extends BaseController<ProductRequest, ProductResponse, ProductService> {

    @PostMapping("/add")
    public ResponseEntity<ProductResponse> addProduct(@ModelAttribute ProductRequest productRequest
    ) throws ExistedException {
        return ResponseEntity.ok(service.save(productRequest));
    }

    @PutMapping("/changeStt/{id}")
    public ResponseEntity<?> changeSttProduct(@PathVariable Long id) throws NotFoundException {
        return new ResponseEntity<>(service.changeStatus(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@ModelAttribute ProductRequest productRequest
            , @PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(service.update(productRequest, id));
    }

    @GetMapping("/search/{productName}")
    public ResponseEntity<List<ProductResponse>> search(@PathVariable String productName) {
        return new ResponseEntity<>(service.search(productName), HttpStatus.OK);
    }

    @GetMapping("/searchByCategory/{categoryId}")
    public ResponseEntity<List<ProductResponse>> searchByCategory(@PathVariable Long categoryId) {
        return new ResponseEntity<>(service.searchByCategory(categoryId), HttpStatus.OK);
    }

    @GetMapping("/bestSell")
    public ResponseEntity<List<ProductResponse>> bestSell() {
        return new ResponseEntity<>(service.getBestSeller(), HttpStatus.OK);
    }

    @GetMapping("/orderDetail/{idOrder}")
    public ResponseEntity<?> getOrderDetail(@PathVariable Long idOrder) {
        return new ResponseEntity<>(service.getOrderDetail(idOrder), HttpStatus.OK);
    }
}
