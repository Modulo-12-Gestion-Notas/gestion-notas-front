import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ListGrupoComponent from "../components/ListGrupoComponent"
import GrupoService from "../services/GrupoService";

jest.mock("../services/GrupoService", () => ({
    getGrupoById: jest.fn(),
}));

describe("ListGrupoComponent", () => {
    beforeEach(() => {
        GrupoService.getGrupoById.mockClear();
    });

    it("should fetch and display grupo data on search", async () => {
        const grupoData = [
            {
                codigoGrupo: 2,
                curso: {
                    codigoCurso: "255245",
                    nombreCurso: "redes por software",
                    pensum: "sistemas v3",
                },
                nombreGrupo: "G1",
                horario: "MJ 20-22",
                aula: "Ude@",
                totalEstudiantes: 3,
            },
        ];

        GrupoService.getGrupoById.mockResolvedValue({ data: grupoData });

        render(<ListGrupoComponent />);

        const searchInput = screen.getByLabelText("ID de profesor:");
        fireEvent.change(searchInput, { target: { value: "1" } });

        const searchButton = screen.getByText("Buscar");
        fireEvent.click(searchButton);

        await waitFor(() => {
            expect(GrupoService.getGrupoById).toHaveBeenCalledWith("1");
        });

        expect(screen.getByText("255245")).toBeInTheDocument();
        expect(screen.getByText(/G1/)).toBeInTheDocument();
    });
});
