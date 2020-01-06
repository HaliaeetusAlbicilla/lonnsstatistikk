/* Alle verdier */
select * from dbo.lonn2019dummy

/* TRENGS IKKE: L�nn for de ulike sektorene */
select L�nn 
from dbo.lonn2019dummy 
where Sektor LIKE 'Privat'

select L�nn 
from dbo.lonn2019dummy 
where Sektor LIKE 'Stat'

select L�nn 
from dbo.lonn2019dummy 
where Sektor LIKE 'Kommune'

select L�nn 
from dbo.lonn2019dummy

/* Gjennomsnittsl�nn gruppert etter sektor */
SELECT Sektor, AVG(L�nn) AS "Gjennomsnittsl�nn"
FROM dbo.lonn2019dummy
GROUP BY Sektor
UNION ALL
SELECT 'Alle' AS Sektor, AVG(L�nn) AS "Gjennomsnittsl�nn"
FROM dbo.lonn2019dummy

/* TRENGS IKKE: Gjennomsnittsl�nn alle */
SELECT AVG(L�nn) AS "Gjennomsnittsl�nn alle"
FROM dbo.lonn2019dummy

/* Tariffomr�der */
SELECT Tariffavtale, AVG(L�nn) AS "Gjennomsnittsl�nn"
FROM dbo.lonn2019dummy
GROUP BY Tariffavtale

/* Privat uten tariffomr�de */
SELECT Sektor, AVG(L�nn) AS "Gjennomsnittsl�nn"
FROM dbo.lonn2019dummy
WHERE Tariffavtale IS NULL
GROUP BY Sektor;
/* Tror den funker, men har ikke laget noen med sektor privat uten tariffavtale */

