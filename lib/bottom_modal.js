'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _modal_factory = require('./modal_factory');

var _modal_factory2 = _interopRequireDefault(_modal_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var insertKeyframesRule = require('react-kit/insertKeyframesRule');
var appendVendorPrefix = require('react-kit/appendVendorPrefix');

var animation = {
    show: {
        animationDuration: '0.4s',
        animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
    },

    hide: {
        animationDuration: '0.4s',
        animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
    },

    showModalAnimation: insertKeyframesRule({
        '0%': {
            opacity: 0
            // transform: 'translate3d(-50%, -300px, 0)'
        },
        '100%': {
            opacity: 1,
            transform: 'translate3d(-50%, -100%, 0)'
        }
    }),

    hideModalAnimation: insertKeyframesRule({
        '0%': {
            opacity: 1,
            transform: 'translate3d(-50%, -100%, 0)'
        },
        '100%': {
            opacity: 0,
            transform: 'translate3d(-50%, 0, 0)'
        }
    })
};

var showAnimation = animation.show;
var hideAnimation = animation.hide;
var showModalAnimation = animation.showModalAnimation;
var hideModalAnimation = animation.hideModalAnimation;

exports.default = (0, _modal_factory2.default)({

    show: showAnimation,
    hide: hideAnimation,

    getRef: function getRef(willHidden) {
        return 'modal';
    },

    getModalStyle: function getModalStyle(willHidden) {
        return appendVendorPrefix({
            position: "fixed",
            width: "500px",
            transform: "translate3d(-50%, 0, 0)",
            top: "100%",
            left: "50%",
            backgroundColor: "white",
            zIndex: 1050,
            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
            animationFillMode: 'forwards',
            animationName: willHidden ? hideModalAnimation : showModalAnimation,
            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
        });
    },

    getContentStyle: function getContentStyle(willHidden) {
        return appendVendorPrefix({
            margin: 0
        });
    }
});