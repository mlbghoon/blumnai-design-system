import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DndContext } from '@dnd-kit/core';
import { DragOverlay } from './DragOverlay';

describe('DragOverlay', () => {
  it('renders without PortalContainerProvider (falls back to document.body)', () => {
    expect(() => {
      render(
        <DndContext>
          <DragOverlay>
            <div>overlay content</div>
          </DragOverlay>
        </DndContext>
      );
    }).not.toThrow();
  });
});
