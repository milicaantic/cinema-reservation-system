package rva;

import static org.junit.jupiter.api.Assertions.*;

import java.sql.Date;
import java.util.List;

import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import rva.model.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class RezervacijaControllerIntegrationTest {

    static RestTemplate template = new RestTemplate();

    

    static long largestId;
	static String apiUrl = "http://localhost:8080/rezervacija";

    @Test
    @Order(1)
    void create() {

        Rezervacija r = new Rezervacija();
        r.setBrojOsoba(2);
        r.setCenaKarte(600);
        r.setDatum(new Date(System.currentTimeMillis()));
        r.setPlaceno(true);

        Film f = new Film();
        f.setId(1);

        Sala s = new Sala();
        s.setId(1);

        r.setFilm(f);
        r.setSala(s);

        HttpEntity<Rezervacija> entity = new HttpEntity<>(r);

        ResponseEntity<Rezervacija> response = template.exchange(
        		apiUrl,
                HttpMethod.POST,
                entity,
                Rezervacija.class
        );

        assertEquals(201, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().getId() > 0);

        largestId = response.getBody().getId();
    }

    @Test
    @Order(2)
    void getAll() {

        ResponseEntity<List<Rezervacija>> response = template.exchange(
        		apiUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Rezervacija>>() {}
        );

        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
    }

    @Test
    @Order(3)
    void update() {

        Rezervacija r = new Rezervacija();
        r.setId(largestId);
        r.setBrojOsoba(4);
        r.setCenaKarte(800);
        r.setDatum(new Date(System.currentTimeMillis()));
        r.setPlaceno(false);

        Film f = new Film();
        f.setId(1);

        Sala s = new Sala();
        s.setId(1);

        r.setFilm(f);
        r.setSala(s);

        HttpEntity<Rezervacija> entity = new HttpEntity<>(r);

        ResponseEntity<Rezervacija> response = template.exchange(
        		apiUrl + "/" + largestId,
                HttpMethod.PUT,
                entity,
                Rezervacija.class
        );

       
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(4, response.getBody().getBrojOsoba());
    }

    @Test
    @Order(4)
    void delete() {

        ResponseEntity<Void> response = template.exchange(
        		apiUrl + "/" + largestId,
                HttpMethod.DELETE,
                null,
                Void.class
        );

        assertEquals(200, response.getStatusCode().value());
    }
}