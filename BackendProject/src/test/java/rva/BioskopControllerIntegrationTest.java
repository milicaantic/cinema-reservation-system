package rva;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import rva.model.Bioskop;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class BioskopControllerIntegrationTest {

	
    static RestTemplate template = new RestTemplate();
    static String apiUrl = "http://localhost:8080/bioskop";
    static long largestId = 0;

    @Test
    @Order(1)
    void getAll() {
        ResponseEntity<List<Bioskop>> response = template.exchange(
                apiUrl, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<Bioskop>>() {});

        assertEquals(200, response.getStatusCode().value());
        assertNotEquals(0, response.getBody().size());
    }

    @Test
    @Order(2)
    void getById() {
        long id = 1;

        ResponseEntity<Bioskop> response = template.exchange(
                apiUrl + "/" + id, HttpMethod.GET, null,
                Bioskop.class);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(id, response.getBody().getId());
    }

    @Test
    @Order(3)
    void create() {
        Bioskop b = new Bioskop();
        b.setNaziv("Test");
        b.setAdresa("Test Adresa");

        HttpEntity<Bioskop> entity = new HttpEntity<>(b);

        ResponseEntity<Bioskop> response = template.exchange(
                apiUrl, HttpMethod.POST, entity,
                Bioskop.class);

        assertEquals(201, response.getStatusCode().value());

        assertEquals(b.getNaziv(), response.getBody().getNaziv());

        largestId = response.getBody().getId();
    }

    @Test
    @Order(4)
    void update() {
        Bioskop b = new Bioskop();
        b.setId(largestId);
        b.setNaziv("Updated");
        b.setAdresa("Updated Adresa");

        HttpEntity<Bioskop> entity = new HttpEntity<>(b);

        ResponseEntity<Bioskop> response = template.exchange(
                apiUrl, HttpMethod.PUT, entity,
                Bioskop.class);

        assertEquals(200, response.getStatusCode().value());
        assertEquals("Updated", response.getBody().getNaziv());
    }

    @Test
    @Order(5)
    void delete() {
        ResponseEntity<Object> response = template.exchange(
                apiUrl + "/" + largestId,
                HttpMethod.DELETE, null, Object.class);

        assertEquals(200, response.getStatusCode().value());
    }
    @Test
    @Order(6)
    void findByNaziv() {

        Bioskop b = new Bioskop();
        b.setNaziv("TestFind");
        b.setAdresa("Adresa");

        HttpEntity<Bioskop> entity = new HttpEntity<>(b);

        template.exchange(apiUrl, HttpMethod.POST, entity, Bioskop.class);

        ResponseEntity<List<Bioskop>> response = template.exchange(
                apiUrl + "/naziv/TestFind",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Bioskop>>() {}
        );

        assertEquals(200, response.getStatusCode().value());
        assertFalse(response.getBody().isEmpty());
    } @Test
    @Order(7)
    void findByAdresa() {

        Bioskop b = new Bioskop();
        b.setNaziv("AdresaTest");
        b.setAdresa("Novi Sad Centar");

        template.exchange(apiUrl, HttpMethod.POST, new HttpEntity<>(b), Bioskop.class);

        ResponseEntity<List<Bioskop>> response = template.exchange(
                apiUrl + "/adresa/Novi Sad",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Bioskop>>() {}
        );

        assertEquals(200, response.getStatusCode().value());
        assertFalse(response.getBody().isEmpty());
    }
}