package rva.implementation;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
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
    @Transactional
    public Rezervacija update(Rezervacija r) {

        Rezervacija existing = rezervacijaRepository.findById(r.getId())
                .orElse(null);

        if (existing == null) {
            return null;
        }

        existing.setBrojOsoba(r.getBrojOsoba());
        existing.setCenaKarte(r.getCenaKarte());
        existing.setDatum(r.getDatum());
        existing.setPlaceno(r.isPlaceno());

        existing.setFilm(r.getFilm());
        existing.setSala(r.getSala());

        return rezervacijaRepository.save(existing);
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