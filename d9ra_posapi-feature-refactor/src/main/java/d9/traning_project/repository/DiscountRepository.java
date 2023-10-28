package d9.traning_project.repository;


import d9.traning_project.model.domain.Discount;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscountRepository extends GenericRepository<Discount> {

    @Query("SELECT d FROM Discount d WHERE d.discountCode LIKE :discountCode and d.status = true")
    List<Discount> search(@Param("discountCode") String discountCode);

}
