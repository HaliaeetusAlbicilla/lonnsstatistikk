/* Alle verdier */
select * from dbo.lonn2019dummy

/* Lønn for de ulike sektorene */
select "Lønn" from dbo.lonn2019dummy where Sektor LIKE 'Privat'
select "Lønn" from dbo.lonn2019dummy where Sektor LIKE 'Stat'
select "Lønn" from dbo.lonn2019dummy where Sektor LIKE 'Kommune'
select "Lønn" from dbo.lonn2019dummy

/* Gjennomsnittslønn gruppert etter sektor */
SELECT department, AVG(quantity) AS "Average Quantity"
FROM products
GROUP BY department;

/* Gjennomsnittslønn gruppert etter sektor */
