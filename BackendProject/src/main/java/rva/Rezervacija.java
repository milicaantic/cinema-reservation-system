package rva;

import java.sql.Date;

public class Rezervacija {

	private int id;
	private int brojOsoba;
	private int cenaKarte;
	private Date datum;
	private boolean placeno;
	private Film idFilm;
	private Sala idSala;

	public Rezervacija(int id, int brojOsoba, int cenaKarte, Date datum, boolean placeno, Film idFilm, Sala idSala) {

		this.id = id;
		this.brojOsoba = brojOsoba;
		this.cenaKarte = cenaKarte;
		this.datum = datum;
		this.placeno = placeno;
		this.idFilm = idFilm;
		this.idSala = idSala;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getBrojOsoba() {
		return brojOsoba;
	}

	public void setBrojOsoba(int brojOsoba) {
		this.brojOsoba = brojOsoba;
	}

	public int getCenaKarte() {
		return cenaKarte;
	}

	public void setCenaKarte(int cenaKarte) {
		this.cenaKarte = cenaKarte;
	}

	public Date getDatum() {
		return datum;
	}

	public void setDatum(Date datum) {
		this.datum = datum;
	}

	public boolean isPlaceno() {
		return placeno;
	}

	public void setPlaceno(boolean placeno) {
		this.placeno = placeno;
	}

	public Film getIdFilm() {
		return idFilm;
	}

	public void setIdFilm(Film idFilm) {
		this.idFilm = idFilm;
	}

	public Sala getIdSala() {
		return idSala;
	}

	public void setIdSala(Sala idSala) {
		this.idSala = idSala;
	}

}
