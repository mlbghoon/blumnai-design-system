import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Input } from './Input';
import type { InputProps } from './Input.types';

const meta: Meta<InputProps> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<InputProps>;

// ============================================================================
// ALL VARIANTS OVERVIEW
// ============================================================================

const currencyOptions = [
  { value: 'usd', label: 'USD' },
  { value: 'eur', label: 'EUR' },
  { value: 'gbp', label: 'GBP' },
];

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
];

export const AllVariants: Story = {
  render: () => {
    const [password, setPassword] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [quantity2, setQuantity2] = useState(1);
    const [tags, setTags] = useState(['React', 'TypeScript']);
    const [inlineTags, setInlineTags] = useState(['Design', 'Dev']);
    const [country, setCountry] = useState('us');
    const [currency, setCurrency] = useState('usd');
    const [amount, setAmount] = useState('');
    const [textValue, setTextValue] = useState('Hello World');

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const filtered = e.target.value.replace(/[^0-9.]/g, '');
      const parts = filtered.split('.');
      setAmount(parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : filtered);
    };

    return (
      <div className="flex flex-col gap-24 max-w-md">
        <div>
          <h3 className="size-sm font-medium text-default mb-8">Default</h3>
          <Input
            label="Email"
            placeholder="Enter email"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onClear={() => setTextValue('')}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default mb-8">Shortcut</h3>
          <Input
            variant="shortcut"
            label="Quick Search"
            placeholder="Search..."
            shortcut="⌘K"
            leadIcon={['system', 'search']}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default mb-8">Tags</h3>
          <Input
            variant="tags"
            label="Skills"
            placeholder="Add a skill..."
            tags={tags}
            onTagsChange={setTags}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default mb-8">Inline Tags</h3>
          <Input
            variant="inline-tags"
            label="Technologies"
            placeholder="Add a tag..."
            tags={inlineTags}
            onTagsChange={setInlineTags}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default mb-8">Tail Dropdown</h3>
          <Input
            variant="tail-dropdown"
            label="Amount"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
            dropdownOptions={currencyOptions}
            dropdownValue={currency}
            onDropdownChange={setCurrency}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default mb-8">Lead Dropdown</h3>
          <Input
            variant="lead-dropdown"
            label="Phone"
            placeholder="(555) 123-4567"
            dropdownOptions={countryOptions}
            dropdownValue={country}
            onDropdownChange={setCountry}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default mb-8">Quantity</h3>
          <Input
            variant="quantity"
            label="Quantity"
            value={quantity}
            onChange={setQuantity}
            min={0}
            max={10}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default mb-8">Quantity 2 (Compact)</h3>
          <Input
            variant="quantity-2"
            label="Quantity"
            value={quantity2}
            onChange={setQuantity2}
            min={0}
            max={10}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default mb-8">Tail Button</h3>
          <Input
            variant="tail-button"
            label="Newsletter"
            placeholder="Enter email"
            buttonLabel="Subscribe"
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default mb-8">Lead Button</h3>
          <Input
            variant="lead-button"
            label="Search"
            placeholder="Search files..."
            buttonLabel="Browse"
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default mb-8">Add-on</h3>
          <Input
            variant="addon"
            label="Website"
            placeholder="your-site"
            prefix="https://"
            suffix=".com"
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default mb-8">Inline Add-on</h3>
          <Input
            variant="inline-addon"
            label="Price"
            placeholder="0.00"
            prefix="$"
            suffix="USD"
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default mb-8">Password</h3>
          <Input
            variant="password"
            label="Password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showStrength
            autoCalculateStrength
          />
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};
