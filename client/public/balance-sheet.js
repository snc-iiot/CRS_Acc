const years = [];
document
  .querySelectorAll("table:not(.table-note) thead tr:nth-child(1) *")
  .forEach((el, i) => {
    if (i != 0) years.push(el.textContent);
  });

const rowCount = document.querySelectorAll(
  "table:not(.table-note) tbody tr",
).length;

const rows = [];

for (let i = 1; i <= rowCount; i++) {
  const row = [];
  const elems = document.querySelectorAll(
    "table:not(.table-note) tbody tr:nth-child(" + i + ") *",
  );

  for (const el of elems) {
    row.push(el.textContent);
  }

  rows.push(row);
}

return rows.map((item) => {
  const Topic = item.at(0);
  const data = item.slice(1);
  const Info = years.map((Year, j) => {
    const Amount = Number(data.at(2 * j)?.replace(/,/g, ""));
    const Change = Number(data.at(2 * j + 1)?.replace(/,/g, ""));
    return {
      Year: Number(Year),
      Amount: isNaN(Amount) ? 0 : Amount,
      Change: isNaN(Change) ? 0 : Change,
    };
  });

  return { Topic, Info };
});
