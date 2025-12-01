import React from 'react';
import { Card, Space, Button } from 'antd'; // Usamos Button directo de Antd o tu átomo
import { UserOutlined, ShopOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router'; 

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card title="Bienvenido a Urban Shop" style={{ width: 400, textAlign: 'center' }}>
        <p>Selecciona un rol para ingresar:</p>
        <Space direction="vertical" style={{ width: '100%' }}>
          
          <Button 
            type="primary" 
            icon={<ShopOutlined />} 
            onClick={() => navigate('/vendedor')} 
            block
            size="large"
          >
            Ingresar como Vendedor
          </Button>

          <Button 
            icon={<UserOutlined />} 
            onClick={() => navigate('/admin')} 
            block
            size="large"
          >
            Ingresar como Administrador
          </Button>

        </Space>
      </Card>
    </div>
  );
}