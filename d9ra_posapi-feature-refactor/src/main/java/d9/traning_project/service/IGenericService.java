package d9.traning_project.service;

import d9.traning_project.exception.*;
import d9.traning_project.model.dto.request.BaseRequest;
import d9.traning_project.model.dto.response.BaseResponse;

import java.util.List;

public interface IGenericService<T extends BaseRequest,K extends BaseResponse> {
    List<K> findAll();

    K findById(Long id);

    K save(T t) throws BadRequestException, ExistedException;

    K update(T t, Long id) throws NotFoundException, BadRequestException, ExistedException;

    boolean delete(Long id);
}
