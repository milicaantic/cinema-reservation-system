package rva.service;

import java.util.List;


import rva.model.Bioskop;


public interface BioskopService  extends CrudService<Bioskop, Long>  {
	
	List<Bioskop> findByNaziv(String naziv);

	List<Bioskop> findByAdresaContaining(String adresa);

}
