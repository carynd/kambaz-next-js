import { ImBlocked } from "react-icons/im";

export default function DenyMark() {
  return (
    <span className="me-1 position-relative">
        <ImBlocked style={{ top: "2px" }} className="text-blocked me-1 fs-5" />
    </span>);
}