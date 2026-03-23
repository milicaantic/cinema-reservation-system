insert into bioskop(id, naziv, adresa)
values(nextval('bioskop_seq'), 'Arena Cineplex', 'Bulevar Mihajla Pupina 3, Novi Sad'),
	  (nextval('bioskop_seq'), 'Cineplexx Promenada', 'Oslobođenja 119, Novi Sad'),
	  (nextval('bioskop_seq'), 'Cinestar', 'Sentandrejski put 11, Novi Sad');

insert into film(id, naziv, zanr, trajanje, recenzija)
values(nextval('film_seq'), 'Dune: Part Two', 'Sci-Fi', 166, 9),
	  (nextval('film_seq'), 'Oppenheimer', 'Drama', 180, 10),
	  (nextval('film_seq'), 'Poor Things', 'Comedy', 141, 8);

insert into sala(id, kapacitet, broj_redova, id_bioskop)
values(nextval('sala_seq'), 150, 10, 1),
	  (nextval('sala_seq'), 200, 12, 1),
	  (nextval('sala_seq'), 100, 8, 2);

insert into rezervacija(id, broj_osoba, cena_karte, datum, placeno, id_film, id_sala)
values(nextval('rezervacija_seq'), 2, 1200, to_date('25.03.2026.', 'dd.mm.yyyy.'), TRUE, 1, 1),
      (nextval('rezervacija_seq'), 4, 2400, to_date('26.03.2026.', 'dd.mm.yyyy.'), FALSE, 2, 2),
      (nextval('rezervacija_seq'), 1, 600, to_date('27.03.2026.', 'dd.mm.yyyy.'), TRUE, 3, 3);