import React from 'react'
import ReactDOM from 'react-dom'
import {BottomModal,DropModal,LeftModal,ScaleModal,WaveModal} from '../src/index'

var btnStyle = {
    margin: '1em auto',
    padding: '1em 2em',
    outline: 'none',
    fontSize: 16,
    fontWeight: '600',
    background: '#C94E50',
    color: '#FFFFFF',
    border: 'none'
};

var containerStyle = {
    padding: '2em',
    textAlign: 'center'
};

class APP extends React.Component{

    constructor(props){
        super(props)
    }

    toggleDialog(ref){

        return function(){
            this.refs[ref].toggle();
        }.bind(this)
    }

    getContent(ref){
        return (
            <div style={containerStyle}>
                <h2 style={{margin: 0, color: '#C94E50', fontWeight: 400}}></h2>
                <button style={btnStyle} onClick={this.toggleDialog(ref)}>关闭</button>
            </div>
        );
    }

    render() {
        var self = this;
        return (
            <div>
                <button style={btnStyle} onClick={this.toggleDialog('BottomModal')}>BottomModal </button>
                <br/>
                <BottomModal ref='BottomModal' className="modal">{this.getContent('BottomModal')}</BottomModal>
                <button style={btnStyle} onClick={this.toggleDialog('DropModal')}>DropModal </button>
                <br/>
                <DropModal ref='DropModal' className="modal">{this.getContent('DropModal')}</DropModal>
                <button style={btnStyle} onClick={this.toggleDialog('LeftModal')}>LeftModal </button>
                <br/>
                <LeftModal ref='LeftModal' className="modal">{this.getContent('LeftModal')}</LeftModal>
                <button style={btnStyle} onClick={this.toggleDialog('ScaleModal')}>ScaleModal </button>
                <br/>
                <ScaleModal ref='ScaleModal' className="modal">{this.getContent('ScaleModal')}</ScaleModal>
                <button style={btnStyle} onClick={this.toggleDialog('WaveModal')}>WaveModal </button>
                <br/>
                <WaveModal ref='WaveModal' className="modal">{this.getContent('WaveModal')}</WaveModal>
            </div>
        );
    }
};
ReactDOM.render(<APP/>, document.getElementById('app'));

                // {['DropModal','LeftModal','ScaleModal','WaveModal','BottomModal'].map(function(name, ind){
                //     return self.getTiggerAndModal(name, ind);
                // })}
