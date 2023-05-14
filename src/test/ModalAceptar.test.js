import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ModalAceptar from "../components/ModalAceptar";

describe("ModalAceptar", () => {
    it("renders the component correctly", () => {
        const functionAcept = jest.fn();
        const legendButton = "Accept";
        const heading = "Confirmation";
        const message = "Are you sure?";
        const confirmationButton = "Confirm";
        const cancelButton = "Cancel";
        const colorButton = "blue";
        const colorButtonModal = "green";
        const buttonDisable = false;

        render(
            <ModalAceptar
                functionAcept={functionAcept}
                legendButton={legendButton}
                heading={heading}
                message={message}
                confirmationButton={confirmationButton}
                cancelButton={cancelButton}
                colorButton={colorButton}
                colorButtonModal={colorButtonModal}
                buttonDisable={buttonDisable}
            />
        );

        expect(screen.getByText(legendButton)).toBeInTheDocument();
    });

    it("test_button_click_opens_modal", () => {
        const { getByText } = render(<ModalAceptar legendButton="Open Modal" />);
        fireEvent.click(getByText("Open Modal"));
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("test_button_disable_true", () => {
        const { getByText } = render(<ModalAceptar legendButton="Open Modal" buttonDisable={true} />);
        expect(screen.getByRole("button", { name: "Open Modal" })).toBeDisabled();
    });

})