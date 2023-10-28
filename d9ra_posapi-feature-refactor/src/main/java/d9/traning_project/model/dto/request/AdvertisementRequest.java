package d9.traning_project.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdvertisementRequest extends BaseRequest {

    private String name;

    private MultipartFile imgUrlSlider;
}
