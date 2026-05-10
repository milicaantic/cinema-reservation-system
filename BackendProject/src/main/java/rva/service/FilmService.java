package rva.service;

import java.util.List;

import org.springframework.stereotype.Service;

import rva.model.Film;

@Service
public interface FilmService extends CrudService<Film, Long> {

    List<Film> findByNazivContaining(String naziv);

    List<Film> findByZanr(String zanr);

    List<Film> findByRecenzijaGreaterThan(int recenzija);

}