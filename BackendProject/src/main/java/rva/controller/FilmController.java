package rva.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import jakarta.validation.Valid;
import rva.model.Film;
import rva.service.FilmService;

@RestController
@RequestMapping("/film")
@CrossOrigin (origins = "http://localhost:4200")
public class FilmController {

    @Autowired
    private FilmService filmService;

    @GetMapping
    public ResponseEntity<List<Film>> getAll() {

        List<Film> lista = filmService.findAll();

        if (lista.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Film> getById(@PathVariable Long id) {

        Film film = filmService.findById(id);

        if (film == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(film, HttpStatus.OK);
    }

    @GetMapping("/naziv/{naziv}")
    public ResponseEntity<List<Film>> findByNaziv(@PathVariable String naziv) {

        List<Film> lista = filmService.findByNazivContaining(naziv);

        if (lista.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/zanr/{zanr}")
    public ResponseEntity<List<Film>> findByZanr(@PathVariable String zanr) {

        List<Film> lista = filmService.findByZanrContaining(zanr);

        if (lista.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/recenzija/{recenzija}")
    public ResponseEntity<List<Film>> findByRecenzija(@PathVariable int recenzija) {

        List<Film> lista = filmService.findByRecenzijaGreaterThan(recenzija);

        if (lista.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Film> create(@Valid @RequestBody Film film) {

        try {

            Film sacuvan = filmService.save(film);

            return new ResponseEntity<>(sacuvan, HttpStatus.CREATED);

        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<Film> update(@Valid @RequestBody Film film) {

        try {

            Film izmenjen = filmService.update(film);
            if (izmenjen == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(izmenjen, HttpStatus.OK);

        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        try {

            filmService.delete(id);

            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {

            throw new ResponseStatusException(
            HttpStatus.CONFLICT,
            "Nije moguće obrisati film jer postoje povezane projekcije ili rezervacije."
        );
        }
    }
}