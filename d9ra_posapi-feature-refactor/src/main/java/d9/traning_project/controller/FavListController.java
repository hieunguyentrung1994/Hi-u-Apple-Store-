package d9.traning_project.controller;

import d9.traning_project.exception.NotFoundException;
import d9.traning_project.model.domain.Users;
import d9.traning_project.model.dto.response.ProductResponse;
import d9.traning_project.repository.UserRepository;
import d9.traning_project.service.IFavListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/favourite")
public class FavListController {

    @Autowired
    private IFavListService favouriteService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{email}")
    public ResponseEntity<List<ProductResponse>> getFavourite(@PathVariable String email) {

        Optional<Users> user = userRepository.findByEmail(email);
        return new ResponseEntity<>(favouriteService.getFavourite(user.get()), HttpStatus.OK);
    }

    @PostMapping("/{productId}/to/{email}")
    public ResponseEntity<List<ProductResponse>> handleAddProductToFavourite(@PathVariable Long productId,
                                                                             @PathVariable String email) {
        Optional<Users> user = userRepository.findByEmail(email);
        return new ResponseEntity<>(favouriteService.addProductToFavourite(productId, user.get()), HttpStatus.CREATED);
    }

    @DeleteMapping("/{productId}/from/{email}")
    public ResponseEntity<List<ProductResponse>> handleRemoveProductInFavourite(@PathVariable Long productId,
                                                                                @PathVariable String email) throws NotFoundException {
        Optional<Users> user = userRepository.findByEmail(email);
        return new ResponseEntity<>(favouriteService.removeProductInFavourite(productId, user.get()), HttpStatus.OK);
    }

    @DeleteMapping("/{email}")
    public void clearAll(@PathVariable String email) {
        Optional<Users> user = userRepository.findByEmail(email);
        favouriteService.clearAll(user.get());
    }
}
