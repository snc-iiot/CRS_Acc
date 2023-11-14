const years = [];
const yearsElem = document.querySelectorAll(
  "table thead:nth-child(1) tr:nth-child(1) *",
);
for (let i in yearsElem) {
  if (i > 1) years.push(Number(yearsElem[i].textContent));
}

const rowCount = document.querySelectorAll("table tbody tr").length;

const rows = [];

for (let i = 0; i < rowCount; i++) {
  const row = [];
  const elems = document
    .querySelectorAll("table tbody tr")
    ?.[i]?.querySelectorAll("*");

  for (const el of elems) {
    row.push(el.textContent);
  }

  rows.push(row);
}

const result = rows.map((item) => {
  const No = Number(item.at(0));
  const Topic = item.at(1);
  const data = item.slice(2);
  const Info = years.map((Year, j) => {
    const Raio = Number(data?.at(j));
    return {
      Year,
      Raio,
    };
  });

  return { No, Topic, Info };
});

result;
