# `AccordionItem` Component

A reusable component for displaying a single collapsible accordion item, typically used for FAQs or expandable content.

## Props

*   `question` (string): The title or question displayed in the accordion header.
*   `answer` (string): The content displayed when the accordion item is open.

## Usage

```typescript
import AccordionItem from '@/components/AccordionItem';

<AccordionItem
  question="What is an accordion?"
  answer="An accordion is a graphical control element comprising a vertically stacked list of items."
/>;
