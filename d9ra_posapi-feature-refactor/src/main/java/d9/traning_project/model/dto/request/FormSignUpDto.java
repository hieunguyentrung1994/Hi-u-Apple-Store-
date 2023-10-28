package d9.traning_project.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FormSignUpDto extends FormSignInDto{

    private String email;

    private String fullName;

    private String phone;

    @NotNull(message = "Please enter password")

    @Size(min=8,message = "Password must be 8 characters at least")

    private String password;

    private List<String> roles;

}
