package d9.traning_project.service.impl;

import d9.traning_project.exception.ExistedException;
import d9.traning_project.repository.CategoryRepository;
import d9.traning_project.service.GenericService;
import org.springframework.stereotype.Service;
import d9.traning_project.model.domain.Category;
import d9.traning_project.model.dto.request.CategoryRequest;
import d9.traning_project.model.dto.response.CategoryResponse;
import d9.traning_project.service.mapper.CategoryMapper;

import javax.persistence.EntityExistsException;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService extends GenericService<CategoryRequest, CategoryResponse, CategoryRepository, CategoryMapper> {

    @Override
    public CategoryResponse save(CategoryRequest categoryRequest) throws ExistedException {
        if (repository.existsCategoryByName(categoryRequest.getName())) {
            throw new ExistedException(Category.class);
        }
        Category category = repository.save(mapper.toEntity(categoryRequest));
        return mapper.toResponse(category);
    }

    @Override
    public CategoryResponse update(CategoryRequest categoryRequest, Long id) {
        try {
            Optional<Category> entity = repository.findById(id);
            if (entity.isPresent()) {
                Category category = mapper.toEntity(categoryRequest);
                category.setId(entity.get().getId());
                repository.save(category);
            }
            return mapper.toResponse(entity.get());
        } catch (Exception e) {
            e.getMessage();
        }
        return null;
    }

    public CategoryResponse updateStatus(Long id) throws ExistedException {
        Optional<Category> optionalCategory = repository.findById(id);
        if (!optionalCategory.isPresent()) {
            throw new ExistedException(Category.class);
        }
        Category category = optionalCategory.get();
        category.setStatus(!category.isStatus());
        repository.save(category);
        return mapper.toResponse(category);
    }

    public List<Category> search(String categoryName) {
        return repository.search(categoryName);
    }

}