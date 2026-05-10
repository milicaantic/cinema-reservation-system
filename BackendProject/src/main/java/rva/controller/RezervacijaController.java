package rva.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import rva.model.Rezervacija;
import rva.service.RezervacijaService;

@RestController
@RequestMapping("/rezervacija")
@CrossOrigin
public class RezervacijaController {

    @Autowired
    private RezervacijaService rezervacijaService;

    @GetMapping
    public ResponseEntity<List<Rezervacija>> getAll() {

        List<Rezervacija> lista = rezervacijaService.findAll();

        if (lista.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rezervacija> getById(@PathVariable Long id) {

        Rezervacija rezervacija = rezervacijaService.findById(id);

        if (rezervacija == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(rezervacija, HttpStatus.OK);
    }

    @GetMapping("/placeno/{placeno}")
    public ResponseEntity<List<Rezervacija>> findByPlaceno(@PathVariable boolean placeno) {

        List<Rezervacija> lista = rezervacijaService.findByPlaceno(placeno);

        if (lista.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/datum/{datum}")
    public ResponseEntity<List<Rezervacija>> findByDatum(@PathVariable Date datum) {

        List<Rezervacija> lista = rezervacijaService.findByDatum(datum);

        if (lista.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/osobe/{brojOsoba}")
    public ResponseEntity<List<Rezervacija>> findByBrojOsoba(@PathVariable int brojOsoba) {

        List<Rezervacija> lista = rezervacijaService.findByBrojOsobaGreaterThan(brojOsoba);

        if (lista.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Rezervacija> create(@RequestBody Rezervacija rezervacija) {

        try {

            Rezervacija sacuvana = rezervacijaService.save(rezervacija);

            return new ResponseEntity<>(sacuvana, HttpStatus.CREATED);

        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<Rezervacija> update(@RequestBody Rezervacija rezervacija) {

        try {

            Rezervacija izmenjena = rezervacijaService.update(rezervacija);

            return new ResponseEntity<>(izmenjena, HttpStatus.OK);

        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        try {

            rezervacijaService.delete(id);

            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}