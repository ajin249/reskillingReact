import { Modal, ModalFooter, ModalBody, Label } from "reactstrap";
import { useMutation } from "@apollo/client";
import { DELETE_DEPARTMENT } from "../../graphql/mutation/department";
import { DEPARTMENT } from "../../graphql/query/department";
import { toast } from "react-toastify";

const DepartmentDelete = ({setShowModal, showModal, deletedDepartment}) => {
  
  const [deleteDepartment] = useMutation(DELETE_DEPARTMENT,
    {
      refetchQueries: [DEPARTMENT],
      onCompleted: (data) => {
        toast.success("Department deleted");
      },
      onError: (error) => {
        toast.error("Error : " + error.message);
        console.log(error.message)
      },
    });
    const handleDelete = () => {
      deleteDepartment({
        variables: {
          dptID: deletedDepartment.id
        },
      });
      setShowModal(false);
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
              <h3><b>Delete Permission</b></h3>
            </div>
          </div>
          <Label>
            Are you sure you want to delete{" "}
            <b>{deletedDepartment.name}</b> ?{" "}
          </Label>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm  mr-custom"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>&nbsp;
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={handleDelete}
          >
            Delete
          </button>
        </ModalFooter>
      </Modal>
    </>
  );

};
export default DepartmentDelete;