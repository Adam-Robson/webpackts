import { describe, expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("App Component", () => {
	test("renders the heading element correctly", () => {
		render(<App />);
		expect(screen.getByText("TypeScript Webpack Template")).toBeTruthy();
	});
});
