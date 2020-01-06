/* Alle verdier */
select * from dbo.lonn2019dummy

/* TRENGS IKKE: Lønn for de ulike sektorene */
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

/* Gjennomsnittslønn gruppert etter sektor */
SELECT Sektor, AVG(Lønn) AS "Gjennomsnittslønn"
FROM dbo.lonn2019dummy
GROUP BY Sektor
UNION ALL
SELECT 'Alle' AS Sektor, AVG(Lønn) AS "Gjennomsnittslønn"
FROM dbo.lonn2019dummy

/* TRENGS IKKE: Gjennomsnittslønn alle */
SELECT AVG(Lønn) AS "Gjennomsnittslønn alle"
FROM dbo.lonn2019dummy

/* Tariffområder */
SELECT Tariffavtale, AVG(Lønn) AS "Gjennomsnittslønn"
FROM dbo.lonn2019dummy
GROUP BY Tariffavtale

/* Privat uten tariffområde */
SELECT Sektor, AVG(Lønn) AS "Gjennomsnittslønn"
FROM dbo.lonn2019dummy
WHERE Tariffavtale IS NULL
GROUP BY Sektor;
/* Tror den funker, men har ikke laget noen med sektor privat uten tariffavtale */

