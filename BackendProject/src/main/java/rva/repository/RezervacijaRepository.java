package rva.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rva.model.Rezervacija;

@Repository
public interface RezervacijaRepository extends JpaRepository<Rezervacija, Long> {

    List<Rezervacija> findByPlaceno(boolean placeno);

    List<Rezervacija> findByDatum(Date datum);

    List<Rezervacija> findByBrojOsobaGreaterThan(int brojOsoba);

}