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
  Login: () => Login_default,
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

// src/components/Login/Login.js
var import_react2 = __toESM(require("react"));
var import_jsx_runtime2 = require("react/jsx-runtime");
var Login = ({
  logo,
  brandName = "StubHub",
  themeColor = "#684cbc",
  onSubmit,
  onForgotPassword,
  socialLogins = [],
  showEmailCode = false,
  showCreateAccount = true,
  onCreateAccount,
  loading = false,
  errorMessage = ""
}) => {
  const [email, setEmail] = (0, import_react2.useState)("");
  const [password, setPassword] = (0, import_react2.useState)("");
  const [stayLoggedIn, setStayLoggedIn] = (0, import_react2.useState)(false);
  const isFormValid = email.trim() !== "" && password.trim() !== "";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid && onSubmit) {
      onSubmit({ email, password, stayLoggedIn });
    }
  };
  const handleForgotPassword = () => {
    if (onForgotPassword) {
      onForgotPassword();
    }
  };
  const handleCreateAccount = () => {
    if (onCreateAccount) {
      onCreateAccount();
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "login-app", style: { "--theme-color": themeColor, "--brand-color": themeColor }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "login-container", children: [
    logo && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "logo-container", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: logo, alt: brandName, className: "logo" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("h1", { className: "login-title", children: [
      "Sign in to ",
      brandName
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("form", { onSubmit: handleSubmit, className: "login-form", children: [
      errorMessage && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "alert alert-danger", role: "alert", children: errorMessage }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "input-group", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "input",
        {
          type: "email",
          placeholder: "Email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          className: "input-field",
          required: true
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "input-group", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "input",
        {
          type: "password",
          placeholder: "Password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          className: "input-field",
          required: true
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "checkbox-row", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: "checkbox-label", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "input",
            {
              type: "checkbox",
              checked: stayLoggedIn,
              onChange: (e) => setStayLoggedIn(e.target.checked),
              className: "checkbox"
            }
          ),
          "Stay logged in"
        ] }),
        onForgotPassword && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "forgot-password", onClick: handleForgotPassword, children: "Forgot Password" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "submit",
          className: `sign-in-btn ${!isFormValid ? "disabled" : ""}`,
          disabled: !isFormValid || loading,
          children: loading ? "Signing in..." : "Sign in"
        }
      )
    ] }),
    showEmailCode && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "email-code-btn", children: "Sign in with Email Code" }),
    socialLogins.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "social-login", children: socialLogins.map((social, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "button",
      {
        type: "button",
        className: `${social.type}-btn social-btn`,
        onClick: social.onLogin,
        children: [
          social.icon && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: social.icon, alt: social.type, className: "social-icon" }),
          social.type === "facebook" && "Log in with Facebook",
          social.type === "apple" && "Sign in with Apple",
          social.type === "google" && "Sign in with Google"
        ]
      },
      index
    )) }),
    showCreateAccount && onCreateAccount && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "create-account", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
        "New to ",
        brandName,
        "? "
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "create-account-link", onClick: handleCreateAccount, children: "Create account" })
    ] })
  ] }) });
};
var Login_default = Login;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Login,
  SearchBar
});
//# sourceMappingURL=index.js.map