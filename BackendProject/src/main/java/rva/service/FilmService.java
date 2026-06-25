package rva.service;

import java.util.List;
import rva.model.Film;

public interface FilmService extends CrudService<Film, Long> {

    List<Film> findByNazivContaining(String naziv);

    List<Film> findByZanrContaining(String zanr);

    List<Film> findByRecenzijaGreaterThan(int recenzija);

}