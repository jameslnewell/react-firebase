import React from 'react';
import {A as AppContext} from '../../dist/useApp-276dbbdf.esm.js';
export {u as useApp} from '../../dist/useApp-276dbbdf.esm.js';

function AppProvider(_ref) {
  var app = _ref.app,
    children = _ref.children;
  return /*#__PURE__*/ React.createElement(
    AppContext.Provider,
    {
      value: app,
    },
    children,
  );
}

export {AppProvider};
