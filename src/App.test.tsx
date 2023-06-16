import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('On the landing page,', () => {
  describe('When the page loads,', () => {
    const setup = async () => {
      const view = render(<App />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      fireEvent.click(view.getByRole('button', { name: /add recipe/i }));

      // eslint-disable-next-line testing-library/prefer-screen-queries
      let instructionsInput = await view.findByRole('textbox', {
        name: /instructions/i,
      });

      return {
        view,
        instructionsInput,
      };
    };

    it('should see a heading that says There are no recipes to list. under a My Recipes header', function () {
      render(<App />);

      let header = screen.getByText('My Recipes');
      expect(header).toBeInTheDocument();

      let list = screen.getByText('There are no recipes to list.');
      expect(list).toBeInTheDocument();
      expect(header.compareDocumentPosition(list)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      );
    });
    it('should render a button with the text Add Recipe after the My Recipe heading', function () {
      render(<App />);

      let header = screen.getByText('My Recipes');
      expect(header).toBeInTheDocument();

      let button = screen.getByRole('button', { name: 'Add Recipe' });
      expect(button).toBeInTheDocument();

      expect(header.compareDocumentPosition(button)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      );
    });
    it('should contain a button that opens a form when clicked', async function () {
      render(<App />);

      let button = screen.getByRole('button', { name: 'Add Recipe' });
      fireEvent.click(button);

      let form = await screen.findByRole('form', undefined, { timeout: 3000 });
      expect(form).toBeInTheDocument();

      // Then I should see a form with fields: "Recipe Name" and "Recipe Instructions"
      expect(
        screen.getByRole('textbox', { name: /Recipe name/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: /instructions/i })
      ).toBeInTheDocument();

      // And the "Add Recipe" button should no longer be on the screen.
      // Use queryBy instead of getBy because getBy throws an error when it doesn't have exactly 1 match
      let samebutton = screen.queryByRole('button', { name: 'Add Recipe' });
      expect(samebutton).toBeNull();
    });
    it('should show the new recipe name after submitting the form.', async function () {
      render(<App />);

      let button = screen.getByRole('button', { name: 'Add Recipe' });
      fireEvent.click(button);

      let recipeNameTextBox = await screen.findByRole('textbox', {
        name: /Recipe Name/i,
      });
      userEvent.type(recipeNameTextBox, 'Tofu Scramble Tacos');

      let instructionsTextBox = screen.getByRole('textbox', {
        name: /instructions/i,
      });
      userEvent.type(instructionsTextBox, 'Step 1: throw away this recipe.');

      let submitBtn = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submitBtn);

      let recipe = await screen.findByText(/.*tofu scramble tacos/i);
      expect(recipe).toBeInTheDocument();

      let header = screen.getByText('My Recipes');
      expect(header.compareDocumentPosition(recipe)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      );
    });
  });
});
