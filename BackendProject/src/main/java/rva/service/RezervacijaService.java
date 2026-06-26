package rva.service;

import java.sql.Date;
import java.util.List;

import rva.model.Rezervacija;

public interface RezervacijaService extends CrudService<Rezervacija, Long> {

    List<Rezervacija> findByPlaceno(boolean placeno);

    List<Rezervacija> findByDatum(Date datum);

    List<Rezervacija> findByBrojOsobaGreaterThan(int brojOsoba);

    List<Rezervacija> findBySalaId(Long id);

}