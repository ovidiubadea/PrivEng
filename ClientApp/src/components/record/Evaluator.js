import React, { useState } from "react";

export function Evaluator({ data, columns }) {
  const [kannon, setKannon] = useState(0);
  const [ldiv, setLdiv] = useState(0);

  function calculate() {
    var k = 2000;
    var l = 2000;

    const mapper = {};
    columns.forEach((e) => {
      if (e.edit === 2) return;
      if (mapper[e.table.toString()] === undefined)
        mapper[e.table.toString()] = [];
      mapper[e.table.toString()].push(e.name);
    });

    Object.values(mapper).forEach((value) => {
      // For each table
      value.forEach((v, index) => {
        var indexer = {};
        var restOfElements = value.slice();
        restOfElements.splice(index, 1);

        data.forEach((d) => {
          var textKey = "";
          restOfElements.forEach((e) => {
            if (d[e]) textKey += "-" + d[e];
          });

          if (indexer[textKey] === undefined) indexer[textKey] = [];

          indexer[textKey].push(d[v]);
        });

        Object.keys(indexer).forEach((key) => {
          k = Math.min(k, indexer[key].length);
          l = Math.min(l, [...new Set(indexer[key])].length);
        });
      });
    });
    setKannon(k);
    setLdiv(l);
  }

  return (
    <div>
      k-annonimity: {kannon} <br />
      l-diversity: {ldiv} <br />
      <button onClick={calculate}>Calculate</button>
    </div>
  );
}
