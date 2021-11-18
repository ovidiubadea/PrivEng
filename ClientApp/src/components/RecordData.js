/* eslint-disable no-new-func */
import React, { useEffect, useState } from "react";
import { omit } from "reactstrap/lib/utils";
import { ColumnHandler } from "./record/ColumnHandler";
import { Evaluator } from "./record/Evaluator";

class EntryObject {
  name = "";
  table = 0;
  edit = 0;
  f = new Function("x", "return x;");
  isSensitive = false;

  constructor(name) {
    this.name = name;
  }
}

export function RecordData() {
  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  const [entries, setEntries] = useState([
    new EntryObject("accommodation"),
    new EntryObject("children"),
    new EntryObject("commute_time"),
    new EntryObject("disease"),
    new EntryObject("dob"),
    new EntryObject("education"),
    new EntryObject("employment"),
    new EntryObject("gender"),
    new EntryObject("home_postcode"),
    new EntryObject("marital_status"),
    new EntryObject("name"),
    new EntryObject("number_of_co_morbidities"),
    new EntryObject("number_vehicles"),
    new EntryObject("work_postcode"),
  ]);

  const [changedEntries, setChangedEntries] = useState(false);

  const filteredData = state.data
    .filter((d) => d !== undefined)
    .map((d) => {
      var d1 = {};
      entries.forEach((e) => {
        if (e.edit != 2) d1[e.name] = e.f(d[e.name]);
      });
      return d1;
    });

  useEffect(() => {
    populateRecordData();
  }, []);

  useEffect(() => {
    console.log(entries.map((d) => d.f).map((f) => f.toString()));
    console.log(state.data.map((d) => d["accommodation"]));
  }, [changedEntries]);

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
                  changedEntries={() => setChangedEntries(!changedEntries)}
                />
              ))}
            </tr>
          </thead>
        </table>

        <Evaluator data={filteredData} columns={entries} />

        <table className="table table-striped" aria-labelledby="tabelLabel">
          <thead>
            <tr>
              {entries.map((e) => {
                if (e.edit !== 2) return <th>{e.name}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((d) => (
              <tr>
                {entries.map((entry) => {
                  if (entry.edit !== 2) return <td>{d[entry.name]}</td>;
                })}
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
    setState({ data: data, loading: false });
  }
}
