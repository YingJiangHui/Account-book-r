import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if(document.body.clientWidth>500){
  const cover = document.createElement('div')
  const img = document.createElement('img')
  cover.style.position='fixed'
  cover.style.zIndex='999'
  cover.style.width='100%'
  cover.style.height='100%'
  cover.style.left='0'
  cover.style.top='0'
  cover.style.background='rgba(0,0,0,0.33)'
  img.src = '422ad31773e254a9be25f430a154059c.png'
  img.style.position='fixed'
  img.style.top='50%'
  img.style.left='50%'
  img.style.transform='translate(-50%,-50%)'
  cover.appendChild(img)
  document.body.appendChild(cover)
}

ReactDOM.render(
    <App />
,  document.getElementById('root')
);
