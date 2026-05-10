package rva.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rva.model.Sala;
import rva.repository.SalaRepository;
import rva.service.SalaService;

@Component
public class SalaServiceImpl implements SalaService {

    @Autowired
    private SalaRepository salaRepository;

    @Override
    public List<Sala> findAll() {
        return salaRepository.findAll();
    }

    @Override
    public Sala findById(Long id) {
        return salaRepository.findById(id).orElse(null);
    }

    @Override
    public boolean existsById(long id) {
        return salaRepository.existsById(id);
    }

    @Override
    public Sala save(Sala sala) {
        return salaRepository.save(sala);
    }

    @Override
    public Sala update(Sala sala) {

        if (salaRepository.existsById(sala.getId())) {
            return salaRepository.save(sala);
        }

        throw new RuntimeException("Sala not found");
    }

    @Override
    public void delete(Long id) {
        salaRepository.deleteById(id);
    }

    @Override
    public List<Sala> findByKapacitetGreaterThan(int kapacitet) {
        return salaRepository.findByKapacitetGreaterThan(kapacitet);
    }

    @Override
    public List<Sala> findByBrojRedova(int brojRedova) {
        return salaRepository.findByBrojRedova(brojRedova);
    }

}