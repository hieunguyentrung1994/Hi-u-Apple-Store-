package d9.traning_project.repository;


import d9.traning_project.model.domain.Category;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends GenericRepository<Category> {
    @Query("SELECT c FROM Category c WHERE c.name LIKE %:categoryName%")
    List<Category> search(@Param("categoryName") String categoryName);

    boolean existsCategoryByName(String categoryName);

};