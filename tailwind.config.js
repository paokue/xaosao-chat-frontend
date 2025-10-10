/** @type {import('tailwindcss').Config} */
export default {
  content: ["/src/main.tsx", "./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefinSans: ["Josefin Sans"],
        Poppins: ["Poppins"],
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        borderColor: "var(--border-color)",
        lightText: "var(--light-text)",
        darkText: "var(--dark-text)",
        selectedChat: "#fff1f2",
        messageHead: "#fff1f2",
        otherMessageBg: "var(--other-message-bg)",
        modalBg: "var(--modal-bg)",
        dropdownOptionHover: "var(--dropdown-option-hover)",
        selectedMessage: "var(--selected-message)",
        otherProfileSidebar: "var(--other-profile-sidebar)",
        pdfBg: "var(--pdf-bg)",
        attachIconBg: "var(--attachfile-icon-bg)",
        pinMessageListHeader: "var(--pin-messagelist-header)",
        pinMessageList: "var(--pin-messagelist)",
      },
    },
  },
};

// export default {
//   content: ["./src/main.tsx", "./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         josefinSans: ["Josefin Sans", "sans-serif"],
//         Poppins: ["Poppins", "sans-serif"],
//       },
//       colors: {
//         primary: "#e11d48", // rose-600
//         secondary: "#f43f5e", // rose-500
//         borderColor: "#fecdd3", // rose-200
//         lightText: "#fda4af", // rose-300
//         darkText: "#881337", // rose-900
//         selectedChat: "#ffe4e6", // rose-100
//         messageHead: "#fb7185", // rose-400
//         otherMessageBg: "#fff1f2", // rose-50
//         modalBg: "#fff1f2", // light rose background
//         dropdownOptionHover: "#fda4af", // rose-300
//         selectedMessage: "#fecdd3", // rose-200
//         otherProfileSidebar: "#ffe4e6", // rose-100
//         pdfBg: "#ffe4e6", // rose-100
//         attachIconBg: "#f43f5e", // rose-500
//         pinMessageListHeader: "#fb7185", // rose-400
//         pinMessageList: "#ffe4e6", // rose-100
//       },
//     },
//   },
// };
