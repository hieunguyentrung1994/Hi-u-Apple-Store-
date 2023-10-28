package d9.traning_project.repository;

import d9.traning_project.model.domain.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends GenericRepository<Product> {

    @Query("select p from Product p where p.productName like %:productName%")
    List<Product> search(@Param("productName") String productName);

    @Query("SELECT p FROM Product p JOIN OrderDetail o ON o.product.id = p.id GROUP BY p.id ORDER BY SUM(o.quantity) DESC")
    List<Product> getBestSeller();

    @Query("SELECT p,od.quantity FROM Product p JOIN OrderDetail od ON p.id = od.product.id where od.order.id = :idOrder")
    List<Product> findProductByOrderId(@Param("idOrder") Long idOder);
}
