package d9.traning_project.service.mapper;

import d9.traning_project.model.domain.Suppliers;
import d9.traning_project.model.dto.request.SupplierRequest;
import d9.traning_project.model.dto.response.SupplierResponse;
import d9.traning_project.service.IGenericMapper;
import org.springframework.stereotype.Component;

@Component
public class SupplierMapper implements IGenericMapper<Suppliers, SupplierRequest, SupplierResponse> {

    @Override
    public Suppliers toEntity(SupplierRequest supplierRequest) {
        return Suppliers.builder()
                .name(supplierRequest.getName())
                .status(true).build();
    }

    @Override
    public SupplierResponse toResponse(Suppliers suppliers) {
        return SupplierResponse.builder()
                .id(suppliers.getId())
                .name(suppliers.getName())
                .status(suppliers.isStatus()).build();
    }
}
