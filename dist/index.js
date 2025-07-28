var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  SearchBar: () => SearchBar_default
});
module.exports = __toCommonJS(index_exports);

// src/components/SearchBar/SearchBar.js
var import_react = __toESM(require("react"));
var import_jsx_runtime = require("react/jsx-runtime");
var SearchBar = ({ themeColor = "#6f42c1", searchIcon, placeholder = "Search events, artists, teams, and more" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "search-bar", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: searchIcon, alt: "Search", className: "search-icon" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SearchBar
});
//# sourceMappingURL=index.js.map