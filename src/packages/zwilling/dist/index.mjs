var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// index.tsx
import { jsx } from "react/jsx-runtime";
function Zwilling({
  classNameJoiner = (classNames) => classNames.join(" ")
} = {}) {
  const buildClassString = ({ args, props }) => {
    const [firstArg, ...otherArgs] = args;
    if (!firstArg)
      return "";
    if (typeof firstArg === "function") {
      return classNameJoiner(firstArg(props));
    }
    if (!otherArgs.length)
      return classNameJoiner(firstArg);
    const templateStringArray = firstArg;
    const templateExpressions = otherArgs;
    let classString = "";
    for (let index = 0; index < templateStringArray.length; index++) {
      const string = templateStringArray[index];
      classString += string;
      const expression = templateExpressions[index];
      if (expression) {
        const expressionResult = typeof expression === "function" ? expression(props) : expression;
        classString += classNameJoiner(expressionResult);
      }
    }
    return classString;
  };
  const buildTemplateFunc = ({ BaseComp }) => {
    const templateFunc = (...args) => {
      const Component = (_a) => {
        var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
        const classString = buildClassString({
          args,
          props
        });
        return /* @__PURE__ */ jsx(BaseComp, { className: classNameJoiner([classString, className]), children });
      };
      return Component;
    };
    return templateFunc;
  };
  const zw = new Proxy(() => ``, {
    // zw.div`text-black`
    get(_target, prop, _receiver) {
      if (typeof prop === "symbol")
        throw new Error("Symbol is not supported");
      const BaseComp = prop;
      return buildTemplateFunc({
        BaseComp
      });
    },
    apply(_target, _thisArg, args) {
      const firstArg = args[0];
      const isArray = Array.isArray(firstArg);
      if (isArray) {
        const classString = buildClassString({
          args
        });
        return classString;
      } else {
        const BaseComp = firstArg;
        return buildTemplateFunc({
          BaseComp
        });
      }
    }
  });
  return zw;
}
export {
  Zwilling
};
