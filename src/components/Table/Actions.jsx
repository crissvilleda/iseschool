import editIcon from "../../assets/img/edit.svg";
import removeIcon from "../../assets/img/delete.svg";
import Swal from "sweetalert2";

function Actions({ id, edit = undefined, remove = undefined }) {
  const editAction = () => {
    edit(id);
  };
  const removeAction = () => {
    Swal.fire({
      title: "¿Eliminar?",
      text: "¡No podrá revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "¡Sí, eliminar!",
      cancelButtonText: "No, cancelar",
      reverseButtons: true,
      allowEnterKey: false,
      customClass: {
        cancelButton: "button is-secondary",
        confirmButton: "button is-primary",
      },
    }).then((result) => {
      if (result.value) {
        remove(id);
      }
    });
  };
  return (
    <>
      <div>
        {edit && (
          <a
            className="px-2"
            style={{ cursor: "pointer", color: "#c4183c" }}
            onClick={editAction}
          >
            <i className="material-icons">
              <img src={editIcon} className="icon" />
            </i>
          </a>
        )}
        {remove && (
          <a
            className="px-2"
            style={{ cursor: "pointer", color: "#c4183c" }}
            onClick={removeAction}
          >
            <i className="material-icons">
              <img src={removeIcon} className="icon" />
            </i>
          </a>
        )}
      </div>
    </>
  );
}

export default function tableActions(actions) {
  return (row) => {
    return <Actions id={row.id} row={row} {...actions} />;
  };
}
