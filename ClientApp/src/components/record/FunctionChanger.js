import { Dialog, DialogTitle } from "@material-ui/core";
import React, { useState } from "react";

export function FunctionChanger({
  entries,
  setEntries,
  index,
  closeDialog,
  opened,
  changedEntries,
}) {
  const [f, setF] = useState("");

  function commit() {
    var newEnt = entries;
    console.log(f);
    // eslint-disable-next-line no-new-func
    newEnt[index].f = new Function("x", f);
    setEntries(newEnt);
    closeDialog();
    changedEntries();
  }

  function reset() {
    var newEnt = entries;
    // eslint-disable-next-line no-new-func
    newEnt[index].f = new Function("x", "return x;");
    setEntries(newEnt);
    closeDialog();
    changedEntries();
  }

  return (
    <Dialog onClose={() => closeDialog()} open={opened}>
      <DialogTitle>
        Define a new function (must "return 'value';"): f(x) ={" "}
      </DialogTitle>
      <input
        type="textarea"
        name="textValue"
        onChange={(e) => setF(e.target.value)}
      />
      <p>
        Example: <br /> return x; <br />
        {"{"} var a = 3; return a + 4; {"}"}
      </p>
      <button onClick={() => commit()}>Save</button>
      <button onClick={() => reset()}>Reset</button>
    </Dialog>
  );
}
