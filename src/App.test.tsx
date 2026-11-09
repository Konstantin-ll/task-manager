import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Task Manager", () => {
  it("отображает заголовок приложения", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Task Manager — CI test" }),
    ).toBeInTheDocument();
  });

  it("позволяет добавлять задачу", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText("Например, встреча в 14:00");

    await user.type(input, "Изучить GitHub Actions");

    await user.click(screen.getByRole("button", { name: "Добавить" }));

    expect(screen.getByText("Изучить GitHub Actions")).toBeInTheDocument();

    expect(input).toHaveValue("");
    expect(screen.getByText("Мои задачи (1)")).toBeInTheDocument();
  });

  it("не позволяет добавлять пустые задачи", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole("button", { name: "Добавить" }));

    expect(screen.getByText("Мои задачи (0)")).toBeInTheDocument();
    expect(
      screen.getByText("Пока задач нет. Добавь первую!"),
    ).toBeInTheDocument();
  });
});
