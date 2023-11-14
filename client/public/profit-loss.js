const headerElems = document.querySelectorAll(
  "table:not(.table-note) thead tr:nth-child(1) *",
);
let years = [];
for (const el of headerElems) {
  years.push(el.textContent);
}

years = years.slice(1).map(Number);

const rowElems = document.querySelectorAll("table:not(.table-note) tbody tr");
let rows = [];
for (const el of rowElems) {
  const elems = el.querySelectorAll("*");
  const row = [];
  for (const el2 of elems) {
    row.push(el2.textContent);
  }
  rows.push(row);
}

let result = rows.map((item) => {
  const Topic = item.at(0);
  const data = item.slice(1);
  const Info = years.map((Year, j) => {
    const Amount = Number(data.at(2 * j)?.replace(/,/g, ""));
    const Change = Number(data.at(2 * j + 1)?.replace(/,/g, ""));
    return {
      Year,
      Amount: isNaN(Amount) ? 0 : Amount,
      Change: isNaN(Change) ? 0 : Change,
    };
  });

  return { Topic, Info };
});

result;
