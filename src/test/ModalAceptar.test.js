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

    it("opens the modal when the button is clicked", () => {
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

        fireEvent.click(screen.getByText(legendButton));
        expect(screen.getByTestId("modal-title")).toHaveTextContent(heading);
        expect(screen.getByTestId("modal-body")).toHaveTextContent(message);
    });

    it("calls the functionAcept when the confirmation button is clicked", () => {
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

        fireEvent.click(screen.getByText(legendButton));
        fireEvent.click(screen.getByText(confirmationButton));
        expect(functionAcept).toHaveBeenCalled();
    });

    it("calls the functionAcept with params when provided", () => {
        const functionAcept = jest.fn();
        const legendButton = "Accept";
        const heading = "Confirmation";
        const message = "Are you sure?";
        const confirmationButton = "Confirm";
        const cancelButton = "Cancel";
        const colorButton = "blue";
        const colorButtonModal = "green";
        const buttonDisable = false;
        const params = { param1: "value1", param2: "value2" };

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
                params={params}
            />
        );

        fireEvent.click(screen.getByText(legendButton));
        fireEvent.click(screen.getByText(confirmationButton));
        expect(functionAcept).toHaveBeenCalledWith("value1,value2");
    });
})