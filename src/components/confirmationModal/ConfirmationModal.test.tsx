import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationModal from './ConfirmationModal';

describe('ConfirmationModal', () => {
  const handleClose = vi.fn();
  const actionButtonConfirm = vi.fn();

  it('should call handleClose when the "Cancelar" button is clicked', () => {
    render(
      <ConfirmationModal
        actionButtonConfirm={actionButtonConfirm}
        handleClose={handleClose}
        isLoading={false}
        open={true}
      />
    );

    fireEvent.click(screen.getByText('Cancelar'));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should call actionButtonConfirm when the "Aceptar" button is clicked', () => {
    render(
      <ConfirmationModal
        actionButtonConfirm={actionButtonConfirm}
        handleClose={handleClose}
        isLoading={false}
        open={true}
      />
    );

    fireEvent.click(screen.getByText('Aceptar'));

    expect(actionButtonConfirm).toHaveBeenCalledTimes(1);
  });
});
