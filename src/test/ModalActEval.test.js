import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ModalActEval from "../components/ModalActEval";

describe("ModalActEval", () => {
    test("renders ModalActEval component", () => {
        render(<ModalActEval idGrupo={1} />);

    });

});
