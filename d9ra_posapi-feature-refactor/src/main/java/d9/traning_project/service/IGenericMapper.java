package d9.traning_project.service;

public interface IGenericMapper<T, K, V> {
    T toEntity(K k);

    V toResponse(T t);
}
