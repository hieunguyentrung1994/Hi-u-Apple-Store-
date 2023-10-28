package d9.traning_project.controller;

import d9.traning_project.exception.NotFoundException;
import d9.traning_project.model.dto.request.FormEditUser;
import d9.traning_project.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import d9.traning_project.model.domain.Users;
import d9.traning_project.service.IUserService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    IUserService userService;

    @Autowired
    UserService service;

    @GetMapping
    public ResponseEntity<List<Users>> getUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PutMapping("/lock/{id}")
    public ResponseEntity<Users> lockUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.lockUser(id));
    }

    @PostMapping("/edit")
    public ResponseEntity<Users> editUser(@RequestBody FormEditUser user) throws NotFoundException {
        return ResponseEntity.ok(userService.editUser(user));
    }

    @GetMapping("/search/{email}")
    public ResponseEntity<List<Users>> search(@PathVariable String email) {
        return ResponseEntity.ok(userService.search(email));
    }

    @GetMapping("/countCustomer")
    public int countCustomer() {
        return service.getCountCustommer();
    }
}
