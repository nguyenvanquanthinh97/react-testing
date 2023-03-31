import { screen, render } from "@testing-library/react";

import RepositoriesSummary from "./RepositoriesSummary";

test("display information about the repository", () => {
  const repository = {
    language: "Javascript",
    stargazers_count: 5,
    open_issues: 30,
    forks: 1,
  };

  render(<RepositoriesSummary repository={repository} />);

  for (const key in repository) {
    const el = screen.getByText(new RegExp(repository[key]));
    expect(el).toBeInTheDocument();
  }
});
