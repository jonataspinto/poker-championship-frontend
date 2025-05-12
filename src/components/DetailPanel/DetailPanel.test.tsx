import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DetailPanel } from '.';

describe('DetailPanel', () => {
  it('renders the summary and children correctly', () => {
    render(
      <DetailPanel.Root>
        <DetailPanel.Summary>
          <h1>Test Summary</h1>
        </DetailPanel.Summary>

        <DetailPanel.Content>Test Content</DetailPanel.Content>
      </DetailPanel.Root>
    );

    expect(screen.getByText('Test Summary')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('toggles the content visibility when summary is clicked', () => {
    render(
      <DetailPanel.Root>
        <DetailPanel.Summary>
          <h1>Test Summary</h1>
        </DetailPanel.Summary>

        <DetailPanel.Content>Test Content</DetailPanel.Content>
      </DetailPanel.Root>
    );

    const summaryElement = screen.getByText('Test Summary');
    const contentElement = screen.getByText('Test Content');

    // Initially, the content should not be visible
    expect(contentElement).not.toBeVisible();

    // Click the summary to expand the details
    fireEvent.click(summaryElement);
    expect(contentElement).toBeVisible();

    // Click the summary again to collapse the details
    fireEvent.click(summaryElement);
    expect(contentElement).not.toBeVisible();
  });

  it('applies additional class names correctly', () => {
    render(
      <DetailPanel.Root className="additional-class">
        <DetailPanel.Summary>
          <h1>Test Summary</h1>
        </DetailPanel.Summary>

        <DetailPanel.Content>Test Content</DetailPanel.Content>
      </DetailPanel.Root>
    );

    const detailsElement = screen.getByRole('group');
    expect(detailsElement).toHaveClass('additional-class');
  });

  it('passes additional props correctly', () => {
    render(
      <DetailPanel.Root data-testid="detail-panel">
        <DetailPanel.Summary>
          <h1>Test Summary</h1>
        </DetailPanel.Summary>

        <DetailPanel.Content>Test Content</DetailPanel.Content>
      </DetailPanel.Root>
    );

    const detailsElement = screen.getByTestId('detail-panel');
    expect(detailsElement).toBeInTheDocument();
  });
});
