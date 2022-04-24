import { useRef, useEffect, useState } from "react";
import AddImageIcon from "../../../assets/img/add-image.png";
import "./upload.css";

export default function Upload(props) {
  const [srcFile, setSrcFile] = useState(undefined);
  const input = useRef();
  const disabled = props.disabled || false;

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSrcFile(reader.result);
    };
    if (typeof props.file === "string") {
      setSrcFile(props.file);
    } else if (props.file instanceof File) {
      reader.readAsDataURL(props.file);
    } else if (props.file === null || props.file === undefined) {
      setSrcFile(undefined);
    }
  }, [props.file]);

  const onFileChange = (e, file) => {
    file = file || e.target.files[0];
    console.log("llego aqui");
    const fileType = ".jpg|.jpeg|.png";
    if (file && !!file.type.match(fileType)) {
      props.onChange(file);
    }
  };
  const onClick = () => {
    if (!disabled) input.current.click();
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (!disabled) onFileChange(e, e.dataTransfer.files[0]);
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onRemove = () => {
    props.onChange(null);
    input.current.value = "";
  };

  return (
    <>
      {srcFile ? (
        <>
          <div className="upload-container">
            <div
              id="uploaded-image-container"
              className="uploaded-image-container"
            >
              <button
                className="is-button-remove"
                type="button"
                onClick={onRemove}
              >
                Remover
              </button>
            </div>
            <img src={srcFile} className="uploaded-file-image" />
          </div>
        </>
      ) : (
        <>
          <div
            key="label"
            className="upload-container"
            onDrop={onDrop}
            onDragOver={onDragOver}
            onClick={onClick}
          >
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              style={{ display: "none" }}
              ref={input}
            ></input>
            <div className=" is-flex is-justify-content-center">
              <img width="75" src={AddImageIcon} />
            </div>
            {props.uploadText && (
              <>
                <p className="upload-text p-2 m-0">{props.uploadText || ""}</p>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
