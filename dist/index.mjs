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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
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
  return /* @__PURE__ */ jsxs2("div", { className: "login-container", style: { "--theme-color": themeColor }, children: [
    /* @__PURE__ */ jsx2("div", { className: "logo-container", children: /* @__PURE__ */ jsx2("img", { src: logo, alt: brandName, className: "login-logo" }) }),
    /* @__PURE__ */ jsx2("h1", { className: "login-title", children: displayTitle }),
    /* @__PURE__ */ jsxs2("form", { onSubmit: handleSubmit, className: "login-form", children: [
      errorMessage && /* @__PURE__ */ jsx2("div", { className: "alert alert-danger", role: "alert", children: errorMessage }),
      /* @__PURE__ */ jsx2("div", { className: "form-group", children: /* @__PURE__ */ jsx2(
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
      /* @__PURE__ */ jsx2("div", { className: "form-group", children: /* @__PURE__ */ jsx2(
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
      /* @__PURE__ */ jsxs2("div", { className: "form-check-container", children: [
        /* @__PURE__ */ jsxs2("div", { className: "form-check", children: [
          /* @__PURE__ */ jsx2(
            "input",
            {
              type: "checkbox",
              className: "form-check-input",
              id: "stayLoggedIn",
              checked: stayLoggedIn,
              onChange: (e) => setStayLoggedIn(e.target.checked)
            }
          ),
          /* @__PURE__ */ jsx2("label", { className: "form-check-label", htmlFor: "stayLoggedIn", children: "Stay logged in" })
        ] }),
        /* @__PURE__ */ jsx2(
          "button",
          {
            type: "button",
            className: "forgot-password-link",
            onClick: handleForgotPassword,
            children: "Forgot Password"
          }
        )
      ] }),
      /* @__PURE__ */ jsx2(
        "button",
        {
          type: "submit",
          className: `btn-signin ${!isFormValid || loading ? "disabled" : ""}`,
          disabled: !isFormValid || loading,
          children: loading ? "Signing in..." : "Sign in"
        }
      ),
      showPrivacyNotice && privacyPolicyLink && /* @__PURE__ */ jsxs2("div", { className: "privacy-notice", children: [
        "By signing in or creating an account, you acknowledge and accept our",
        " ",
        /* @__PURE__ */ jsx2("a", { href: privacyPolicyLink, className: "privacy-link", children: "privacy policy" })
      ] })
    ] }),
    showEmailCode && /* @__PURE__ */ jsx2("button", { className: "email-code-btn", onClick: handleEmailCode, children: "Sign in with Email Code" }),
    /* @__PURE__ */ jsxs2("div", { className: "social-login", children: [
      socialLogins.facebook && facebookLogo && /* @__PURE__ */ jsxs2(
        "button",
        {
          className: "btn-facebook",
          onClick: () => handleSocialLogin("facebook"),
          children: [
            /* @__PURE__ */ jsx2("img", { src: facebookLogo, alt: "Facebook", className: "social-icon" }),
            "Log in with Facebook"
          ]
        }
      ),
      socialLogins.apple && appleLogo && /* @__PURE__ */ jsxs2(
        "button",
        {
          className: "btn-apple",
          onClick: () => handleSocialLogin("apple"),
          children: [
            /* @__PURE__ */ jsx2("img", { src: appleLogo, alt: "Apple", className: "social-icon" }),
            "Sign in with Apple"
          ]
        }
      ),
      socialLogins.google && googleLogo && /* @__PURE__ */ jsxs2(
        "button",
        {
          className: "btn-google",
          onClick: () => handleSocialLogin("google"),
          children: [
            /* @__PURE__ */ jsx2("img", { src: googleLogo, alt: "Google", className: "social-icon" }),
            "Sign in with Google"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs2("div", { className: "create-account", children: [
      /* @__PURE__ */ jsxs2("span", { children: [
        "New to ",
        brandName,
        "? "
      ] }),
      /* @__PURE__ */ jsx2(
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
export {
  Login_default as Login,
  SearchBar_default as SearchBar
};
//# sourceMappingURL=index.mjs.map