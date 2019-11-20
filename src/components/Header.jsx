import React, { Component } from 'react';


class Header extends Component{

    headerStyles = {
        width: '100%',
        height: '100%',
        margin: '0',
        display:"flex",
        flexDirection:"row",
    };

    imageStyles = {
        height: '3em',
        padding: '1em',
    }

    render(){
        return(
            <div style={this.headerStyles}>
                <img style={this.imageStyles} src={'https://i.ibb.co/Yc06ntv/logo-1.png'} alt="boohoo"/>
            </div>
        );
    }
}

export default Header;