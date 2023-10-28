package d9.traning_project.repository;

import d9.traning_project.model.domain.Role;
import d9.traning_project.model.domain.RoleName;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface RoleRepository extends GenericRepository<Role> {

    Optional<Role> findByRoleName(RoleName roleName);
}
