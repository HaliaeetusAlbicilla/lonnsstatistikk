/* Alle verdier */
select * from dbo.lonn2019dummy

/* L�nn for de ulike sektorene */
select "L�nn" from dbo.lonn2019dummy where Sektor LIKE 'Privat'
select "L�nn" from dbo.lonn2019dummy where Sektor LIKE 'Stat'
select "L�nn" from dbo.lonn2019dummy where Sektor LIKE 'Kommune'
select "L�nn" from dbo.lonn2019dummy

/* Gjennomsnittsl�nn gruppert etter sektor */
SELECT department, AVG(quantity) AS "Average Quantity"
FROM products
GROUP BY department;

/* Gjennomsnittsl�nn gruppert etter sektor */
