/* Alle verdier */
select * from dbo.lonn2019dummy

/* TRENGS IKKE: L�nn for de ulike sektorene */
select Lønn 
from dbo.lonn2019dummy 
where Sektor LIKE 'Privat'

select Lønn 
from dbo.lonn2019dummy 
where Sektor LIKE 'Stat'

select Lønn 
from dbo.lonn2019dummy 
where Sektor LIKE 'Kommune'

select Lønn 
from dbo.lonn2019dummy

/* Gjennomsnittsl�nn gruppert etter sektor */
SELECT Sektor, AVG(Lønn) AS "Gjennomsnittslønn"
FROM dbo.lonn2019dummy
GROUP BY Sektor
UNION ALL
SELECT 'Alle' AS Sektor, AVG(Lønn) AS "Gjennomsnittslønn"
FROM dbo.lonn2019dummy

/* TRENGS IKKE: Gjennomsnittsl�nn alle */
SELECT AVG(Lønn) AS "Gjennomsnittslønn alle"
FROM dbo.lonn2019dummy

/* Tariffomr�der */
SELECT Tariffavtale, AVG(Lønn) AS "Gjennomsnittslønn"
FROM dbo.lonn2019dummy
GROUP BY Tariffavtale

/* Privat uten tariffomr�de */
SELECT Sektor, AVG(Lønn) AS "Gjennomsnittslønn"
FROM dbo.lonn2019dummy
WHERE Tariffavtale IS NULL
GROUP BY Sektor;
/* Tror den funker, men har ikke laget noen med sektor privat uten tariffavtale */

