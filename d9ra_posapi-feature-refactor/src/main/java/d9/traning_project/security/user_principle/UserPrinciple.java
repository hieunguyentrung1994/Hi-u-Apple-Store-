package d9.traning_project.security.user_principle;

import com.fasterxml.jackson.annotation.JsonIgnore;
import d9.traning_project.model.domain.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPrinciple implements UserDetails {

    private Long id;

    private String fullName;

    private String email;

    private String phone;

    @JsonIgnore
    private String password;

    private boolean status;

    private String verification_code;

    private boolean verification_status;

    private Collection<? extends GrantedAuthority> authorities;

    public static UserPrinciple build(Users users) {
        List<GrantedAuthority> list = users.getRoles().stream().map(
                role -> new SimpleGrantedAuthority(role.getRoleName().name())).collect(Collectors.toList());
        return UserPrinciple.builder()
                .id(users.getId())
                .fullName(users.getFullName())
                .email(users.getEmail())
                .status(users.isStatus())
                .password(users.getPassword())
                .phone(users.getPhone())
                .verification_code(users.getVerification_code())
                .verification_status(users.isVerification_status())
                .authorities(list).build();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
