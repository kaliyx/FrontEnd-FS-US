import React from 'react';
import { Button } from 'antd';

const Boton = ({ 
  texto, 
  tipo = "primary", 
  onClick, 
  icono, 
  peligro, 
  htmlType, 
  block, 
  size 
}) => (
  <Button 
    type={tipo} 
    onClick={onClick} 
    icon={icono} 
    danger={peligro} 
    htmlType={htmlType}
    block={block}
    size={size}
  >
    {texto}
  </Button>
);

export default Boton;