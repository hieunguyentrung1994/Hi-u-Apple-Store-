package d9.traning_project.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FormVerification extends FormSignInDto{

    private String email;

    private String password;

    private String verificationCode;

}
