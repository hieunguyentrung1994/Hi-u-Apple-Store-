package d9.traning_project.model.dto.request;

import d9.traning_project.model.domain.Product;
import d9.traning_project.model.domain.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavListRequest  {

    Users user;

    List<Product> products;

}
