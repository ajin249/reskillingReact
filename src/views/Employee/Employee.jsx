import React from "react";

import { useState } from "react";
import EmployeeView from "./EmployeeView";
import CreateEdit from "./CreateEdit";

function Employee() {
  const [createEdit, setCreateEdit] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState(null);

  return (
    <>
      <div className="content">
        {createEdit ? (
          <CreateEdit
            setCreateEdit={setCreateEdit}
            setEditMode={setEditMode}
            editMode={editMode}
            editedEmployee={editedEmployee}
          />
        ) : (
          <EmployeeView
            setCreateEdit={setCreateEdit}
            setEditMode={setEditMode}
            setEditedEmployee={setEditedEmployee}
          />
        )}
      </div>
    </>
  );
}

export default Employee;
