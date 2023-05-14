import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ModalActEval from "../components/ModalActEval";

describe("ModalActEval", () => {
    test("renders ModalActEval component", () => {
        render(<ModalActEval idGrupo={1} />);

    });

    test("opens and closes the modal", () => {
        render(<ModalActEval idGrupo={1} />);

        // Modal should be closed initially
        expect(screen.queryByText("ACTIVIDADES EVALUATIVAS")).toBeNull();

        // Click on "Agregar actividad" button to open the modal
        fireEvent.click(screen.getByText("Agregar actividad"));

        // Modal should be open
        expect(screen.getByText("ACTIVIDADES EVALUATIVAS")).toBeInTheDocument();

        // Click on "Cancelar" button to close the modal
        fireEvent.click(screen.getByText("Cancelar"));

        // Modal should be closed again
        expect(screen.queryByText("ACTIVIDADES EVALUATIVAS")).toBeNull();
    });

    test("adds a new row when 'Agregar Actividad +' button is clicked", () => {
        render(<ModalActEval idGrupo={1} />);

        // Click on "Agregar actividad" button to open the modal
        fireEvent.click(screen.getByText("Agregar actividad"));

        // Click on "Agregar Actividad +" button to add a new row
        fireEvent.click(screen.getByText("Agregar Actividad +"));

        // Find the input fields of the new row
        const conceptoInput = screen.getByLabelText("Concepto");
        const porcentajeInput = screen.getByLabelText("Porcentaje");

        // Add values to the input fields
        fireEvent.change(conceptoInput, { target: { value: "Nueva Actividad" } });
        fireEvent.change(porcentajeInput, { target: { value: "50" } });

        // Assertions for the new row and its values
        expect(conceptoInput.value).toBe("Nueva Actividad");
        expect(porcentajeInput.value).toBe("50");
    });

    test("deletes a row when 'Eliminar' button is clicked", () => {
        render(<ModalActEval idGrupo={1} />);

        // Click on "Agregar actividad" button to open the modal
        fireEvent.click(screen.getByText("Agregar actividad"));

        // Get the initial number of rows
        const initialRows = screen.getAllByRole("row");
        const initialRowCount = initialRows.length - 1; // Exclude the header row

        // Click on "Eliminar" button of the first row
        fireEvent.click(screen.getAllByText("Eliminar")[0]);

        // Get the updated number of rows
        const updatedRows = screen.getAllByRole("row");
        const updatedRowCount = updatedRows.length - 1; // Exclude the header row

        // The updated row count should be less than the initial count
        expect(updatedRowCount).toBeLessThan(initialRowCount);
    });

});
