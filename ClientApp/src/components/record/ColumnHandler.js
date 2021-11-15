import { InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import { FunctionChanger } from "./FunctionChanger";

export function ColumnHandler({ entries, setEntries, index, trigger }) {
  const [selector, setSelector] = useState(entries[index].edit);
  const [tableNo, setTableNo] = useState(entries[index].table);
  const [isSensitive, setIsSensitive] = useState(entries[index].isSensitive);

  const [openDialog, setOpenDialog] = useState(false);

  function filterData(e) {
    if (e) {
      var newEnt = entries;
      newEnt[index].edit = e.target.value;
      if (e.target.value === 1) {
        setOpenDialog(true);
      }
      // eslint-disable-next-line no-new-func
      else newEnt[index].f = new Function("x", "return x;");
      setEntries(newEnt);
      setSelector(e.target.value);
      trigger();
    }
  }

  function changeTable(e) {
    if (e) {
      setTableNo(e.target.value);
      var newEnt = entries;
      newEnt[index].table = tableNo;
      setEntries(newEnt);
      trigger();
    }
  }

  function changeSensitive(e) {
    if (e) {
      var newEnt = entries;
      newEnt[index].isSensitive = !isSensitive;
      setIsSensitive(!isSensitive);
      setEntries(newEnt);
      trigger();
    }
  }

  return (
    <th
      onClick={(e) => {
        filterData();
      }}
    >
      <InputLabel id="demo-simple-select-label">
        {entries[index].name}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selector}
        label={entries[index].name}
        onChange={filterData}
      >
        <MenuItem value={0}>None</MenuItem>
        <MenuItem value={1}>Generalize</MenuItem>
        <MenuItem value={2}>Hide</MenuItem>
      </Select>
      <input type="number" value={tableNo} onChange={changeTable} />
      Is Sensitive
      <input type="checkbox" value={isSensitive} onChange={changeSensitive} />
      <FunctionChanger
        entries={entries}
        setEntries={setEntries}
        index={index}
        trigger={trigger}
        closeDialog={() => setOpenDialog(false)}
        opened={openDialog}
      />
    </th>
  );
}
