package d9.traning_project.service.impl;

import d9.traning_project.exception.NotFoundException;
import d9.traning_project.model.domain.Product;
import d9.traning_project.model.domain.Role;
import d9.traning_project.model.domain.RoleName;
import d9.traning_project.repository.RoleRepository;
import d9.traning_project.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService implements IRoleService {
    @Autowired
    private RoleRepository roleRepository;
    @Override
    public Role findByRoleName(RoleName roleName) throws NotFoundException {
        return roleRepository.findByRoleName(roleName)
                .orElseThrow(() ->new NotFoundException(Role.class));
    }
}
