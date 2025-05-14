/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "false",
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
          colors: {
            deepblue: "#0F0440",
            bloodred: "#E50600",
            parrotgreen: "#55E59A",
            basicwhite: "#FFFFFF",
            naranga: "#F97316",
          },

          
        }
    }
};
