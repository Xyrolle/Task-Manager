import React from "react";
import { screen, render } from "@testing-library/react";

import PlusDropdown from "./PlusDropdown";

it("should not crash on mount", () => {
    render(<PlusDropdown />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});

it("should have header", () => {
    render(<PlusDropdown />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
});