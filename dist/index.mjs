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

// src/components/Login/Login.js
import React2, { useState } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
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
  return /* @__PURE__ */ jsx2("div", { className: "login-app", style: { "--theme-color": themeColor, "--brand-color": themeColor }, children: /* @__PURE__ */ jsxs2("div", { className: "login-container", children: [
    logo && /* @__PURE__ */ jsx2("div", { className: "logo-container", children: /* @__PURE__ */ jsx2("img", { src: logo, alt: brandName, className: "logo" }) }),
    /* @__PURE__ */ jsxs2("h1", { className: "login-title", children: [
      "Sign in to ",
      brandName
    ] }),
    /* @__PURE__ */ jsxs2("form", { onSubmit: handleSubmit, className: "login-form", children: [
      errorMessage && /* @__PURE__ */ jsx2("div", { className: "alert alert-danger", role: "alert", children: errorMessage }),
      /* @__PURE__ */ jsx2("div", { className: "input-group", children: /* @__PURE__ */ jsx2(
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
      /* @__PURE__ */ jsx2("div", { className: "input-group", children: /* @__PURE__ */ jsx2(
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
      /* @__PURE__ */ jsxs2("div", { className: "checkbox-row", children: [
        /* @__PURE__ */ jsxs2("label", { className: "checkbox-label", children: [
          /* @__PURE__ */ jsx2(
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
        onForgotPassword && /* @__PURE__ */ jsx2("button", { type: "button", className: "forgot-password", onClick: handleForgotPassword, children: "Forgot Password" })
      ] }),
      /* @__PURE__ */ jsx2(
        "button",
        {
          type: "submit",
          className: `sign-in-btn ${!isFormValid ? "disabled" : ""}`,
          disabled: !isFormValid || loading,
          children: loading ? "Signing in..." : "Sign in"
        }
      )
    ] }),
    showEmailCode && /* @__PURE__ */ jsx2("button", { className: "email-code-btn", children: "Sign in with Email Code" }),
    socialLogins.length > 0 && /* @__PURE__ */ jsx2("div", { className: "social-login", children: socialLogins.map((social, index) => /* @__PURE__ */ jsxs2(
      "button",
      {
        type: "button",
        className: `${social.type}-btn social-btn`,
        onClick: social.onLogin,
        children: [
          social.icon && /* @__PURE__ */ jsx2("img", { src: social.icon, alt: social.type, className: "social-icon" }),
          social.type === "facebook" && "Log in with Facebook",
          social.type === "apple" && "Sign in with Apple",
          social.type === "google" && "Sign in with Google"
        ]
      },
      index
    )) }),
    showCreateAccount && onCreateAccount && /* @__PURE__ */ jsxs2("div", { className: "create-account", children: [
      /* @__PURE__ */ jsxs2("span", { children: [
        "New to ",
        brandName,
        "? "
      ] }),
      /* @__PURE__ */ jsx2("button", { type: "button", className: "create-account-link", onClick: handleCreateAccount, children: "Create account" })
    ] })
  ] }) });
};
var Login_default = Login;
export {
  Login_default as Login,
  SearchBar_default as SearchBar
};
//# sourceMappingURL=index.mjs.map