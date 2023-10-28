package d9.traning_project.service.mapper;

import d9.traning_project.model.domain.Category;
import d9.traning_project.model.domain.Product;
import d9.traning_project.model.domain.Suppliers;
import d9.traning_project.model.dto.request.ProductRequest;
import d9.traning_project.model.dto.response.ProductResponse;
import d9.traning_project.repository.CategoryRepository;

import d9.traning_project.repository.SupplierRepository;
import d9.traning_project.service.IGenericMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ProductMapper implements IGenericMapper<Product, ProductRequest, ProductResponse> {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public Product toEntity(ProductRequest productRequest) {
        Long categoryId = productRequest.getCategoryId();
        Optional<Suppliers> suppliersOptional = supplierRepository.findById(productRequest.getSupplierId());
        Suppliers supplier = suppliersOptional.get();
        Product product = Product.builder()
                .productName(productRequest.getProductName())
                .price(productRequest.getPrice())
                .description(productRequest.getDescription())
                .category(categoryRepository.findById(categoryId).get())
                .stock(productRequest.getStock())
                .imgUrlMain(productRequest.getImgUrlMain().getOriginalFilename())
                .supplier(supplier)
                .productStatus(true)
                .build();
        return product;
    }

    @Override
    public ProductResponse toResponse(Product product) {
        Suppliers supplier = product.getSupplier();
        Category category = product.getCategory();
        return ProductResponse.builder()
                .id(product.getId())
                .productName(product.getProductName())
                .price(product.getPrice())
                .description(product.getDescription())
                .stock(product.getStock())
                .imgUrlMain(product.getImgUrlMain())
                .categoryId(category.getId())
                .category(category.getName())
                .status(product.isProductStatus())
                .supplierId(supplier.getId())
                .supplierName(supplier.getName())
                .build();
    }
}
