/* @ds-bundle: {"format":4,"namespace":"DestinaDesignSystem_8ca90f","components":[{"name":"AppCard","sourcePath":"components/apps/AppCard.jsx"},{"name":"DGAppCard","sourcePath":"components/apps/DGAppCard.jsx"},{"name":"TabBar","sourcePath":"components/apps/TabBar.jsx"},{"name":"ActionButton","sourcePath":"components/core/ActionButton.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"InfoPanel","sourcePath":"components/feedback/InfoPanel.jsx"},{"name":"Modal","sourcePath":"components/feedback/Modal.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"AccentRow","sourcePath":"components/layout/AccentRow.jsx"},{"name":"Card","sourcePath":"components/layout/Card.jsx"},{"name":"Panel","sourcePath":"components/layout/Panel.jsx"},{"name":"StatCard","sourcePath":"components/layout/StatCard.jsx"},{"name":"Table","sourcePath":"components/layout/Table.jsx"},{"name":"GlassChip","sourcePath":"components/web/GlassChip.jsx"},{"name":"PillLabel","sourcePath":"components/web/PillLabel.jsx"},{"name":"WebNav","sourcePath":"components/web/WebNav.jsx"}],"sourceHashes":{"components/apps/AppCard.jsx":"b5c71bf6d76e","components/apps/DGAppCard.jsx":"b402c2b7e7b1","components/apps/TabBar.jsx":"6f851d940573","components/core/ActionButton.jsx":"193953e75887","components/core/Button.jsx":"eb17bb06841a","components/core/Icon.jsx":"44151ca613f5","components/feedback/Badge.jsx":"10e079a49ab2","components/feedback/InfoPanel.jsx":"a4e641154b4d","components/feedback/Modal.jsx":"f37f480b2b91","components/forms/Input.jsx":"7a1d255c74a4","components/forms/Switch.jsx":"06bc7e6c18b1","components/layout/AccentRow.jsx":"b8a2d2cb0d65","components/layout/Card.jsx":"bc48deb32607","components/layout/Panel.jsx":"31981738963c","components/layout/StatCard.jsx":"bf63475f3bee","components/layout/Table.jsx":"0e397976478e","components/web/GlassChip.jsx":"537bee3b9599","components/web/PillLabel.jsx":"35b725c2868b","components/web/WebNav.jsx":"c0b0c1a23298","ui_kits/destina-home/HomeScreen.jsx":"5ec8629b7088","ui_kits/dg-apps/AccountScreen.jsx":"c8735895a9d8","ui_kits/dg-apps/HolidaysScreen.jsx":"4bc357de17d2","ui_kits/dg-apps/TimeScreen.jsx":"08a85a2642f1","ui_kits/dg-apps/format.jsx":"374e1e16b7e7","ui_kits/market-intelligence/MIScreen.jsx":"c38227a64c4f","ui_kits/market-intelligence/data.jsx":"9216ef6b3236","ui_kits/website/Sections.jsx":"9fecc510522a"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DestinaDesignSystem_8ca90f = window.DestinaDesignSystem_8ca90f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/apps/DGAppCard.jsx
try { (() => {
function DGAppCard({
  app,
  user,
  children,
  footer,
  wide = false,
  monogramSrc = 'assets/monogram-blue.png',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: wide ? 640 : 396,
      margin: '0 auto',
      background: 'var(--surface)',
      borderRadius: 'var(--radius-app-card)',
      boxShadow: 'var(--shadow-app-card)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      animation: 'dg-fadeUp 0.5s var(--ease-out)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 24px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: monogramSrc,
    alt: "Destina",
    style: {
      width: 36,
      height: 'auto',
      filter: 'var(--logo-shadow)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
      color: 'var(--primary)'
    }
  }, "DG ", app)), user ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: 'var(--text-muted)',
      marginTop: 8
    }
  }, "Welcome, ", user) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      flex: 1
    }
  }, children), footer);
}
Object.assign(__ds_scope, { DGAppCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/apps/DGAppCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LUCIDE = 'https://unpkg.com/lucide-static@0.452.0/icons/';
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  style,
  ...rest
}) {
  const url = 'url(' + LUCIDE + name + '.svg) center / contain no-repeat';
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true"
  }, rest, {
    style: {
      display: 'inline-block',
      width: size,
      height: size,
      flex: 'none',
      backgroundColor: color,
      WebkitMask: url,
      mask: url,
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/apps/TabBar.jsx
try { (() => {
function TabBar({
  items = [],
  active,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      padding: '8px 8px 12px',
      ...style
    }
  }, items.map(it => {
    const on = it.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      type: "button",
      onClick: () => onChange && onChange(it.id),
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '6px 4px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 11.2,
        fontWeight: on ? 700 : 500,
        color: on ? 'var(--primary)' : 'var(--tab-idle)',
        transition: 'var(--transition-base)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 22
    }), /*#__PURE__*/React.createElement("span", null, it.label));
  }));
}
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/apps/TabBar.jsx", error: String((e && e.message) || e) }); }

// components/core/ActionButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  blue: {
    background: 'var(--dg-action-blue)',
    color: '#fff',
    boxShadow: 'var(--shadow-action)'
  },
  red: {
    background: 'var(--dg-action-red)',
    color: '#fff',
    boxShadow: '0 4px 10px -4px rgba(255,59,59,0.45)'
  },
  yellow: {
    background: 'var(--dg-action-yellow)',
    color: '#111111',
    boxShadow: '0 4px 10px -4px rgba(255,184,28,0.5)'
  },
  graphite: {
    background: 'var(--dg-action-graphite)',
    color: '#fff',
    boxShadow: '0 4px 10px -4px rgba(0,0,0,0.3)'
  }
};
function ActionButton({
  children,
  tone = 'blue',
  icon,
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const [ripples, setRipples] = React.useState([]);
  const [hover, setHover] = React.useState(false);
  const t = TONES[tone] || TONES.blue;
  const press = e => {
    if (disabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples(rs => rs.concat({
      id,
      x: e.clientX - r.left,
      y: e.clientY - r.top
    }));
    setTimeout(() => setRipples(rs => rs.filter(x => x.id !== id)), 600);
    onClick && onClick(e);
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: press,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      minHeight: 76,
      padding: '14px 12px',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      fontFamily: 'inherit',
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.2,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'var(--transition-base)',
      ...(disabled ? {
        background: 'var(--disabled-bg)',
        color: 'var(--disabled-fg)',
        boxShadow: 'none'
      } : t),
      ...(hover && !disabled ? {
        transform: 'var(--lift-btn)',
        filter: 'brightness(0.95)'
      } : null),
      ...style
    }
  }), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 22
  }) : null, /*#__PURE__*/React.createElement("span", null, children), ripples.map(r => /*#__PURE__*/React.createElement("span", {
    key: r.id,
    style: {
      position: 'absolute',
      left: r.x - 20,
      top: r.y - 20,
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.6)',
      pointerEvents: 'none',
      animation: 'dg-ripple 0.6s ease-out forwards'
    }
  })));
}
Object.assign(__ds_scope, { ActionButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ActionButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    padding: '8px 14px',
    fontSize: 13,
    borderRadius: 'var(--radius-2xs)',
    gap: 6,
    icon: 16
  },
  md: {
    padding: '12px 22px',
    fontSize: 15,
    borderRadius: 'var(--radius-md)',
    gap: 8,
    icon: 18
  },
  lg: {
    padding: '15px 28px',
    fontSize: 16,
    borderRadius: 'var(--radius-md)',
    gap: 10,
    icon: 20
  }
};
const VARIANTS = {
  primary: {
    base: {
      background: 'var(--primary)',
      color: 'var(--on-primary)',
      border: '1px solid var(--primary)',
      boxShadow: 'var(--shadow-btn)'
    },
    hover: {
      background: 'var(--primary-dark)',
      borderColor: 'var(--primary-dark)',
      boxShadow: 'var(--shadow-btn-hover)',
      transform: 'var(--lift-btn)'
    }
  },
  secondary: {
    base: {
      background: 'var(--surface)',
      color: 'var(--primary)',
      border: '1px solid var(--border-light)'
    },
    hover: {
      borderColor: 'var(--primary)',
      background: 'var(--primary-bg)'
    }
  },
  ghost: {
    base: {
      background: 'transparent',
      color: 'var(--primary)',
      border: '1px solid transparent'
    },
    hover: {
      background: 'var(--dg-blue-a06)'
    }
  },
  danger: {
    base: {
      background: 'var(--danger)',
      color: '#fff',
      border: '1px solid var(--danger)'
    },
    hover: {
      background: 'var(--secondary-dark)',
      borderColor: 'var(--secondary-dark)',
      transform: 'var(--lift-btn)'
    }
  },
  warning: {
    base: {
      background: 'var(--tertiary)',
      color: 'var(--on-tertiary)',
      border: '1px solid var(--tertiary)'
    },
    hover: {
      background: 'var(--tertiary-dark)',
      borderColor: 'var(--tertiary-dark)',
      transform: 'var(--lift-btn)'
    }
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  icon,
  iconRight,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const {
    icon: iconSize,
    ...box
  } = s;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      display: block ? 'flex' : 'inline-flex',
      width: block ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'inherit',
      fontWeight: 600,
      lineHeight: 1.2,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'var(--transition-base)',
      whiteSpace: 'nowrap',
      ...box,
      ...(block ? {
        borderRadius: 'var(--radius-btn-block)',
        padding: '14px 22px'
      } : null),
      ...v.base,
      ...(hover && !disabled ? v.hover : null),
      ...(disabled ? {
        opacity: 'var(--disabled-opacity)'
      } : null),
      ...style
    }
  }), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: iconSize
  }) : null, children, iconRight ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: iconSize
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
const TONES = {
  primary: ['var(--accent-blue-bg)', 'var(--primary)', 'transparent'],
  success: ['var(--success-bg)', 'var(--success-dark)', 'transparent'],
  danger: ['var(--danger-bg)', 'var(--secondary-dark)', 'transparent'],
  warning: ['var(--warning-bg)', 'var(--warning-text)', 'transparent'],
  neutral: ['var(--status-other-bg)', 'var(--status-other-fg)', 'transparent'],
  in: ['var(--status-in-bg)', 'var(--status-in-fg)', 'var(--status-in-border)'],
  pause: ['var(--status-pause-bg)', 'var(--status-pause-fg)', 'var(--status-pause-border)'],
  other: ['var(--status-other-bg)', 'var(--status-other-fg)', 'var(--status-other-border)'],
  national: ['var(--tag-national-bg)', 'var(--tag-national-fg)', 'transparent'],
  local: ['var(--tag-local-bg)', 'var(--tag-local-fg)', 'transparent'],
  regional: ['var(--tag-regional-bg)', 'var(--tag-regional-fg)', 'transparent']
};
function Badge({
  children,
  tone = 'primary',
  icon,
  dot = false,
  size = 'md',
  style
}) {
  const [bg, fg, bd] = TONES[tone] || TONES.primary;
  const sm = size === 'sm';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: sm ? '2px 8px' : '4px 12px',
      borderRadius: 'var(--radius-pill)',
      background: bg,
      color: fg,
      border: '1px solid ' + bd,
      fontSize: sm ? 11.2 : 12,
      fontWeight: 600,
      lineHeight: 1.3,
      whiteSpace: 'nowrap',
      ...style
    }
  }, dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'currentColor'
    }
  }) : null, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: sm ? 12 : 14
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/InfoPanel.jsx
try { (() => {
const TONES = {
  info: ['var(--primary)', 'var(--report-bg)', 'info'],
  success: ['var(--success)', 'var(--success-bg)', 'circle-check'],
  warning: ['var(--tertiary)', 'var(--warning-bg)', 'triangle-alert'],
  danger: ['var(--danger)', 'var(--danger-bg)', 'circle-alert']
};
function InfoPanel({
  children,
  title,
  tone = 'info',
  icon,
  style
}) {
  const [rule, bg, def] = TONES[tone] || TONES.info;
  const fg = tone === 'warning' ? 'var(--warning-text)' : rule;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      padding: '14px 16px',
      background: bg,
      borderLeft: '5px solid ' + rule,
      borderRadius: 'var(--radius-sm)',
      color: 'var(--text)',
      fontSize: 14,
      lineHeight: 1.55,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon || def,
    size: 18,
    color: fg,
    style: {
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: fg,
      marginBottom: 2
    }
  }, title) : null, /*#__PURE__*/React.createElement("div", null, children)));
}
Object.assign(__ds_scope, { InfoPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/InfoPanel.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Modal.jsx
try { (() => {
function Modal({
  open = true,
  title,
  children,
  footer,
  onClose,
  width = 440,
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      background: 'var(--overlay-backdrop)',
      backdropFilter: 'var(--blur-backdrop)',
      WebkitBackdropFilter: 'var(--blur-backdrop)',
      animation: 'dg-fadeUp 0.2s ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: width,
      background: 'var(--surface)',
      borderRadius: 'var(--radius-modal)',
      boxShadow: 'var(--shadow-modal)',
      padding: 24,
      animation: 'dg-slideIn 0.3s var(--ease-out)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--font-h2)',
      letterSpacing: 'var(--ls-h2)',
      color: 'var(--text)'
    }
  }, title), onClose ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Close",
    onClick: onClose,
    style: {
      display: 'flex',
      padding: 6,
      border: 'none',
      borderRadius: 'var(--radius-xs)',
      background: 'var(--control-bg)',
      color: 'var(--control-fg)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  })) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      lineHeight: 1.6,
      color: 'var(--text-muted)'
    }
  }, children), footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      marginTop: 24
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Modal.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  icon,
  as = 'input',
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
  style,
  inputStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const Tag = as;
  const field = {
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    fontSize: 15,
    lineHeight: 1.4,
    color: 'var(--text)',
    background: disabled ? 'var(--panel-muted-bg)' : 'var(--surface)',
    border: '1px solid ' + (error ? 'var(--danger)' : focus ? 'var(--primary)' : 'var(--border-light)'),
    borderRadius: 'var(--radius-xs)',
    padding: icon ? '11px 14px 11px 40px' : '11px 14px',
    outline: 'none',
    boxShadow: focus ? 'var(--focus-ring)' : 'none',
    transition: 'var(--transition-base)',
    resize: as === 'textarea' ? 'vertical' : undefined,
    minHeight: as === 'textarea' ? 96 : undefined,
    appearance: as === 'select' ? 'none' : undefined,
    opacity: disabled ? 'var(--disabled-opacity)' : 1,
    ...inputStyle
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--font-label-sm)',
      letterSpacing: 'var(--ls-label-sm)',
      textTransform: 'uppercase',
      color: 'var(--label-fg)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16,
    color: "var(--text-muted)",
    style: {
      position: 'absolute',
      left: 14,
      top: '50%',
      transform: 'translateY(-50%)'
    }
  }) : null, /*#__PURE__*/React.createElement(Tag, _extends({
    type: as === 'input' ? type : undefined,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: field
  }, rest), as === 'select' ? options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)) : null), as === 'select' ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16,
    color: "var(--text-muted)",
    style: {
      position: 'absolute',
      right: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none'
    }
  }) : null), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--danger)'
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
  style
}) {
  const [inner, setInner] = React.useState(defaultChecked);
  const on = checked !== undefined ? checked : inner;
  const toggle = () => {
    if (disabled) return;
    const n = !on;
    if (checked === undefined) setInner(n);
    onChange && onChange(n);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 'var(--disabled-opacity)' : 1,
      fontSize: 15,
      color: 'var(--text)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "switch",
    "aria-checked": on,
    tabIndex: 0,
    onClick: toggle,
    onKeyDown: e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggle();
      }
    },
    style: {
      position: 'relative',
      width: 44,
      height: 24,
      flex: 'none',
      borderRadius: 'var(--radius-pill)',
      background: on ? 'var(--primary)' : 'var(--switch-off)',
      transition: 'var(--transition-base)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: on ? 22 : 2,
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      transition: 'var(--transition-base)'
    }
  })), label ? /*#__PURE__*/React.createElement("span", {
    onClick: toggle
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/layout/AccentRow.jsx
try { (() => {
function AccentRow({
  title,
  meta,
  right,
  accent = 'var(--primary)',
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 14px',
      background: hover && onClick ? 'var(--primary-bg)' : 'var(--row-accent-bg)',
      borderLeft: '3px solid ' + accent,
      borderRadius: 'var(--radius-sm)',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'var(--transition-base)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text)',
      lineHeight: 1.35,
      fontVariantNumeric: 'tabular-nums'
    }
  }, title), meta ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-muted)',
      lineHeight: 1.4,
      marginTop: 2,
      fontVariantNumeric: 'tabular-nums'
    }
  }, meta) : null), right ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, right) : null);
}
Object.assign(__ds_scope, { AccentRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/AccentRow.jsx", error: String((e && e.message) || e) }); }

// components/layout/Card.jsx
try { (() => {
function Card({
  children,
  interactive = false,
  featured = false,
  padding = 24,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const lift = interactive && hover;
  const base = featured ? {
    background: 'var(--bg-featured)',
    color: '#fff',
    border: '1px solid transparent',
    boxShadow: lift ? 'var(--shadow-featured-hover)' : 'var(--shadow-btn)'
  } : {
    background: 'var(--surface)',
    color: 'var(--text)',
    border: '1px solid ' + (lift ? 'var(--border-blue)' : 'var(--border)'),
    boxShadow: lift ? 'var(--shadow-card-hover)' : 'var(--shadow-card)'
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderRadius: 'var(--radius-card)',
      padding,
      transition: 'all 0.3s var(--ease-out)',
      transform: lift ? 'var(--lift-card)' : 'none',
      cursor: interactive ? 'pointer' : 'default',
      ...base,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Card.jsx", error: String((e && e.message) || e) }); }

// components/apps/AppCard.jsx
try { (() => {
function AppCard({
  title,
  description,
  icon = 'app-window',
  accent = 'blue',
  onClick,
  style
}) {
  const c = 'var(--accent-' + accent + ')';
  const bg = 'var(--accent-' + accent + '-bg)';
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    interactive: true,
    onClick: onClick,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 'var(--radius-md)',
      background: bg,
      color: c,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 24
  })), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-up-right",
    size: 18,
    color: "var(--text-muted)"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--font-h3)',
      letterSpacing: 'var(--ls-h3)',
      color: 'var(--text)'
    }
  }, title), description ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: 1.55,
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, description) : null));
}
Object.assign(__ds_scope, { AppCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/apps/AppCard.jsx", error: String((e && e.message) || e) }); }

// components/layout/Panel.jsx
try { (() => {
const V = {
  tinted: {
    background: 'var(--panel-bg)',
    border: '1px solid var(--panel-border)'
  },
  plain: {
    background: 'var(--surface)',
    border: '1px solid var(--panel-plain-border)'
  },
  muted: {
    background: 'var(--panel-muted-bg)',
    border: '1px solid var(--panel-muted-border)'
  }
};
function Panel({
  children,
  title,
  action,
  variant = 'tinted',
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      borderRadius: 'var(--radius-lg)',
      padding: 16,
      ...(V[variant] || V.tinted),
      ...style
    }
  }, title || action ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--font-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--primary)'
    }
  }, title), action) : null, children);
}
Object.assign(__ds_scope, { Panel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Panel.jsx", error: String((e && e.message) || e) }); }

// components/layout/StatCard.jsx
try { (() => {
function StatCard({
  label,
  value,
  unit,
  delta,
  icon,
  accent,
  style
}) {
  const mi = !!accent;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      padding: '14px 16px',
      borderRadius: mi ? 'var(--radius-sm)' : 'var(--radius-lg)',
      background: mi ? 'var(--surface)' : 'var(--stat-bg)',
      border: '1px solid ' + (mi ? 'var(--mi-line)' : 'var(--stat-border)'),
      borderLeft: mi ? '4px solid ' + accent : undefined,
      boxShadow: 'var(--shadow-stat)',
      fontFamily: mi ? 'var(--font-mi)' : 'inherit',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      font: mi ? '600 11.2px/1.2 var(--font-mi)' : 'var(--font-label-sm)',
      letterSpacing: 'var(--ls-label-sm)',
      textTransform: 'uppercase',
      color: mi ? 'var(--mi-muted)' : 'var(--label-fg)'
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14,
    color: accent || 'var(--primary)'
  }) : null, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 4,
      fontSize: 26,
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
      color: mi ? 'var(--mi-ink)' : 'var(--primary)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value, unit ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--text-muted)'
    }
  }, unit) : null), delta ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, delta) : null);
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/layout/Table.jsx
try { (() => {
function Table({
  columns = [],
  rows = [],
  onRowClick,
  style
}) {
  const [hover, setHover] = React.useState(-1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 14,
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || 'left',
      padding: '12px 16px',
      font: 'var(--font-label-sm)',
      letterSpacing: 'var(--ls-label-sm)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      borderBottom: '1px solid var(--border)',
      whiteSpace: 'nowrap',
      width: c.width
    }
  }, c.label)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: r.id || i,
    onClick: onRowClick ? () => onRowClick(r) : undefined,
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(-1),
    style: {
      background: hover === i ? 'var(--dg-blue-a03)' : 'transparent',
      cursor: onRowClick ? 'pointer' : 'default',
      transition: 'var(--transition-base)'
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      textAlign: c.align || 'left',
      padding: '12px 16px',
      color: 'var(--text)',
      borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--border)'
    }
  }, c.render ? c.render(r) : r[c.key])))))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Table.jsx", error: String((e && e.message) || e) }); }

// components/web/GlassChip.jsx
try { (() => {
function GlassChip({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 16px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--web-chip-bg)',
      border: '1px solid var(--web-chip-border)',
      backdropFilter: 'var(--blur-glass)',
      WebkitBackdropFilter: 'var(--blur-glass)',
      color: '#fff',
      fontFamily: 'var(--font-web)',
      fontSize: 14,
      fontWeight: 500,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: 'var(--tertiary)',
      color: 'var(--web-check-fg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13
  })), children);
}
Object.assign(__ds_scope, { GlassChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/web/GlassChip.jsx", error: String((e && e.message) || e) }); }

// components/web/PillLabel.jsx
try { (() => {
function PillLabel({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 14px',
      borderRadius: 'var(--radius-pill)',
      background: '#fff',
      color: 'var(--text)',
      fontFamily: 'var(--font-web)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.04em',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--web-pill-dot)'
    }
  }), children);
}
Object.assign(__ds_scope, { PillLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/web/PillLabel.jsx", error: String((e && e.message) || e) }); }

// components/web/WebNav.jsx
try { (() => {
function WebNav({
  links = [],
  active,
  cta,
  logoSrc = 'assets/logotype-primary-blue.png',
  onNavigate,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--web-nav-bg)',
      borderBottom: '1px solid var(--web-nav-line)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      height: 'var(--nav-height)',
      padding: '0 var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "Destina",
    style: {
      height: 30,
      width: 'auto'
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 28,
      flex: 1,
      justifyContent: 'center',
      fontFamily: 'var(--font-web)'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate(l);
    },
    style: {
      fontSize: 14,
      fontWeight: l === active ? 700 : 500,
      color: l === active ? 'var(--primary)' : 'var(--text)',
      textDecoration: 'none'
    }
  }, l))), cta));
}
Object.assign(__ds_scope, { WebNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/web/WebNav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/destina-home/HomeScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  AppCard: HomeAppCard,
  Input: HomeInput,
  Icon: HomeIcon,
  Button: HomeButton
} = window.DestinaDesignSystem_8ca90f;
const HOME_APPS = [{
  title: 'DG Time',
  description: 'Clock in, breaks and your hours history.',
  icon: 'clock',
  accent: 'blue'
}, {
  title: 'DG Holidays',
  description: 'Request days off and see upcoming holidays.',
  icon: 'calendar-days',
  accent: 'yellow'
}, {
  title: 'DG Account',
  description: 'Your profile, department and notifications.',
  icon: 'user',
  accent: 'indigo'
}, {
  title: 'Market Intelligence',
  description: 'Competitors, customers, PubMed and regulatory news.',
  icon: 'chart-column',
  accent: 'purple'
}];
function HomeNav() {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: 'var(--surface-nav)',
      backdropFilter: 'var(--blur-nav)',
      WebkitBackdropFilter: 'var(--blur-nav)',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      height: 'var(--nav-height)',
      padding: '0 var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/monogram-blue.png",
    alt: "Destina",
    style: {
      width: 32
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-brand)',
      fontWeight: 'var(--fw-brand)',
      letterSpacing: 'var(--ls-brand)',
      color: 'var(--primary)'
    }
  }, "Destina Home"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(HomeButton, {
    size: "sm",
    variant: "ghost",
    icon: "log-out"
  }, "Sign Out")));
}
function HomeScreen({
  onOpen
}) {
  const [q, setQ] = React.useState('');
  const list = HOME_APPS.filter(a => (a.title + a.description).toLowerCase().includes(q.toLowerCase()));
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      textAlign: 'center',
      padding: '24px 0 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '-40px 10%',
      background: 'var(--bg-hero-spotlight)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/monogram-blue.png",
    alt: "",
    style: {
      width: 64,
      filter: 'var(--logo-shadow)',
      position: 'relative'
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--font-h1)',
      letterSpacing: 'var(--ls-h1)',
      color: 'var(--primary)',
      margin: '16px 0 8px',
      position: 'relative'
    }
  }, "Welcome, Laura"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-muted)',
      position: 'relative'
    }
  }, "Select an app to continue."), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 420,
      margin: '24px auto 0',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(HomeInput, {
    icon: "search",
    placeholder: "Search apps",
    value: q,
    onChange: e => setQ(e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))',
      gap: 'var(--grid-gap)'
    }
  }, list.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: a.title,
    style: {
      animation: 'dg-fadeInUp 0.5s var(--ease-out) both',
      animationDelay: i * 60 + 'ms'
    }
  }, /*#__PURE__*/React.createElement(HomeAppCard, _extends({}, a, {
    onClick: () => onOpen(a.title)
  }))))), list.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      color: 'var(--text-muted)'
    }
  }, "No apps match \u201C", q, "\u201D.") : null);
}
Object.assign(window, {
  HomeNav,
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/destina-home/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dg-apps/AccountScreen.jsx
try { (() => {
const {
  Panel: APanel,
  Input: AInput,
  Switch: ASwitch,
  Button: AButton,
  InfoPanel: AInfo
} = window.DestinaDesignSystem_8ca90f;
function AccountHome() {
  const [saved, setSaved] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(APanel, {
    title: "Profile"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(AInput, {
    label: "Full name",
    defaultValue: "Laura Mart\xEDn"
  }), /*#__PURE__*/React.createElement(AInput, {
    label: "Email",
    defaultValue: "laura.martin@destina-genomics.com",
    icon: "mail",
    disabled: true
  }), /*#__PURE__*/React.createElement(AInput, {
    label: "Department",
    as: "select",
    options: ['R&D', 'Operations', 'Quality', 'Finance']
  }))), /*#__PURE__*/React.createElement(APanel, {
    title: "Notifications",
    variant: "plain"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(ASwitch, {
    label: "Clock-out reminder at 18:00",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(ASwitch, {
    label: "Holiday request updates",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(ASwitch, {
    label: "Weekly hours summary"
  }))), saved ? /*#__PURE__*/React.createElement(AInfo, {
    tone: "success"
  }, "Changes saved.") : null, /*#__PURE__*/React.createElement(AButton, {
    block: true,
    onClick: () => setSaved(true)
  }, "Save Changes"), /*#__PURE__*/React.createElement(AButton, {
    block: true,
    variant: "secondary",
    icon: "log-out"
  }, "Sign Out"));
}
Object.assign(window, {
  AccountHome
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dg-apps/AccountScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dg-apps/HolidaysScreen.jsx
try { (() => {
const {
  Panel: HPanel,
  AccentRow: HRow,
  Badge: HBadge,
  Button: HButton,
  Input: HInput,
  InfoPanel: HInfo,
  StatCard: HStat
} = window.DestinaDesignSystem_8ca90f;
const HOLIDAYS = [{
  name: 'Día de la Hispanidad',
  date: 'Mon 12 Oct',
  tag: 'national',
  label: 'National'
}, {
  name: 'Todos los Santos',
  date: 'Sun 1 Nov',
  tag: 'national',
  label: 'National'
}, {
  name: 'Día de la Constitución',
  date: 'Sun 6 Dec',
  tag: 'national',
  label: 'National'
}, {
  name: 'Día de Andalucía',
  date: 'Sun 28 Feb',
  tag: 'regional',
  label: 'Autonómico'
}];
const TAG_FG = {
  national: 'var(--tag-national-fg)',
  local: 'var(--tag-local-fg)',
  regional: 'var(--tag-regional-fg)'
};
function HolidaysHome({
  requests,
  setRequests
}) {
  const [start, setStart] = React.useState('');
  const [end, setEnd] = React.useState('');
  const [type, setType] = React.useState('Vacation');
  const [err, setErr] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const submit = () => {
    if (!start || !end) {
      setErr('Choose a start and end date.');
      return;
    }
    const f = s => new Date(s).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short'
    });
    setRequests(r => [{
      range: f(start) + ' – ' + f(end) + ' ' + new Date(end).getFullYear(),
      type,
      status: 'pending'
    }, ...r]);
    setErr('');
    setSent(true);
    setStart('');
    setEnd('');
  };
  const pending = requests.filter(r => r.status === 'pending').length;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(HStat, {
    label: "Remaining",
    value: "14",
    unit: "days"
  }), /*#__PURE__*/React.createElement(HStat, {
    label: "Used",
    value: "8",
    unit: "days"
  }), /*#__PURE__*/React.createElement(HStat, {
    label: "Pending",
    value: String(pending)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(HPanel, {
    title: "New request"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(HInput, {
    label: "Start date",
    type: "date",
    value: start,
    onChange: e => {
      setStart(e.target.value);
      setSent(false);
    }
  }), /*#__PURE__*/React.createElement(HInput, {
    label: "End date",
    type: "date",
    value: end,
    onChange: e => {
      setEnd(e.target.value);
      setSent(false);
    },
    error: err
  }), /*#__PURE__*/React.createElement(HInput, {
    label: "Type",
    as: "select",
    value: type,
    onChange: e => setType(e.target.value),
    options: ['Vacation', 'Personal day', 'Medical']
  }), /*#__PURE__*/React.createElement(HButton, {
    block: true,
    icon: "send",
    onClick: submit
  }, "Send Request"), sent ? /*#__PURE__*/React.createElement(HInfo, {
    tone: "success",
    title: "Request sent"
  }, "Your manager will review it.") : null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(HPanel, {
    title: "My requests",
    variant: "plain"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, requests.map((r, i) => /*#__PURE__*/React.createElement(HRow, {
    key: i,
    title: r.range,
    meta: r.type,
    right: r.status === 'approved' ? /*#__PURE__*/React.createElement(HBadge, {
      tone: "success",
      size: "sm"
    }, "Approved") : /*#__PURE__*/React.createElement(HBadge, {
      tone: "warning",
      size: "sm"
    }, "Pending")
  })))))), /*#__PURE__*/React.createElement(HPanel, {
    title: "Upcoming holidays",
    variant: "plain"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 8
    }
  }, HOLIDAYS.map(h => /*#__PURE__*/React.createElement(HRow, {
    key: h.name,
    title: h.name,
    meta: h.date,
    accent: TAG_FG[h.tag],
    right: /*#__PURE__*/React.createElement(HBadge, {
      tone: h.tag,
      size: "sm"
    }, h.label)
  })))));
}
Object.assign(window, {
  HolidaysHome
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dg-apps/HolidaysScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dg-apps/TimeScreen.jsx
try { (() => {
const {
  Panel,
  AccentRow,
  ActionButton,
  Badge,
  Button,
  Modal,
  InfoPanel,
  StatCard
} = window.DestinaDesignSystem_8ca90f;
function TimeHome({
  state,
  setState
}) {
  const [now, setNow] = React.useState(new Date());
  const [confirm, setConfirm] = React.useState(false);
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const st = state.status;
  const worked = state.inAt ? now - state.inAt - (state.breakMs || 0) : 0;
  const badge = st === 'in' ? /*#__PURE__*/React.createElement(Badge, {
    tone: "in",
    dot: true
  }, "Clocked In") : st === 'pause' ? /*#__PURE__*/React.createElement(Badge, {
    tone: "pause",
    dot: true
  }, "On Break") : /*#__PURE__*/React.createElement(Badge, {
    tone: "other"
  }, "Not Clocked In");
  const act = s => setState(p => {
    const t = new Date();
    if (s === 'in') return {
      ...p,
      status: 'in',
      inAt: p.inAt || t,
      log: [{
        t,
        label: 'Clocked in'
      }, ...p.log]
    };
    if (s === 'pause') return {
      ...p,
      status: 'pause',
      pauseAt: t,
      log: [{
        t,
        label: 'Break started'
      }, ...p.log]
    };
    if (s === 'resume') return {
      ...p,
      status: 'in',
      breakMs: (p.breakMs || 0) + (t - p.pauseAt),
      log: [{
        t,
        label: 'Break ended'
      }, ...p.log]
    };
    if (s === 'out') return {
      ...p,
      status: 'out',
      history: [{
        day: dgFmt.day(t),
        range: dgFmt.time(p.inAt) + ' – ' + dgFmt.time(t),
        dur: dgFmt.dur(t - p.inAt - (p.breakMs || 0))
      }, ...p.history],
      inAt: null,
      breakMs: 0,
      log: [{
        t,
        label: 'Clocked out'
      }, ...p.log]
    };
    return p;
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      padding: '4px 0 4px'
    }
  }, badge, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 52,
      fontWeight: 700,
      letterSpacing: '-0.03em',
      lineHeight: 1,
      color: 'var(--primary)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, dgFmt.clock(now)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, now.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }))), /*#__PURE__*/React.createElement(Panel, {
    title: "Select your action"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(ActionButton, {
    icon: "log-in",
    disabled: st !== 'out',
    onClick: () => act('in')
  }, "Clock In"), /*#__PURE__*/React.createElement(ActionButton, {
    tone: "red",
    icon: "log-out",
    disabled: st === 'out',
    onClick: () => setConfirm(true)
  }, "Clock Out"), st === 'pause' ? /*#__PURE__*/React.createElement(ActionButton, {
    tone: "yellow",
    icon: "play",
    onClick: () => act('resume')
  }, "End Break") : /*#__PURE__*/React.createElement(ActionButton, {
    tone: "yellow",
    icon: "coffee",
    disabled: st !== 'in',
    onClick: () => act('pause')
  }, "Break"), /*#__PURE__*/React.createElement(ActionButton, {
    tone: "graphite",
    icon: "briefcase",
    disabled: st !== 'in'
  }, "Other"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Today",
    value: dgFmt.dur(worked)
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "This week",
    value: "31h 20m"
  })), state.log.length ? /*#__PURE__*/React.createElement(Panel, {
    title: "Today",
    variant: "plain"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, state.log.slice(0, 3).map((l, i) => /*#__PURE__*/React.createElement(AccentRow, {
    key: i,
    title: l.label + ' at ' + dgFmt.time(l.t)
  })))) : null, /*#__PURE__*/React.createElement(Modal, {
    open: confirm,
    title: "Clock out now?",
    onClose: () => setConfirm(false),
    width: 360,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setConfirm(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      variant: "danger",
      onClick: () => {
        act('out');
        setConfirm(false);
      }
    }, "Clock Out"))
  }, "You have worked ", dgFmt.dur(worked), " today."));
}
function TimeHistory({
  state
}) {
  return /*#__PURE__*/React.createElement(Panel, {
    title: "History",
    variant: "plain"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, state.history.map((h, i) => /*#__PURE__*/React.createElement(AccentRow, {
    key: i,
    title: h.day,
    meta: h.range,
    right: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        fontVariantNumeric: 'tabular-nums'
      }
    }, h.dur)
  }))));
}
Object.assign(window, {
  TimeHome,
  TimeHistory
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dg-apps/TimeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dg-apps/format.jsx
try { (() => {
const dgFmt = {
  time: d => d.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }),
  clock: d => d.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }),
  day: d => d.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }).replace(',', ''),
  dur: ms => {
    const m = Math.max(0, Math.floor(ms / 60000));
    return Math.floor(m / 60) + 'h ' + String(m % 60).padStart(2, '0') + 'm';
  }
};
window.dgFmt = dgFmt;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dg-apps/format.jsx", error: String((e && e.message) || e) }); }

// ui_kits/market-intelligence/MIScreen.jsx
try { (() => {
const {
  StatCard: MIStat,
  Icon: MIIcon,
  Input: MIInput,
  Badge: MIBadge
} = window.DestinaDesignSystem_8ca90f;
function MISidebar({
  cat,
  setCat
}) {
  const item = c => {
    const on = cat === c.id;
    return /*#__PURE__*/React.createElement("button", {
      key: c.id,
      onClick: () => setCat(on ? null : c.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        padding: '9px 12px',
        border: 'none',
        borderRadius: 'var(--radius-xs)',
        background: on ? 'var(--mi-select)' : 'transparent',
        color: 'var(--mi-ink-2)',
        fontFamily: 'var(--font-mi)',
        fontSize: 14,
        fontWeight: on ? 600 : 500,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'var(--transition-base)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: 3,
        background: c.color,
        flex: 'none'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, c.label), c.n != null ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--mi-muted)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, c.n) : null);
  };
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 240,
      flex: 'none',
      background: 'var(--surface)',
      borderRight: '1px solid var(--mi-line)',
      padding: '20px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      fontFamily: 'var(--font-mi)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '0 8px 20px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/monogram-blue.png",
    alt: "Destina",
    style: {
      width: 28
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      color: 'var(--mi-ink)',
      lineHeight: 1.2
    }
  }, "Market Intelligence")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 11.2px/1.2 var(--font-mi)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--mi-muted)',
      padding: '8px 12px'
    }
  }, "Categories"), MI_CATS.map(item), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 11.2px/1.2 var(--font-mi)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--mi-muted)',
      padding: '16px 12px 8px'
    }
  }, "Biomarkers"), MI_MARKERS.map(item));
}
function MIFeed({
  cat,
  q
}) {
  const catOf = id => MI_CATS.find(c => c.id === id);
  const mk = id => MI_MARKERS.find(m => m.id === id);
  const items = MI_ITEMS.filter(i => (!cat || i.cat === cat || i.marker === cat) && i.title.toLowerCase().includes(q.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--mi-line)',
      boxShadow: 'var(--shadow-stat)',
      overflow: 'hidden'
    }
  }, items.map((i, n) => {
    const c = catOf(i.cat);
    const m = mk(i.marker);
    return /*#__PURE__*/React.createElement("div", {
      key: i.id,
      style: {
        display: 'flex',
        gap: 14,
        padding: '14px 18px',
        borderTop: n ? '1px solid var(--mi-line)' : 'none',
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 'var(--radius-sm)',
        background: 'var(--mi-bg)',
        color: c.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement(MIIcon, {
      name: c.icon,
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: 'var(--mi-ink)',
        lineHeight: 1.4
      }
    }, i.title), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        marginTop: 6,
        fontSize: 12.5,
        color: 'var(--mi-muted)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: c.color,
        fontWeight: 600
      }
    }, c.label), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, i.source), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, i.date), /*#__PURE__*/React.createElement("span", {
      style: {
        padding: '1px 8px',
        borderRadius: 999,
        border: '1px solid ' + m.color,
        color: m.color,
        fontWeight: 600
      }
    }, m.label))), /*#__PURE__*/React.createElement(MIIcon, {
      name: "external-link",
      size: 16,
      color: "var(--mi-muted)"
    }));
  }), items.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      color: 'var(--mi-muted)',
      fontSize: 14
    }
  }, "No items match these filters.") : null);
}
function MIScreen() {
  const [cat, setCat] = React.useState(null);
  const [q, setQ] = React.useState('');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--mi-bg)',
      fontFamily: 'var(--font-mi)',
      color: 'var(--mi-ink)'
    }
  }, /*#__PURE__*/React.createElement(MISidebar, {
    cat: cat,
    setCat: setCat
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0,
      padding: '28px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-mi)',
      fontSize: 26,
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: 'var(--mi-ink)'
    }
  }, "This week"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--mi-muted)'
    }
  }, "18 \u2013 24 Sep 2026 \xB7 128 new items")), /*#__PURE__*/React.createElement(MIInput, {
    icon: "search",
    placeholder: "Search items",
    value: q,
    onChange: e => setQ(e.target.value),
    style: {
      width: 280
    },
    inputStyle: {
      fontFamily: 'var(--font-mi)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 14
    }
  }, MI_CATS.slice(0, 4).map(c => /*#__PURE__*/React.createElement(MIStat, {
    key: c.id,
    label: c.label,
    value: c.n,
    accent: c.color,
    icon: c.icon,
    delta: "+3 this week"
  }))), /*#__PURE__*/React.createElement(MIFeed, {
    cat: cat,
    q: q
  })));
}
Object.assign(window, {
  MIScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/market-intelligence/MIScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/market-intelligence/data.jsx
try { (() => {
const MI_CATS = [{
  id: 'competitors',
  label: 'Competitors',
  color: 'var(--mi-competitors)',
  icon: 'swords',
  n: 27
}, {
  id: 'customers',
  label: 'Customers',
  color: 'var(--mi-customers)',
  icon: 'users',
  n: 14
}, {
  id: 'drugdev',
  label: 'Drug Development',
  color: 'var(--mi-drugdev)',
  icon: 'flask-conical',
  n: 19
}, {
  id: 'omics',
  label: 'Omics',
  color: 'var(--mi-omics)',
  icon: 'dna',
  n: 11
}, {
  id: 'pubmed',
  label: 'PubMed',
  color: 'var(--mi-pubmed)',
  icon: 'book-open',
  n: 42
}, {
  id: 'regulatory',
  label: 'Regulatory',
  color: 'var(--mi-regulatory)',
  icon: 'scale',
  n: 6
}, {
  id: 'industry',
  label: 'Industry',
  color: 'var(--mi-industry)',
  icon: 'factory',
  n: 9
}];
const MI_MARKERS = [{
  id: 'mirna',
  label: 'miRNA',
  color: 'var(--mi-mirna)'
}, {
  id: 'ck18',
  label: 'CK18',
  color: 'var(--mi-ck18)'
}, {
  id: 'osteopontin',
  label: 'Osteopontin',
  color: 'var(--mi-osteopontin)'
}];
const MI_ITEMS = [{
  id: 1,
  cat: 'pubmed',
  marker: 'mirna',
  title: 'Circulating miR-122 as an early marker of drug-induced liver injury',
  source: 'PubMed',
  date: 'Thu 24 Sep'
}, {
  id: 2,
  cat: 'competitors',
  marker: 'ck18',
  title: 'Competitor announces CE-IVD marking for CK18 fragment assay',
  source: 'Press release',
  date: 'Wed 23 Sep'
}, {
  id: 3,
  cat: 'regulatory',
  marker: 'mirna',
  title: 'EMA qualification opinion on novel safety biomarkers — public consultation',
  source: 'EMA',
  date: 'Tue 22 Sep'
}, {
  id: 4,
  cat: 'drugdev',
  marker: 'osteopontin',
  title: 'Phase II NASH trial adds osteopontin as exploratory endpoint',
  source: 'ClinicalTrials.gov',
  date: 'Mon 21 Sep'
}, {
  id: 5,
  cat: 'customers',
  marker: 'mirna',
  title: 'CRO partner expands hepatotoxicity biomarker panel',
  source: 'News',
  date: 'Fri 18 Sep'
}, {
  id: 6,
  cat: 'omics',
  marker: 'mirna',
  title: 'Single-molecule detection of small RNAs without amplification',
  source: 'bioRxiv',
  date: 'Thu 17 Sep'
}];
Object.assign(window, {
  MI_CATS,
  MI_MARKERS,
  MI_ITEMS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/market-intelligence/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
const {
  WebNav: WNav,
  PillLabel: WPill,
  GlassChip: WChip,
  Button: WButton,
  Card: WCard,
  Icon: WIcon,
  Input: WInput,
  InfoPanel: WInfo
} = window.DestinaDesignSystem_8ca90f;
function WebHero({
  onContact
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(180deg,var(--web-hero-bg) 0%,var(--web-hero-bg-2) 100%)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 24,
      bottom: 16,
      fontFamily: 'var(--font-web)',
      fontSize: 11,
      color: 'rgba(255,255,255,0.35)'
    }
  }, "Molecular render background \u2014 asset not supplied"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '120px var(--gutter) 128px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(WPill, null, "Liquid biopsy \xB7 miRNA"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      maxWidth: 760,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-display)',
      fontWeight: 900,
      letterSpacing: 'var(--ls-display)',
      lineHeight: 'var(--lh-display)'
    }
  }, "Direct detection of nucleic acids, one base at a time."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 560,
      fontFamily: 'var(--font-web)',
      fontSize: 17,
      lineHeight: 1.7,
      color: 'var(--web-body-on-dark)'
    }
  }, "Destina Genomics develops chemistry-based molecular diagnostics that read microRNA biomarkers directly from blood, without amplification."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(WChip, null, "No amplification"), /*#__PURE__*/React.createElement(WChip, null, "Single-base resolution"), /*#__PURE__*/React.createElement(WChip, null, "Minimally invasive")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(WButton, {
    size: "lg",
    iconRight: "arrow-right",
    onClick: onContact
  }, "Contact Us"))));
}
const WEB_FEATURES = [{
  icon: 'dna',
  title: 'Dynamic chemistry',
  text: 'Reads the target sequence directly through chemical labelling of the nucleobase.'
}, {
  icon: 'droplet',
  title: 'Liquid biopsy',
  text: 'Circulating microRNA from a standard blood sample.'
}, {
  icon: 'microscope',
  title: 'Clinical focus',
  text: 'Biomarkers for drug-induced liver injury and other conditions.'
}];
function WebFeatures() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface)',
      padding: '96px var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-web)',
      font: 'var(--font-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--primary)'
    }
  }, "Technology"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--font-h1)',
      letterSpacing: 'var(--ls-h1)',
      color: 'var(--primary)',
      margin: '12px 0 40px',
      maxWidth: 640
    }
  }, "A platform built for precision"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
      gap: 'var(--grid-gap)'
    }
  }, WEB_FEATURES.map(f => /*#__PURE__*/React.createElement(WCard, {
    key: f.title,
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 'var(--radius-md)',
      background: 'var(--accent-blue-bg)',
      color: 'var(--primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: f.icon,
    size: 24
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--font-h3)',
      letterSpacing: 'var(--ls-h3)'
    }
  }, f.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0',
      fontFamily: 'var(--font-web)',
      fontSize: 15,
      lineHeight: 1.65,
      color: 'var(--text-muted)'
    }
  }, f.text))))));
}
function WebContact() {
  const [sent, setSent] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [err, setErr] = React.useState('');
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      background: 'var(--web-nav-bg)',
      padding: '96px var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(WCard, {
    padding: 32
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--font-h2)',
      letterSpacing: 'var(--ls-h2)',
      margin: '0 0 20px'
    }
  }, "Get in touch"), sent ? /*#__PURE__*/React.createElement(WInfo, {
    tone: "success",
    title: "Message sent"
  }, "We will reply to ", email, ".") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(WInput, {
    label: "Name",
    placeholder: "Your name"
  }), /*#__PURE__*/React.createElement(WInput, {
    label: "Email",
    type: "email",
    placeholder: "name@company.com",
    value: email,
    onChange: e => setEmail(e.target.value),
    error: err
  }), /*#__PURE__*/React.createElement(WInput, {
    label: "Message",
    as: "textarea",
    placeholder: "How can we help?"
  }), /*#__PURE__*/React.createElement(WButton, {
    block: true,
    onClick: () => {
      if (!email.includes('@')) {
        setErr('Enter a valid email address.');
        return;
      }
      setErr('');
      setSent(true);
    }
  }, "Send Message")))));
}
function WebFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--primary)',
      color: '#fff',
      padding: '48px var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logotype-primary-white.png",
    alt: "Destina",
    style: {
      height: 32
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-web)',
      fontSize: 13,
      opacity: 0.85
    }
  }, "\xA9 2026 Destina Genomics \xB7 Granada, Spain")));
}
Object.assign(window, {
  WebHero,
  WebFeatures,
  WebContact,
  WebFooter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AppCard = __ds_scope.AppCard;

__ds_ns.DGAppCard = __ds_scope.DGAppCard;

__ds_ns.TabBar = __ds_scope.TabBar;

__ds_ns.ActionButton = __ds_scope.ActionButton;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.InfoPanel = __ds_scope.InfoPanel;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.AccentRow = __ds_scope.AccentRow;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.GlassChip = __ds_scope.GlassChip;

__ds_ns.PillLabel = __ds_scope.PillLabel;

__ds_ns.WebNav = __ds_scope.WebNav;

})();
