package rva.service;

import java.util.List;

public interface CrudService<T, ID> {

    List<T> findAll();

    T findById(ID id);
    
	boolean existsById(long id);

    T save(T entity);

    T update(T entity);

    void delete(ID id);
}
