package d9.traning_project.service.mapper;

import d9.traning_project.model.domain.Advertisement;
import d9.traning_project.model.dto.request.AdvertisementRequest;
import d9.traning_project.model.dto.response.AdvertisementResponse;
import d9.traning_project.service.IGenericMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AdvertisementMapper implements IGenericMapper<Advertisement, AdvertisementRequest, AdvertisementResponse> {
    @Override
    public Advertisement toEntity(AdvertisementRequest advertisementRequest) {
        return Advertisement.builder().name(advertisementRequest.getName())
                .imgUrlSlider(advertisementRequest.getImgUrlSlider().getOriginalFilename()).build();
    }

    @Override
    public AdvertisementResponse toResponse(Advertisement advertisement) {
        return AdvertisementResponse.builder().id(advertisement.getId())
                .imgUrlSlider(advertisement.getImgUrlSlider())
                .name(advertisement.getName()).build();
    }
}
