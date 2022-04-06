import Swal from "sweetalert2";
import repAll from "./utils";

import "./swal_alerts.css";

export default async function SwalWarning(
  titulo,
  subtitulo,
  confirmeText = "Si",
  cancelText = "No"
) {
  subtitulo = repAll(subtitulo, /\n/g, "<br/>");

  const SwalMod = Swal.mixin({
    customClass: {
      confirmButton: "button is-primary",
      denyButton: "button is-secondary",
      actions: "custom-actions",
    },
    allowEnterKey: false,
  });

  return await SwalMod.fire({
    title: titulo,
    html: subtitulo,
    showDenyButton: true,
    showCloseButton: true,
    confirmButtonText: confirmeText,
    denyButtonText: cancelText,
    icon: "warning",
    reverseButtons: true,
  });
}
