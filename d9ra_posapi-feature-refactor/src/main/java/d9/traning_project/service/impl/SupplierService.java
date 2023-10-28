package d9.traning_project.service.impl;

import d9.traning_project.exception.ExistedException;
import d9.traning_project.model.domain.Suppliers;
import d9.traning_project.model.dto.request.SupplierRequest;
import d9.traning_project.model.dto.response.SupplierResponse;
import d9.traning_project.repository.SupplierRepository;
import d9.traning_project.service.GenericService;
import d9.traning_project.service.mapper.SupplierMapper;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import java.util.List;
import java.util.Optional;

@Service
public class SupplierService extends GenericService<SupplierRequest, SupplierResponse, SupplierRepository, SupplierMapper> {
    
    @Override
    public SupplierResponse save(SupplierRequest supplierRequest) throws ExistedException {
        if (repository.existsSupplierByName(supplierRequest.getName())) {
            throw new ExistedException(Suppliers.class);
        }
        Suppliers suppliers = repository.save(mapper.toEntity(supplierRequest));

        return mapper.toResponse(suppliers);
    }
    
    public SupplierResponse updateStatus(Long id) throws EntityExistsException, ExistedException {
        Optional<Suppliers> optionalSuppliers = repository.findById(id);
        if (!optionalSuppliers.isPresent()) {
            throw new ExistedException(Suppliers.class);
        }
        Suppliers suppliers = optionalSuppliers.get();
        suppliers.setStatus(!suppliers.isStatus());
        repository.save(suppliers);
        return mapper.toResponse(suppliers);
    }

    public SupplierResponse update(SupplierRequest supplierRequest, Long id) throws ExistedException {
        Optional<Suppliers> optionalSuppliers = repository.findById(id);
        if (!optionalSuppliers.isPresent()) {
            throw new ExistedException(Suppliers.class);
        }
        Suppliers suppliers = optionalSuppliers.get();
        if (supplierRequest.getName() != null) {
            suppliers.setName(supplierRequest.getName());
        }
        repository.save(suppliers);
        return mapper.toResponse(suppliers);
    }

    public List<Suppliers> search(String supplierName) {
        return repository.search(supplierName);
    }
}
