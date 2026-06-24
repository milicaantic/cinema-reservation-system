package rva.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rva.model.Bioskop;

@Repository
public interface BioskopRepository extends JpaRepository<Bioskop, Long>{
	
	List<Bioskop> findByNaziv(String naziv);
	
	List<Bioskop> findByAdresaContainingIgnoreCase(String adresa);
	List<Bioskop> findByNazivContainingIgnoreCase(String naziv);
	

}
