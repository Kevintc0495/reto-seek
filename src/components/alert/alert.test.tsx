import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AlertComponent from './Alert';

describe('AlertComponent', () => {
  const onClose = vi.fn();

  it('should not render the Snackbar when open is false', () => {
    const message = "This is an alert message";

    render(
      <AlertComponent type="success" open={false} onClose={onClose}>
        {message}
      </AlertComponent>
    );

    expect(screen.queryByText(message)).toBeNull();
  });
});
