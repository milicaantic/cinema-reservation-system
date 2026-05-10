package rva.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rva.model.Film;

@Repository
public interface FilmRepository extends JpaRepository<Film, Long> {

    List<Film> findByNazivContainingIgnoreCase(String naziv);

    List<Film> findByZanr(String zanr);

    List<Film> findByRecenzijaGreaterThan(int recenzija);

}