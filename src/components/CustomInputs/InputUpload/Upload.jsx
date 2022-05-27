import { useRef, useEffect, useState } from "react";
import AddImageIcon from "../../../assets/img/add-image.png";
import "./upload.css";
import { storage } from "../../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import LoadMask from "../../LoadMask";

export default function Upload(props) {
  const [srcFile, setSrcFile] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const input = useRef();
  const disabled = props.disabled || false;

  const getFile = async () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSrcFile(reader.result);
    };
    if (typeof props.file === "string" && props.file !== "") {
      const fileUrl = await getDownloadURL(ref(storage, props.file));
      setSrcFile(fileUrl);
    } else if (props.file instanceof File) {
      reader.readAsDataURL(props.file);
    } else if (props.file === null || props.file === undefined) {
      setSrcFile(undefined);
    }
  };

  useEffect(() => {
    setLoading(true);
    getFile()
      .then()
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 300)
      );
  }, [props.file]);

  const onFileChange = (e, file) => {
    try {
      setLoading(true);
      file = file || e.target.files[0];
      console.log("llego aqui");
      const fileType = ".jpg|.jpeg|.png";
      if (file && !!file.type.match(fileType)) {
        props.onChange(file);
      }
    } finally {
      setLoading(false);
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
    if (input.current) input.current.value = "";
  };

  return (
    <>
      <LoadMask loading={loading}>
        {srcFile ? (
          <>
            <div className="upload-container">
              <div
                id="uploaded-image-container"
                className="uploaded-image-container"
              >
                {!disabled && (
                  <button
                    className="is-button-remove"
                    type="button"
                    onClick={onRemove}
                  >
                    Remover
                  </button>
                )}
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
                  <p className="upload-text p-2 m-0">
                    {props.uploadText || ""}
                  </p>
                </>
              )}
            </div>
          </>
        )}
      </LoadMask>
    </>
  );
}
