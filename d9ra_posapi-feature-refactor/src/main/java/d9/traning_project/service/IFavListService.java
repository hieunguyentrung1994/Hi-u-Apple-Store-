package d9.traning_project.service;

import d9.traning_project.exception.NotFoundException;
import d9.traning_project.model.domain.Users;
import d9.traning_project.model.dto.response.ProductResponse;

import java.util.List;

public interface IFavListService {
    List<ProductResponse> addProductToFavourite(Long productId, Users user);

    List<ProductResponse> removeProductInFavourite(Long productId, Users user) throws NotFoundException;

    List<ProductResponse> getFavourite(Users user);

    void clearAll(Users user);
}
