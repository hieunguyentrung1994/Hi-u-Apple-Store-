package d9.traning_project.controller;

import d9.traning_project.exception.*;
import d9.traning_project.model.dto.request.BaseRequest;
import d9.traning_project.model.dto.response.BaseResponse;
import d9.traning_project.service.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

public abstract class BaseController<T extends BaseRequest, K extends BaseResponse, S extends GenericService> {

    @Autowired
    protected S service;

    @GetMapping("")
    public ResponseEntity<List<K>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<K> getOne(@PathVariable Long id) {
        return (ResponseEntity<K>) ResponseEntity.ok(service.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<K> update(@Valid @RequestBody T updated, @PathVariable Long id) throws NotFoundException, ExistedException, BadRequestException {
        return (ResponseEntity<K>) ResponseEntity.ok(service.update(updated, id));
    }

    @PostMapping("")
    public ResponseEntity<K> create(@Valid @RequestBody T created) throws ExistedException, BadRequestException {
        return (ResponseEntity<K>) ResponseEntity.ok(service.save(created));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("Ok");
    }
}
