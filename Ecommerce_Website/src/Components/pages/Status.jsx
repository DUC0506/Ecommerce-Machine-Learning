import React from "react";
import NavbarAdmin from "../admin/shared/NavbarAdmin";
import { IoSearchOutline } from "react-icons/io5";
import StatusAdmin from "../admin/StatusAdmin";

export default function Status() {
  return (
    <div>
      <StatusAdmin isSeller={true} />
    </div>
  );
}
