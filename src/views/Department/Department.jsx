import React from "react";

import { useState } from "react";
import DepartmentView from "./DepartmentView";
import CreateEdit from "./CreateEdit";

function Tables() {
  const [createEdit, setCreateEdit] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [editedDepartment, setEditedDepartment] = useState(null);
  return (
    <>
      <div className="content">
        {createEdit ? (
          <CreateEdit
            setCreateEdit={setCreateEdit}
            setEditMode={setEditMode}
            editMode={editMode}
            editedDepartment={editedDepartment}
          />
        ) : (
          <DepartmentView
            setCreateEdit={setCreateEdit}
            setEditMode={setEditMode}
            setEditedDepartment={setEditedDepartment}
          />
        )}
      </div>
    </>
  );
}

export default Tables;
