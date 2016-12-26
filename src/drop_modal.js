import modalFactory from './modal_factory';
const insertKeyframesRule = require('react-kit/insertKeyframesRule');
const appendVendorPrefix = require('react-kit/appendVendorPrefix');

const animation = {
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
            opacity: 0,
            transform: 'translate3d(-50%, -300px, 0)'
        },
        '100%': {
            opacity: 1,
            transform: 'translate3d(-50%, -50%, 0)'
        }
    }),

    hideModalAnimation: insertKeyframesRule({
        '0%': {
            opacity: 1,
            transform: 'translate3d(-50%, -50%, 0)'
        },
        '100%': {
            opacity: 0,
            transform: 'translate3d(-50%, 100px, 0)'
        }
    })
};

const showAnimation = animation.show;
const hideAnimation = animation.hide;
const showModalAnimation = animation.showModalAnimation;
const hideModalAnimation = animation.hideModalAnimation;

export default modalFactory({

    show : showAnimation,
    hide : hideAnimation,

    getRef: function(willHidden) {
        return 'modal';
    },

    getModalStyle: function(willHidden) {
        return appendVendorPrefix({
            position: "fixed",
            width: "500px",
            transform: "translate3d(-300px, -50%, 0)",
            top: "50%",
            left: "50%",
            backgroundColor: "white",
            zIndex: 1050,
            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
            animationFillMode: 'forwards',
            animationName: willHidden ? hideModalAnimation : showModalAnimation,
            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
        })
    },
   
    getContentStyle: function(willHidden) {
        return appendVendorPrefix({
            margin: 0
        });
    }
});
