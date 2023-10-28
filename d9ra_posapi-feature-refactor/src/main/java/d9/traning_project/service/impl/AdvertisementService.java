package d9.traning_project.service.impl;

import d9.traning_project.exception.BadRequestException;
import d9.traning_project.model.domain.Advertisement;
import d9.traning_project.model.dto.request.AdvertisementRequest;
import d9.traning_project.model.dto.response.AdvertisementResponse;
import d9.traning_project.repository.AdvertisementRepository;

import d9.traning_project.service.GenericService;
import d9.traning_project.service.mapper.AdvertisementMapper;
import d9.traning_project.service.upload_aws.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public class AdvertisementService extends GenericService<AdvertisementRequest, AdvertisementResponse, AdvertisementRepository, AdvertisementMapper> {

    @Autowired
    private StorageService storageService;

    @Override
    public AdvertisementResponse save(AdvertisementRequest advertisementRequest) throws BadRequestException {
        if (advertisementRequest.getName() == null || advertisementRequest.getImgUrlSlider() == null) {
            throw new BadRequestException(Advertisement.class);
        }
        MultipartFile img = advertisementRequest.getImgUrlSlider();
        storageService.uploadFile(img);
        Advertisement a = mapper.toEntity(advertisementRequest);
        a.setImgUrlSlider("https://giangdt.s3.us-east-2.amazonaws.com/" + img.getOriginalFilename());
        Advertisement advertisement;
        try {
            advertisement = repository.save(a);
        } catch (Exception e) {
            throw new BadRequestException(Advertisement.class);
        }

        return mapper.toResponse(advertisement);
    }

    @Override
    public AdvertisementResponse update(AdvertisementRequest advertisementRequest, Long id) throws BadRequestException {
        Optional<Advertisement> a = repository.findById(id);
        Advertisement advertisement = a.get();
        if (advertisementRequest.getName() == null || advertisementRequest.getImgUrlSlider() == null) {
            throw new BadRequestException(Advertisement.class);
        }
        Advertisement advertisement1 = mapper.toEntity(advertisementRequest);
        MultipartFile img = advertisementRequest.getImgUrlSlider();
        storageService.uploadFile(img);
        advertisement.setName(advertisement1.getName());
        advertisement.setImgUrlSlider("https://giangdt.s3.us-east-2.amazonaws.com/" + advertisement1.getImgUrlSlider());
        try {
            advertisement = repository.save(advertisement);
        } catch (Exception e) {
            throw new BadRequestException(Advertisement.class);
        }
        return mapper.toResponse(advertisement);
    }

    @Override
    public boolean delete(Long id) {
        return true;
    }
}
