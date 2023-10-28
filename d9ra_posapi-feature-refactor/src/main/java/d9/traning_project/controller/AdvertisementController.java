package d9.traning_project.controller;

import d9.traning_project.model.dto.request.AdvertisementRequest;
import d9.traning_project.model.dto.response.AdvertisementResponse;
import d9.traning_project.service.impl.AdvertisementService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/Advertisement")
public class AdvertisementController extends BaseController<AdvertisementRequest, AdvertisementResponse, AdvertisementService> {
}
