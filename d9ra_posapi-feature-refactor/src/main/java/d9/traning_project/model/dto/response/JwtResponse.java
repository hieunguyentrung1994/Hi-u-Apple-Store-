package d9.traning_project.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
    private String token;

    private String type = "Bearer";

    private String email;

    private String phone;

    private String password;

    private String fullName;

    private boolean status;

    private boolean verificationStatus;

    private List<String> roles = new ArrayList<>();

}
