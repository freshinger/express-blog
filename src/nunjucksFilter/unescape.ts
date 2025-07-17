export const unescape = (str: string) => {
  const replaceArray = (subject: string, find: string[], replace: string[]) => {
    let replaceString = subject;
    var regex;
    for (var i = 0; i < find.length; i++) {
      regex = new RegExp(find[i], "g");
      replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
  };

  let find = ["&amp;", "&gt;", "&lt;", "&quot;", "&#39;", "&#x2F;"];
  let replace = ["&", ">", "<", '"', "'", "/"];

  return replaceArray(str, find, replace);
};
