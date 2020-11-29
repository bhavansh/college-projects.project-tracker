module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#ffc93c",
          200: "#ff9a3c",
          300: "#ff6f3c",
        },
        secondary: {
          100: "#4B5563",
          200: "#374151",
          300: "#1F2937",
          400: "#111827",
        },
        bg: {
          50: "rgba(249, 250, 251, var(--tw-bg-opacity))",
          100: "#F9FAFB",
          200: "#F3F4F6",
          300: "#E5E7EB",
        },
      },
      fontFamily: {
        body: ["Poppins"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
