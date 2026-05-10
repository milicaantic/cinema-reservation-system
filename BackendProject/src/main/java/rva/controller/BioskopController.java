package rva.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import rva.model.Bioskop;
import rva.service.BioskopService;

@RestController
@RequestMapping("/bioskop")
@CrossOrigin
public class BioskopController {

    @Autowired
    private BioskopService bioskopService;

    @GetMapping
    public ResponseEntity<List<Bioskop>> getAll() {
        List<Bioskop> lista = bioskopService.findAll();

        if (lista.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bioskop> getById(@PathVariable Long id) {
        Bioskop bioskop = bioskopService.findById(id);

        if (bioskop == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(bioskop, HttpStatus.OK);
    }

    @GetMapping("/naziv/{naziv}")
    public ResponseEntity<List<Bioskop>> findByNaziv(@PathVariable String naziv) {
        List<Bioskop> lista = bioskopService.findByNaziv(naziv);

        if (lista.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/adresa/{adresa}")
    public ResponseEntity<List<Bioskop>> findByAdresa(@PathVariable String adresa) {
        List<Bioskop> lista = bioskopService.findByAdresaContaining(adresa);

        if (lista.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Bioskop> create(@RequestBody Bioskop bioskop) {
        try {
            Bioskop sacuvan = bioskopService.save(bioskop);
            return new ResponseEntity<>(sacuvan, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<Bioskop> update(@RequestBody Bioskop bioskop) {
        try {
            Bioskop izmenjen = bioskopService.update(bioskop);
            return new ResponseEntity<>(izmenjen, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            bioskopService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}