import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ModalNotas from "./ModalNotas";

describe("ModalNotas", () => {
  test("renders ModalNotas component", () => {
    render(<ModalNotas idGrupo={1} />);
    const addButton = screen.getByText("Agregar actividad");
    expect(addButton).toBeInTheDocument();
  });

  test("clicking 'Agregar actividad' button opens modal", () => {
    render(<ModalNotas idGrupo={1} />);
    const addButton = screen.getByText("Agregar actividad");
    fireEvent.click(addButton);
    const modalTitle = screen.getByText("ACTIVIDADES EVALUATIVAS");
    expect(modalTitle).toBeInTheDocument();
  });

  // Add more test cases as needed
});
