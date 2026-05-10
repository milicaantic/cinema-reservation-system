package rva.implementation;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rva.model.Rezervacija;
import rva.repository.RezervacijaRepository;
import rva.service.RezervacijaService;

@Service
public class RezervacijaServiceImpl implements RezervacijaService {

    @Autowired
    private RezervacijaRepository rezervacijaRepository;

    @Override
    public List<Rezervacija> findAll() {
        return rezervacijaRepository.findAll();
    }

    @Override
    public Rezervacija findById(Long id) {
        return rezervacijaRepository.findById(id).orElse(null);
    }

    @Override
    public boolean existsById(long id) {
        return rezervacijaRepository.existsById(id);
    }

    @Override
    public Rezervacija save(Rezervacija rezervacija) {
        return rezervacijaRepository.save(rezervacija);
    }

    @Override
    public Rezervacija update(Rezervacija rezervacija) {

        if (rezervacijaRepository.existsById(rezervacija.getId())) {
            return rezervacijaRepository.save(rezervacija);
        }

        throw new RuntimeException("Rezervacija not found");
    }

    @Override
    public void delete(Long id) {
        rezervacijaRepository.deleteById(id);
    }

    @Override
    public List<Rezervacija> findByPlaceno(boolean placeno) {
        return rezervacijaRepository.findByPlaceno(placeno);
    }

    @Override
    public List<Rezervacija> findByDatum(Date datum) {
        return rezervacijaRepository.findByDatum(datum);
    }

    @Override
    public List<Rezervacija> findByBrojOsobaGreaterThan(int brojOsoba) {
        return rezervacijaRepository.findByBrojOsobaGreaterThan(brojOsoba);
    }

}