import prettier from "prettier/standalone";

const options = {
  html: async () => ({
    parser: "html",
    plugins: [await import("prettier/parser-html")],
    printWidth: 100,
  }),
  typescript: async () => ({
    parser: "typescript",
    plugins: [await import("prettier/parser-typescript")],
    printWidth: 100,
  }),
  css: async () => ({
    parser: "css",
    plugins: [await import("prettier/parser-postcss")],
    printWidth: 100,
  }),
  less: async () => ({
    parser: "less",
    plugins: [await import("prettier/parser-postcss")],
    printWidth: 100,
  }),
  scss: async () => ({
    parser: "scss",
    plugins: [await import("prettier/parser-postcss")],
    printWidth: 100,
  }),
  javascript: async () => ({
    parser: "babel",
    plugins: [await import("prettier/parser-babel")],
    printWidth: 100,
    semi: false,
    singleQuote: true,
  }),
};

let current:any;

addEventListener("message", async (event) => {
  if (event.data._current) {
    current = event.data._current;
    return;
  }

  function respond(data: any) {
    setTimeout(() => {
      if (event.data._id === current) {
        postMessage({ _id: event.data._id, ...data });
      } else {
        postMessage({ _id: event.data._id, canceled: true });
      }
    }, 0);
  }

  const opts = await options[event.data.language as keyof typeof options]();

  try {
    respond({
      pretty: prettier.format(event.data.text, opts),
    });
  } catch (error) {
    respond({ error });
  }
});
