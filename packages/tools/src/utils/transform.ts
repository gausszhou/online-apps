// https://prettier.io/docs/en/api.html#prettierformatsource-options
import prettier from "prettier";
import EncodeUtils from "./endecode-lib";
import * as acorn from "acorn";
import * as astring from "astring";
import * as astravel from "astravel";

export const encodeList = [
  {
    label: "URL 编码",
    value: "utf8Encode",
  },
  {
    label: "UTF16 编码",
    value: "utf16Encode",
  },
  {
    label: "Base64 编码",
    value: "base64Encode",
  },
  {
    label: "Hex 编码",
    value: "hexEncode",
  },
  {
    label: "Unicode 编码",
    value: "uniEncode",
  },
];

export const decodeList = [
  {
    label: "URL 解码",
    value: "utf8Decode",
  },
  {
    label: "UTF16 解码",
    value: "utf16Decode",
  },
  {
    label: "Base64 解码",
    value: "base64Decode",
  },
  {
    label: "Hex 解码",
    value: "hexDecode",
  },
  {
    label: "Unicode 解码",
    value: "uniDecode",
  },
];

export const hashList = [
  {
    label: "MD5 哈希",
    value: "md5Encode",
  },
  {
    label: "Sha1 哈希",
    value: "sha1Encode",
  },
  {
    label: "Sha256 哈希",
    value: "sha256Encode",
  },
];

export const urlList = [
  {
    label: "URL 参数解析",
    value: "urlParamsDecode",
  }
]

export async function processCodec(value1: string, type: string) {
  let value2: string = "";
  let flag: string = "success";
  if (value1 === "") return ["", "empty"];
  if (type === "uniEncode") {
    value2 = EncodeUtils.uniEncode(value1);
  } else if (type === "uniDecode") {
    value2 = EncodeUtils.uniDecode(value1.replace(/\\U/g, "\\u"));
  } else if (type === "utf8Encode") {
    value2 = encodeURIComponent(value1);
  } else if (type === "utf8Decode") {
    value2 = decodeURIComponent(value1);
  } else if (type === "utf16Encode") {
    value2 = EncodeUtils.utf8to16(encodeURIComponent(value1));
  } else if (type === "utf16Decode") {
    value2 = decodeURIComponent(EncodeUtils.utf16to8(value1));
  } else if (type === "base64Encode") {
    value2 = EncodeUtils.base64Encode(EncodeUtils.utf8Encode(value1));
  } else if (type === "base64Decode") {
    value2 = EncodeUtils.utf8Decode(EncodeUtils.base64Decode(value1));
  } else if (type === "md5Encode") {
    value2 = EncodeUtils.md5(value1);
  } else if (type === "sha1Encode") {
    value2 = await EncodeUtils.sha1Encode(value1);
  } else if (type === "sha256Encode") {
    value2 = await EncodeUtils.sha256Encode(value1);
  } else if (type === "hexEncode") {
    value2 = EncodeUtils.hexEncode(value1);
  } else if (type === "hexDecode") {
    value2 = EncodeUtils.hexDecode(value1);
  } else if (type === "html2js") {
    value2 = EncodeUtils.html2js(value1);
  } else if (type === "htmlEntityEncode") {
    value2 = EncodeUtils.htmlEntityEncode(value1);
  } else if (type === "htmlEntityFullEncode") {
    value2 = EncodeUtils.htmlEntityFullEncode(value1);
  } else if (type === "htmlEntityDecode") {
    value2 = EncodeUtils.htmlEntityFullEncode(value1);
  } else if (type === "urlParamsDecode") {
    await formatOptions.json()
    let res = EncodeUtils.urlParamsDecode(value1);
    if (res?.error) {
      value2 = res?.error;
    } else {
      value2 = res;
    }
  } else {
    value2 = "";
    flag = "unrealized";
  }
  return [value2, flag];
}

export const languageList = [
  {
    label: "JSON",
    value: "json",
  },
  {
    label: "HTML",
    value: "html",
  },
  {
    label: "CSS",
    value: "css",
  },
  {
    label: "Less",
    value: "less",
  },
  {
    label: "Scss",
    value: "scss",
  },
  {
    label: "JavaScript",
    value: "javascript",
  },
  {
    label: "Typescript",
    value: "typescript",
  },
  {
    label: "Java",
    value: "java",
  },
];

export const formatOptions = {
  json: async () => ({
    parser: "json",
    plugins: [await import("prettier/parser-babel")],
    printWidth: 100,
    decimal: 1,
  }),
  html: async () => ({
    parser: "html",
    plugins: [await import("prettier/parser-html")],
    printWidth: 100,
    htmlWhitespaceSensitivity: "ignore",
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
  typescript: async () => ({
    parser: "typescript",
    plugins: [await import("prettier/parser-typescript")],
    printWidth: 100,
  }),
  java: async () => ({
    parser: "java",
    plugins: [await import("prettier-plugin-java")],
    printWidth: 100,
  }),

};

export async function processFormat(value1: string, type: string) {
  let value2 = "";
  let flag = "success";
  if (type === "application/json") {
    const object = JSON.parse(value1);
    value2 = JSON.stringify(object, null, 2);
  } else if (formatOptions[type as keyof typeof formatOptions]) {
    const option = await formatOptions[type as keyof typeof formatOptions]();
    value2 = prettier.format(value1, option);
  } else {
    value2 = value1;
  }
  return [value2, flag];
}

export const JSONList = [
  {
    label: "JSON 格式化",
    value: "jsonFormat",
  },
  {
    label: "JSON 转 Object",
    value: "json2Object",
  },
  {
    label: "Object 转 JSON",
    value: "object2Json",
  },
];

function makeSpaces(amount:number) {
  var result = ''
  while (amount-- > 0) result += ' '
  return result
}

export async function processJSON(value1: string, type: string) {
  let value2 = "";
  let flag = "success";
  if (type === "jsonFormat") {
    const option = await formatOptions.json();
    const object = JSON.parse(value1);
    const json = JSON.stringify(object, null, 2);
    value2 = prettier.format(json, option);
  } else if (type === "json2Object") {
    const prefix = "const object = "
    const code =  prefix + value1;
    const comments:any[] = [];
    const ast = acorn.parse(code,{
      ecmaVersion: 13,
      sourceType: 'module',
      locations: true,
      onComment: comments,
    });
    astravel.attachComments(ast, comments)
    const formattedCode = astring.generate(ast, {
      indent: makeSpaces(2),
      comments: true,
    })
    const objectCode:string = formattedCode.replace(prefix,"")
    value2 = objectCode;
  } else if (type === "object2Json") {
    const code = `
    function getObject() {
      const object = ${value1};
      return object;
    }
    return getObject;
    `;
    const getObject = new Function(code);
    const object = getObject()();
    const json = JSON.stringify(object);
    const option = await formatOptions.json();
    value2 = prettier.format(json, option);
  }
  return [value2, flag];
}
