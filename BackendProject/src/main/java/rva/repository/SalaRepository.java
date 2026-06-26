package rva.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rva.model.Sala;

@Repository
public interface SalaRepository extends JpaRepository<Sala, Long> {

    List<Sala> findByKapacitetGreaterThan(int kapacitet);

    List<Sala> findByBrojRedova(int brojRedova);

    List<Sala> findByBioskopId(Long id);


}