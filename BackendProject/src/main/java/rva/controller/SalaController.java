package rva.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import jakarta.validation.Valid;
import rva.model.Sala;
import rva.service.SalaService;

@RestController
@RequestMapping("/sala")
@CrossOrigin (origins = "http://localhost:4200")
public class SalaController {

    @Autowired
    private SalaService salaService;

    @GetMapping
    public ResponseEntity<List<Sala>> getAll() {

        List<Sala> lista = salaService.findAll();

        if (lista.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sala> getById(@PathVariable Long id) {

        Sala sala = salaService.findById(id);

        if (sala == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(sala, HttpStatus.OK);
    }

    @GetMapping("/kapacitet/{kapacitet}")
    public ResponseEntity<List<Sala>> findByKapacitet(@PathVariable int kapacitet) {

        List<Sala> lista = salaService.findByKapacitetGreaterThan(kapacitet);

        if (lista.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/redovi/{brojRedova}")
    public ResponseEntity<List<Sala>> findByBrojRedova(@PathVariable int brojRedova) {

        List<Sala> lista = salaService.findByBrojRedova(brojRedova);

        if (lista.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Sala> create(@Valid @RequestBody Sala sala) {

        try {

            Sala sacuvana = salaService.save(sala);

            return new ResponseEntity<>(sacuvana, HttpStatus.CREATED);

        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<Sala> update(@Valid @RequestBody Sala sala) {

        try {

            Sala izmenjen = salaService.update(sala);
            if (izmenjen == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(izmenjen, HttpStatus.OK);

        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        try {

            salaService.delete(id);

            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {

            throw new ResponseStatusException(
            HttpStatus.CONFLICT,
            "Nije moguće obrisati salu jer postoje povezane projekcije ili rezervacije."
        );
        }
    }
    
    @GetMapping("/bioskop/{id}")
    public ResponseEntity<List<Sala>> findByBioskopId(@PathVariable Long id) {
        List<Sala> lista = salaService.findByBioskopId(id);
        if (lista.isEmpty()) 
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

}