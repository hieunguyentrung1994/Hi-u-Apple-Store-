package d9.traning_project.controller;

import d9.traning_project.exception.ExistedException;
import d9.traning_project.model.domain.Suppliers;
import d9.traning_project.model.dto.request.SupplierRequest;
import d9.traning_project.model.dto.response.SupplierResponse;
import d9.traning_project.service.impl.SupplierService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supplier")
@CrossOrigin("*")
public class SupplierController extends BaseController<SupplierRequest, SupplierResponse, SupplierService> {

    @PutMapping("/ChangeStatus/{id}")
    public ResponseEntity<SupplierResponse> updateStatus(@PathVariable Long id) throws ExistedException {
        return new ResponseEntity<>(service.updateStatus(id), HttpStatus.CREATED);
    }

    @GetMapping("/search/{supplierName}")
    public List<Suppliers> search(@PathVariable String supplierName) {
        return service.search(supplierName);
    }

}
