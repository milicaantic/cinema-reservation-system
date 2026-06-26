package rva;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import rva.model.Sala;
import rva.model.Bioskop;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class SalaControllerIntegrationTest {

    static RestTemplate template = new RestTemplate();
    static String apiUrl = "http://localhost:8080/sala";
    static long largestId ;

    @Test
    @Order(1)
    void create() {

        Sala s = new Sala();
        s.setKapacitet(100);
        s.setBrojRedova(10);

        Bioskop b = new Bioskop();
        b.setId(1L);

        s.setBioskop(b);

        HttpEntity<Sala> entity = new HttpEntity<>(s);

        ResponseEntity<Sala> response = template.exchange(
                apiUrl, HttpMethod.POST, entity,
                Sala.class);

        assertEquals(201, response.getStatusCode().value());

        largestId = response.getBody().getId();
    }

    @Test
    @Order(2)
    void getAll() {
        ResponseEntity<List<Sala>> response = template.exchange(
                apiUrl, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<Sala>>() {});

        assertTrue(response.getStatusCode().is2xxSuccessful());
        assertNotNull(response.getBody());    }

    @Test
    @Order(3)
    void update() {
        Sala s = new Sala();
        s.setId(largestId);
        s.setKapacitet(150);
        s.setBrojRedova(15);

        Bioskop b = new Bioskop();
        b.setId(1);

        s.setBioskop(b);

        HttpEntity<Sala> entity = new HttpEntity<>(s);

        ResponseEntity<Sala> response = template.exchange(
                apiUrl, HttpMethod.PUT, entity,
                Sala.class);

        assertEquals(200, response.getStatusCode().value());
    }
    @Test
    @Order(4)
    void getById() {

        ResponseEntity<Sala> response = template.exchange(
                apiUrl + "/" + largestId,
                HttpMethod.GET,
                null,
                Sala.class
        );

        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(largestId, response.getBody().getId());
    }
    @Test
    @Order(5)
    void delete() {
        ResponseEntity<Object> response = template.exchange(
                apiUrl + "/" + largestId,
                HttpMethod.DELETE, null,
                Object.class);

        assertEquals(200, response.getStatusCode().value());
    }
 

    @Test
    @Order(6)
    void findByKapacitet() {

        ResponseEntity<List<Sala>> response = template.exchange(
                apiUrl + "/kapacitet/50",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Sala>>() {}
        );

        assertEquals(200, response.getStatusCode().value());
    }
    @Test
    @Order(7)
    void findByBrojRedova() {

        ResponseEntity<List<Sala>> response = template.exchange(
                apiUrl + "/redovi/10",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Sala>>() {}
        );

        assertTrue(response.getStatusCode().is2xxSuccessful());
        assertNotNull(response.getBody());
    }
}