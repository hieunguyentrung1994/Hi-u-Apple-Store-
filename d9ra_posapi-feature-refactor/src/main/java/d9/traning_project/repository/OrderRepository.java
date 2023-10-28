package d9.traning_project.repository;

import d9.traning_project.model.domain.Order;
import d9.traning_project.model.dto.response.OrderResponse;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface OrderRepository extends GenericRepository<Order> {
    @Query("SELECT COUNT(o.id) FROM Order o WHERE o.orderDate = :date")
    int countOrderByDate(@Param("date") Date date);

    @Query("SELECT sum (o.totalAmount) FROM Order o " +
            "WHERE o.orderDate = :date AND (o.orderStatusNames != 1 and o.orderStatusNames != 5 and o.orderStatusNames != 6)")
    Double totalByDate(@Param("date") Date date);

    @Query("SELECT COUNT(o.id) FROM Order o WHERE o.orderDate = :date " +
            "AND (o.orderStatusNames != 1 and o.orderStatusNames != 5 and o.orderStatusNames != 6)")
    int countSuccessByDate(@Param("date") Date date);

    @Query("SELECT COUNT(o.id) FROM Order o WHERE o.orderDate = :date and o.orderStatusNames = 1 ")
    int countPendingByDate(@Param("date") Date date);

    @Query("SELECT COUNT(o.id) FROM Order o WHERE o.orderDate = :date and (o.orderStatusNames = 5" +
            "or o.orderStatusNames = 6) ")
    int countCancelByDate(@Param("date") Date date);

    @Query("SELECT sum (o.totalAmount) FROM Order o " +
            "WHERE Month(o.orderDate) = :month AND Year(o.orderDate) = :year And(o.orderStatusNames != 1 and o.orderStatusNames != 5 and o.orderStatusNames != 6)")
    Double totalByMonth(@Param("month") int month, @Param("year") int year);

    @Query("SELECT COUNT(o.id) FROM Order o WHERE Month(o.orderDate) = :month AND year(o.orderDate) = :year")
    int countOrderByMonth(@Param("month") int month, @Param("year") int year);

    @Query("SELECT o from Order o where o.users.email like :email")
    List<Order> getHistory(@Param("email") String email);
}
