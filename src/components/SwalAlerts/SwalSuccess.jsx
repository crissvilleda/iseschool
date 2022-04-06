import Swal from "sweetalert2";
import repAll from "./utils";

export default async function SwalSuccess(
  titulo,
  subtitulo,
  confirmeText = "Aceptar"
) {
  subtitulo = repAll(subtitulo, /\n/g, "<br/>");

  const SwalMod = Swal.mixin({
    customClass: {
      confirmButton: "button is-primary",
      actions: "custom-actions",
    },
    allowEnterKey: false,
  });

  return await SwalMod.fire({
    title: titulo,
    html: subtitulo,
    confirmButtonText: confirmeText,
    icon: "success",
  });
}
