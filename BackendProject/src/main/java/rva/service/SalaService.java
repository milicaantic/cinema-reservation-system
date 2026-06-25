package rva.service;

import java.util.List;
import rva.model.Sala;

public interface SalaService extends CrudService<Sala, Long> {

    List<Sala> findByKapacitetGreaterThan(int kapacitet);

    List<Sala> findByBrojRedova(int brojRedova);

}