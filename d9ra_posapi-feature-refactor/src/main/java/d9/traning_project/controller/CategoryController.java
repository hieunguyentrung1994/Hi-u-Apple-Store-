package d9.traning_project.controller;

import d9.traning_project.exception.ExistedException;
import d9.traning_project.model.domain.Category;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import d9.traning_project.model.dto.request.CategoryRequest;
import d9.traning_project.model.dto.response.CategoryResponse;
import d9.traning_project.service.impl.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@CrossOrigin("*")
public class CategoryController extends BaseController<CategoryRequest, CategoryResponse, CategoryService> {

    @PutMapping("/ChangeStatus/{id}")
    public ResponseEntity<CategoryResponse> updateStatus(@PathVariable Long id) throws ExistedException {
        return new ResponseEntity<>(service.updateStatus(id), HttpStatus.CREATED);
    }

    @GetMapping("/search/{categoryName}")
    public List<Category> searchCategories(@PathVariable String categoryName) {
        return service.search(categoryName);
    }
}