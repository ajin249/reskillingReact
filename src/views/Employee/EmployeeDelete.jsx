import { Modal, ModalFooter, ModalBody, Label } from "reactstrap";
import { useMutation } from "@apollo/client";
import { DELETE_EMPLOYEE } from "../../graphql/mutation/employee";
import { EMPLOYEES } from "../../graphql/query/employee";
import { toast } from "react-toastify";
import { useState } from "react";

const DepartmentDelete = ({ setShowModal, showModal, deletedEmployee }) => {
  const [loader, setLoader] = useState(false);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    refetchQueries: [EMPLOYEES],
    onCompleted: (data) => {
      toast.success("Department deleted");
      setLoader(false);
      setShowModal(false);
    },
    onError: (error) => {
      toast.error("Error : " + error.message);
      console.log(error.message);
      setLoader(false);
      setShowModal(false);
    },
  });
  const handleDelete = () => {
    deleteEmployee({
      variables: {
        empID: deletedEmployee.id,
      },
    });
    setLoader(true);
  };

  return (
    <>
      <Modal isOpen={showModal} className="modal-dialog-centered modal-md">
        <ModalBody>
          <div className="row">
            <div className="col-1">
              <i className="fas fa-trash delete-icon"></i>
            </div>
            <div className="col-10 mt-1">
              <h3>
                <b>Delete Permission</b>
              </h3>
            </div>
          </div>
          <Label>
            Are you sure you want to delete <b>{deletedEmployee.designation}</b>{" "}
            ?{" "}
          </Label>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm  mr-custom"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={handleDelete}
          >
            {loader ? "Deleting" : "Delete"}
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default DepartmentDelete;
