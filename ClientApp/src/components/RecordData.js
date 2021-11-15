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

  const [filteredData, setFilteredData] = useState([]);

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

  const [filteredEntries, setFilteredEntries] = useState(
    entries.map((e) => e.name)
  );

  useEffect(() => {
    populateRecordData();
  }, []);

  function triggerChange() {
    const omitedProps = entries.filter((d) => d.edit === 2).map((d) => d.name);
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
    setState({ data: data, loading: false });
    setFilteredData(data);
  }
}
