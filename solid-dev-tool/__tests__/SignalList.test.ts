//dependencies: @jest/globals, jest, solid-js, solid-js/web

import { render } from 'solid-js/web';
import { createSignal } from 'solid-js';
import { describe, test, expect } from '@jest/globals';
import SignalList from '../src/SignalList';

describe('SignalList', () => {
  test('renders signal list correctly', () => {
    const signals = [
      { name: 'signal1', value: 10 },
      { name: 'signal2', value: 20 },
      { name: 'signal3', value: 30 },
    ];
    const container = document.createElement('div');
    const [signalList] = createSignal(signals);

    render(() => <SignalList signalList={signalList()} />, container);

    const signalElements = container.querySelectorAll('.signal');
    expect(signalElements.length).toBe(signals.length);

    signalElements.forEach((signalElement, index) => {
      const signal = signals[index];
      expect(signalElement.textContent).toContain(signal.name);
      expect(signalElement.textContent).toContain(`value: ${signal.value}`);
    });
  });

  test('creates signal graph button correctly', () => {
    const signal = { name: 'signal1', value: 10, observers: [] };
    const container = document.createElement('div');
    const [signalList] = createSignal([signal]);

    render(() => <SignalList signalList={signalList()} />, container);

    const signalButton = container.querySelector('.signalButton');
    expect(signalButton).toBeTruthy();
    expect(signalButton.textContent).toBe(signal.name);
  });

  test('clicking signal graph button renders graph correctly', () => {
    const signal = { name: 'signal1', value: 10, observers: [] };
    const container = document.createElement('div');
    const [signalList] = createSignal([signal]);

    render(() => <SignalList signalList={signalList()} />, container);

    const signalButton = container.querySelector('.signalButton');
    expect(signalButton).toBeTruthy();

    signalButton.dispatchEvent(new MouseEvent('click'));
    const graphElement = container.querySelector('.graph');
    expect(graphElement).toBeTruthy();
  });
});
