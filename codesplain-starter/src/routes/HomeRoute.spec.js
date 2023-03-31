import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import { createServer } from "../test/server";
import HomeRoute from "./HomeRoute";

const handlers = [
  {
    method: "get",
    path: "/api/repositories",
    res: (req, res, ctx) => {
      const language = req.url.searchParams.get("q").split("language:")[1];
      return {
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` },
        ],
      };
    },
  },
];

createServer(handlers);

test("renders two links for each language", async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  const languages = [
    "javascript",
    "typescript",
    "rust",
    "go",
    "python",
    "java",
  ];

  for (const language of languages) {
    const links = await screen.findAllByRole("link", {
      name: new RegExp(`${language}_`),
    });

    expect(links[0]).toHaveTextContent(`${language}_one`);
    expect(links[1]).toHaveTextContent(`${language}_two`);
  }
});
