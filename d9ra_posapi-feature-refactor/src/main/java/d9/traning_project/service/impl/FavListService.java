package d9.traning_project.service.impl;

import d9.traning_project.exception.NotFoundException;
import d9.traning_project.model.domain.Product;
import d9.traning_project.model.domain.Users;
import d9.traning_project.model.dto.response.ProductResponse;
import d9.traning_project.repository.ProductRepository;
import d9.traning_project.repository.UserRepository;
import d9.traning_project.service.IFavListService;
import d9.traning_project.service.mapper.ProductMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavListService implements IFavListService {

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<ProductResponse> addProductToFavourite(Long productId, Users user) {
        Optional<Product> productOptional = productRepository.findById(productId);
        Product product = productOptional.get();
        user.getFavourites().add(product);
        userRepository.save(user);
        return user.getFavourites().stream()
                .map(item -> productMapper.toResponse(item))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> removeProductInFavourite(Long productId, Users users) throws NotFoundException {

        Product product = productRepository.findById(productId).get();
        if (!users.getFavourites().contains(product)) {
            throw new NotFoundException(Product.class);
        }
        users.getFavourites().remove(product);
        return userRepository.save(users).getFavourites().stream()
                .map(item -> productMapper.toResponse(item))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> getFavourite(Users user) {
        return user.getFavourites().stream()
                .map(item -> productMapper.toResponse(item)).collect(Collectors.toList());
    }

    @Override
    public void clearAll(Users user) {
        user.getFavourites().clear();
        userRepository.save(user);

    }
}
