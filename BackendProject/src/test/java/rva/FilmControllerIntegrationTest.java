package rva;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import rva.model.Film;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class FilmControllerIntegrationTest {

    static RestTemplate template = new RestTemplate();
    static String apiUrl = "http://localhost:8080/film";
    static long largestId = 0;

    @Test
    @Order(1)
    void getAll() {
        ResponseEntity<List<Film>> response = template.exchange(
                apiUrl, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<Film>>() {});

        assertEquals(200, response.getStatusCode().value());
    }
    @Test
    @Order(2)
    void getById() {

        ResponseEntity<List<Film>> all = template.exchange(
                apiUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Film>>() {});

        Film first = all.getBody().get(0);
        long id = first.getId();

        ResponseEntity<Film> response = template.exchange(
                apiUrl + "/" + id,
                HttpMethod.GET,
                null,
                Film.class);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(id, response.getBody().getId());
    }
    @Test
    @Order(3)
    void findByNaziv() {

        ResponseEntity<List<Film>> response = template.exchange(
                apiUrl + "/naziv/Film",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Film>>() {});

        assertTrue(
            response.getStatusCode().value() == 200 ||
            response.getStatusCode().value() == 204
        );

        if (response.getStatusCode().value() == 200) {
            assertFalse(response.getBody().isEmpty());
        }
    }
    @Test
    @Order(4)
    void findByZanr() {

        ResponseEntity<List<Film>> response = template.exchange(
                apiUrl + "/zanr/Akcija",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Film>>() {});

        assertTrue(
            response.getStatusCode().value() == 200 ||
            response.getStatusCode().value() == 204
        );

        if (response.getStatusCode().value() == 200) {
            assertFalse(response.getBody().isEmpty());
        }
    }
    @Test
    @Order(5)
    void findByRecenzija() {

        ResponseEntity<List<Film>> response = template.exchange(
                apiUrl + "/recenzija/1",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Film>>() {});

        assertEquals(200, response.getStatusCode().value());
    }
    @Test
    @Order(6)
    void create() {
        Film f = new Film();
        f.setNaziv("Film");
        f.setZanr("Akcija");
        f.setRecenzija(5);
        f.setTrajanje(120);

        HttpEntity<Film> entity = new HttpEntity<>(f);

        ResponseEntity<Film> response = template.exchange(
                apiUrl, HttpMethod.POST, entity,
                Film.class);

        assertEquals(201, response.getStatusCode().value());

        largestId = response.getBody().getId();
    }

    @Test
    @Order(7)
    void update() {
        Film f = new Film();
        f.setId(largestId);
        f.setNaziv("Updated Film");
        f.setZanr("Drama");
        f.setRecenzija(4);
        f.setTrajanje(110);

        HttpEntity<Film> entity = new HttpEntity<>(f);

        ResponseEntity<Film> response = template.exchange(
                apiUrl, HttpMethod.PUT, entity,
                Film.class);

        assertEquals(200, response.getStatusCode().value());
    }

    @Test
    @Order(8)
    void delete() {
        ResponseEntity<Object> response = template.exchange(
                apiUrl + "/" + largestId,
                HttpMethod.DELETE, null,
                Object.class);

        assertEquals(200, response.getStatusCode().value());
    }
}