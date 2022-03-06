import "@mdi/font/css/materialdesignicons.css";
import "vuetify/lib/styles/main.sass";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
import { createVuetify } from "vuetify";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#F5F5F5",
          background: "#C5DBBD",
          error: "#d63031",
          danger: "#CC2936",
          info: "#0094C6",
          secondary: "#fdcb6e",
          success: "#3E8914",
          surface: "#ffffff",
          warning: "#2d3436",
          textcolor: "#000",
          loginedBackground: "#a5b452",
          jedlikRed: "#e42028",
          jedlikBlue: "#2e57a1",
        },
        dark: false,
        variables: {},
      },
      dark: {
        colors: {
          primary: "#131B23",
          background: "#768137",
          error: "#d63031",
          danger: "#CC2936",
          info: "#0094C6",
          secondary: "#131b23",
          success: "#3E8914",
          surface: "#212121",
          warning: "#FA8D28",
          textcolor: "#fff",
          loginedBackground: "#36443c",
          jedlikRed: "#e42028",
          jedlikBlue: "#2e57a1",
        },
        dark: true,
        variables: {},
      },
    },
  },
  display: {
    mobileBreakpoint: "md",
    thresholds: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1264,
      xl: 1400,
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

// export default vuetify;
