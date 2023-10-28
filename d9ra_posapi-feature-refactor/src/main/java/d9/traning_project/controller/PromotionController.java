package d9.traning_project.controller;

import d9.traning_project.model.dto.request.PromotionRequest;
import d9.traning_project.model.dto.response.PromotionResponse;
import d9.traning_project.service.impl.PromotionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promotion")
public class PromotionController extends BaseController<PromotionRequest,PromotionResponse, PromotionService> {

    @GetMapping("/all")
    public ResponseEntity<List<PromotionResponse>> showAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @PutMapping("/changes/{id}")
    public ResponseEntity<?> changesStatus(@PathVariable Long id){
        try {
            return new ResponseEntity<>(service.changeStatus(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}