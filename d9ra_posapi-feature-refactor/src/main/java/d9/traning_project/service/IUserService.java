package d9.traning_project.service;

import d9.traning_project.exception.NotFoundException;
import d9.traning_project.model.dto.request.FormEditUser;
import d9.traning_project.model.domain.Users;
import d9.traning_project.model.dto.request.FormSignUpDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface IUserService {
    List<Users> findAll();

    Optional<Users> findByEmail(String username);

    Users save(FormSignUpDto users) throws NotFoundException;

    Users lockUser(Long id);

    Users editUser(FormEditUser user) throws NotFoundException;

    List<Users> search(String email);

}
