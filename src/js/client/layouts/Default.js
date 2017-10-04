import React from 'react';

const Default = ({

    Header = 'div',
    Footer = 'div',
    Body = 'div',
    Head = 'div',

    headerProps = {},
    footerProps = {},
    bodyProps = {},
    headProps = {},

}) => (
    //<!doctype html>,
    <html class="no-js" lang="">
        <head>
            <Head {...headProps}/>
        </head>
        <body>
            <Header {...headerProps}/>
            <Body {...bodyProps}/>
            <Footer {...footerProps}/>
        </body>
    </html>
);

export default Default;
