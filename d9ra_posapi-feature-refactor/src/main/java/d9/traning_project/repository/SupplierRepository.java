package d9.traning_project.repository;


import d9.traning_project.model.domain.Suppliers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierRepository extends GenericRepository<Suppliers> {

    @Query("SELECT s FROM Suppliers s WHERE s.name LIKE %:supplierName%")
    List<Suppliers> search(@Param("supplierName") String supplierName);

    boolean existsSupplierByName(String supplierName);

};
