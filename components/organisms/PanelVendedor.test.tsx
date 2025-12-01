// Polyfills and mocks must be set before importing components that pull in antd internals
if (typeof window !== 'undefined' && !('matchMedia' in window)) {
  // @ts-ignore
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

if (typeof window !== 'undefined' && !('getComputedStyle' in window)) {
  // @ts-ignore
  window.getComputedStyle = (elt: Element) => ({ getPropertyValue: () => '' });
}

import { vi } from 'vitest';
// Mock minimal antd primitives to avoid responsiveObserver / matchMedia issues
vi.mock('antd', async () => {
  const React = await import('react');
  // Basic List component that calls renderItem for each dataSource entry
  const List: any = (props: any) => React.createElement(
    'div',
    null,
    props.dataSource?.map((item: any, i: number) =>
      React.createElement(
        'div',
        { key: i },
        typeof props.renderItem === 'function' ? props.renderItem(item) : null
      )
    )
  );
  // Provide List.Item and List.Item.Meta to match usage in component
  List.Item = ({ children }: any) => React.createElement('div', null, children);
  List.Item.Meta = ({ title, description }: any) =>
    React.createElement(
      'div',
      null,
      React.createElement('span', null, title),
      React.createElement('span', null, description)
    );

  const Typography = { Title: ({ children, level }: any) => React.createElement(`h${level || 1}`, null, children) };
  const Divider = () => React.createElement('hr', null);
  const Button = (props: any) => React.createElement('button', props, props.children);
  return { List, Typography, Divider, Button };
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PanelVendedor from './PanelVendedor.jsx';

test('PanelVendedor component test - shows total and calls alPagar', () => {
  const carrito = [{ id: 1, nombre: 'A', cantidad: 2, precio: 10 }];
  const total = 20;
  const alEliminarItem = vi.fn();
  const alPagar = vi.fn();

  render(<PanelVendedor carrito={carrito} total={total} alEliminarItem={alEliminarItem} alPagar={alPagar} />);

  expect(screen.getByText(/Total:/i)).toBeInTheDocument();
  expect(screen.getAllByText(`$${total}`).length).toBeGreaterThan(0);

  const boton = screen.getByRole('button', { name: /Realizar Pago/i });
  fireEvent.click(boton);
  expect(alPagar).toHaveBeenCalled();
});
