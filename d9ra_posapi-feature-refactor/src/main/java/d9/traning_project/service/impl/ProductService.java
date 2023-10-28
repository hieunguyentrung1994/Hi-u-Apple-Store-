package d9.traning_project.service.impl;

import d9.traning_project.exception.ExistedException;
import d9.traning_project.exception.NotFoundException;
import d9.traning_project.model.domain.Category;
import d9.traning_project.model.domain.Product;
import d9.traning_project.model.domain.Suppliers;
import d9.traning_project.model.dto.request.ProductRequest;
import d9.traning_project.model.dto.response.ProductResponse;
import d9.traning_project.repository.CategoryRepository;
import d9.traning_project.repository.ProductRepository;
import d9.traning_project.repository.SupplierRepository;
import d9.traning_project.service.GenericService;
import d9.traning_project.service.mapper.ProductMapper;
import d9.traning_project.service.upload_aws.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService extends GenericService<ProductRequest, ProductResponse, ProductRepository ,ProductMapper> {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private StorageService storageService;

    @Autowired
    private SupplierRepository supplierRepository;


    @Override
    public ProductResponse save(ProductRequest productRequest) throws ExistedException {
        Product product = productMapper.toEntity(productRequest);
        List<ProductResponse> productResponseDtos = findAll();
        for (ProductResponse responseD : productResponseDtos) {
            if (responseD.getProductName().equals(product.getProductName())) {
                throw new ExistedException(Product.class);
            }
        }
        MultipartFile img = productRequest.getImgUrlMain();
        storageService.uploadFile(img);
        product.setImgUrlMain("https://giangdt.s3.us-east-2.amazonaws.com/" + img.getOriginalFilename());
        // Product p = productRepository.save(productMapper.toEntity(productRequest));
        return productMapper.toResponse(productRepository.save(product));
    }

    @Override
    public ProductResponse update(ProductRequest productRequest, Long id) throws NotFoundException {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(Product.class));

        // Copy data from productRequest into old product
        existingProduct.setProductName(productRequest.getProductName());
        existingProduct.setPrice(productRequest.getPrice());
        existingProduct.setStock(productRequest.getStock());
        existingProduct.setDescription(productRequest.getDescription());

        MultipartFile img = productRequest.getImgUrlMain();
        if (img != null) {
            storageService.uploadFile(img);
            existingProduct.setImgUrlMain("https://giangdt.s3.us-east-2.amazonaws.com/" + img.getOriginalFilename());
        } else {
            existingProduct.setImgUrlMain(existingProduct.getImgUrlMain());
        }
        // Handle Category
        Category category = categoryRepository.findById(productRequest.getCategoryId()).get();
        existingProduct.setCategory(category);
        Suppliers supplier = supplierRepository.findById(productRequest.getSupplierId()).get();
        existingProduct.setSupplier(supplier);
        // Save to database
        productRepository.save(existingProduct);

        ProductResponse productResponse = ProductResponse.builder()
                .id(existingProduct.getId())
                .productName(existingProduct.getProductName())
                .price(existingProduct.getPrice())
                .stock(existingProduct.getStock())
                .description(existingProduct.getDescription())
                .imgUrlMain(existingProduct.getImgUrlMain())
                .status(existingProduct.isProductStatus())
                .category(category.getName())
                .categoryId(category.getId())
                .supplierName(existingProduct.getSupplier().getName())
                .supplierId(existingProduct.getSupplier().getId())
                .build();

        return productResponse;
    }

    public ProductResponse changeStatus(Long id) throws NotFoundException {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            product.setProductStatus(!product.isProductStatus());
            productRepository.save(product);
            return productMapper.toResponse(product);
        } else {
            // return exception if product not found
            throw new NotFoundException(Product.class);
        }
    }

    public List<ProductResponse> search(String productName) {
        List<Product> searchProducts = productRepository.search(productName);
        List<ProductResponse> searchProductsResponse = new ArrayList<>();
        for (Product product : searchProducts) {
            searchProductsResponse.add(productMapper.toResponse(product));
        }
        return searchProductsResponse;
    }

    public List<ProductResponse> searchByCategory(Long categoryId) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        Category category = categoryOptional.get();
        List<Product> productList = category.getProducts();
        List<ProductResponse> searchProductsResponse = new ArrayList<>();
        for (Product product : productList) {
            searchProductsResponse.add(productMapper.toResponse(product));
        }
        return searchProductsResponse;
    }

    public List<ProductResponse> getBestSeller() {
        List<Product> products = productRepository.getBestSeller();
        List<ProductResponse> productResponses = new ArrayList<>();
        for (Product product : products) {
            productResponses.add(productMapper.toResponse(product));
        }
        return productResponses;
    }

    public List<ProductResponse> getOrderDetail(Long idOrder) {
        List<Product> products = productRepository.findProductByOrderId(idOrder);
        List<ProductResponse> productResponses = new ArrayList<>();
        for (Product product : products
        ) {
            productResponses.add(productMapper.toResponse(product));

        }
        return productResponses;
    }
}
