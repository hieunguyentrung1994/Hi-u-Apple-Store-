package d9.traning_project.controller;

import d9.traning_project.exception.NotFoundException;
import d9.traning_project.exception.StatusException;
import d9.traning_project.service.impl.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartItemService cartService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getCart() {
        return new ResponseEntity<>(cartService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/add/{id}")
    public ResponseEntity<?> addCart(@PathVariable Long id) {
        try {
            cartService.addCart(id);
            return new ResponseEntity<>("Add Product Success", HttpStatus.CREATED);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (StatusException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/removeProduct/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            cartService.deleteById(id);
            return new ResponseEntity<>("Delete Product Success", HttpStatus.OK);
        } catch (NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/plus/{id}")
    public ResponseEntity<?> plusQuantiry(@PathVariable Long id) {
        cartService.plusQuantity(id);
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @PutMapping("/minus/{id}")
    public ResponseEntity<?> minusQuantity(@PathVariable Long id) throws NotFoundException {
        cartService.minusQuantity(id);
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @DeleteMapping("/clearCart")
    public ResponseEntity<?> clearCart() {
        cartService.clearCart();
        return new ResponseEntity<>("Cleared Cart", HttpStatus.OK);
    }
}
