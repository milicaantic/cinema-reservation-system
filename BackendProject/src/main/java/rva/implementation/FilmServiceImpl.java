package rva.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rva.model.Film;
import rva.repository.FilmRepository;
import rva.service.FilmService;

@Service
public class FilmServiceImpl implements FilmService {

    @Autowired
    private FilmRepository filmRepository;

    @Override
    public List<Film> findAll() {
        return filmRepository.findAll();
    }

    @Override
    public Film findById(Long id) {
        return filmRepository.findById(id).orElse(null);
    }

    @Override
    public boolean existsById(long id) {
        return filmRepository.existsById(id);
    }

    @Override
    public Film save(Film film) {
        return filmRepository.save(film);
    }

    @Override
    public Film update(Film film) {

        if (filmRepository.existsById(film.getId())) {
            return filmRepository.save(film);
        }

        throw new RuntimeException("Film not found");
    }

    @Override
    public void delete(Long id) {
        filmRepository.deleteById(id);
    }

    @Override
    public List<Film> findByNazivContaining(String naziv) {
        return filmRepository.findByNazivContainingIgnoreCase(naziv);
    }

    @Override
    public List<Film> findByZanr(String zanr) {
        return filmRepository.findByZanr(zanr);
    }

    @Override
    public List<Film> findByRecenzijaGreaterThan(int recenzija) {
        return filmRepository.findByRecenzijaGreaterThan(recenzija);
    }

}