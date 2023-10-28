package d9.traning_project.service.impl;

import d9.traning_project.exception.NotFoundException;
import d9.traning_project.exception.StatusException;
import d9.traning_project.model.domain.CartItem;
import d9.traning_project.model.domain.Product;
import d9.traning_project.model.dto.response.CartResponse;
import d9.traning_project.repository.ProductRepository;
import d9.traning_project.service.mapper.CartMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartItemService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartMapper cartMapper;

    private List<CartItem> cartItemList = new ArrayList<>();
    private Duration cartExpirationDuration = Duration.ofHours(6);
    private Instant cartExpirationTime = Instant.now().plus(cartExpirationDuration);

    public void clearCartList() {
        cartItemList = new ArrayList<>();
    }

    public List<CartResponse> findAll() {
        if (Instant.now().isAfter(cartExpirationTime)) {
            clearCartList();
            cartExpirationTime = Instant.now().plus(cartExpirationDuration);
        }
        return cartItemList.stream()
                .map(c -> cartMapper.toResponse(c)).collect(Collectors.toList());
    }

    // Save Item
    public void save(CartItem cartItem) {
        if (Instant.now().isAfter(cartExpirationTime)) {
            clearCartList();
            cartExpirationTime = Instant.now().plus(cartExpirationDuration);
        }
        CartResponse existingCartItem = findById(cartItem.getId());
        if (existingCartItem == null) {
            cartItemList.add(cartItem);
        } else {
            int index = cartItemList.indexOf(existingCartItem);
            if (index != -1) {
                cartItemList.set(index, cartItem);
            }
        }
    }

    // ADD Product to cart
    public CartItem addCart(Long idProduct) throws NotFoundException, StatusException {
        Product product = productRepository.findById(idProduct)
                .orElseThrow(() -> new NotFoundException(Product.class));
        if (!product.isProductStatus()) {
            throw new StatusException(Product.class);
        }
        CartItem cartItem = findByIdProduct(idProduct);
        if (cartItem == null) {
            cartItem = new CartItem();
            cartItem.setId(getNewId());
            cartItem.setProduct(product);
            cartItem.setQuantity(1);
        } else {
            cartItem.setQuantity(cartItem.getQuantity() + 1);
        }
        save(cartItem);
        return cartItem;
    }

    public CartResponse findById(Long id) {
        for (CartResponse c : findAll()) {
            if (c.getIdCart().equals(id)) {
                return c;
            }
        }
        return null;
    }

    public CartItem findByIdProduct(Long id) {
        for (CartItem c : cartItemList) {
            if (c.getProduct().getId() == id) {
                return c;
            }
        }
        return null;
    }

    public Long getNewId() {
        Long idmax = 0L;
        for (CartItem c : cartItemList) {
            if (idmax < c.getId()) {
                idmax = c.getId();
            }
        }
        return idmax + 1;
    }

    public void deleteById(Long id) throws NotFoundException {
        CartItem cartItem = findByIdProduct(id);
        if (cartItem != null) {
            cartItemList.remove(cartItem);
        } else {
            throw new NotFoundException(CartItem.class);
        }
    }

    public void plusQuantity(Long idProduct) {
        CartItem cartItem = findByIdProduct(idProduct);
        cartItem.setQuantity(cartItem.getQuantity() + 1);
        save(cartItem);
    }

    public void minusQuantity(Long idProduct) throws NotFoundException {
        CartItem cartItem = findByIdProduct(idProduct);
        cartItem.setQuantity(cartItem.getQuantity() - 1);
        if (cartItem.getQuantity() <= 0) {
            deleteById(cartItem.getProduct().getId());
        }
        save(cartItem);
    }

    public void clearCart() {
        cartItemList.clear();
        cartExpirationTime = Instant.now().plus(cartExpirationDuration);
    }
}
