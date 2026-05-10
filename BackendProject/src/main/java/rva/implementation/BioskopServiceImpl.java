package rva.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import rva.model.Bioskop;
import rva.repository.BioskopRepository;
import rva.service.BioskopService;

@Service
public class BioskopServiceImpl implements BioskopService {

    @Autowired
    private BioskopRepository bioskopRepository;

    @Override
    public List<Bioskop> findAll() {
        return bioskopRepository.findAll();
    }
    
	@Override
	public boolean existsById(long id) {
		return bioskopRepository.existsById(id);
	}
    @Override
    public Bioskop findById(Long id) {
        return bioskopRepository.findById(id).orElse(null);
    }

    @Override
    public Bioskop save(Bioskop bioskop) {
        return bioskopRepository.save(bioskop);
    }

    @Override
    public Bioskop update(Bioskop bioskop) {
        if (bioskopRepository.existsById(bioskop.getId())) {
            return bioskopRepository.save(bioskop);
        }
        throw new RuntimeException("Bioskop not found");
    }

    @Override
    public void delete(Long id) {
        bioskopRepository.deleteById(id);
    }

    @Override
    public List<Bioskop> findByNaziv(String naziv) {
        return bioskopRepository.findByNaziv(naziv);
    }

    @Override
    public List<Bioskop> findByAdresaContaining(String adresa) {
        return bioskopRepository.findByAdresaContainingIgnoreCase(adresa);
    }
}