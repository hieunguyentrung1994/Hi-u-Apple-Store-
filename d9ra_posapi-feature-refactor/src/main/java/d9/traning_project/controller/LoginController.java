package d9.traning_project.controller;

import d9.traning_project.exception.LoginException;
import d9.traning_project.exception.NotFoundException;
import d9.traning_project.model.domain.Users;
import d9.traning_project.model.dto.request.FormSignInDto;
import d9.traning_project.model.dto.request.FormSignUpDto;
import d9.traning_project.model.dto.request.FormVerification;
import d9.traning_project.model.dto.response.JwtResponse;
import d9.traning_project.repository.UserRepository;
import d9.traning_project.security.jwt.JwtProvider;
import d9.traning_project.security.user_principle.UserPrinciple;
import d9.traning_project.service.IUserService;
import d9.traning_project.service.impl.MailService;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private IUserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private MailService mailService;

    @GetMapping("/home")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("vào được rồi nè");
    }

    @PostMapping("/sign-in")
    public ResponseEntity<JwtResponse> signin(@RequestBody FormSignInDto formSignInDto) throws LoginException {
        Authentication authentication = null;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(formSignInDto.getEmail(), formSignInDto.getPassword()));
        } catch (AuthenticationException e) {
            throw new LoginException("Email or password is incorrect");
        }
        UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
        if (!userPrinciple.isVerification_status()) {
            throw new LoginException("Your account has`t been verification yet");
        }
        if (!userPrinciple.isStatus()) {
            throw new LoginException("Your account has been blocked");
        }
        String token = jwtProvider.generateToken(userPrinciple);
        List<String> roles = userPrinciple.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        return ResponseEntity.ok(JwtResponse.builder().token(token)
                .fullName(userPrinciple.getFullName())
                .email(userPrinciple.getEmail())
                .phone(userPrinciple.getPhone())
                .roles(roles)
                .type("Bearer")
                .status(userPrinciple.isStatus())
                .password(formSignInDto.getPassword())
                .verificationStatus(userPrinciple.isVerification_status())
                .build());
    }

    @PostMapping("/sign-up")
    private ResponseEntity<String> signup(@Valid @RequestBody FormSignUpDto formSignUpDto) throws NotFoundException {
        List<Users> usersList = userRepository.findAll();
        boolean isExisted = false;
        for (Users user : usersList) {
            if (user.getEmail().equals(formSignUpDto.getEmail())) {
                isExisted = true;
                break;
            }
        }
        if (isExisted) {
            return new ResponseEntity("Email already existed", HttpStatus.BAD_REQUEST);
        }
        userService.save(formSignUpDto);
        Optional<Users> user = userService.findByEmail(formSignUpDto.getEmail());
        mailService.sendEmail(formSignUpDto.getEmail(), "Verification code",
                "<h2>Thank you for register our shop</h2>" +
                        "<b/>This is your verification code: " + user.get().getVerification_code());
        return new ResponseEntity("Register successful. Please check your email", HttpStatus.CREATED);
    }

    @PostMapping("/verification")
    private ResponseEntity<String> registerVerification(@RequestBody FormVerification formVerification)
            throws LoginException {
        Optional<Users> user = userService.findByEmail(formVerification.getEmail());
        Users newUsers = user.get();
        if (formVerification.getVerificationCode().equals(newUsers.getVerification_code())) {
            newUsers.setVerification_status(true);
            userRepository.save(newUsers);
            return new ResponseEntity("Successful", HttpStatus.CREATED);
        }
        throw new LoginException("Verification code not match");
    }
}
