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
  title,
  themeColor = "#684cbc",
  showEmailCode = true,
  showPrivacyNotice = false,
  socialLogins = {
    facebook: true,
    apple: true,
    google: true
  },
  facebookLogo,
  appleLogo,
  googleLogo,
  onSubmit,
  onForgotPassword,
  onCreateAccount,
  onEmailCode,
  onSocialLogin,
  privacyPolicyLink,
  loading = false,
  errorMessage = "",
  isTypeScript = false
}) => {
  const [email, setEmail] = (0, import_react2.useState)("");
  const [password, setPassword] = (0, import_react2.useState)("");
  const [stayLoggedIn, setStayLoggedIn] = (0, import_react2.useState)(false);
  const isFormValid = email.trim() !== "" && password.trim() !== "";
  const displayTitle = title || `Sign in to ${brandName}`;
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
  const handleEmailCode = () => {
    if (onEmailCode) {
      onEmailCode();
    }
  };
  const handleSocialLogin = (provider) => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "login-container", style: { "--theme-color": themeColor }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "logo-container", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: logo, alt: brandName, className: "login-logo" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { className: "login-title", children: displayTitle }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("form", { onSubmit: handleSubmit, className: "login-form", children: [
      errorMessage && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "alert alert-danger", role: "alert", children: errorMessage }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "form-group", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "input",
        {
          type: "email",
          placeholder: "Email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          className: "form-control",
          required: isTypeScript
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "form-group", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "input",
        {
          type: "password",
          placeholder: "Password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          className: "form-control",
          required: isTypeScript
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "form-check-container", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "form-check", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "input",
            {
              type: "checkbox",
              className: "form-check-input",
              id: "stayLoggedIn",
              checked: stayLoggedIn,
              onChange: (e) => setStayLoggedIn(e.target.checked)
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-check-label", htmlFor: "stayLoggedIn", children: "Stay logged in" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            type: "button",
            className: "forgot-password-link",
            onClick: handleForgotPassword,
            children: "Forgot Password"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "submit",
          className: `btn-signin ${!isFormValid || loading ? "disabled" : ""}`,
          disabled: !isFormValid || loading,
          children: loading ? "Signing in..." : "Sign in"
        }
      ),
      showPrivacyNotice && privacyPolicyLink && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "privacy-notice", children: [
        "By signing in or creating an account, you acknowledge and accept our",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("a", { href: privacyPolicyLink, className: "privacy-link", children: "privacy policy" })
      ] })
    ] }),
    showEmailCode && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "email-code-btn", onClick: handleEmailCode, children: "Sign in with Email Code" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "social-login", children: [
      socialLogins.facebook && facebookLogo && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "button",
        {
          className: "btn-facebook",
          onClick: () => handleSocialLogin("facebook"),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: facebookLogo, alt: "Facebook", className: "social-icon" }),
            "Log in with Facebook"
          ]
        }
      ),
      socialLogins.apple && appleLogo && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "button",
        {
          className: "btn-apple",
          onClick: () => handleSocialLogin("apple"),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: appleLogo, alt: "Apple", className: "social-icon" }),
            "Sign in with Apple"
          ]
        }
      ),
      socialLogins.google && googleLogo && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "button",
        {
          className: "btn-google",
          onClick: () => handleSocialLogin("google"),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: googleLogo, alt: "Google", className: "social-icon" }),
            "Sign in with Google"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "create-account", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
        "New to ",
        brandName,
        "? "
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "button",
          className: "create-account-link",
          onClick: handleCreateAccount,
          children: "Create account"
        }
      )
    ] })
  ] });
};
var Login_default = Login;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Login,
  SearchBar
});
//# sourceMappingURL=index.js.map