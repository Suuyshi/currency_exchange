import "regenerator-runtime/runtime";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "@testing-library/jest-dom";

Enzyme.configure({ adapter: new Adapter() });
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {
        return;
      },
      removeListener: function () {
        return;
      },
    };
  };
const script = global.document.createElement("script");
script.setAttribute("src", "/");
Object.defineProperty(global.document, "currentScript", {
  value: script,
});
