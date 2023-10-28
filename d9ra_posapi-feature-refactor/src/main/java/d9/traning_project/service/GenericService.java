package d9.traning_project.service;

import d9.traning_project.model.dto.request.BaseRequest;
import d9.traning_project.model.dto.response.BaseResponse;
import d9.traning_project.repository.GenericRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

public abstract class GenericService<
        T extends BaseRequest, K extends BaseResponse,
        R extends GenericRepository, M extends IGenericMapper> implements IGenericService<T, K> {

    @Autowired
    protected R repository;

    @Autowired
    protected M mapper;

    @Override
    public List<K> findAll() {
        return (List<K>) repository.findAll().stream().map(
                c -> mapper.toResponse(c)).collect(Collectors.toList());
    }

    @Override
    public K findById(Long id) {
        return (K) mapper.toResponse(repository.findById(id).get());
    }

    @Override
    public boolean delete(Long id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
