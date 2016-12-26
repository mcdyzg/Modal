'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (animation) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
        _inherits(Modal, _React$Component);

        /**
         * @doc overview
         * @name getInitialState
         *
         * @returns {Object} -state object
         *  - `willHidden` – `{boolean}` - 要不要隐藏
         *  - `hidden` – `{boolean}` - 是否隐藏
         *
         * @description
         * 返回state数据对象
         *
         */
        function Modal(props) {
            _classCallCheck(this, Modal);

            var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

            _this.showBackdropAnimation = insertKeyframesRule({
                '0%': {
                    opacity: 0
                },
                '100%': {
                    opacity: 0.9
                }
            });
            _this.hideBackdropAnimation = insertKeyframesRule({
                '0%': {
                    opacity: 0.9
                },
                '100%': {
                    opacity: 0
                }
            });

            _this.hide = function () {
                if (_this.hasHidden()) return;

                _this.setState({
                    willHidden: true
                });
            };

            _this.listenKeyboard = function (event) {
                if (_this.props.keyboard && (event.key === "Escape" || event.keyCode === 27)) {
                    _this.hide();
                }
            };

            _this.state = {
                willHidden: false,
                hidden: true
            };
            return _this;
        }

        /**
         * @doc overview
         * @name getDefaultProps
         *
         * @returns {Object} -props object
         *  - `className` – `{string}` - calssName设置
         *  - `onShow` – `{function}` - show的时候的回调函数
         *  - `onHide` – `{function}` - hide的时候的回调函数
         *  - `animation` – `{object}` - 具体的动画效果对象
         *  - `keyboard` – `{boolean}` - 是否需要esc键隐藏modal
         *  - `backdrop` – `{boolean}` - 是否显示背景
         *  - `backdropHide` – `{boolean}` - 是否点击关闭modal
         * @description
         * 设置default props
         *
         */

        _createClass(Modal, [{
            key: 'hasHidden',


            /**
             * @doc overview
             * @name hasHidden
             *
             * @returns -state object
             *  - `hidden` – `{boolean}` - 是否隐藏
             *
             * @description
             * 返回modal是否隐藏，通过这个字段来阻断dom的渲染
             *
             */
            value: function hasHidden() {
                return this.state.hidden;
            }

            /**
             * @doc overview
             * @name showBackdropAnimation
             *
             * @description
             * 显示backdrop的动画样式
             *
             */


            /**
             * @doc overview
             * @name hideBackdropAnimation
             *
             * @description
             * 隐藏backdrop的动画样式
             *
             */

        }, {
            key: 'getBackdropStyle',


            /**
             * @doc overview
             * @name getBackdropStyle
             *
             * @params
             * - willHidden - {boolean} - 区分是取显示的样式还是取消失的样式
             *
             * @description
             * 获取modal遮罩的样式，因为遮罩样式一般比较统一，不需要放到具体的实例去定义
             * 直接放到factory里面去定义好了。但是遮罩的一些动画属性还是跟着实例走，所以
             * 实例中需抛出 animation.show，animation.hide 对象
             *
             */
            value: function getBackdropStyle(willHidden) {
                var self = this;

                return appendVendorPrefix({
                    position: "fixed",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    zIndex: 1040,
                    backgroundColor: "#373A47",
                    animationDuration: '0.4s',
                    animationFillMode: 'forwards',
                    animationName: willHidden ? self.hideBackdropAnimation : self.showBackdropAnimation,
                    animationTimingFunction: (willHidden ? animation.hide : animation.show).animationTimingFunction
                });
            }

            // hide modal 回调

        }, {
            key: 'leave',
            value: function leave() {
                this.setState({
                    hidden: true
                });
                this.props.onHide();
            }
            // show modal回调

        }, {
            key: 'enter',
            value: function enter() {
                this.props.onShow();
            }
            // 显示modal

        }, {
            key: 'show',
            value: function show() {
                if (!this.hasHidden()) return;
                this.props.onShow();
                this.setState({
                    willHidden: false,
                    hidden: false
                });
            }
            // 隐藏modal

        }, {
            key: 'toggle',

            // hide show toggle
            value: function toggle() {
                if (this.hasHidden()) this.show();else this.hide();
            }
            // 监听esc按键，隐藏modal

        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                window.addEventListener("keydown", this.listenKeyboard, true);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                window.removeEventListener("keydown", this.listenKeyboard, true);
            }
        }, {
            key: 'render',
            value: function render() {
                // 判断是否是隐藏的modal，如果是就不需要进行render了。
                var hidden = this.hasHidden();
                if (hidden) return null;
                // 固话参数
                var willHidden = this.state.willHidden;
                var animation = this.props.animation;
                var modalStyle = animation.getModalStyle(willHidden);
                var backdropStyle = this.getBackdropStyle(willHidden);
                var contentStyle = animation.getContentStyle(willHidden);
                var ref = animation.getRef(willHidden);
                var sharp = animation.getSharp && animation.getSharp(willHidden);
                var backdrop = this.props.backdrop ? this.props.backdropHide ? _react2.default.createElement('div', { onClick: this.hide, style: backdropStyle }) : _react2.default.createElement('div', { style: backdropStyle }) : undefined;
                //
                if (willHidden) {
                    var node = this.refs[ref];
                    var endListener = function (e) {
                        if (e && e.target !== node) {
                            return;
                        }
                        transitionEvents.removeEndEventListener(node, endListener);
                        this.leave();
                    }.bind(this);
                    transitionEvents.addEndEventListener(node, endListener);
                }

                return _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                        'div',
                        { ref: 'modal', style: modalStyle, className: this.props.className },
                        sharp,
                        _react2.default.createElement(
                            'div',
                            { ref: 'content', tabIndex: '-1', style: contentStyle },
                            this.props.children
                        )
                    ),
                    backdrop
                );
            }
        }]);

        return Modal;
    }(_react2.default.Component), _class.defaultProps = {
        className: "",
        onShow: function onShow() {},
        onHide: function onHide() {},
        animation: animation,
        keyboard: true,
        backdrop: true,
        backdropHide: true
    }, _temp;
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var insertKeyframesRule = require('react-kit/insertKeyframesRule');
var appendVendorPrefix = require('react-kit/appendVendorPrefix');
var transitionEvents = require('react-kit/transitionEvents');