import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ListGrupoComponent from "../components/ListGrupoComponent"
import GrupoService from "../services/GrupoService";

/*
Code Analysis

Main functionalities:
The ListGrupoComponent class is responsible for rendering a table of groups based on the ID of a professor. It allows the user to input the ID and search for the corresponding groups. The table displays information such as the course code, course name, group name, schedule, location, and total number of students. It also provides a button to open a modal window to add or edit evaluation activities for a specific group.

Methods:
- handleSearch(): retrieves the group data from the server based on the ID of the professor and updates the state with the new data.
- handleChange(): updates the state with the new value of the ID of the professor.
- render(): renders the table of groups based on the state data. It also includes the input field for the professor ID and the button to trigger the search. It also renders the ModalActEval component for each group to allow the user to add or edit evaluation activities.

Fields:
- grupo: an array of objects containing the group data retrieved from the server.
- idProfesor: a string representing the ID of the professor used to search for the groups.
*/


describe('ListGrupoComponent_class', () => {

    it("test_search_valid_professor_id", async () => {
        // Arrange
        const mockGrupo = [
            {
                codigoGrupo: 1,
                nombreGrupo: "Grupo 1",
                curso: {
                    codigoCurso: 1,
                    nombreCurso: "Curso 1",
                    pensum: "2021-1"
                },
                horario: "Lunes 8-10",
                aula: "A-101",
                totalEstudiantes: 20
            }
        ];
        const mockGetGrupoById = jest.spyOn(GrupoService, "getGrupoById").mockImplementation(() => Promise.resolve({data: mockGrupo}));
        const {getByLabelText, getByText} = render(<ListGrupoComponent/>);
        const input = getByLabelText("ID de profesor:");
        const button = getByText("Buscar");

        // Act
        fireEvent.change(input, {target: {value: "123"}});
        fireEvent.click(button);
        await waitFor(() => expect(mockGetGrupoById).toHaveBeenCalledWith("123"));
        const codigoCurso = () => getByText((content, element) => {
            const hasText = (text) => element => element.textContent === text
            const codigoCurso = hasText('Curso 1')
            const nombreCurso = hasText('Curso 1')
            const childrenDontHaveText = Array.from(element.children).every(child => !codigoCurso(child.textContent) && !nombreCurso(child.textContent))
            return hasText(content)(element) && childrenDontHaveText
        })
    });

    it("test_search_invalid_professor_id", async () => {
        // Arrange
        const mockGetGrupoById = jest.spyOn(GrupoService, "getGrupoById").mockImplementation(() => Promise.resolve({ data: [] }));
        const { getByLabelText, getByText, queryByText } = render(<ListGrupoComponent />);
        const input = getByLabelText("ID de profesor:");
        const button = getByText("Buscar");

        // Act
        fireEvent.change(input, { target: { value: "invalid" } });
        fireEvent.click(button);
        await waitFor(() => expect(mockGetGrupoById).toHaveBeenCalledWith("invalid"));
        const codigoCurso = queryByText("Curso 1");
        const nombreGrupo = queryByText("Grupo 1");

        // Assert
        expect(codigoCurso).not.toBeInTheDocument();
        expect(nombreGrupo).not.toBeInTheDocument();

        // Clean up
        mockGetGrupoById.mockRestore();
    });

    it("test_search_empty_data_array", async () => {
        // Arrange
        const mockGetGrupoById = jest.spyOn(GrupoService, "getGrupoById").mockImplementation(() => Promise.resolve({ data: [] }));
        const { getByLabelText, getByText, queryByText } = render(<ListGrupoComponent />);
        const input = getByLabelText("ID de profesor:");
        const button = getByText("Buscar");

        // Act
        fireEvent.change(input, { target: { value: "123" } });
        fireEvent.click(button);
        await waitFor(() => expect(mockGetGrupoById).toHaveBeenCalledWith("123"));
        const codigoCurso = queryByText("Curso 1");
        const nombreGrupo = queryByText("Grupo 1");

        // Assert
        expect(codigoCurso).not.toBeInTheDocument();
        expect(nombreGrupo).not.toBeInTheDocument();

        // Clean up
        mockGetGrupoById.mockRestore();
    });

    it("test_modal_act_eval_rendered_correctly", () => {
        // Arrange
        const { getByText } = render(<ListGrupoComponent />);
        const modalButton = getByText("Actividades Evaluativas");

        // Act
        fireEvent.click(modalButton);

        // Assert
        expect(modalButton).toBeInTheDocument();
    });

    it("test_change_id_professor_input_field", () => {
        // Arrange
        const { getByLabelText } = render(<ListGrupoComponent />);
        const input = getByLabelText("ID de profesor:");

        // Act
        fireEvent.change(input, { target: { value: "123" } });

        // Assert
        expect(input.value).toBe("123");
    });

})

