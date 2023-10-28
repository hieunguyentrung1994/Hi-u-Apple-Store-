package d9.traning_project.repository;

import d9.traning_project.model.domain.Users;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends GenericRepository<Users> {
    Optional<Users> findByEmail(String email);

    @Query("SELECT u FROM Users u WHERE u.email LIKE %?1%")
    List<Users> findUsersByEmailCharacter(String character);

    @Query("SELECT count(u) FROM Users u JOIN u.roles r WHERE r.id <> 1")
    int countCustommer();
}
