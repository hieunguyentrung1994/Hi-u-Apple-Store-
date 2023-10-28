package d9.traning_project.repository;

import d9.traning_project.model.domain.OrderDetail;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderDetailRepository extends GenericRepository<OrderDetail> {

    @Query("select od from OrderDetail od join Order o on od.order.id = o.id where o.id = :idOrder ")
    List<OrderDetail> getOrderDetail(@Param("idOrder") Long idOrder);
}
