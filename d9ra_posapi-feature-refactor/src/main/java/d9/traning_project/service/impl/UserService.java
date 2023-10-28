package d9.traning_project.service.impl;

import d9.traning_project.exception.NotFoundException;
import d9.traning_project.model.domain.*;
import d9.traning_project.model.dto.request.FormEditUser;
import d9.traning_project.model.dto.request.FormSignUpDto;
import d9.traning_project.repository.UserRepository;
import d9.traning_project.service.IRoleService;
import d9.traning_project.service.IUserService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IRoleService roleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Users> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<Users> findByEmail(String username) {
        return userRepository.findByEmail(username);
    }

    @Override
    public Users save(FormSignUpDto users) throws NotFoundException {
        // lấy ra danh sách các quyền và chuyển thành đối tượng Users
        Set<Role> roles = new HashSet<>();
        if (users.getRoles() == null || users.getRoles().isEmpty()) {
            roles.add(roleService.findByRoleName(RoleName.ROLE_USER));
        } else {
            users.getRoles().stream().forEach(
                    role -> {
                        switch (role) {
                            case "admin":
                                try {
                                    roles.add(roleService.findByRoleName(RoleName.ROLE_ADMIN));
                                } catch (NotFoundException e) {
                                    throw new RuntimeException(e);
                                }
                            case "users":
                                try {
                                    roles.add(roleService.findByRoleName(RoleName.ROLE_USER));
                                } catch (NotFoundException e) {
                                    throw new RuntimeException(e);
                                }
                        }
                    });
        }

        Users newUsers = Users.builder()
                .fullName(users.getFullName())
                .phone(users.getPhone())
                .email(users.getEmail())
                .password(passwordEncoder.encode(users.getPassword()))
                .status(true)
                .roles(roles)
                .verification_code(RandomStringUtils.randomAlphabetic(6))
                .provider(Provider.LOCAL)
                .verification_status(false)
                .build();

        return userRepository.save(newUsers);
    }

    @Override
    public Users editUser(FormEditUser user) throws NotFoundException {
        Optional<Users> users = userRepository.findByEmail(user.getEmail());
        Users u = users.get();
        if (!passwordEncoder.matches(u.getPassword(), user.getPassword())) {
            throw new NotFoundException(Users.class);
        } else {
            if (user.getPhone() != null) {
                u.setPhone(user.getPhone());
            }
            u.setPassword(passwordEncoder.encode(user.getNewPassword()));
            if (user.getFullName() != null) {
                u.setFullName(user.getFullName());
            }
            return userRepository.save(u);
        }
    }

    @Override
    public Users lockUser(Long id) {
        Optional<Users> user = userRepository.findById(id);
        Users u = user.get();
        u.setStatus(!u.isStatus());
        return userRepository.save(u);
    }

    @Override
    public List<Users> search(String email) {
        return userRepository.findUsersByEmailCharacter(email);
    }

    public int getCountCustommer() {
        return userRepository.countCustommer();
    }
}
