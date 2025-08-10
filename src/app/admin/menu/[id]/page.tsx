import * as React from "react";
import EditMenuClient from "./EditMenuClient";

export default function EditMenuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params); // unwrap the promise
  return <EditMenuClient id={id} />;
}
