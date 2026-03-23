package rva;

public class Sala {

	private int id;
	private int kapacitet;
	private int brojRedova;
	private Bioskop idBioskop;

	public Sala(int id, int kapacitet, int brojRedova, Bioskop idBioskop) {

		this.id = id;
		this.kapacitet = kapacitet;
		this.brojRedova = brojRedova;
		this.idBioskop = idBioskop;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getKapacitet() {
		return kapacitet;
	}

	public void setKapacitet(int kapacitet) {
		this.kapacitet = kapacitet;
	}

	public int getBrojRedova() {
		return brojRedova;
	}

	public void setBrojRedova(int brojRedova) {
		this.brojRedova = brojRedova;
	}

	public Bioskop getIdBioskop() {
		return idBioskop;
	}

	public void setIdBioskop(Bioskop idBioskop) {
		this.idBioskop = idBioskop;
	}

}
