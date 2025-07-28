// src/components/SearchBar/SearchBar.js
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var SearchBar = ({ themeColor = "#6f42c1", searchIcon, placeholder = "Search events, artists, teams, and more" }) => {
  return /* @__PURE__ */ jsxs("div", { className: "search-bar", children: [
    /* @__PURE__ */ jsx("img", { src: searchIcon, alt: "Search", className: "search-icon" }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        placeholder,
        className: "search-input",
        style: { "--theme-color": themeColor }
      }
    )
  ] });
};
var SearchBar_default = SearchBar;
export {
  SearchBar_default as SearchBar
};
//# sourceMappingURL=index.mjs.map