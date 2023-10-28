package d9.traning_project.service;

import d9.traning_project.exception.NotFoundException;
import d9.traning_project.model.domain.Role;
import d9.traning_project.model.domain.RoleName;

public interface IRoleService {
    Role findByRoleName(RoleName roleName) throws NotFoundException;
}
