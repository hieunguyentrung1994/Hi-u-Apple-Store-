package d9.traning_project.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest extends BaseRequest {

    @Column(unique = true)
    private String name;

    private boolean status;
}