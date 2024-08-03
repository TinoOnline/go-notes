# SQL Operations

---

Naming the tables you don't normally put the s at the end. You say customer, name,....

- LIKE is CASE sensitive and ILIKE isn't
  - `%	Represents zero or more characters`
  - `_	Represents a single character`
  - `[]	Represents any single character within the brackets `

---

### EXTRACT function

`SELECT * FROM table WHERE EXTRACT(year FROM Date) = 20232`

---

### Aggregate Functions

`GROUP BY `
common functions: `AVG,MAX,MIN,SUM,COUNT`

```
SELECT customer_id, staff_id, SUM(amount) FROM payment
GROUP BY customer_id, staff_id
ORDER BY customer_id  DESC
```

- `GROUP BY 1` can also group by an index from the `SELECT` columns, starting from 1
- `DATE()` - this gets the year-month-day from a given datetime variable
- `HAVING` - WHERE filters individual rows before grouping, HAVING filters aggregated results after grouping
- `AS` - gets executed at the end of a query and cannot be used inside the WHERE/HAVING statements

---

### Mod function

`MOD(column, value )`

---

### Distinct function

`DISTINCT year, month`

- results will contain all of the unique pairs of those columns
- You only need to include DISTINCT once in your SELECT clause—you do not need to add it for each column name.

---

### Query clause order

```
SELECT
FROM
WHERE
GROUP BY
HAVING
ORDER BY
```

- 'it's really best practice to create statements that don't overlap (better readability)
  - always goes in the SELECT clause
  - not that a case must always have a `When Then` and `END`

```
SELECT player_name,
       weight,
       CASE WHEN weight > 250 THEN 'over 250'
            WHEN weight > 200 AND weight <= 250 THEN '201-250'
            WHEN weight > 175 AND weight <= 200 THEN '176-200'
            ELSE '175 or under' END AS weight_group
  FROM benn.college_football_players
```

---

## JOIN Operations

- the two columns that map to one another, are referred to as "foreign keys" or "join keys."
- you can write SELECT table1.\* to return all the columns from a single table

```
SELECT table1.column1, table2.column2
  FROM table2
  JOIN table 1
    ON column= column
 GROUP BY
 .....
```

### Aliases in SQL

- As with column names, best practice here is to use all lowercase letters and underscores instead of spaces.

```
 FROM benn.college_football_players players
  JOIN benn.college_football_teams teams
```

### Inner Join or Just Join

- Inner joins eliminate rows from both tables that do not satisfy the join condition set forth in the ON statement. In mathematical terms, an inner join is the intersection of the two tables

### Outer joins

- Outer joins are joins that return matched values and unmatched values from either or both tables. There are a few types of outer joins:

- `LEFT JOIN `**returns only unmatched rows from the left table**, **as well as matched rows** in both tables.
- `RIGHT JOIN` **returns only unmatched rows from the right table** , **as well as matched rows** in both tables.
- `FULL OUTER JOIN` **returns unmatched rows from both tables,as well as matched rows** in both tables.

- Note: `LEFT JOIN` = `OUTER LEFT JOIN`. `RIGHT JOIN` = `OUTER RIGHT JOIN`. `FULL OUTER JOIN` = `OUTER JOIN`.

- `AND...` is evaluated before the join occurs. `WHERE` is evaluated after the join occurs.

```
SELECT ...
  FROM ..
  LEFT ...
    ON ...
   AND acquisitions.company_permalink != '/company/1000memories'
 ORDER ...
```

- SELF JOIN is a great stratergy in order to extract different pieces of information

## UNION

- Note that `UNION` only appends distinct values. Drops any duplicate rows.
- `UNION ALL` used to append all the values from the second table.
- rules
  - Both tables must have the same number of columns
  - The columns must have the same data types in the same order as the first table

## String Functions

- `SELECT RIGHT("SQL Tutorial is cool", 4)` select 4 charcters starting from the right
- similarly `LEFT(String, Quanitty)`
