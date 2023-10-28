package d9.traning_project.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdvertisementResponse extends BaseResponse {
    private Long id;

    private String name;

    private String imgUrlSlider;
}

















