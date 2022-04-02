import { Spin } from "antd";
import "./loadMask.css";

export default function LoadMask({ loading, children, tip }) {
  return (
    <>
      <Spin spinning={loading || false} size="large" tip={tip || undefined}>
        {children}
      </Spin>
    </>
  );
}
