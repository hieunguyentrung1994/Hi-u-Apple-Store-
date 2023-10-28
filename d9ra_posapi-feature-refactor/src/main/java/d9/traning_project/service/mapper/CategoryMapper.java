package d9.traning_project.service.mapper;

import org.springframework.stereotype.Component;
import d9.traning_project.model.domain.Category;
import d9.traning_project.model.dto.request.CategoryRequest;
import d9.traning_project.model.dto.response.CategoryResponse;
import d9.traning_project.service.IGenericMapper;

@Component
public class CategoryMapper implements IGenericMapper<Category, CategoryRequest, CategoryResponse> {

    @Override
    public Category toEntity(CategoryRequest categoryRequest) {
        return Category.builder()
                .name(categoryRequest.getName())
                .status(true).build();
    }

    @Override
    public CategoryResponse toResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .status(category.isStatus()).build();
    }
}