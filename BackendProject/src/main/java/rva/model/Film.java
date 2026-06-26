package rva.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.validation.constraints.*;

@Entity
public class Film {

	@Id
	@SequenceGenerator(name = "film_seq", sequenceName = "film_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "film_seq")
	private long id;

	@NotBlank
	@Size(min = 2, max = 100)
	private String naziv;

	@Min(1) @Max(10)
	private int recenzija;

	@Min(1) @Max(600)
	private int trajanje;

	@NotBlank
	@Size(min = 2, max = 50)
	private String zanr;
	
	public Film() {

	}

	public Film(long id, String naziv, int recenzija, int trajanje, String zanr) {
	    this.id = id;
	    this.naziv = naziv;
	    this.recenzija = recenzija;
	    this.trajanje = trajanje;
	    this.zanr = zanr;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public int getRecenzija() {
		return recenzija;
	}

	public void setRecenzija(int recenzija) {
		this.recenzija = recenzija;
	}

	public int getTrajanje() {
		return trajanje;
	}

	public void setTrajanje(int trajanje) {
		this.trajanje = trajanje;
	}

	public String getZanr() {
		return zanr;
	}

	public void setZanr(String zanr) {
		this.zanr = zanr;
	}
}
