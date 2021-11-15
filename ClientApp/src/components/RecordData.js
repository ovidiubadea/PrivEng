/* eslint-disable no-new-func */
import React, { useEffect, useState } from "react";
import { omit } from "reactstrap/lib/utils";
import { ColumnHandler } from "./record/ColumnHandler";
import { Evaluator } from "./record/Evaluator";

export function RecordData() {
  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  const [filteredData, setFilteredData] = useState([]);

  const [entries, setEntries] = useState([
    {
      name: "accommodation",
      table: 0,
      edit: 0,
      f: new Function("x", "return x;"),
    },
    { name: "children", table: 0, edit: 0, f: new Function("x", "return x;") },
    {
      name: "commute_time",
      table: 0,
      edit: 2,
      f: new Function("x", "return x;"),
    },
    { name: "disease", table: 0, edit: 2, f: new Function("x", "return x;") },
    { name: "dob", table: 0, edit: 2, f: new Function("x", "return x;") },
    { name: "education", table: 0, edit: 0, f: new Function("x", "return x;") },
    {
      name: "employment",
      table: 0,
      edit: 2,
      f: new Function("x", "return x;"),
    },
    { name: "gender", table: 0, edit: 0, f: new Function("x", "return x;") },
    {
      name: "home_postcode",
      table: 0,
      edit: 2,
      f: new Function("x", "return x;"),
    },
    {
      name: "marital_status",
      table: 0,
      edit: 2,
      f: new Function("x", "return x;"),
    },
    { name: "name", table: 0, edit: 2, f: new Function("x", "return x;") },
    {
      name: "number_of_co_morbidities",
      table: 0,
      edit: 2,
      f: new Function("x", "return x;"),
    },
    {
      name: "number_vehicles",
      table: 0,
      edit: 2,
      f: new Function("x", "return x;"),
    },
    {
      name: "work_postcode",
      table: 0,
      edit: 2,
      f: new Function("x", "return x;"),
    },
  ]);

  const [filteredEntries, setFilteredEntries] = useState(
    entries.map((e) => e.name)
  );

  useEffect(() => {
    populateRecordData();
  }, []);

  function triggerChange() {
    console.log(entries);
    const omitedProps = entries.filter((d) => d.edit === 2).map((d) => d.name);
    console.log(entries[0].f(state.data[0]["accomodation"]));
    setFilteredData(
      state.data
        .map((d) => {
          entries.forEach(
            (v, index) => (d[v.name] = entries[index].f(d[v.name]))
          );
          return d;
        })
        .map((d) => omit(d, omitedProps))
    );
    setFilteredEntries(entries.filter((d) => d.edit !== 2).map((d) => d.name));

    console.log("Triggered");
  }

  function parseData() {
    return (
      <div>
        <table className="table table-striped" aria-labelledby="tabelLabel">
          <thead>
            <tr>
              {entries.map((e, index) => (
                <ColumnHandler
                  entries={entries}
                  setEntries={setEntries}
                  index={index}
                  trigger={triggerChange}
                />
              ))}
            </tr>
          </thead>
        </table>

        <Evaluator data={filteredData} columns={entries} />

        <table className="table table-striped" aria-labelledby="tabelLabel">
          <thead>
            <tr>
              {filteredEntries.map((e) => (
                <th>{e}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((d) => (
              <tr>
                {filteredEntries.map((entry) => (
                  <td>{d[entry]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  let contents = state.loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    parseData()
  );

  return (
    <div>
      <h1 id="tabelLabel">Record Data</h1>
      <p>This component demonstrates fetching data from the server.</p>
      {contents}
    </div>
  );

  async function populateRecordData() {
    const response = await fetch("recorddata");
    const data = await response.json();
    console.log(data[0]);
    setState({ data: data, loading: false });
    setFilteredData(data);
  }
}
